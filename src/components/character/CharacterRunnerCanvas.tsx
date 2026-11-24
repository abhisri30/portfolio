import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface CharacterRunnerCanvasProps {
  currentScene?: number;
  scrollProgress?: number;
}

export const CharacterRunnerCanvas: React.FC<CharacterRunnerCanvasProps> = ({
  scrollProgress: propScrollProgress = 0,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Helper to compute responsive wire & robot X position based on aspect ratio
  const computeWirePosition = (w: number, h: number) => {
    const asp = w / h;
    // Position the climbing rope at ~80% of screen width, perfectly framing the orbital rings and scenes
    const wireX = Math.max(1.65, Math.min(2.05, asp * 1.7216 * 0.60));
    const wireZ = 0.20;
    const robotX = wireX - 0.26;
    return { wireX, wireZ, robotX };
  };

  // References for live animation loop
  const animStateRef = useRef({
    character: null as THREE.Group | null,
    robotBones: {} as Record<string, THREE.Bone>,
    sparkParticles: null as THREE.Points | null,
    bokehParticles: null as THREE.Points | null,
    starField: null as THREE.Points | null,
    ropeGroup: null as THREE.Group | null,
    ropeGlow: null as THREE.Mesh | null,
    robotLight: null as THREE.PointLight | null,
    wireX: 1.70,
    robotX: 1.44,
    scrollProgress: 0,
    targetScrollProgress: 0,
    currentRobotY: -0.32,
    targetRobotY: -0.32,
    mouseX: 0,
    mouseY: 0,
    scrollVelocity: 0,
    lastScrollY: 0,
    climbProgress: 0,
    moveBlend: 0,
  });

  // Keep target synchronized with scroll progress (0..1)
  useEffect(() => {
    animStateRef.current.targetScrollProgress = propScrollProgress;
    // Elegant vertical range: travels down the rope smoothly from -0.32 down to -1.22
    animStateRef.current.targetRobotY = -0.32 - propScrollProgress * 0.90;
  }, [propScrollProgress]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const { wireX: initialWireX, wireZ: initialWireZ, robotX: initialRobotX } = computeWirePosition(width, height);
    animStateRef.current.wireX = initialWireX;
    animStateRef.current.robotX = initialRobotX;

    // --- 1. Scene, Camera, and High-Performance WebGL Renderer ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0915);
    scene.fog = new THREE.FogExp2(0x0a0915, 0.035);

    // Camera framed so the vertical rope is positioned at x = 1.35 and robot is prominent
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0.0, 0.1, 5.0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    container.appendChild(renderer.domElement);

    // --- 2. Cinematic Studio Lighting (Warm Key + Electric Violet Rim Light) ---
    const ambientLight = new THREE.AmbientLight(0x2d1f4b, 1.9);
    scene.add(ambientLight);

    // Warm key light from front right
    const keyLight = new THREE.DirectionalLight(0xffeed8, 2.8);
    keyLight.position.set(4.5, 4.0, 4.0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // Intense electric violet rim light outlining robot silhouette (matches reference image)
    const rimLight = new THREE.DirectionalLight(0xc084fc, 6.5);
    rimLight.position.set(-4.0, 3.5, -2.5);
    scene.add(rimLight);

    // Front violet fill light
    const fillLight = new THREE.DirectionalLight(0xa855f7, 2.4);
    fillLight.position.set(1.0, 2.0, 3.0);
    scene.add(fillLight);

    // Dynamic point light tracking the robot along the rope
    const robotLight = new THREE.PointLight(0xf472b6, 5.2, 5.5);
    robotLight.position.set(initialWireX, 0.6, 0.5);
    scene.add(robotLight);
    animStateRef.current.robotLight = robotLight;

    // Ground bounce light
    const groundBounce = new THREE.HemisphereLight(0x3b1d60, 0x141022, 1.2);
    scene.add(groundBounce);

    // --- 3. Parallax Layer 1: Background Starfield ---
    const starCount = 450;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 45;
      starPositions[i * 3 + 1] = Math.random() * 25 - 6;
      starPositions[i * 3 + 2] = -10 - Math.random() * 20;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xe2d9f3,
      size: 0.075,
      transparent: true,
      opacity: 0.75,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);
    animStateRef.current.starField = starField;

    // --- 4. The 3D Braided / Twisted Glowing Rope ---
    const ROPE_HEIGHT = 40;
    const ropeGroup = new THREE.Group();

    // 4a. Three intertwined spiral strands creating an authentic braided rope texture
    const strandCount = 3;
    const turns = 65;
    const strandSegments = 260;
    const strandRadius = 0.015;
    const ropeHelixRadius = 0.016;

    const strandMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      roughness: 0.32,
      metalness: 0.35,
      emissive: 0x7c3aed,
      emissiveIntensity: 0.85,
    });

    for (let s = 0; s < strandCount; s++) {
      const points: THREE.Vector3[] = [];
      const strandPhase = (s * Math.PI * 2) / strandCount;
      for (let i = 0; i <= strandSegments; i++) {
        const t = i / strandSegments;
        const y = (t - 0.5) * ROPE_HEIGHT;
        const angle = t * turns * Math.PI * 2 + strandPhase;
        const x = Math.cos(angle) * ropeHelixRadius;
        const z = Math.sin(angle) * ropeHelixRadius;
        points.push(new THREE.Vector3(x, y, z));
      }
      const curve = new THREE.CatmullRomCurve3(points);
      const strandGeo = new THREE.TubeGeometry(curve, 200, strandRadius, 8, false);
      const strandMesh = new THREE.Mesh(strandGeo, strandMat);
      ropeGroup.add(strandMesh);
    }

    // 4b. Inner radiant laser core running inside the twisted strands
    const coreGeo = new THREE.CylinderGeometry(0.012, 0.012, ROPE_HEIGHT, 16);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.set(0, 0, 0);
    ropeGroup.add(coreMesh);

    // 4c. Outer pulsating neon purple glow sheath
    const glowGeo = new THREE.CylinderGeometry(0.065, 0.065, ROPE_HEIGHT, 16);
    const glowMat = new THREE.MeshStandardMaterial({
      color: 0xf472b6,
      emissive: 0xd946ef,
      emissiveIntensity: 4.2,
      transparent: true,
      opacity: 0.55,
      roughness: 0.1,
    });
    const ropeGlow = new THREE.Mesh(glowGeo, glowMat);
    ropeGlow.position.set(0, 0, 0);
    ropeGroup.add(ropeGlow);
    animStateRef.current.ropeGlow = ropeGlow;

    ropeGroup.position.set(initialWireX, 0, initialWireZ);
    scene.add(ropeGroup);
    animStateRef.current.ropeGroup = ropeGroup;



    // Foreground floating bokeh particles
    const bokehCount = 50;
    const bokehGeo = new THREE.BufferGeometry();
    const bokehPositions = new Float32Array(bokehCount * 3);
    for (let i = 0; i < bokehCount; i++) {
      bokehPositions[i * 3] = (Math.random() - 0.5) * 12;
      bokehPositions[i * 3 + 1] = Math.random() * 8 - 4;
      bokehPositions[i * 3 + 2] = 1.5 + Math.random() * 2.0;
    }
    bokehGeo.setAttribute('position', new THREE.BufferAttribute(bokehPositions, 3));
    const bokehMat = new THREE.PointsMaterial({
      color: 0xc084fc,
      size: 0.08,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const bokehParticles = new THREE.Points(bokehGeo, bokehMat);
    scene.add(bokehParticles);
    animStateRef.current.bokehParticles = bokehParticles;

    // --- 6. Load 3D Robot & Pose in Exact Match of Reference Image ---
    const loader = new GLTFLoader();

    setLoadProgress(30);
    loader.load(
      '/models/Xbot.glb',
      (gltf) => {
        setLoadProgress(100);
        setIsLoaded(true);

        const character = gltf.scene;
        // Scaled to 0.75: Sleek, refined, perfectly proportioned to the glowing wire
        character.scale.set(0.75, 0.75, 0.75);

        // Position robot holding the rope, facing front-right toward the rope
        character.position.set(initialRobotX, -0.32, initialWireZ);
        character.rotation.set(0, -Math.PI * 0.22, 0);

        // Apply glossy metallic purple material with electric violet rim reflections
        character.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            mesh.material = new THREE.MeshStandardMaterial({
              color: 0x3b1d60,
              roughness: 0.18,
              metalness: 0.85,
              emissive: 0x581c87,
              emissiveIntensity: 0.35,
            });
          }

          if ((child as THREE.Bone).isBone) {
            const bone = child as THREE.Bone;
            animStateRef.current.robotBones[bone.name] = bone;
          }
        });

        // Bone accessor helper
        const b = animStateRef.current.robotBones;
        const setBoneRot = (name: string, x: number, y: number, z: number) => {
          const bone = b[name] || b[name.replace('mixamorig', 'mixamorig:')] || b['mixamorig:' + name];
          if (bone) {
            bone.rotation.set(x, y, z);
          }
        };



        // --- AUTHENTIC ROPE-CLIMBING KINEMATICS ---
        // 1. Spine & Upper Body: Natural athletic curve leaning toward the rope
        setBoneRot('mixamorigSpine', 0.10, 0.08, -0.10);
        setBoneRot('mixamorigSpine1', 0.08, 0.05, -0.06);
        setBoneRot('mixamorigSpine2', 0.06, 0.02, -0.04);

        // 2. Head tilted UP and looking toward the high right hand on the rope
        setBoneRot('mixamorigNeck', -0.32, 0.40, -0.15);
        setBoneRot('mixamorigHead', -0.42, 0.82, -0.15);

        // Attach glowing horizontal neon visor slit across face (matches reference image)
        const headBone = b['mixamorigHead'] || b['mixamorig:Head'];
        if (headBone) {
          const visorGroup = new THREE.Group();
          // Position visor sleekly across face angled up along the rope
          visorGroup.position.set(0.0, 5.2, 10.8);
          visorGroup.rotation.set(-0.35, 0, 0);

          // Horizontal razor-thin visor slit with bright white core
          const visorGeo = new THREE.BoxGeometry(14.0, 2.2, 3.8);
          const visorMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
          const visorMesh = new THREE.Mesh(visorGeo, visorMat);
          visorGroup.add(visorMesh);

          // Visor neon magenta aura halo
          const haloGeo = new THREE.PlaneGeometry(19.0, 6.0);
          const haloMat = new THREE.MeshBasicMaterial({
            color: 0xf472b6,
            transparent: true,
            opacity: 0.95,
            blending: THREE.AdditiveBlending,
          });
          const haloMesh = new THREE.Mesh(haloGeo, haloMat);
          haloMesh.position.z = 1.0;
          visorGroup.add(haloMesh);

          headBone.add(visorGroup);
        }

        // 3. RIGHT ARM: Reach high up along the rope
        setBoneRot('mixamorigRightShoulder', 0.15, 0.10, -0.30);
        setBoneRot('mixamorigRightArm', -0.30, -0.22, -2.25);
        setBoneRot('mixamorigRightForeArm', 0.05, 0.25, 0.0);
        setBoneRot('mixamorigRightHand', 0.25, 0.35, 0.20);

        // 3b. RIGHT HAND FINGERS: Curled tightly around the rope with opposing thumb
        setBoneRot('mixamorigRightHandIndex1', 0.0, 0.0, 1.10);
        setBoneRot('mixamorigRightHandIndex2', 0.0, 0.0, 1.05);
        setBoneRot('mixamorigRightHandIndex3', 0.0, 0.0, 0.95);
        setBoneRot('mixamorigRightHandMiddle1', 0.0, 0.0, 1.15);
        setBoneRot('mixamorigRightHandMiddle2', 0.0, 0.0, 1.05);
        setBoneRot('mixamorigRightHandMiddle3', 0.0, 0.0, 0.95);
        setBoneRot('mixamorigRightHandRing1', 0.0, 0.0, 1.15);
        setBoneRot('mixamorigRightHandRing2', 0.0, 0.0, 1.05);
        setBoneRot('mixamorigRightHandRing3', 0.0, 0.0, 0.95);
        setBoneRot('mixamorigRightHandPinky1', 0.0, 0.0, 1.20);
        setBoneRot('mixamorigRightHandPinky2', 0.0, 0.0, 1.05);
        setBoneRot('mixamorigRightHandPinky3', 0.0, 0.0, 0.95);
        setBoneRot('mixamorigRightHandThumb1', 0.45, 0.75, 0.60);
        setBoneRot('mixamorigRightHandThumb2', 0.25, 0.45, 0.70);
        setBoneRot('mixamorigRightHandThumb3', 0.15, 0.25, 0.65);

        // 4. LEFT ARM: Reaches across to grip the rope at chest level
        setBoneRot('mixamorigLeftShoulder', 0.15, 0.10, 0.20);
        setBoneRot('mixamorigLeftArm', 0.20, 0.75, -1.15);
        setBoneRot('mixamorigLeftForeArm', 0.10, 0.05, 1.45);
        setBoneRot('mixamorigLeftHand', 0.15, -0.20, -0.25);

        // 4b. LEFT HAND FINGERS: Curled tightly around the rope with opposing thumb
        setBoneRot('mixamorigLeftHandIndex1', 0.0, 0.0, -1.10);
        setBoneRot('mixamorigLeftHandIndex2', 0.0, 0.0, -1.05);
        setBoneRot('mixamorigLeftHandIndex3', 0.0, 0.0, -0.95);
        setBoneRot('mixamorigLeftHandMiddle1', 0.0, 0.0, -1.15);
        setBoneRot('mixamorigLeftHandMiddle2', 0.0, 0.0, -1.05);
        setBoneRot('mixamorigLeftHandMiddle3', 0.0, 0.0, -0.95);
        setBoneRot('mixamorigLeftHandRing1', 0.0, 0.0, -1.15);
        setBoneRot('mixamorigLeftHandRing2', 0.0, 0.0, -1.05);
        setBoneRot('mixamorigLeftHandRing3', 0.0, 0.0, -0.95);
        setBoneRot('mixamorigLeftHandPinky1', 0.0, 0.0, -1.20);
        setBoneRot('mixamorigLeftHandPinky2', 0.0, 0.0, -1.05);
        setBoneRot('mixamorigLeftHandPinky3', 0.0, 0.0, -0.95);
        setBoneRot('mixamorigLeftHandThumb1', 0.45, -0.75, -0.60);
        setBoneRot('mixamorigLeftHandThumb2', 0.25, -0.45, -0.70);
        setBoneRot('mixamorigLeftHandThumb3', 0.15, -0.25, -0.65);

        // 5. LEGS: Raised climbing knee crossing past rope + trailing stabilizer leg
        // Right Leg: Knee raised high (~90°), pointing forward/right past the rope, hooked around rope
        setBoneRot('mixamorigRightUpLeg', -0.85, 0.65, 1.85);
        setBoneRot('mixamorigRightLeg', 1.75, 0.0, 0.0);
        setBoneRot('mixamorigRightFoot', 0.30, 0.0, 0.10);

        // Left Leg: Trailing downward along the rope with slight natural knee flexion
        setBoneRot('mixamorigLeftUpLeg', 0.15, 0.05, -0.05);
        setBoneRot('mixamorigLeftLeg', 0.35, 0.0, 0.0);
        setBoneRot('mixamorigLeftFoot', 0.25, 0.0, -0.05);

        scene.add(character);
        animStateRef.current.character = character;
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (err) => {
        console.error('Error loading Xbot robot:', err);
      }
    );

    // --- 7. Window Scroll, Resize & Mouse Interaction Handlers ---
    const handleScroll = () => {
      const delta = window.scrollY - animStateRef.current.lastScrollY;
      animStateRef.current.scrollVelocity = Math.min(1.5, Math.abs(delta) * 0.015);
      animStateRef.current.lastScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      const { wireX, robotX } = computeWirePosition(width, height);
      animStateRef.current.wireX = wireX;
      animStateRef.current.robotX = robotX;
      if (animStateRef.current.ropeGroup) {
        animStateRef.current.ropeGroup.position.x = wireX;
      }
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      animStateRef.current.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      animStateRef.current.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- 8. Main Render Loop (Real Person Rope-Climbing Kinematics) ---
    const clock = new THREE.Clock();
    let animFrameId: number;

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();
      const state = animStateRef.current;

      // Smooth decay of scroll velocity
      state.scrollVelocity *= 0.88;

      // Smooth interpolation for scroll progress and robot Y descent
      state.scrollProgress += (state.targetScrollProgress - state.scrollProgress) * 0.07;
      state.currentRobotY += (state.targetRobotY - state.currentRobotY) * 0.07;

      // Smooth climbing motion tied to progress (1 page = ~2.5 natural climbing paces)
      state.climbProgress = state.scrollProgress * 2.5;

      // Blend smoothly between active climbing motion and steady idle hold
      const isMoving = state.scrollVelocity > 0.015;
      const targetMoveBlend = isMoving ? 1.0 : 0.0;
      state.moveBlend += (targetMoveBlend - state.moveBlend) * 0.08;

      // Parallax camera sway
      const targetCamX = state.mouseX * 0.12;
      const targetCamY = 0.1 - state.mouseY * 0.08;
      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.lookAt(0.3, 0.0, 0);

      // Background Starfield Parallax
      if (state.starField) {
        state.starField.position.y = state.scrollProgress * 1.2;
      }

      // Foreground Bokeh Particles Parallax
      if (state.bokehParticles) {
        state.bokehParticles.position.y = state.scrollProgress * 3.5;
      }

      // Update 3D Robot Position & Kinematics
      if (state.character) {
        // Continuous cycle driven by scroll distance + gentle idle breathing when stopped
        const activeCycle = state.climbProgress * Math.PI * 2;
        const idleBreathe = Math.sin(elapsed * 2.0) * 0.015;

        // Cyclic kinematic phases
        const rCycle = Math.sin(activeCycle);
        const rLift = Math.cos(activeCycle);
        const lCycle = -rCycle;
        const lLift = -rLift;

        // Body balance and subtle lateral shift while descending
        const swayX = Math.sin(elapsed * 1.8) * 0.003 + (rCycle * 0.005) * state.moveBlend;
        state.character.position.x = state.robotX + swayX;
        state.character.position.y = state.currentRobotY;
        state.character.rotation.z = (rCycle * 0.015) * state.moveBlend;

        // Move PointLight with the robot to illuminate active hands on the rope
        if (state.robotLight) {
          state.robotLight.position.set(state.wireX, state.currentRobotY + 0.85, 0.45);
        }

        const b = state.robotBones;
        const getB = (name: string) => b[name] || b[name.replace('mixamorig', 'mixamorig:')] || b['mixamorig:' + name];

        // --- HAND-OVER-HAND PROCEDURAL KINEMATICS ANCHORED TO ROPE ---
        const rArm = getB('mixamorigRightArm');
        const lArm = getB('mixamorigLeftArm');
        const rForeArm = getB('mixamorigRightForeArm');
        const lForeArm = getB('mixamorigLeftForeArm');

        // Right Arm: High reach along the rope with natural muscular tension during descent
        if (rArm && rForeArm) {
          rArm.rotation.x = -0.30 + (rCycle * 0.04) * state.moveBlend + idleBreathe * 0.5;
          rArm.rotation.y = -0.22 - (rLift * 0.02) * state.moveBlend;
          rArm.rotation.z = -2.25 + (rCycle * 0.03) * state.moveBlend;
          rForeArm.rotation.y = 0.25 + (rCycle * 0.02) * state.moveBlend;
        }

        // Left Arm: Chest-level grip with natural muscular tension during descent
        if (lArm && lForeArm) {
          lArm.rotation.x = 0.20 + (lCycle * 0.04) * state.moveBlend - idleBreathe * 0.5;
          lArm.rotation.y = 0.75 + (lLift * 0.02) * state.moveBlend;
          lArm.rotation.z = -1.15 + (lCycle * 0.03) * state.moveBlend;
          lForeArm.rotation.z = 1.45 + (lCycle * 0.03) * state.moveBlend;
        }

        // Dynamic finger grip tension: stays firmly clamped around rope
        const rGrip = THREE.MathUtils.lerp(1.15, 0.95, Math.max(0, rLift) * state.moveBlend);
        const lGrip = THREE.MathUtils.lerp(1.15, 0.95, Math.max(0, lLift) * state.moveBlend);

        const setFingers = (side: 'Right' | 'Left', curl: number) => {
          const sign = side === 'Right' ? 1 : -1;
          ['Index', 'Middle', 'Ring', 'Pinky'].forEach((f) => {
            for (let i = 1; i <= 3; i++) {
              const bone = getB(`mixamorig${side}Hand${f}${i}`);
              if (bone) bone.rotation.z = sign * curl;
            }
          });
        };
        setFingers('Right', rGrip);
        setFingers('Left', lGrip);

        // --- LEGS & FEET STEPPING / CLAMPING KINEMATICS ---
        const rUpLeg = getB('mixamorigRightUpLeg');
        const rLeg = getB('mixamorigRightLeg');
        const rFoot = getB('mixamorigRightFoot');
        const lUpLeg = getB('mixamorigLeftUpLeg');
        const lLeg = getB('mixamorigLeftLeg');
        const lFoot = getB('mixamorigLeftFoot');

        // Right Leg: Knee raised high (~90°), hooked around rope with rhythmic clamping
        if (rUpLeg && rLeg && rFoot) {
          rUpLeg.rotation.x = -0.85 + (rCycle * 0.05) * state.moveBlend;
          rUpLeg.rotation.y = 0.65;
          rUpLeg.rotation.z = 1.85 + (rCycle * 0.03) * state.moveBlend;
          rLeg.rotation.x = 1.75 - (rLift * 0.04) * state.moveBlend;
          rFoot.rotation.x = 0.30 + (rCycle * 0.03) * state.moveBlend;
        }

        // Left Leg: Trailing downward along the rope stabilizing descent
        if (lUpLeg && lLeg && lFoot) {
          lUpLeg.rotation.x = 0.15 - (rCycle * 0.04) * state.moveBlend;
          lUpLeg.rotation.y = 0.05;
          lUpLeg.rotation.z = -0.05;
          lLeg.rotation.x = 0.35 + (rLift * 0.03) * state.moveBlend;
          lFoot.rotation.x = 0.25 - (rCycle * 0.03) * state.moveBlend;
        }

        // Spine and head dynamic flex
        const spine = getB('mixamorigSpine');
        const head = getB('mixamorigHead');
        const neck = getB('mixamorigNeck');
        if (spine) {
          spine.rotation.z = -0.10 + (rCycle * 0.02) * state.moveBlend;
        }
        if (neck) {
          neck.rotation.x = -0.32;
          neck.rotation.y = 0.40;
          neck.rotation.z = -0.15;
        }
        if (head) {
          head.rotation.x = -0.42;
          head.rotation.y = 0.82 + (rCycle * 0.02) * state.moveBlend;
          head.rotation.z = -0.15;
        }
      }

      // Update Pulsating Rope Glow
      if (state.ropeGlow) {
        const mat = state.ropeGlow.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 4.2 + Math.sin(elapsed * 6) * 0.8;
      }



      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-[#0a0915]">
      {/* Three.js Canvas Mount Point */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing" />

      {/* Foreground Parallax Purple Glowing Wave */}
      <div
        className="absolute bottom-0 left-0 right-0 h-44 pointer-events-none z-10 transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(${Math.min(60, propScrollProgress * 120)}px)`,
          background: 'radial-gradient(ellipse 90% 100% at 50% 120%, rgba(124, 58, 237, 0.45) 0%, rgba(88, 28, 135, 0.25) 45%, transparent 75%)',
        }}
      />

      {/* Loading Screen Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0915] text-white">
          <div className="relative w-48 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-400 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.8)]"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <p className="text-xs font-mono tracking-widest text-purple-300 uppercase animate-pulse">
            Loading 3D Experience • {loadProgress}%
          </p>
        </div>
      )}
    </div>
  );
};

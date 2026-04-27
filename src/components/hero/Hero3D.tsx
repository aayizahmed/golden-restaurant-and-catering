"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";

function CameraRig() {
  useFrame((state) => {
    const camera = state.camera as THREE.PerspectiveCamera;
    const nx = state.pointer.x * 0.35;
    const ny = state.pointer.y * 0.2;
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, -nx, 0.06);
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, -ny, 0.06);
  });
  return null;
}

function Dallah() {
  const group = useRef<THREE.Group>(null);

  const gold = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#D4AF37"),
        metalness: 0.9,
        roughness: 0.22,
      }),
    [],
  );

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.25;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.06;
  });

  return (
    <group ref={group} position={[0, -0.15, 0]}>
      {/* body */}
      <mesh material={gold} position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.58, 48, 48]} />
      </mesh>
      <mesh material={gold} position={[0, -0.28, 0]} scale={[0.88, 0.55, 0.88]}>
        <sphereGeometry args={[0.62, 48, 48]} />
      </mesh>

      {/* neck */}
      <mesh material={gold} position={[0, 0.72, 0]}>
        <cylinderGeometry args={[0.18, 0.26, 0.55, 48]} />
      </mesh>
      <mesh material={gold} position={[0, 1.0, 0]}>
        <coneGeometry args={[0.28, 0.28, 48]} />
      </mesh>

      {/* lid knob */}
      <mesh material={gold} position={[0, 1.17, 0]}>
        <sphereGeometry args={[0.08, 32, 32]} />
      </mesh>

      {/* spout */}
      <mesh material={gold} position={[0.62, 0.55, 0]} rotation={[0, 0, -0.32]}>
        <cylinderGeometry args={[0.07, 0.11, 0.95, 32]} />
      </mesh>
      <mesh material={gold} position={[1.06, 0.28, 0]} rotation={[0, 0, -0.92]}>
        <coneGeometry args={[0.11, 0.42, 32]} />
      </mesh>

      {/* handle */}
      <mesh material={gold} position={[-0.68, 0.55, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.32, 0.07, 18, 48, Math.PI * 1.05]} />
      </mesh>

      {/* base ring */}
      <mesh material={gold} position={[0, -0.62, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.4, 0.06, 24, 64]} />
      </mesh>
    </group>
  );
}

function Steam() {
  const points = useRef<THREE.Points>(null);

  const { geometry, material } = useMemo(() => {
    const count = 1400;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const r = Math.random() * 0.22;
      const a = Math.random() * Math.PI * 2;
      positions[i * 3 + 0] = Math.cos(a) * r;
      positions[i * 3 + 1] = Math.random() * 1.6;
      positions[i * 3 + 2] = Math.sin(a) * r;
      speeds[i] = 0.2 + Math.random() * 0.8;
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));

    const m = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: /* glsl */ `
        uniform float uTime;
        attribute float aSpeed;
        varying float vFade;
        void main() {
          vec3 p = position;
          float t = uTime * aSpeed;
          p.x += sin(t + position.y * 2.0) * 0.04;
          p.z += cos(t + position.y * 2.2) * 0.04;
          p.y = mod(position.y + t * 0.18, 1.6);
          vFade = smoothstep(0.0, 0.35, p.y) * (1.0 - smoothstep(1.1, 1.6, p.y));
          vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = (10.0 + 10.0 * vFade) * (1.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: /* glsl */ `
        varying float vFade;
        void main() {
          vec2 uv = gl_PointCoord.xy - 0.5;
          float d = length(uv);
          float a = smoothstep(0.5, 0.0, d) * vFade;
          gl_FragColor = vec4(0.96, 0.93, 0.88, a * 0.35);
        }
      `,
    });

    return { geometry: g, material: m };
  }, []);

  useFrame((state) => {
    (material.uniforms.uTime.value as number) = state.clock.elapsedTime;
  });

  return (
    <points ref={points} geometry={geometry} material={material} position={[0.05, 0.55, 0]} />
  );
}

function Spices() {
  const instanced = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(() => {
    // Deterministic “random” so renders stay pure/consistent (eslint purity rule).
    const rand = (i: number) => {
      const x = Math.sin(i * 999 + 0.12345) * 10000;
      return x - Math.floor(x);
    };
    return Array.from({ length: 70 }, (_, i) => {
      const r0 = rand(i * 3 + 1);
      const r1 = rand(i * 3 + 2);
      const r2 = rand(i * 3 + 3);
      const r3 = rand(i * 3 + 4);
      const r4 = rand(i * 3 + 5);
      return {
        r: 0.9 + r0 * 0.9,
        a: r1 * Math.PI * 2,
        y: -0.2 + r2 * 1.6,
        s: 0.03 + r3 * 0.04,
        t: r4 * 10,
      };
    });
  }, []);

  useFrame((state) => {
    if (!instanced.current) return;
    const time = state.clock.elapsedTime;
    for (let i = 0; i < seeds.length; i++) {
      const seed = seeds[i];
      const a = seed.a + time * 0.12;
      dummy.position.set(
        Math.cos(a) * seed.r,
        seed.y + Math.sin(time * 0.7 + seed.t) * 0.06,
        Math.sin(a) * seed.r,
      );
      dummy.rotation.set(time * 0.2, a, time * 0.15);
      dummy.scale.setScalar(seed.s);
      dummy.updateMatrix();
      instanced.current.setMatrixAt(i, dummy.matrix);
    }
    instanced.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={instanced} args={[undefined, undefined, seeds.length]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#CD7F32"
        metalness={0.5}
        roughness={0.4}
        emissive="#D4AF37"
        emissiveIntensity={0.08}
      />
    </instancedMesh>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#0A0A0A"]} />
      <fog attach="fog" args={["#070707", 4, 11]} />

      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 6, 2]} intensity={1.2} color="#FFE7A6" />
      <pointLight position={[-3, 2, -2]} intensity={0.6} color="#CD7F32" />

      <Float speed={0.9} rotationIntensity={0.35} floatIntensity={0.25}>
        <Dallah />
      </Float>

      <Steam />
      <Spices />
      <Environment preset="night" />
    </>
  );
}

export function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0.2, 0.6, 4.1], fov: 45 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
    >
      <CameraRig />
      <Scene />
    </Canvas>
  );
}


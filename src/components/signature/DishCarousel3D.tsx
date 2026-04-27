"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef, useState } from "react";
import { dishes } from "@/content/site";

function Ring() {
  const group = useRef<THREE.Group>(null);
  const [drag, setDrag] = useState<{ x: number; rot: number } | null>(null);
  const radius = 2.2;

  const cards = useMemo(() => dishes.slice(0, 8), []);

  useFrame((state) => {
    if (!group.current) return;
    if (drag) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.18;
  });

  return (
    <group
      ref={group}
      onPointerDown={(e) => {
        setDrag({ x: e.clientX, rot: group.current?.rotation.y ?? 0 });
      }}
      onPointerUp={() => setDrag(null)}
      onPointerMove={(e) => {
        if (!drag || !group.current) return;
        const dx = (e.clientX - drag.x) / 260;
        group.current.rotation.y = drag.rot + dx;
      }}
    >
      {cards.map((d, i) => {
        const a = (i / cards.length) * Math.PI * 2;
        const x = Math.cos(a) * radius;
        const z = Math.sin(a) * radius;
        const rotY = -a + Math.PI / 2;

        return (
          <group key={d.id} position={[x, 0, z]} rotation={[0, rotY, 0]}>
            <mesh>
              <planeGeometry args={[1.55, 0.95, 1, 1]} />
              <meshStandardMaterial
                color="#111111"
                metalness={0.2}
                roughness={0.55}
                emissive="#D4AF37"
                emissiveIntensity={0.05}
              />
            </mesh>
            <mesh position={[0, 0, 0.01]}>
              <planeGeometry args={[1.5, 0.9, 1, 1]} />
              <meshStandardMaterial color="#0A0A0A" roughness={0.95} />
            </mesh>

            <Billboard follow={false} lockX lockZ position={[0, 0.05, 0.03]}>
              <Text
                fontSize={0.12}
                maxWidth={1.2}
                anchorX="center"
                anchorY="middle"
                color="#F5F0E6"
                outlineWidth={0.003}
                outlineColor="#000000"
              >
                {d.name}
              </Text>
              <Text
                position={[0, -0.18, 0]}
                fontSize={0.08}
                maxWidth={1.15}
                anchorX="center"
                anchorY="middle"
                color="rgba(245,240,230,0.65)"
              >
                {d.note}
              </Text>
            </Billboard>
          </group>
        );
      })}
    </group>
  );
}

export function DishCarousel3D() {
  return (
    <Canvas
      camera={{ position: [0, 0.8, 5.4], fov: 48 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#0A0A0A"]} />
      <fog attach="fog" args={["#0A0A0A", 3, 10]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 3]} intensity={1.1} color="#FFE7A6" />
      <pointLight position={[-2, 1, -2]} intensity={0.7} color="#CD7F32" />

      <Ring />

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.55, 0]}>
        <circleGeometry args={[3.2, 64]} />
        <meshStandardMaterial
          color="#0A0A0A"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
    </Canvas>
  );
}


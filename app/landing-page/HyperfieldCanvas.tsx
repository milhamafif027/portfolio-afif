"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { UnrealBloomPass } from "three-stdlib";
import * as THREE from "three";

extend({ UnrealBloomPass });

function ParticleSwarm() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  // 7000 partikel optimal untuk browser tanpa menurunkan performa
  const count = 7000;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const color = useMemo(() => new THREE.Color(), []);

  const positions = useMemo(() => {
    const pos: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      pos.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100
        )
      );
    }
    return pos;
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {},
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vColor;
          void main() {
              vNormal = normalize(normalMatrix * normal);
              vColor = instanceColor;
              gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vColor;
          void main() {
              vec3 viewDir = vec3(0.0, 0.0, 1.0);
              float metallic = dot(vNormal, viewDir) * 0.5 + 0.5;
              metallic = pow(metallic, 2.5);
              vec3 col = mix(vec3(0.08), vColor, 0.7) * metallic + vec3(0.15); 
              gl_FragColor = vec4(col, 1.0);
          }
        `,
      }),
    []
  );

  const geometry = useMemo(() => new THREE.SphereGeometry(0.28, 8, 8), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * 0.7;

    for (let i = 0; i < count; i++) {
      const u = i / Math.max(1, count - 1);
      const phi = Math.acos(1 - 2 * u);
      const theta = i * 2.399963229728653 + time * 0.25;

      const breathe = 1 + 0.22 * Math.sin(time * 1.7 + u * 18.0);
      const warp = 1.0 + 0.28 * Math.sin(theta * 3.0 + time) * Math.sin(phi * 5.0);
      const pulse = 1.0 + 0.16 * Math.sin(time * 2.4 + theta * 2.0 + phi * 7.0);

      const radius = (18.0 + 38.0 * Math.pow(u, 0.42)) * breathe * warp * pulse;

      const twist = time * 0.18 + radius * 0.015 + Math.sin(phi * 6.0 + time) * 0.35;
      const ct = Math.cos(theta + twist);
      const st = Math.sin(theta + twist);
      const sp = Math.sin(phi);
      const cp = Math.cos(phi);

      const x = radius * sp * ct;
      const y = radius * cp + Math.sin(theta * 4.0 + time * 1.3) * 3.5;
      const z = radius * sp * st;

      const fold = Math.sin(x * 0.09 + time) * Math.cos(z * 0.075 - time * 0.7);
      const lift = fold * 5.5 + Math.sin(y * 0.12 + theta) * 2.5;

      target.set(
        x + fold * 2.2,
        y + lift - 5, // Sedikit digeser turun agar pas di belakang headline
        z + Math.cos(x * 0.06 + z * 0.08 + time) * 3.0
      );

      // Palet monokromatik Vesper (perak, abu, putih)
      const lightness = 0.35 + 0.55 * Math.abs(Math.sin(theta * 2.0 + time));
      color.setRGB(lightness, lightness, lightness + 0.05);

      positions[i].lerp(target, 0.08);
      dummy.position.copy(positions[i]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, color);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return <instancedMesh ref={meshRef} args={[geometry, material, count]} />;
}

export default function HyperfieldCanvas() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    >
      <Canvas
        camera={{ position: [0, 0, 110], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={["#000000", 60, 180]} />
        <ParticleSwarm />
      </Canvas>
    </div>
  );
}
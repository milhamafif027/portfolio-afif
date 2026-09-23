"use client";

import React, { useEffect, useRef, type CSSProperties } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

// =========================================================================
// Instanced Mesh + UnrealBloom Living Hyperfield (Glow Engine)
// =========================================================================
function ParticleBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Scene & Setup Kamera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.008);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      2000,
    );
    camera.position.set(0, -2, 105);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      powerPreference: "high-performance",
      antialias: false, // Dimatikan agar performa UnrealBloomPass tetap 60fps
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);

    // 3. Post-Processing: UnrealBloomPass untuk Efek Glow Neon Menyala
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.6, // Strength
      0.45, // Radius
      0.15, // Threshold
    );
    composer.addPass(bloomPass);

    // 4. InstancedMesh Geometry dengan Tetrahedron 3D Crystal
    const COUNT = 14000;
    const geometry = new THREE.TetrahedronGeometry(0.32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const mesh = new THREE.InstancedMesh(geometry, material, COUNT);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(mesh);

    // Setup array posisi awal
    const currentPositions: THREE.Vector3[] = [];
    for (let i = 0; i < COUNT; i++) {
      currentPositions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 80,
          (Math.random() - 0.5) * 80,
          (Math.random() - 0.5) * 80,
        ),
      );
    }

    const dummy = new THREE.Object3D();
    const target = new THREE.Vector3();
    const pColor = new THREE.Color();

    // 5. Interaktivitas Kursor Mouse
    let mouseWorldX = 0;
    let mouseWorldY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let clickImpact = 0;

    const onMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      targetMouseX = nx * 50;
      targetMouseY = ny * 30;
    };

    const onMouseDown = () => {
      clickImpact = 2.0; // Ledakan shockwave saat klik
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);

    // 6. Animation Loop (Matematika Gelombang Hyperfield)
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = ((performance.now() - startTime) / 1000) * 0.85;

      mouseWorldX += (targetMouseX - mouseWorldX) * 0.07;
      mouseWorldY += (targetMouseY - mouseWorldY) * 0.07;
      clickImpact *= 0.93;

      for (let i = 0; i < COUNT; i++) {
        const u = i / Math.max(1, COUNT - 1);
        const phi = Math.acos(1 - 2 * u);
        const theta = i * 2.399963229728653 + time * 0.32;

        const breathe = 1 + 0.22 * Math.sin(time * 1.7 + u * 18.0);
        const warp =
          1.0 + 0.28 * Math.sin(theta * 3.0 + time) * Math.sin(phi * 5.0);
        const pulse =
          1.0 + 0.16 * Math.sin(time * 2.4 + theta * 2.0 + phi * 7.0);

        const radius =
          (18.0 + 44.0 * Math.pow(u, 0.42)) * breathe * warp * pulse;

        const twist =
          time * 0.22 + radius * 0.018 + Math.sin(phi * 6.0 + time) * 0.35;
        const ct = Math.cos(theta + twist);
        const st = Math.sin(theta + twist);
        const sp = Math.sin(phi);
        const cp = Math.cos(phi);

        let x = radius * sp * ct;
        let y = radius * cp + Math.sin(theta * 4.0 + time * 1.3) * 3.5 - 6;
        let z = radius * sp * st;

        const fold =
          Math.sin(x * 0.09 + time) * Math.cos(z * 0.075 - time * 0.7);
        const lift = fold * 5.5 + Math.sin(y * 0.12 + theta) * 2.5;

        x += fold * 2.2;
        y += lift;
        z += Math.cos(x * 0.06 + z * 0.08 + time) * 3.0;

        // Interaksi Kursor: Repulsi Fisika & Pusaran Swirl
        const dx = x - mouseWorldX;
        const dy = y - mouseWorldY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repulseRadius = 36.0 + clickImpact * 24.0;

        if (dist < repulseRadius && dist > 0.1) {
          const force =
            (1.0 - dist / repulseRadius) * (24.0 + clickImpact * 40.0);
          const angle = Math.atan2(dy, dx);
          x += Math.cos(angle) * force;
          y += Math.sin(angle) * force;
          z += Math.sin(dist * 0.25 - time * 3) * (force * 0.6);
        }

        target.set(x, y, z);

        // Lerp pergerakan posisi
        currentPositions[i].lerp(target, 0.1);
        dummy.position.copy(currentPositions[i]);

        // Rotasi kristal tetrahedron
        dummy.rotation.x = time * 0.8 + i;
        dummy.rotation.y = time * 0.5 + i;
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);

        // Palet Spektrum Neon Hidup & Terang (Cyan -> Electric Indigo -> Vivid Fuchsia)
        const hue = (0.54 + u * 0.38 + fold * 0.04 + time * 0.02) % 1.0;
        const light = Math.min(
          0.85,
          0.48 +
            0.28 * Math.abs(Math.sin(theta * 2.0 + time)) +
            (dist < repulseRadius ? 0.3 : 0),
        );
        pColor.setHSL(hue, 1.0, light);
        mesh.setColorAt(i, pColor);
      }

      if (mesh.instanceMatrix) mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

      mesh.rotation.y = time * 0.08 + (mouseWorldX / 50) * 0.14;
      mesh.rotation.x = -(mouseWorldY / 30) * 0.08;

      composer.render();
    };

    animate();

    // 7. Resize Event
    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    />
  );
}

// =========================================================================
// Main Hero Section
// =========================================================================
export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative w-full min-h-screen flex flex-col justify-between pt-36 pb-12 px-6 overflow-hidden bg-black text-white selection:bg-neutral-800 selection:text-white"
    >
      {/* 1. Live Three.js Unreal Bloom Swarm */}
      <ParticleBackground />

      {/* 2. Procedural Film Grain Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] opacity-15 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 3. Radial Scrim (Melindungi keterbacaan teks di atas pendaran neon) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_75%_55%_at_50%_45%,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.2)_65%,#000000_100%)]"
      />

      {/* Structural Spacer */}
      <div className="hidden lg:block h-6" />

      {/* 4. Center Hero Typography (Clean, Spacious & Luxurious) */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-[880px] w-full mx-auto my-auto py-8">

        {/* Clean Editorial Headline (Nama Lengkap 1 Baris Utuh) */}
        <div className="mb-4">
          <div className="overflow-hidden py-1">
            <span
              style={{ "--d": "0.3s" } as CSSProperties}
              className="appear appear--mask inline-flex items-baseline justify-center whitespace-nowrap text-3xl sm:text-5xl md:text-6xl lg:text-[70px] font-bold tracking-[-0.035em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]"
            >
              <span>Muhammad Ilham Afif,</span>
              <span className="font-serif italic font-normal tracking-tight text-amber-200 ml-3 text-[1.05em] drop-shadow-[0_0_25px_rgba(251,191,36,0.5)]">
                S.Kom
              </span>
            </span>
          </div>

          {/* Sub-headline Peran dengan Gradasi Perak Bersinar */}
          <div className="overflow-hidden py-1 mt-2">
            <span
              style={{ "--d": "0.45s" } as CSSProperties}
              className="appear appear--mask block text-base sm:text-xl md:text-2xl font-medium tracking-tight bg-gradient-to-r from-neutral-100 via-white to-neutral-300 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
            >
              Fullstack Architecture & Intelligent Systems
            </span>
          </div>
        </div>

        {/* Deskripsi Bersih */}
        <p
          style={{ "--d": "0.6s" } as CSSProperties}
          className="appear appear--soft max-w-[580px] text-sm sm:text-[15px] text-neutral-200/95 leading-relaxed tracking-normal font-normal drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]"
        >
          Informatics Engineering graduate from UNNES specializing in secure
          backends with{" "}
          <span className="text-white font-semibold">Java Spring Boot</span>,
          high-performance{" "}
          <span className="text-white font-semibold">Next.js</span>{" "}
          applications, and AI-driven automation workflows.
        </p>
      </div>

      {/* 5. Metrics Footer Chips */}
      <div className="relative z-10 max-w-4xl w-full mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.08] text-xs font-mono text-neutral-400">
        <div
          style={{ "--d": "0.8s" } as CSSProperties}
          className="appear appear--soft flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
          <span className="text-neutral-100 font-medium">3.84 / 4.00</span>
          <span className="text-neutral-400">Cumulative GPA</span>
        </div>

        <div
          style={{ "--d": "0.9s" } as CSSProperties}
          className="appear appear--soft flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
          <span className="text-neutral-100 font-medium">Spring Boot</span>
          <span className="text-neutral-400">& Enterprise REST</span>
        </div>

        <div
          style={{ "--d": "1.0s" } as CSSProperties}
          className="appear appear--soft flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          <span className="text-neutral-100 font-medium">Full-Stack</span>
          <span className="text-neutral-400">Deployment Ready</span>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useRef, type CSSProperties } from "react";
import * as THREE from "three";

// =========================================================================
// Living Hyperfield Three.js Particle Swarm (Dense Glow Engine)
// =========================================================================
function ParticleBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.005);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 0, 105);

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // 3. Tekstur Partikel Glow Terang (Intense Core + Soft Aura)
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255, 255, 255, 1.0)");
      grad.addColorStop(0.15, "rgba(255, 250, 230, 0.98)");
      grad.addColorStop(0.4, "rgba(255, 210, 140, 0.75)");
      grad.addColorStop(0.7, "rgba(255, 160, 90, 0.25)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    // 4. Geometry & Buffers: 32.000 Partikel Padat
    const COUNT = 32000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 50;
      colors[i] = 1.0;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // 5. Points Material dengan partikel tebal & Additive Glow
    const material = new THREE.PointsMaterial({
      size: 1.6,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 6. Smooth Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2.5;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2.5;
    };
    window.addEventListener("mousemove", onMouseMove);

    // 7. Math Loop: Formasi Living Hyperfield
    let animationFrameId: number;
    const clock = new THREE.Clock();
    const tempColor = new THREE.Color();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime() * 0.85;

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const pos = geometry.attributes.position.array as Float32Array;
      const col = geometry.attributes.color.array as Float32Array;

      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;
        const u = i / Math.max(1, COUNT - 1);
        const phi = Math.acos(1 - 2 * u);
        const theta = i * 2.399963229728653 + time * 0.32;

        const breathe = 1 + 0.22 * Math.sin(time * 1.7 + u * 18.0);
        const warp =
          1.0 + 0.28 * Math.sin(theta * 3.0 + time) * Math.sin(phi * 5.0);
        const pulse =
          1.0 + 0.16 * Math.sin(time * 2.4 + theta * 2.0 + phi * 7.0);

        const radius =
          (18.0 + 42.0 * Math.pow(u, 0.42)) * breathe * warp * pulse;

        const twist =
          time * 0.22 + radius * 0.018 + Math.sin(phi * 6.0 + time) * 0.35;
        const ct = Math.cos(theta + twist);
        const st = Math.sin(theta + twist);
        const sp = Math.sin(phi);
        const cp = Math.cos(phi);

        const x = radius * sp * ct;
        const y = radius * cp + Math.sin(theta * 4.0 + time * 1.3) * 3.5;
        const z = radius * sp * st;

        const fold =
          Math.sin(x * 0.09 + time) * Math.cos(z * 0.075 - time * 0.7);
        const lift = fold * 5.5 + Math.sin(y * 0.12 + theta) * 2.5;

        pos[i3] = x + fold * 2.2;
        pos[i3 + 1] = y + lift;
        pos[i3 + 2] = z + Math.cos(x * 0.06 + z * 0.08 + time) * 3.0;

        // Palet Warna: Inti Putih-Emas ke Kelopak Rose-Gold Tebal
        const hue = (0.085 + u * 0.065 + fold * 0.035 + time * 0.015) % 1.0;
        const saturation = 0.95;
        const light = 0.58 + 0.38 * Math.abs(Math.sin(theta * 2.0 + time));
        tempColor.setHSL(hue, saturation, light);

        col[i3] = tempColor.r;
        col[i3 + 1] = tempColor.g;
        col[i3 + 2] = tempColor.b;
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;

      particles.rotation.y = time * 0.12 + mouseX * 0.15;
      particles.rotation.x = mouseY * 0.12;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Viewport Resize Listener
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
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
// Main Hero Section Component
// =========================================================================
export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative w-full min-h-screen flex flex-col justify-between pt-36 pb-12 px-6 overflow-hidden bg-black text-white selection:bg-amber-500 selection:text-black"
    >
      {/* 1. Live Three.js Particle Swarm */}
      <ParticleBackground />

      {/* 2. Procedural SVG Film Grain Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 3. Radial Vignette Scrim (Melindungi keterbacaan teks di tengah) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_75%_55%_at_50%_50%,transparent_0%,rgba(0,0,0,0.45)_60%,#000000_95%)]"
      />

      {/* Structural Spacer */}
      <div className="hidden lg:block h-6" />

      {/* 4. Center Hero Typography & Call-To-Actions */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-[880px] w-full mx-auto my-auto">
        {/* Availability Badge */}
        <div
          style={{ "--d": "0.18s" } as CSSProperties}
          className="appear appear--pop inline-flex items-center gap-2.5 px-4 py-1.5 mb-7 rounded-full bg-neutral-900/80 border border-neutral-700/60 text-xs font-medium tracking-tight text-neutral-200 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>Available for Full-Time & Engineering Roles</span>
        </div>

        {/* Masked Headline dengan Contrast Text-Shadow */}
        <h1 className="text-4xl sm:text-6xl md:text-[70px] font-semibold tracking-[-0.04em] leading-[1.1] text-white flex flex-col items-center mb-6 [text-shadow:_0_2px_24px_rgba(0,0,0,0.95)]">
          <span className="block overflow-hidden py-1">
            <span
              style={{ "--d": "0.38s" } as CSSProperties}
              className="appear appear--mask block"
            >
              Muhammad Ilham Afif{" "}
              <em className="font-serif italic font-normal tracking-[-0.02em] text-[#f2dfbe] not-italic text-[1.08em] px-1.5 drop-shadow-[0_0_18px_rgba(255,215,160,0.5)]">
                S.Kom
              </em>
            </span>
          </span>
          <span className="block overflow-hidden py-1">
            <span
              style={{ "--d": "0.58s" } as CSSProperties}
              className="appear appear--mask block"
            >
              & Scalable Enterprise Workflows.
            </span>
          </span>
        </h1>

        {/* Lede Container dengan Backdrop Tint */}
        <div
          style={{ "--d": "0.78s" } as CSSProperties}
          className="appear appear--soft max-w-[640px] mb-10 px-5 py-2.5 rounded-xl bg-black/45 backdrop-blur-[3px] border border-white/[0.06] shadow-sm"
        >
          <p className="text-sm sm:text-base md:text-[15.5px] text-neutral-300 leading-[1.65] tracking-[-0.015em]">
            Informatics Engineering graduate from UNNES specializing in secure
            backends with{" "}
            <span className="text-white font-medium">Java Spring Boot</span>,
            high-performance{" "}
            <span className="text-white font-medium">
              Next.js web applications
            </span>
            , and AI-driven automation workflows.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 w-full sm:w-auto">
          {/* Primary Solid Button */}
          <a
            href="mailto:milhamafif027@gmail.com"
            style={{ "--d": "0.94s" } as CSSProperties}
            className="appear appear--btn group relative overflow-hidden inline-flex items-center justify-center h-[44px] px-7 rounded-lg text-[14px] font-medium tracking-[-0.02em] text-neutral-950 bg-white border border-white shadow-[0_0_28px_rgba(255,255,255,0.35)] hover:shadow-[0_0_36px_rgba(255,255,255,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-[130%] group-hover:translate-x-[130%] transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none"
            />
            <span className="relative z-10 flex items-center gap-2">
              Contact Me
              <span className="text-xs transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </a>

          {/* Secondary Frosted Glass Ghost Button */}
          <a
            href="#projects"
            style={{ "--d": "1.08s" } as CSSProperties}
            className="appear appear--side group relative overflow-hidden inline-flex items-center justify-center h-[44px] px-7 rounded-lg text-[14px] font-medium tracking-[-0.02em] text-neutral-200 bg-neutral-900/80 border border-neutral-700/80 backdrop-blur-md hover:bg-neutral-800 hover:border-neutral-500 transition-all duration-200 shadow-sm"
          >
            <span className="relative z-10">Explore Projects</span>
          </a>
        </div>
      </div>

      {/* 5. Proven Engineering Metrics Footer */}
      <div className="relative z-10 max-w-5xl w-full mx-auto pt-14 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/[0.08] text-xs sm:text-[13px] text-neutral-400 font-normal tracking-tight">
        {/* Metric 1 */}
        <div
          style={{ "--d": "1.18s" } as CSSProperties}
          className="appear appear--soft flex items-center gap-3"
        >
          <div className="w-5 h-5 rounded-md bg-neutral-900 border border-neutral-700 flex items-center justify-center text-amber-300 text-[11px] font-mono">
            3.84
          </div>
          <span>3.84 / 4.00 Cumulative GPA</span>
        </div>

        {/* Metric 2 */}
        <div
          style={{ "--d": "1.28s" } as CSSProperties}
          className="appear appear--soft flex items-center gap-3"
        >
          <div className="w-5 h-5 rounded-md bg-white text-black flex items-center justify-center font-bold text-[10px]">
            API
          </div>
          <span>Microservices & REST Architecture</span>
        </div>

        {/* Metric 3 */}
        <div
          style={{ "--d": "1.38s" } as CSSProperties}
          className="appear appear--soft flex items-center gap-3"
        >
          <div className="flex -space-x-1.5">
            <span className="w-4 h-4 rounded-full bg-amber-400/80 border border-black inline-block" />
            <span className="w-4 h-4 rounded-full bg-neutral-300 border border-black inline-block" />
            <span className="w-4 h-4 rounded-full bg-neutral-600 border border-black inline-block" />
          </div>
          <span>Full-Stack Deployment Ready</span>
        </div>
      </div>
    </section>
  );
}

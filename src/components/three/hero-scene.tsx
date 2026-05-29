"use client";

import { useTheme } from "@/hooks/use-theme";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function shouldReduceMotion(): boolean {
  if (typeof window === "undefined") return true;
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency < 4)
  );
}

function cssHslToColor(variable: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  return value ? `hsl(${value})` : fallback;
}

export function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || shouldReduceMotion()) return;

    const primary = new THREE.Color(cssHslToColor("--primary", theme === "dark" ? "#38bdf8" : "#0284c7"));
    const accent = new THREE.Color(cssHslToColor("--accent", theme === "dark" ? "#f472b6" : "#2563eb"));
    const foreground = new THREE.Color(cssHslToColor("--foreground", theme === "dark" ? "#e5f4ff" : "#07111f"));

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 14);

    const setSize = () => {
      const parent = canvas.parentElement;
      const width = parent?.clientWidth || window.innerWidth;
      const height = parent?.clientHeight || 620;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    renderer.setClearColor(0x000000, 0);
    setSize();

    const group = new THREE.Group();
    scene.add(group);

    const ringMaterial = new THREE.MeshBasicMaterial({ color: primary, transparent: true, opacity: 0.2, wireframe: true });
    const coreMaterial = new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.32, wireframe: true });
    const dimMaterial = new THREE.MeshBasicMaterial({ color: foreground, transparent: true, opacity: 0.08, wireframe: true });

    const orbitA = new THREE.Mesh(new THREE.TorusGeometry(3.7, 0.012, 10, 160), ringMaterial);
    orbitA.rotation.x = Math.PI / 2.8;
    const orbitB = new THREE.Mesh(new THREE.TorusGeometry(5.1, 0.01, 10, 180), ringMaterial.clone());
    orbitB.rotation.x = Math.PI / 1.75;
    orbitB.rotation.y = Math.PI / 5;
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.3, 2), coreMaterial);
    const satellite = new THREE.Mesh(new THREE.TorusKnotGeometry(0.42, 0.055, 80, 8), dimMaterial);
    group.add(orbitA, orbitB, core, satellite);

    const particleCount = window.innerWidth < 768 ? 130 : 260;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 3 + Math.random() * 5.4;
      const angle = Math.random() * Math.PI * 2;
      const band = (Math.random() - 0.5) * 1.6;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = band + Math.sin(angle * 1.7) * 0.5;
      positions[i * 3 + 2] = Math.sin(angle) * radius * 0.35 + (Math.random() - 0.5) * 1.2;
      const mixed = primary.clone().lerp(accent, Math.random());
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({ size: 0.035, vertexColors: true, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending })
    );
    group.add(particles);

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const resizeObserver = new ResizeObserver(setSize);
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const start = performance.now();
    const animate = (time: number) => {
      frameRef.current = requestAnimationFrame(animate);
      const elapsed = (time - start) * 0.001;

      group.rotation.y = elapsed * 0.12 + mouseRef.current.x * 0.18;
      group.rotation.x = mouseRef.current.y * 0.08;
      orbitA.rotation.z = elapsed * 0.2;
      orbitB.rotation.z = -elapsed * 0.16;
      core.rotation.x = elapsed * 0.23;
      core.rotation.y = elapsed * 0.31;
      satellite.position.set(Math.cos(elapsed * 0.7) * 4.2, Math.sin(elapsed * 1.1) * 1.2, Math.sin(elapsed * 0.7) * 1.4);
      satellite.rotation.y = elapsed;
      particles.rotation.y = elapsed * 0.06;

      camera.position.x += (mouseRef.current.x * 0.8 - camera.position.x) * 0.035;
      camera.position.y += (mouseRef.current.y * 0.45 - camera.position.y) * 0.035;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };

    animate(performance.now());

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("pointermove", onPointerMove);
      resizeObserver.disconnect();
      particleGeometry.dispose();
      ringMaterial.dispose();
      coreMaterial.dispose();
      dimMaterial.dispose();
      orbitB.material.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}

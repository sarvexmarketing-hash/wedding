'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { Compass, RotateCw, Sparkles, Sliders, Play, Pause } from 'lucide-react';

export interface TextCircle3DProps {
  words?: string[];
  className?: string;
  theme?: 'ivory' | 'dark';
}

const WEDDING_LETTERING_WORDS = [
  "INVITE",
  "CELEBRATE",
  "RSVP",
  "GATHER",
  "MEMORIES",
  "MOMENTS",
  "FAMILY",
  "LOVE",
  "TOGETHER",
  "FOREVER",
  "CEREMONY",
  "RECEPTION",
  "GUESTS",
  "JOURNEY",
  "JOY"
];

const PALACE_WORDS = [
  "Muhurat",
  "Sangeet",
  "Falaknuma",
  "Udaivilas",
  "Shehnai",
  "Pheras",
  "Mehendi",
  "Durbar",
  "Mandap",
  "Haldi",
  "Rambagh",
  "Baraat",
  "Shaadi",
  "Cocktail",
  "Varmala",
  "Royal Feast",
  "Palace Check-In",
  "Reception",
  "Amrit",
  "Celebration"
];

const CODROPS_WORDS = [
  "Aurora",
  "Bungalow",
  "Chatoyant",
  "Demure",
  "Denouement",
  "Felicity",
  "Idyllic",
  "Labyrinth",
  "Lagoon",
  "Lullaby",
  "Aurora",
  "Bungalow",
  "Chatoyant",
  "Demure",
  "Denouement",
  "Felicity",
  "Idyllic",
  "Labyrinth",
  "Lagoon",
  "Lullaby"
];

const MODULE_WORDS = [
  "Guest CRM",
  "WhatsApp Engine",
  "Live Seating",
  "Dietary AI",
  "Digital Stationery",
  "Palace Check-In",
  "Ceremony Timeline",
  "RSVP Analytics",
  "VIP Protocols",
  "Multi-Day Passes",
  "Luggage Routing",
  "Concierge Desk",
  "Vendor Sync",
  "Catering Intel",
  "Table Matrices",
  "Gift Register",
  "Airport Escorts",
  "Photo Stream",
  "Broadcast SMS",
  "Command Center"
];

export default function TextCircle3D({
  words: initialWords = WEDDING_LETTERING_WORDS,
  className = '',
  theme = 'ivory'
}: TextCircle3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Interactive controls state (Codrops style GUI)
  const [activeWordSet, setActiveWordSet] = useState<'wedding' | 'palace' | 'codrops' | 'modules'>('wedding');
  const [circleSpeed, setCircleSpeed] = useState<number>(0.0008);
  const [amplitude, setAmplitude] = useState<number>(0.006);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  const words = useMemo(() => {
    if (activeWordSet === 'wedding') return WEDDING_LETTERING_WORDS;
    if (activeWordSet === 'palace') return PALACE_WORDS;
    if (activeWordSet === 'codrops') return CODROPS_WORDS;
    return MODULE_WORDS;
  }, [activeWordSet]);

  // Keep refs for live animation loops without recreating scenes
  const stateRef = useRef({
    circleSpeed: 0.0008,
    amplitude: 0.006,
    isPlaying: true,
    scrollY: 0,
    targetScrollY: 0,
    speedCurrent: 0,
    speedTarget: 0,
    isDown: false,
    startY: 0,
    startX: 0,
    currentScrollY: 0,
    mouseNormX: 0,
    mouseNormY: 0,
    tiltX: 0,
    tiltY: 0,
  });

  useEffect(() => {
    stateRef.current.circleSpeed = circleSpeed;
  }, [circleSpeed]);

  useEffect(() => {
    stateRef.current.amplitude = amplitude;
  }, [amplitude]);

  useEffect(() => {
    stateRef.current.isPlaying = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 650;

    // 1. Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);

    // 2. Custom Shader for Codrops Rubber Wave deformation
    const vertexShader = `
      uniform float uSpeed;
      uniform float uAmplitude;
      varying vec2 vUv;
      varying vec3 vWorldPosition;

      mat4 rotationMatrix(vec3 axis, float angle) {
          axis = normalize(axis);
          float s = sin(angle);
          float c = cos(angle);
          float oc = 1.0 - c;
          
          return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                      oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                      oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                      0.0,                                0.0,                                0.0,                                1.0);
      }

      vec3 rotate(vec3 v, vec3 axis, float angle) {
          mat4 m = rotationMatrix(axis, angle);
          return (m * vec4(v, 1.0)).xyz;
      }

      void main() {
          vUv = uv;
          vec3 newPosition = position;
          // The Codrops bend effect: outer letters deform based on radial distance from center
          float warpFactor = uSpeed * (newPosition.x + 0.6) * uAmplitude * 45.0;
          newPosition = rotate(newPosition, vec3(0.0, 0.0, 1.0), warpFactor);
          
          vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          vWorldPosition = (modelMatrix * vec4(newPosition, 1.0)).xyz;
      }
    `;

    const fragmentShader = `
      uniform sampler2D uMap;
      uniform float uOpacity;
      uniform vec3 uColor;
      varying vec2 vUv;
      varying vec3 vWorldPosition;

      void main() {
          vec4 texColor = texture2D(uMap, vUv);
          if (texColor.a < 0.04) discard;
          
          // Tint slightly with royal color
          vec3 finalColor = mix(texColor.rgb, uColor, 0.15);
          gl_FragColor = vec4(finalColor, texColor.a * uOpacity);
      }
    `;

    // 3. Generate Word Meshes with Canvas Textures
    const group = new THREE.Group();
    scene.add(group);

    const meshes: THREE.Mesh[] = [];
    const numWords = words.length;
    const innerRadius = 0.95; // Radius of central circle empty space

    words.forEach((word, index) => {
      // Create high-res 2D Canvas for crisp typography
      const textCanvas = document.createElement('canvas');
      const ctx = textCanvas.getContext('2d');
      if (!ctx) return;

      const fontSize = 56;
      textCanvas.width = 720;
      textCanvas.height = 140;

      ctx.clearRect(0, 0, textCanvas.width, textCanvas.height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Serif luxury font matching Codrops Neuton style with wide letter spacing
      ctx.font = `700 ${fontSize}px "Cinzel", "Playfair Display", "Cormorant Garamond", "Georgia", serif`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'left';

      if ('letterSpacing' in ctx) {
        ctx.letterSpacing = '5px';
      }

      // Color scheme: Highlight special emotional anchors
      const isHighlighted =
        word === 'LOVE' ||
        word === 'CELEBRATE' ||
        word === 'FOREVER' ||
        word === 'JOY' ||
        word === 'MEMORIES' ||
        index % 5 === 0;

      ctx.fillStyle = isHighlighted ? '#74182E' : '#231B20';
      ctx.fillText(word, 16, textCanvas.height / 2);

      // Create texture
      const texture = new THREE.CanvasTexture(textCanvas);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;

      // Plane geometry with horizontal subdivisions for smooth rubber warping!
      const planeWidth = 1.6;
      const planeHeight = planeWidth * (textCanvas.height / textCanvas.width);
      const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 36, 1);

      // Translate geometry so origin is at the inner edge (circle radius)
      geometry.translate(innerRadius + planeWidth / 2, 0, 0);

      const material = new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        uniforms: {
          uMap: { value: texture },
          uSpeed: { value: 0.0 },
          uAmplitude: { value: amplitude },
          uOpacity: { value: 0.95 },
          uColor: { value: isHighlighted ? new THREE.Vector3(0.45, 0.09, 0.18) : new THREE.Vector3(0.14, 0.11, 0.13) }
        },
        vertexShader,
        fragmentShader
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.userData = { word, index };
      group.add(mesh);
      meshes.push(mesh);
    });

    // 4. Update function for positions, rotation & deformation
    const updatePositions = () => {
      const scrollY = stateRef.current.scrollY;
      const curCircleSpeed = stateRef.current.circleSpeed;
      const curSpeed = stateRef.current.speedCurrent;
      const curAmplitude = stateRef.current.amplitude;

      meshes.forEach((mesh, index) => {
        const baseAngle = (index / numWords) * 2 * Math.PI;
        const totalAngle = baseAngle - scrollY * curCircleSpeed;

        mesh.rotation.z = totalAngle;

        // Pass velocity and amplitude to shader uniforms
        const mat = mesh.material as THREE.ShaderMaterial;
        if (mat.uniforms) {
          mat.uniforms.uSpeed.value = curSpeed;
          mat.uniforms.uAmplitude.value = curAmplitude;
        }
      });
    };

    // 5. Mouse / Touch / Wheel Event Handlers
    const onMouseDown = (e: MouseEvent) => {
      stateRef.current.isDown = true;
      stateRef.current.startY = e.clientY;
      stateRef.current.startX = e.clientX;
      stateRef.current.currentScrollY = stateRef.current.scrollY;
    };

    const onMouseMove = (e: MouseEvent) => {
      // Perspective tilt
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      stateRef.current.mouseNormX = nx;
      stateRef.current.mouseNormY = ny;

      if (!stateRef.current.isDown) return;
      const dy = stateRef.current.startY - e.clientY;
      const dx = stateRef.current.startX - e.clientX;
      stateRef.current.targetScrollY = stateRef.current.currentScrollY - (dy + dx * 0.8) * 2.2;
    };

    const onMouseUp = () => {
      stateRef.current.isDown = false;
    };

    const onWheel = (e: WheelEvent) => {
      // Allow scrolling inside container to spin wheel
      stateRef.current.targetScrollY += e.deltaY * 0.8;
    };

    // Touch support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      stateRef.current.isDown = true;
      stateRef.current.startY = e.touches[0].clientY;
      stateRef.current.startX = e.touches[0].clientX;
      stateRef.current.currentScrollY = stateRef.current.scrollY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!stateRef.current.isDown || e.touches.length === 0) return;
      const dy = stateRef.current.startY - e.touches[0].clientY;
      stateRef.current.targetScrollY = stateRef.current.currentScrollY - dy * 2.5;
    };

    const onTouchEnd = () => {
      stateRef.current.isDown = false;
    };

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      width = container.clientWidth || 800;
      height = container.clientHeight || 650;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('wheel', onWheel, { passive: true });
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('resize', handleResize);

    // 6. Animation Loop
    let animationFrameId: number;
    const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Auto rotation drift when playing
      if (stateRef.current.isPlaying && !stateRef.current.isDown) {
        stateRef.current.targetScrollY += 1.2;
      }

      // Smooth scroll interpolation
      const prevScroll = stateRef.current.scrollY;
      stateRef.current.scrollY = lerp(stateRef.current.scrollY, stateRef.current.targetScrollY, 0.08);

      // Speed calculation for dynamic rubber distortion
      stateRef.current.speedTarget = (stateRef.current.targetScrollY - stateRef.current.scrollY) * 0.001;
      stateRef.current.speedCurrent = lerp(stateRef.current.speedCurrent, stateRef.current.speedTarget, 0.1);

      // 3D Parallax Tilt based on mouse
      stateRef.current.tiltX = lerp(stateRef.current.tiltX, stateRef.current.mouseNormY * 0.22, 0.05);
      stateRef.current.tiltY = lerp(stateRef.current.tiltY, stateRef.current.mouseNormX * 0.22, 0.05);

      group.rotation.x = stateRef.current.tiltX;
      group.rotation.y = stateRef.current.tiltY;

      updatePositions();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);

      // Dispose Three.js objects
      meshes.forEach(mesh => {
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(m => m.dispose());
        } else {
          mesh.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, [words]);

  return (
    <section className="relative w-full py-24 bg-[#FAF7F2] overflow-hidden border-y border-[#C5A059]/20 selection:bg-[#74182E] selection:text-white">
      {/* Editorial Luxury Header */}
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#74182E]/5 border border-[#74182E]/15 text-[#74182E] text-xs font-semibold tracking-widest uppercase mb-4">
          <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
          3D Text Circle Kinetic Typography
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#2D1B28] tracking-tight leading-tight">
          Weddings, <span className="italic font-serif text-[#74182E]">Orchestrated in Orbit.</span>
        </h2>
      </div>

      {/* Main 3D Canvas Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[620px] md:h-[720px] cursor-grab active:cursor-grabbing select-none flex items-center justify-center"
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

        {/* Center Golden Medallion */}
        <div className="pointer-events-none z-10 w-28 h-28 md:w-36 md:h-36 rounded-full border border-[#C5A059]/40 bg-[#FAF7F2]/90 backdrop-blur-md shadow-xl flex flex-col items-center justify-center text-center p-3">
          <div className="w-8 h-8 rounded-full bg-[#74182E]/10 flex items-center justify-center mb-1 text-[#74182E]">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
          </div>
          <span className="font-serif text-xs md:text-sm font-semibold tracking-wider text-[#74182E] uppercase">
            WeddingOS
          </span>
          <span className="text-[9px] text-[#2D1B28]/60 tracking-widest uppercase">
            3D Kinetics
          </span>
        </div>

        {/* Floating Codrops Controls (Matching top-right of tympanus demo) */}
        <div className="absolute top-6 right-6 z-20">
          <div className="bg-[#2D1B28]/90 text-white backdrop-blur-md rounded-xl p-4 shadow-2xl border border-white/10 w-64 transition-all">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="text-xs font-medium tracking-wide uppercase text-white/90">Kinetic Controls</span>
              </div>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white/60 hover:text-white transition-colors"
                title={isPlaying ? "Pause rotation" : "Resume rotation"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#C5A059]" /> : <Play className="w-3.5 h-3.5 text-[#C5A059]" />}
              </button>
            </div>

            {/* circleSpeed control */}
            <div className="space-y-1.5 mb-3">
              <div className="flex justify-between text-[11px] text-white/70 font-mono">
                <span>circleSpeed</span>
                <span className="text-[#C5A059]">{circleSpeed.toFixed(4)}</span>
              </div>
              <input
                type="range"
                min="0.0001"
                max="0.002"
                step="0.0001"
                value={circleSpeed}
                onChange={(e) => setCircleSpeed(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#C5A059]"
              />
            </div>

            {/* amplitude control */}
            <div className="space-y-1.5 mb-3">
              <div className="flex justify-between text-[11px] text-white/70 font-mono">
                <span>amplitude</span>
                <span className="text-[#C5A059]">{amplitude.toFixed(3)}</span>
              </div>
              <input
                type="range"
                min="0.001"
                max="0.015"
                step="0.001"
                value={amplitude}
                onChange={(e) => setAmplitude(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#C5A059]"
              />
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/40">
              <span>Interactive Drag & Scroll</span>
              <span className="text-[#C5A059]/80 font-mono">3D WebGL</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

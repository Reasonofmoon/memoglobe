"use client";

import { useRef, useEffect, useState, useCallback } from "react";

export interface GlobePin {
  id: string;
  name: string;
  concept: string;
  latitude: number;
  longitude: number;
  status: "mastered" | "gap" | "review" | "path" | "personal";
  strength: number;
  domain: string;
}

interface GlobeViewerProps {
  pins: GlobePin[];
  onPinClick?: (pin: GlobePin) => void;
  className?: string;
}

const STATUS_COLORS: Record<string, { bg: string; glow: string; ring: string }> = {
  mastered: { bg: "#22c55e", glow: "rgba(34,197,94,0.4)", ring: "rgba(34,197,94,0.2)" },
  gap:      { bg: "#ef4444", glow: "rgba(239,68,68,0.4)", ring: "rgba(239,68,68,0.2)" },
  review:   { bg: "#eab308", glow: "rgba(234,179,8,0.4)", ring: "rgba(234,179,8,0.2)" },
  path:     { bg: "#3b82f6", glow: "rgba(59,130,246,0.4)", ring: "rgba(59,130,246,0.2)" },
  personal: { bg: "#a855f7", glow: "rgba(168,85,247,0.4)", ring: "rgba(168,85,247,0.2)" },
};

// Convert lat/lng to position on the circular globe projection
function toXY(lat: number, lng: number, rotation: number) {
  const radLng = ((lng + rotation) * Math.PI) / 180;
  const radLat = (lat * Math.PI) / 180;

  // Simple orthographic projection
  const x = Math.cos(radLat) * Math.sin(radLng);
  const y = Math.sin(radLat);
  const z = Math.cos(radLat) * Math.cos(radLng);

  // Only show front-facing points
  const visible = z > -0.1;

  return {
    x: 50 + x * 40,
    y: 50 - y * 40,
    scale: Math.max(0, (z + 0.1) / 1.1),
    visible,
  };
}

export default function GlobeViewer({ pins, onPinClick, className = "" }: GlobeViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, rotation: 0 });

  // Auto-rotate
  useEffect(() => {
    if (isDragging) return;
    const interval = setInterval(() => {
      setRotation((r) => (r + 0.15) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [isDragging]);

  // Draw canvas globe
  const drawGlobe = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const r = Math.min(w, h) * 0.42;

    ctx.clearRect(0, 0, w, h);

    // Globe body — gradient sphere
    const grad = ctx.createRadialGradient(cx - r * 0.25, cy - r * 0.25, r * 0.05, cx, cy, r);
    grad.addColorStop(0, "#1e3a5f");
    grad.addColorStop(0.5, "#0f2240");
    grad.addColorStop(0.85, "#091428");
    grad.addColorStop(1, "#050a14");
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // Atmosphere glow
    const atmo = ctx.createRadialGradient(cx, cy, r * 0.95, cx, cy, r * 1.15);
    atmo.addColorStop(0, "rgba(59,130,246,0.08)");
    atmo.addColorStop(0.5, "rgba(59,130,246,0.03)");
    atmo.addColorStop(1, "rgba(59,130,246,0)");
    ctx.beginPath();
    ctx.arc(cx, cy, r * 1.15, 0, Math.PI * 2);
    ctx.fillStyle = atmo;
    ctx.fill();

    // Grid lines (latitude)
    ctx.strokeStyle = "rgba(255,255,255,0.04)";
    ctx.lineWidth = 1;
    for (let lat = -60; lat <= 60; lat += 30) {
      const radLat = (lat * Math.PI) / 180;
      const lineR = r * Math.cos(radLat);
      const lineY = cy - r * Math.sin(radLat);
      ctx.beginPath();
      ctx.ellipse(cx, lineY, lineR, lineR * 0.15, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Grid lines (longitude)
    for (let lng = 0; lng < 180; lng += 30) {
      const radLng = ((lng + rotation) * Math.PI) / 180;
      ctx.beginPath();
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(Math.sin(radLng), 1);
      if (Math.cos(radLng) > 0) {
        ctx.arc(0, 0, r, -Math.PI / 2, Math.PI / 2);
      } else {
        ctx.arc(0, 0, r, Math.PI / 2, -Math.PI / 2);
      }
      ctx.restore();
      ctx.stroke();
    }

    // Continent silhouettes (simplified)
    const continents = [
      // Asia
      { lat: 35, lng: 105, size: 28 },
      { lat: 55, lng: 90, size: 22 },
      { lat: 25, lng: 80, size: 18 },
      // Europe
      { lat: 50, lng: 15, size: 15 },
      { lat: 45, lng: 25, size: 12 },
      // Africa
      { lat: 5, lng: 25, size: 22 },
      { lat: -15, lng: 30, size: 16 },
      // North America
      { lat: 45, lng: -100, size: 24 },
      { lat: 35, lng: -95, size: 18 },
      // South America
      { lat: -15, lng: -55, size: 20 },
      { lat: -30, lng: -60, size: 14 },
      // Australia
      { lat: -25, lng: 135, size: 16 },
    ];

    continents.forEach((c) => {
      const pos = toXY(c.lat, c.lng, rotation);
      if (!pos.visible || pos.scale < 0.1) return;
      const px = (pos.x / 100) * w;
      const py = (pos.y / 100) * h;
      const size = c.size * pos.scale * (r / 200);

      const cGrad = ctx.createRadialGradient(px, py, 0, px, py, size);
      cGrad.addColorStop(0, `rgba(30,70,100,${0.35 * pos.scale})`);
      cGrad.addColorStop(0.7, `rgba(20,50,80,${0.2 * pos.scale})`);
      cGrad.addColorStop(1, "rgba(20,50,80,0)");
      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fillStyle = cGrad;
      ctx.fill();
    });

  }, [rotation]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    drawGlobe();
  }, [drawGlobe]);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, rotation };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    setRotation(dragStartRef.current.rotation + dx * 0.3);
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div
      className={`relative w-full h-full select-none ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      {/* Canvas Globe */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Pins overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {pins.map((pin) => {
          const pos = toXY(pin.latitude, pin.longitude, rotation);
          if (!pos.visible || pos.scale < 0.15) return null;

          const colors = STATUS_COLORS[pin.status] || STATUS_COLORS.path;
          const isHovered = hoveredPin === pin.id;
          const size = (8 + pos.scale * 6) * (isHovered ? 1.6 : 1);

          return (
            <button
              key={pin.id}
              className="absolute pointer-events-auto transition-all duration-200"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: `translate(-50%, -50%) scale(${pos.scale})`,
                opacity: pos.scale,
                zIndex: Math.round(pos.scale * 100),
              }}
              onClick={() => onPinClick?.(pin)}
              onMouseEnter={() => setHoveredPin(pin.id)}
              onMouseLeave={() => setHoveredPin(null)}
            >
              {/* Pulse ring */}
              {pin.status === "review" && (
                <span
                  className="absolute rounded-full animate-ping"
                  style={{
                    width: size * 2.5,
                    height: size * 2.5,
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: colors.ring,
                  }}
                />
              )}

              {/* Pin dot */}
              <span
                className="block rounded-full transition-all duration-200"
                style={{
                  width: size,
                  height: size,
                  backgroundColor: colors.bg,
                  boxShadow: `0 0 ${isHovered ? 20 : 10}px ${colors.glow}`,
                  border: `2px solid rgba(255,255,255,${isHovered ? 0.6 : 0.3})`,
                }}
              />

              {/* Label (only when hovered or large enough) */}
              {(isHovered || pos.scale > 0.8) && (
                <span
                  className="absolute whitespace-nowrap text-xs font-medium text-white/90 pointer-events-none"
                  style={{
                    left: "50%",
                    top: -8,
                    transform: "translate(-50%, -100%)",
                    textShadow: "0 1px 4px rgba(0,0,0,0.8)",
                    fontSize: isHovered ? 13 : 11,
                    opacity: isHovered ? 1 : 0.7,
                  }}
                >
                  {pin.concept}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Center watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p className="text-[10px] text-white/5 tracking-[0.4em] uppercase font-light">
          MemoGlobe
        </p>
      </div>
    </div>
  );
}

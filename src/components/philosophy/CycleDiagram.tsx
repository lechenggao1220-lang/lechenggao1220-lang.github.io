import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface NodeData {
  label: string;
  color: string;
  description: string;
  angle: number;
}

const nodes: NodeData[] = [
  { label: '真', color: '#C9A84C', description: '认知之基 — 对自我、对世界、对数据的诚实面对', angle: -90 },
  { label: '美', color: '#5B2C87', description: '感知之桥 — 对形式、对体验、对存在的审美升华', angle: 30 },
  { label: '乐', color: '#E8D5A3', description: '存在之境 — 对生命、对创造、对连接的深层喜悦', angle: 150 },
];

export default function CycleDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Headline animation
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Diagram scale-in animation
      if (diagramRef.current) {
        gsap.fromTo(
          diagramRef.current,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 60%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, { scope: containerRef });

  const RADIUS = 140;
  const centerX = 200;
  const centerY = 200;

  const nodePositions = nodes.map((node) => {
    const rad = (node.angle * Math.PI) / 180;
    return {
      x: centerX + RADIUS * Math.cos(rad),
      y: centerY + RADIUS * Math.sin(rad),
      ...node,
    };
  });

  // SVG paths for connecting lines with arrows
  const connections = [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 2, to: 0 },
  ];

  return (
    <div ref={containerRef} className="py-24 lg:py-32" style={{ background: '#1A0A2E' }}>
      <div ref={headlineRef} className="container-main text-center mb-16">
        <h2 className="font-noto-serif text-display-m text-white">
          求真以致美，因美而生乐，乐极而复求真
        </h2>
        <p className="font-noto-sans text-body-large text-brand-gold mt-4">
          一个螺旋上升的认知-感知-存在回路
        </p>
      </div>

      <div className="flex justify-center">
        <div
          ref={diagramRef}
          className="relative"
          style={{ width: 400, height: 400 }}
        >
          {/* Rotating container */}
          <div
            className="absolute inset-0"
            style={{
              animation: 'spin 60s linear infinite',
            }}
          >
            <svg
              width="400"
              height="400"
              viewBox="0 0 400 400"
              style={{ transform: 'rotate(-0deg)' }}
            >
              <defs>
                {connections.map((_, i) => {
                  const from = nodePositions[connections[i].from];
                  const to = nodePositions[connections[i].to];
                  const gradId = `grad-${i}`;
                  return (
                    <linearGradient key={gradId} id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={from.color} />
                      <stop offset="100%" stopColor={to.color} />
                    </linearGradient>
                  );
                })}
              </defs>

              {/* Connection lines */}
              {connections.map((conn, i) => {
                const from = nodePositions[conn.from];
                const to = nodePositions[conn.to];
                return (
                  <line
                    key={i}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke={`url(#grad-${i})`}
                    strokeWidth="2"
                    opacity="0.6"
                  />
                );
              })}

              {/* Nodes */}
              {nodePositions.map((node, i) => (
                <g key={i}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="40"
                    fill={node.color}
                    opacity={hoveredNode === i ? 1 : 0.85}
                    style={{
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      transform: hoveredNode === i ? 'scale(1.2)' : 'scale(1)',
                      transformOrigin: `${node.x}px ${node.y}px`,
                    }}
                    onMouseEnter={() => setHoveredNode(i)}
                    onMouseLeave={() => setHoveredNode(null)}
                  />
                  <text
                    x={node.x}
                    y={node.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#1A0A2E"
                    fontSize="24"
                    fontWeight="700"
                    fontFamily="Noto Serif SC, serif"
                    style={{ pointerEvents: 'none' }}
                  >
                    {node.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Node labels (not rotating) */}
          {nodePositions.map((node, i) => {
            const labelOffset = 60;
            const rad = (node.angle * Math.PI) / 180;
            const lx = 200 + (RADIUS + labelOffset) * Math.cos(rad);
            const ly = 200 + (RADIUS + labelOffset) * Math.sin(rad);
            return (
              <div
                key={`label-${i}`}
                className="absolute text-center"
                style={{
                  left: lx,
                  top: ly,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <span className="font-noto-serif text-heading-1 text-white">
                  {node.label}
                </span>
              </div>
            );
          })}

          {/* Tooltip */}
          {hoveredNode !== null && (
            <div
              className="absolute left-1/2 -translate-x-1/2 px-6 py-4 rounded-lg text-center z-10"
              style={{
                bottom: -20,
                background: 'rgba(36,21,56,0.95)',
                border: '1px solid rgba(201,168,76,0.3)',
                backdropFilter: 'blur(8px)',
                minWidth: 280,
              }}
            >
              <p className="font-noto-sans text-white text-sm">
                {nodes[hoveredNode].description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

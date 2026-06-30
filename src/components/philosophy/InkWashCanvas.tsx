import { useRef, useEffect } from 'react';

interface InkBlob {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  opacity: number;
}

export default function InkWashCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const blobs: InkBlob[] = [];
    const NUM_BLOBS = 6;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * window.devicePixelRatio;
      canvas!.height = height * window.devicePixelRatio;
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    function initBlobs() {
      blobs.length = 0;
      for (let i = 0; i < NUM_BLOBS; i++) {
        blobs.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 80 + Math.random() * 200,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          opacity: 0.03 + Math.random() * 0.05,
        });
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      for (const blob of blobs) {
        const gradient = ctx!.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.radius
        );
        gradient.addColorStop(0, `rgba(91, 44, 135, ${blob.opacity})`);
        gradient.addColorStop(0.5, `rgba(91, 44, 135, ${blob.opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(91, 44, 135, 0)');

        ctx!.fillStyle = gradient;
        ctx!.beginPath();
        ctx!.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx!.fill();

        blob.x += blob.vx;
        blob.y += blob.vy;

        if (blob.x < -blob.radius) blob.x = width + blob.radius;
        if (blob.x > width + blob.radius) blob.x = -blob.radius;
        if (blob.y < -blob.radius) blob.y = height + blob.radius;
        if (blob.y > height + blob.radius) blob.y = -blob.radius;
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    initBlobs();
    draw();

    window.addEventListener('resize', () => {
      resize();
    });

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}

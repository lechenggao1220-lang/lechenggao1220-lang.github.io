import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface InteractiveLogoProps {
  size?: number;
  className?: string;
}

export default function InteractiveLogo({ size = 120, className = '' }: InteractiveLogoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  const glowOpacity = useSpring(useTransform(mouseX, [-0.5, 0.5, -0.5, 0.5], [0.6, 0.6, 0.6, 0.6]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleClick = () => {
    navigate('/');
  };

  return (
    <motion.div
      ref={ref}
      className={`cursor-pointer ${className}`}
      style={{
        width: size,
        height: size * 0.67,
        perspective: 600,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileTap={{ scale: 0.95 }}
    >
      <motion.img
        src="/logo.png"
        alt="醉醒 DBA"
        className="w-full h-full object-contain"
        style={{
          rotateX,
          rotateY,
          filter: useTransform(
            glowOpacity,
            (v) => `drop-shadow(0 0 ${12 + v * 8}px rgba(91,44,135,0.6)) drop-shadow(0 0 ${4}px rgba(201,168,76,0.3))`
          ),
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      />
    </motion.div>
  );
}

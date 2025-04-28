"use client";

import { useEffect, useRef } from 'react';
import { Abacus } from '@/lib/abacus';

export default function AbacusDisplay() {
  const abacusRef = useRef<Abacus | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const abacus = new Abacus(10, 'normal', 'black', false, false);
    abacus.setCanvas(canvas);
    abacusRef.current = abacus;

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (canvas.width / rect.width);
      const y = (e.clientY - rect.top) * (canvas.height / rect.height);
      abacus.handleClick(x, y);
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const x = (touch.clientX - rect.left) * (canvas.width / rect.width);
        const y = (touch.clientY - rect.top) * (canvas.height / rect.height);
        abacus.handleClick(x, y);
      }
    };

    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('touchstart', handleTouch, { passive: false });

    return () => {
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('touchstart', handleTouch);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={400}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  );
} 
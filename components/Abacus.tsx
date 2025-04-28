"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Abacus } from "@/lib/abacusReact";

interface AbacusProps {
  onNumberChange?: (number: number) => void;
}

export function AbacusComponent({ onNumberChange }: AbacusProps) {
  const abacusContainerRef = useRef<HTMLDivElement>(null);
  const abacusInstanceRef = useRef<Abacus | null>(null);
  const [currentNumber, setCurrentNumber] = useState<number>(0);

  useEffect(() => {
    if (!abacusContainerRef.current) return;

    abacusContainerRef.current.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.id = 'abacus-canvas';
    abacusContainerRef.current.appendChild(canvas);

    function calculateDimensions() {
      const containerWidth = abacusContainerRef.current?.clientWidth || 0;
      const isMobile = window.innerWidth < 768;
      
      const width = isMobile 
        ? Math.min(containerWidth, 500)
        : Math.min(Math.max(containerWidth, 300), 800);
      
      const height = Math.round(width * 0.5);
      
      return { width, height, isMobile };
    }

    const { width, height, isMobile } = calculateDimensions();
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = '100%';
    canvas.style.maxWidth = isMobile ? '500px' : '800px';
    canvas.style.minWidth = '300px';
    canvas.style.height = 'auto';
    canvas.style.display = 'block';
    canvas.style.margin = '0 auto';

    const abacus = new Abacus(10, 'normal', 'black', false, false);
    abacusInstanceRef.current = abacus;
    abacus.setCanvas(canvas);

    function resizeCanvas() {
      const { width, height, isMobile } = calculateDimensions();
      
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        canvas.style.maxWidth = isMobile ? '500px' : '800px';
        
        if (abacusInstanceRef.current) {
          abacusInstanceRef.current.setCanvas(canvas);
          abacusInstanceRef.current.draw();
        }
      }
    }

    function handleClick(e: MouseEvent) {
      if (!abacusInstanceRef.current) return;
      
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;
      
      abacusInstanceRef.current.handleClick(x, y);
      const newNumber = abacusInstanceRef.current.getCurrentNumber();
      setCurrentNumber(newNumber);
      if (onNumberChange) {
        onNumberChange(newNumber);
      }
    }

    function handleTouch(e: TouchEvent) {
      if (!abacusInstanceRef.current) return;
      
      e.preventDefault();
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        const x = (touch.clientX - rect.left) * scaleX;
        const y = (touch.clientY - rect.top) * scaleY;
        
        abacusInstanceRef.current.handleClick(x, y);
        const newNumber = abacusInstanceRef.current.getCurrentNumber();
        setCurrentNumber(newNumber);
        if (onNumberChange) {
          onNumberChange(newNumber);
        }
      }
    }

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('touchstart', handleTouch, { passive: false });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('touchstart', handleTouch);
      if (abacusContainerRef.current) {
        abacusContainerRef.current.innerHTML = '';
      }
    };
  }, [onNumberChange]);

  const handleReset = () => {
    if (abacusInstanceRef.current) {
      abacusInstanceRef.current.reset();
      const newNumber = 0;
      setCurrentNumber(newNumber);
      if (onNumberChange) {
        onNumberChange(newNumber);
      }
    }
  };

  return (
    <Card className="p-4 mb-6">
      <h3 className="text-lg font-semibold mb-2 text-center">چرتکه</h3>
      <div
        ref={abacusContainerRef}
        className="flex flex-col justify-center items-center w-full"
        style={{ 
          minHeight: 180, 
          width: '100%', 
          overflowX: 'auto',
          padding: '0 1rem'
        }}
      ></div>
      <div className="flex justify-center mt-4">
        <Button onClick={handleReset} variant="outline">پاک کردن</Button>
      </div>
      <div className="text-center mt-2">
        <p>عدد فعلی: {currentNumber}</p>
      </div>
    </Card>
  );
} 
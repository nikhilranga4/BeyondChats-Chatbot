import { useEffect, useRef } from "react";
import GlowingBubbles from "./GlowingBubbles";

export const Background = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      container.style.setProperty('--mouse-x', `${x}px`);
      container.style.setProperty('--mouse-y', `${y}px`);
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <GlowingBubbles />
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div 
          ref={containerRef}
          className="absolute inset-0 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:to-secondary/10 animate-gradient" />
        </div>
      </div>
    </>
  );
};
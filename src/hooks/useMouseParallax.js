import { useRef, useEffect } from 'react';

export function useMouseParallax(strength = 20) {
  const ref = useRef(null);

  useEffect(() => {
    let rafId;
    const handleMove = (e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!ref.current) return;
        const x = (e.clientX / window.innerWidth - 0.5) * strength;
        const y = (e.clientY / window.innerHeight - 0.5) * strength;
        ref.current.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(rafId);
    };
  }, [strength]);

  return ref;
}

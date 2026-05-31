import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    const handleHoverStart = () => setIsHovered(true);
    const handleHoverEnd = () => setIsHovered(false);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    // Handle dynamically added elements using MutationObserver
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // ELEMENT_NODE
              const newInteractives = node.querySelectorAll?.('a, button, input, textarea, select, [role="button"]') || [];
              const interactivesArray = node.matches?.('a, button, input, textarea, select, [role="button"]') ? [node, ...newInteractives] : newInteractives;
              interactivesArray.forEach((el) => {
                el.addEventListener('mouseenter', handleHoverStart);
                el.addEventListener('mouseleave', handleHoverEnd);
              });
            }
          });
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Small dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-gold rounded-full pointer-events-none z-[10000]"
        style={{
          x: useMotionValue(cursorX.get() + 12),
          y: useMotionValue(cursorY.get() + 12),
        }}
        animate={{
          x: cursorX.get() + 12,
          y: cursorY.get() + 12,
          opacity: isHidden ? 0 : 1,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-gold/50 pointer-events-none z-[10000]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          opacity: isHidden ? 0 : 1,
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? 'rgba(201, 168, 76, 0.1)' : 'transparent',
          borderColor: isHovered ? 'rgba(201, 168, 76, 0.8)' : 'rgba(201, 168, 76, 0.5)',
        }}
        transition={{ scale: { type: 'spring', stiffness: 300, damping: 20 } }}
      />
    </>
  );
}

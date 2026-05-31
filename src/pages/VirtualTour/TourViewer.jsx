import { useState } from 'react';
import { motion } from 'framer-motion';

export default function TourViewer({ tourUrl, fallbackImage }) {
  const [rotation, setRotation] = useState(0);

  const handleDrag = (e, info) => {
    setRotation(r => r + info.delta.x * 0.3);
  };

  if (tourUrl) {
    return (
      <iframe
        src={tourUrl}
        className="w-full h-full border-0"
        allowFullScreen
        allow="xr-spatial-tracking; gyroscope; accelerometer"
        title="3D Virtual Tour"
      />
    );
  }

  // Fallback Pseudo-360 viewer using CSS perspective + background position
  return (
    <div className="w-full h-full relative overflow-hidden bg-black">
      <motion.div
        key={fallbackImage} // Remounts/reanimates on image change
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
      >
        <motion.div
          drag="x"
          onDrag={handleDrag}
          style={{
            backgroundImage: `url(${fallbackImage})`,
            backgroundSize: '300% 100%',
            backgroundPositionX: `${rotation % 100}%`,
          }}
          className="w-full h-full cursor-grab active:cursor-grabbing will-change-transform"
        />
        {/* Subtle vignette */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
      </motion.div>
      
      {/* Drag instruction overlay */}
      <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center bg-black/50 backdrop-blur-md px-6 py-4 rounded-full"
      >
        <span className="text-white text-sm font-sans uppercase tracking-[0.2em] mb-1">Drag to rotate</span>
        <div className="flex items-center gap-2 text-gold">
          <span>←</span>
          <span>→</span>
        </div>
      </motion.div>
    </div>
  );
}

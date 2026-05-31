import { motion } from 'framer-motion';
import { Maximize2, Share2, HelpCircle, X } from 'lucide-react';

export default function TourControls({ onExit }) {
  const toggleFullscreen = () => {
    const el = document.getElementById('tour-container');
    if (!document.fullscreenElement) {
      el.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    // Could add a toast notification here
  };

  const controls = [
    { icon: Maximize2, label: 'Fullscreen', action: toggleFullscreen },
    { icon: Share2, label: 'Share Tour', action: copyLink },
    { icon: HelpCircle, label: 'Help', action: () => alert('Drag the image to look around.') },
    { icon: X, label: 'Exit Tour', action: onExit, highlight: true },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ staggerChildren: 0.1, delayChildren: 0.5 }}
      className="absolute top-6 right-6 z-30 flex items-center gap-3"
    >
      {controls.map((ctrl, i) => {
        const Icon = ctrl.icon;
        return (
          <motion.button
            key={ctrl.label}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={ctrl.action}
            title={ctrl.label}
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer ${
              ctrl.highlight 
                ? 'bg-red-500/80 text-white hover:bg-red-500' 
                : 'bg-black/40 text-white border border-white/10 hover:bg-gold hover:text-estate-dark hover:border-gold'
            }`}
          >
            <Icon size={18} />
          </motion.button>
        );
      })}
    </motion.div>
  );
}

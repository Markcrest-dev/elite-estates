import { motion } from 'framer-motion';

export default function RoomSelector({ room, isActive, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-2 border-l-2 transition-all cursor-pointer bg-white/[0.02] hover:bg-white/5 ${
        isActive 
          ? 'border-gold' 
          : 'border-transparent'
      }`}
    >
      <div className="w-16 h-12 flex-shrink-0 overflow-hidden">
        <img 
          src={room.image} 
          alt={room.name} 
          className="w-full h-full object-cover" 
        />
      </div>
      <span className={`font-sans text-sm text-left ${isActive ? 'text-gold' : 'text-estate-cream'}`}>
        {room.name}
      </span>
    </motion.button>
  );
}

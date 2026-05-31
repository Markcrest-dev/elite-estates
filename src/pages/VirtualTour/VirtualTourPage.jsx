import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { listings } from '../../data/listings';
import PageTransition from '../../components/PageTransition';
import TourViewer from './TourViewer';
import RoomSelector from './RoomSelector';
import TourControls from './TourControls';
import TourOverlay from './TourOverlay';

const defaultRooms = [
  { id: 'living', name: 'Living Room', image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80' },
  { id: 'kitchen', name: 'Chef\'s Kitchen', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80' },
  { id: 'master', name: 'Master Suite', image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80' },
  { id: 'bath', name: 'Master Bath', image: 'https://images.unsplash.com/photo-1600566753086-00f18c2d5896?w=800&q=80' },
  { id: 'terrace', name: 'Terrace', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },
];

export default function VirtualTourPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = listings.find(l => l.id === Number(id));
  const [activeRoom, setActiveRoom] = useState(defaultRooms[0]);

  if (!listing) return null;

  // Use listing images for rooms if available, otherwise fallback
  const rooms = listing.images ? listing.images.map((img, i) => ({
    id: `room-${i}`,
    name: defaultRooms[i]?.name || `Room ${i + 1}`,
    image: img
  })) : defaultRooms;

  return (
    <PageTransition>
      <div id="tour-container" className="fixed inset-0 z-50 bg-estate-dark overflow-hidden flex">
        
        {/* Background morph transition from Property Detail */}
        <motion.div 
          layoutId="property-hero-image" 
          className="absolute inset-0 bg-black pointer-events-none z-0" 
        />

        <div className="relative flex-1 h-full z-10 flex">
          {/* Main Viewer */}
          <div className="flex-1 relative">
            <TourViewer tourUrl={listing.tourUrl} fallbackImage={activeRoom.image} />
            <TourOverlay listing={listing} />
            <TourControls onExit={() => navigate(-1)} />
          </div>

          {/* Sidebar */}
          <div className="w-64 bg-estate-dark/90 backdrop-blur-xl border-l border-white/10 hidden md:flex flex-col">
            <div className="p-6 border-b border-white/10">
              <h2 className="font-serif text-xl text-estate-cream">Virtual Tour</h2>
              <p className="text-estate-muted text-xs font-sans mt-1">Select a room</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {rooms.map(room => (
                <RoomSelector 
                  key={room.id}
                  room={room} 
                  isActive={activeRoom.id === room.id} 
                  onClick={() => setActiveRoom(room)} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

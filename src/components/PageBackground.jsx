import { useLocation } from 'react-router-dom';

export default function PageBackground() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  if (isHome) return null;
  
  return (
    <div 
      className="fixed inset-0 z-[-1] pointer-events-none"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: 'url(/luxury_dark_bg.png)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-estate-dark/80 via-estate-dark/60 to-estate-dark" />
    </div>
  );
}

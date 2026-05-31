import { createContext, useContext, useState } from 'react';

const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState(
    () => JSON.parse(localStorage.getItem('domaine-favourites') || '[]')
  );

  const toggle = (id) => setFavourites(prev => {
    const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
    localStorage.setItem('domaine-favourites', JSON.stringify(next));
    return next;
  });

  const isFavourited = (id) => favourites.includes(id);

  return (
    <FavouritesContext.Provider value={{ favourites, toggle, isFavourited }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export const useFavourites = () => useContext(FavouritesContext);

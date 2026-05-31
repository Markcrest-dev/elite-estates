# Élite Estates — React Real Estate Website Prompt

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 (Vite) |
| Animations | Framer Motion |
| 3D / WebGL | `@react-three/fiber` + `@react-three/drei` |
| Scroll tracking | `react-intersection-observer` |
| Parallax | `react-scroll-parallax` |
| Styling | Tailwind CSS + CSS Modules for complex effects |
| Icons | `lucide-react` |
| Fonts | Google Fonts via `@fontsource` |

### Install command
```bash
npm create vite@latest elite-estates -- --template react
cd elite-estates
npm install framer-motion @react-three/fiber @react-three/drei react-intersection-observer react-scroll-parallax lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## Real Photography Assets (Unsplash — Free to Use)

| Usage | URL |
|-------|-----|
| Hero background (luxury exterior) | `https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80` |
| Living room interior | `https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80` |
| Modern kitchen | `https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80` |
| Pool / exterior lifestyle | `https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80` |
| Aerial city / skyline | `https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80` |
| Master bedroom | `https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80` |
| Agent / office | `https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80` |

---

## Project Structure

```
src/
├── components/
│   ├── HeroSection.jsx
│   ├── StatsBar.jsx
│   ├── ListingsGrid.jsx
│   ├── PropertyCard.jsx
│   ├── ParallaxShowcase.jsx
│   ├── WhyChooseUs.jsx
│   ├── ContactSection.jsx
│   └── Footer.jsx
├── hooks/
│   ├── useMouseParallax.js
│   └── useCountUp.js
├── data/
│   └── listings.js
├── styles/
│   └── globals.css
└── App.jsx
```

---

## Full Build Prompt

Build a luxury real estate single-page React app for **Élite Estates** using the stack above. Use real Unsplash photos (URLs provided). The site must feel cinematic, editorial, and high-end.

---

## Component Breakdown

### `<HeroSection />`
- Full-viewport section with the luxury house exterior photo as background
- Use `react-scroll-parallax` `<Parallax speed={-20}>` on the image so it drifts upward on scroll
- Mouse parallax: use a custom `useMouseParallax` hook with `useRef` + `requestAnimationFrame` to shift the image ±20px on X/Y
- Animate headline and CTA in with Framer Motion:
```jsx
<motion.h1
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
>
  Find Your Dream Home
</motion.h1>
```
- Dark gradient overlay: `bg-gradient-to-t from-black/70 via-black/30 to-transparent`
- CTA: outlined white button → gold fill on hover (Framer Motion `whileHover`)

---

### `<StatsBar />`
- Dark strip below hero (`bg-[#0d0d0d]`)
- 4 stats in a grid: Properties Sold, Client Satisfaction, Years of Excellence, Total Value Closed
- Custom `useCountUp(target, duration)` hook — counts from 0 to target when visible
- Trigger with `useInView` from `react-intersection-observer`
- Numbers in gold (`#c9a84c`), labels in `text-neutral-400`

---

### `<ListingsGrid />` + `<PropertyCard />`

**ListingsGrid**: 3-column responsive grid, cards stagger in via Framer Motion:
```jsx
<motion.div
  variants={{
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } }
  }}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
>
  {listings.map(l => <PropertyCard key={l.id} {...l} />)}
</motion.div>
```

**PropertyCard**: 3D tilt effect using Framer Motion `useMotionValue` + `useTransform`:
```jsx
const x = useMotionValue(0);
const y = useMotionValue(0);
const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  x.set((e.clientX - rect.left) / rect.width - 0.5);
  y.set((e.clientY - rect.top) / rect.height - 0.5);
};
```
- Glossy highlight overlay: `radial-gradient` that follows cursor via `motionValue`
- Card content: photo bg, price badge (gold), address, bed/bath/sqft row with `lucide-react` icons
- `whileHover={{ scale: 1.02, z: 20 }}` for lift effect

---

### `<ParallaxShowcase />`
- Full-width section with aerial/skyline photo
- Use CSS `background-attachment: fixed` for native parallax on desktop
- On mobile: swap to `react-scroll-parallax` (fixed attachment doesn't work on iOS)
- Dark overlay, large italic serif quote centered:
  > *"We Don't Just Sell Properties — We Match Lifestyles"*
- Animate with Framer Motion `whileInView` fade + scale

---

### `<WhyChooseUs />`
- CSS Grid: left photo column + right content column
- Left: agent photo inside `<Parallax speed={-8}>` (scrolls slower)
- Right: 4 feature items, each animates in from right via:
```jsx
<motion.div
  initial={{ opacity: 0, x: 40 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ delay: index * 0.15 }}
  viewport={{ once: true }}
/>
```
- Features: Exclusive Listings, Prime Locations, Award-Winning Agents, Full Concierge

---

### `<ContactSection />`
- Background: bedroom photo with `filter: blur(12px) brightness(0.25)` using Tailwind: `blur-xl brightness-25`
- Centered card with frosted glass effect: `backdrop-blur-md bg-white/5 border border-white/10`
- Form fields: Name, Email, Phone, Property Interest (select), Message
- Submit button: gold with Framer Motion `whileTap={{ scale: 0.97 }}`

---

## Design Tokens (tailwind.config.js)

```js
theme: {
  extend: {
    colors: {
      gold: '#c9a84c',
      'gold-light': '#e8c96a',
      estate: {
        dark: '#0d0d0d',
        cream: '#f9f6f1',
        muted: '#999999',
      }
    },
    fontFamily: {
      serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      sans: ['DM Sans', 'sans-serif'],
    },
    animation: {
      'fade-up': 'fadeUp 0.8s ease forwards',
    },
    keyframes: {
      fadeUp: {
        from: { opacity: 0, transform: 'translateY(30px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
      }
    }
  }
}
```

---

## Custom Hooks

### `useMouseParallax.js`
```js
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
        ref.current.style.transform = `translate(${x}px, ${y}px)`;
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
```

### `useCountUp.js`
```js
import { useState, useEffect } from 'react';

export function useCountUp(target, duration = 2000, active = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);

  return count;
}
```

---

## Sample Listings Data (`src/data/listings.js`)

```js
export const listings = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
    price: '$4,250,000',
    address: '12 Sunset Blvd, Beverly Hills, CA',
    beds: 5, baths: 4, sqft: 6200,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    price: '$2,875,000',
    address: '88 Ocean Drive, Miami Beach, FL',
    beds: 4, baths: 3, sqft: 4100,
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
    price: '$6,100,000',
    address: '5 Lakeview Terrace, Chicago, IL',
    beds: 6, baths: 5, sqft: 8400,
  },
];
```

---

## Performance Checklist

- [ ] `loading="lazy"` on all `<img>` tags below the fold
- [ ] `will-change: transform` on hero image, cards, parallax elements
- [ ] Framer Motion `layoutId` for smooth shared transitions if adding routing
- [ ] `once: true` on all `whileInView` to avoid re-triggering
- [ ] Use `transform` and `opacity` only — no layout-thrashing properties
- [ ] Lazy-load `@react-three/fiber` with `React.lazy()` if 3D globe is added

---

## Optional Enhancements

- **3D Globe**: Add a `@react-three/fiber` spinning globe in the hero with location markers using `@react-three/drei`'s `<Html>` component
- **Property Map**: Embed Mapbox GL JS for an interactive listings map
- **Routing**: Add `react-router-dom` for individual property detail pages
- **CMS**: Wire listings data to Sanity.io or Contentful for real client use

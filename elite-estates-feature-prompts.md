# Élite Estates — New Pages & Features Prompts

> Stack: React 18 + Vite · Framer Motion · react-scroll-parallax · Tailwind CSS · lucide-react · react-router-dom
> All pages connect to the existing site via `react-router-dom` routes defined in `App.jsx`.

---

## Table of Contents

1. [Property Detail Page](#1-property-detail-page)
2. [Search & Filters Page](#2-search--filters-page)
3. [Agent Profiles Page](#3-agent-profiles-page)
4. [Blog / Market Insights](#4-blog--market-insights)
5. [Mortgage Calculator](#5-mortgage-calculator)
6. [Favourites / Saved Homes](#6-favourites--saved-homes)
7. [About Us Page](#7-about-us-page)
8. [Virtual Tour Page](#8-virtual-tour-page)

---

## 1. Property Detail Page

**Route:** `/property/:id`

### Goal
A full-page deep-dive into a single listing — immersive photo gallery, all specs, map, agent contact, and a mortgage snapshot. This is the page that converts browsers into buyers.

### Component Structure
```
src/pages/PropertyDetail/
├── PropertyDetail.jsx         ← page root
├── PhotoGallery.jsx           ← hero image + thumbnail strip
├── PropertyStats.jsx          ← beds/baths/sqft/price grid
├── PropertyDescription.jsx    ← rich text description
├── AmenitiesList.jsx          ← icon grid of features
├── LocationMap.jsx            ← embedded map
├── AgentContactCard.jsx       ← sticky sidebar card
└── SimilarListings.jsx        ← horizontal scroll of related cards
```

### Prompt
Build a `/property/:id` detail page for Élite Estates in React. Pull listing data from `src/data/listings.js` using `useParams()` to match the id.

**Photo Gallery (`<PhotoGallery />`)**
- Hero image fills the top 60vh, with a subtle Ken Burns zoom animation (`scale: 1 → 1.05` over 6s via Framer Motion)
- Below: a horizontal scrollable thumbnail strip (5–6 images)
- Clicking a thumbnail swaps the hero image with a crossfade (`AnimatePresence` + `motion.img key={src}`)
- Top-left: back arrow button (`lucide-react` `ArrowLeft`) that navigates back via `useNavigate()`

**Property Stats Bar (`<PropertyStats />`)**
- Full-width strip below gallery: Price · Beds · Baths · Sqft · Year Built · Garage
- Each stat in its own cell with a gold icon above and value + label below
- Animate in with `staggerChildren: 0.08` on scroll

**Description + Amenities**
- Two-column layout: left = rich text description, right = `<AmenitiesList />`
- Amenities: icon grid (4 columns) — Pool, Gym, Concierge, Smart Home, Wine Cellar, Terrace, EV Charging, Security
- Use `lucide-react` icons, gold color, 12px uppercase label under each

**Sticky Agent Card (`<AgentContactCard />`)**
- `position: sticky; top: 2rem` on desktop — floats in right sidebar as user scrolls
- Agent photo (circular), name, title, phone, email
- Two CTA buttons: "Schedule a Viewing" (gold fill) + "Send Message" (outlined)
- On mobile: collapses to a fixed bottom bar with just the two CTAs

**Similar Listings (`<SimilarListings />`)**
- Horizontal scroll row of 4 `<PropertyCard />` components (reuse from homepage)
- Framer Motion drag-to-scroll: `<motion.div drag="x" dragConstraints={ref}>`

**Code snippet — image crossfade:**
```jsx
import { AnimatePresence, motion } from 'framer-motion';

<AnimatePresence mode="wait">
  <motion.img
    key={activeImage}
    src={activeImage}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
    className="w-full h-full object-cover"
  />
</AnimatePresence>
```

---

## 2. Search & Filters Page

**Route:** `/search`

### Goal
A powerful, beautiful property search experience — filterable, sortable, and fast. Filters feel premium, not like a form.

### Component Structure
```
src/pages/Search/
├── SearchPage.jsx
├── FilterSidebar.jsx          ← collapsible on mobile
├── FilterChips.jsx            ← active filter tags with × to remove
├── ListingResults.jsx         ← responsive grid of cards
├── SortDropdown.jsx
├── MapToggle.jsx              ← switch between grid and map view
└── EmptyState.jsx             ← illustrated no-results state
```

### Prompt
Build a `/search` page for Élite Estates. Filter the `listings` array from `src/data/listings.js` using React state — no backend needed initially.

**Filter Sidebar (`<FilterSidebar />`)**
Filters to include:
- Price range: dual-handle range slider (use `rc-slider` or build custom with two overlapping `<input type="range">`)
- Property type: pill toggle buttons (House · Apartment · Villa · Penthouse)
- Bedrooms: +/- stepper (min 1, max 8+)
- Bathrooms: +/- stepper
- Square footage: range slider
- Amenities: checkbox grid (Pool, Gym, Garage, Garden, Concierge)
- Location: text input with debounce (300ms) filtering by address string

All filters update a single `filters` state object in `SearchPage.jsx` via `useReducer`.

**Active Filter Chips (`<FilterChips />`)**
- Render one pill per active filter above results
- Each pill shows filter name + value + `×` to clear that filter
- "Clear all" link when ≥ 2 filters active
- Animate chips in/out with Framer Motion `layout` prop (smooth width reflow)

**Results Grid (`<ListingResults />`)**
- 3-col desktop, 2-col tablet, 1-col mobile
- Filtered + sorted results, count shown: `"24 properties found"`
- `<AnimatePresence>` wraps the grid so cards animate out when filtered away:
```jsx
<AnimatePresence>
  {filtered.map(l => (
    <motion.div
      key={l.id}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25 }}
    >
      <PropertyCard {...l} />
    </motion.div>
  ))}
</AnimatePresence>
```

**Sort Dropdown (`<SortDropdown />`)**
- Options: Newest · Price (High–Low) · Price (Low–High) · Most Popular
- Custom styled select — not native `<select>`. Use a `useState` toggle for open/close with `AnimatePresence` dropdown

**Map / Grid Toggle (`<MapToggle />`)**
- Top-right toggle: grid icon ↔ map icon (`lucide-react`)
- Map view: lazy-load a Mapbox or Google Maps embed with listing pins
- Smooth layout transition via Framer Motion `layoutId`

**Mobile: Filters as bottom sheet**
- On mobile, filters live behind a "Filters" button
- Tapping opens a bottom drawer that slides up via:
```jsx
<motion.div
  initial={{ y: '100%' }}
  animate={{ y: 0 }}
  exit={{ y: '100%' }}
  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
  className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 p-6"
/>
```

---

## 3. Agent Profiles Page

**Route:** `/agents` + `/agents/:id`

### Goal
Build trust with a team page that feels personal and premium — not a corporate directory.

### Component Structure
```
src/pages/Agents/
├── AgentsPage.jsx             ← grid of all agents
├── AgentCard.jsx              ← hover-reveal card
├── AgentDetailPage.jsx        ← individual agent page
├── AgentStats.jsx             ← deals closed, avg price, years exp
└── AgentListings.jsx          ← agent's active listings
```

### Prompt
Build `/agents` and `/agents/:id` pages for Élite Estates.

**Agents Grid (`<AgentsPage />`)**
- Masonry-style grid (CSS columns: 3) of agent cards — varied heights feel editorial
- Each `<AgentCard />`:
  - Agent photo fills card, dark gradient from bottom
  - Name + title overlay at bottom left
  - On hover: card expands vertically (Framer Motion `whileHover={{ height: 'auto' }}`), revealing specialties, deal count, and a "View Profile" CTA
  - Gold border on hover: `border-gold`

**Agent Detail Page (`<AgentDetailPage />`)**
- Hero: full-width agent photo (parallax scroll, image moves at 0.6x speed)
- Bio section: large serif quote from the agent + paragraph bio
- Stats strip: Deals Closed · Avg Sale Price · Years of Experience · Client Rating (⭐)
  - Animate with `useCountUp` hook (reuse from homepage)
- Active Listings: grid of `<PropertyCard />` filtered by `agentId`
- Testimonials: horizontal scroll of quote cards — client name, photo, quote, property sold
- Contact form at bottom (Name, Email, Message, preferred contact time)

**Code snippet — hover expand card:**
```jsx
<motion.div
  className="relative overflow-hidden rounded-xl cursor-pointer"
  initial={{ height: 320 }}
  whileHover={{ height: 420 }}
  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
>
  <img src={agent.photo} className="w-full h-full object-cover" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
  <div className="absolute bottom-0 p-6">
    <h3 className="font-serif text-white text-xl">{agent.name}</h3>
    <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}>
      <p className="text-gold text-sm mt-2">{agent.specialties}</p>
    </motion.div>
  </div>
</motion.div>
```

---

## 4. Blog / Market Insights

**Route:** `/insights` + `/insights/:slug`

### Goal
Position Élite Estates as a market authority. Editorial-quality layout — feels like a design magazine.

### Component Structure
```
src/pages/Blog/
├── BlogPage.jsx               ← article listing
├── FeaturedArticle.jsx        ← hero article (large)
├── ArticleCard.jsx            ← standard card
├── CategoryFilter.jsx         ← pill filters by category
├── ArticleDetailPage.jsx      ← full article view
└── RelatedArticles.jsx        ← 3 related posts at bottom
```

### Prompt
Build `/insights` (listing page) and `/insights/:slug` (article page) for Élite Estates.

**Blog Listing Page (`<BlogPage />`)**
- Top: `<FeaturedArticle />` — full-width card, large image left, title + excerpt + author right
- Below: 3-column grid of `<ArticleCard />` components
- Category pill filters: All · Market Trends · Buying Guides · Luxury Living · Investment · Neighbourhoods
  - Filtering animates with Framer Motion `layout` (same as Search page)
- Each `<ArticleCard />`:
  - Image top, category badge (gold), title, 2-line excerpt, author + read time
  - Hover: image scales to 1.05, card lifts with subtle shadow

**Article Detail Page (`<ArticleDetailPage />`)**
- Hero: article cover photo at 50vh with title overlay + parallax scroll
- Sticky reading progress bar at top of viewport (thin gold line, width tied to scroll %)
- Article body: `max-w-2xl mx-auto` editorial column, serif body font
- Pull quotes: large italic gold text, left-border accent
- Image captions: centered, 13px, muted color
- Author bio card at bottom: circular photo, name, title, short bio
- Share buttons: Twitter/X, LinkedIn, Copy Link (`lucide-react` icons)
- `<RelatedArticles />`: 3-col grid below article

**Code snippet — reading progress bar:**
```jsx
const [progress, setProgress] = useState(0);

useEffect(() => {
  const update = () => {
    const el = document.documentElement;
    const scrolled = el.scrollTop;
    const total = el.scrollHeight - el.clientHeight;
    setProgress((scrolled / total) * 100);
  };
  window.addEventListener('scroll', update, { passive: true });
  return () => window.removeEventListener('scroll', update);
}, []);

<motion.div
  className="fixed top-0 left-0 h-0.5 bg-gold z-50"
  style={{ width: `${progress}%` }}
/>
```

---

## 5. Mortgage Calculator

**Route:** `/calculator`  *(also embeddable as a widget on Property Detail page)*

### Goal
An interactive financial tool that makes buyers feel informed and confident. Should feel premium, not like a bank form.

### Component Structure
```
src/pages/Calculator/
├── MortgageCalculator.jsx     ← page wrapper
├── LoanInputs.jsx             ← sliders for price, down payment, rate, term
├── ResultsSummary.jsx         ← monthly payment breakdown
├── AmortizationChart.jsx      ← bar chart (recharts)
└── AmortizationTable.jsx      ← collapsible year-by-year table
```

### Prompt
Build a `/calculator` page for Élite Estates. All calculations happen in the browser — no API needed.

**Inputs (`<LoanInputs />`)**
- Home Price: range slider ($200k – $10M, step $50k) + editable number input
- Down Payment: slider (5% – 50%) + % display + $ equivalent
- Interest Rate: slider (2% – 12%, step 0.1%) + editable input
- Loan Term: segmented button toggle (10 · 15 · 20 · 30 years)
- All sliders styled with gold thumb, dark track — custom CSS

**Live Results (`<ResultsSummary />`)**
- Updates in real time as sliders move (no submit button)
- Monthly payment: large gold number, animate value changes with Framer Motion `useSpring`:
```jsx
const springValue = useSpring(monthlyPayment, { stiffness: 100, damping: 20 });
const display = useTransform(springValue, v => `$${Math.round(v).toLocaleString()}`);

<motion.span>{display}</motion.span>
```
- Breakdown donut chart (recharts `PieChart`): Principal · Interest · Tax · Insurance
- 4 summary cards: Monthly Payment · Total Interest · Total Cost · Loan Amount

**Amortization Chart (`<AmortizationChart />`)**
- Recharts `BarChart` — stacked bars per year: principal paid (gold) vs interest paid (dark)
- X-axis: years 1–30, Y-axis: dollar amount
- Tooltip shows that year's principal + interest breakdown on hover

**Amortization Table (`<AmortizationTable />`)**
- Collapsible: hidden by default, "View full schedule" button reveals it
- Columns: Year · Principal · Interest · Balance
- Alternating row colors, sticky header

**Core calculation logic:**
```js
export function calcMonthly(price, downPct, annualRate, years) {
  const principal = price * (1 - downPct / 100);
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}
```

---

## 6. Favourites / Saved Homes

**Route:** `/favourites`

### Goal
A personal dashboard where users save and compare properties they love. Zero backend — use `localStorage` to persist.

### Component Structure
```
src/pages/Favourites/
├── FavouritesPage.jsx
├── FavouritesGrid.jsx         ← saved listings grid
├── CompareDrawer.jsx          ← slide-up comparison panel
├── EmptyFavourites.jsx        ← illustrated empty state
└── FavouriteButton.jsx        ← heart icon used across all cards
```

### Prompt
Build a `/favourites` page and a global favourites system for Élite Estates using `localStorage` and React Context.

**Global Favourites Context (`src/context/FavouritesContext.jsx`)**
```jsx
const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState(
    () => JSON.parse(localStorage.getItem('elite-favourites') || '[]')
  );

  const toggle = (id) => setFavourites(prev => {
    const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
    localStorage.setItem('elite-favourites', JSON.stringify(next));
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
```

**Heart Button (`<FavouriteButton />`)**
- Used on every `<PropertyCard />` and the Property Detail page
- Animated heart fill on toggle:
```jsx
<motion.button
  onClick={() => toggle(id)}
  whileTap={{ scale: 1.4 }}
  transition={{ type: 'spring', stiffness: 400 }}
>
  <Heart
    className={isFavourited(id) ? 'fill-gold text-gold' : 'text-white'}
    size={20}
  />
</motion.button>
```

**Favourites Page (`<FavouritesPage />`)**
- Grid of saved `<PropertyCard />` components
- Each card has an `×` remove button (top-right) — removes with exit animation
- Checkbox on each card for "compare mode"
- Compare bar: when 2–3 cards are checked, a bottom bar appears: "Compare 2 properties →"

**Compare Drawer (`<CompareDrawer />`)**
- Slides up from the bottom (Framer Motion spring)
- Side-by-side table: rows for Price, Beds, Baths, Sqft, Location, Year Built, Amenities
- Differences highlighted in gold
- Max 3 properties at once

**Empty State (`<EmptyFavourites />`)**
- Centered illustration (SVG of a house with a heart)
- Copy: *"No saved homes yet"* + *"Start exploring and heart the ones you love"*
- CTA button → `/search`

---

## 7. About Us Page

**Route:** `/about`

### Goal
Tell the brand story in a way that builds deep trust — editorial, cinematic, human.

### Component Structure
```
src/pages/About/
├── AboutPage.jsx
├── BrandStory.jsx             ← full-width narrative section
├── MissionValues.jsx          ← 3 value pillars
├── TeamGrid.jsx               ← photo grid of leadership
├── MilestonesTimeline.jsx     ← horizontal scrolling timeline
├── PressLogos.jsx             ← "As seen in" strip
└── CareersCallout.jsx         ← join the team CTA
```

### Prompt
Build an `/about` page for Élite Estates. It should feel like a brand film, not a corporate "About Us" brochure.

**Hero (`<BrandStory />`)**
- Full-viewport dark section, large background image (agent/office photo) at 0.5 opacity
- Animated text reveal on load — each word of the headline fades in with a 0.05s stagger:
```jsx
const words = "We believe every home has a story.".split(' ');
<motion.h1>
  {words.map((word, i) => (
    <motion.span
      key={i}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.08, duration: 0.6 }}
      className="inline-block mr-3"
    >
      {word}
    </motion.span>
  ))}
</motion.h1>
```
- Below: 2-column editorial layout — brand story paragraph left, large pull quote right

**Mission & Values (`<MissionValues />`)**
- 3 value pillars in a grid: Integrity · Excellence · Discretion
- Each pillar: gold icon, large number (01, 02, 03), heading, paragraph
- Animate in with `whileInView` stagger

**Milestones Timeline (`<MilestonesTimeline />`)**
- Horizontal scrolling timeline (drag-to-scroll with Framer Motion)
- Milestones: Founded 2009 · First $1M sale · Expanded to 5 cities · $1B total value · 2024 award
- Each milestone: year in gold, event title, short description, connecting gold line

**Press Logos (`<PressLogos />`)**
- "As featured in" strip: Forbes · Wall Street Journal · Architectural Digest · Financial Times
- Logos in muted gray, full opacity on hover
- Auto-scroll marquee (CSS `@keyframes` marquee animation, duplicated list for seamless loop)

**Careers Callout (`<CareersCallout />`)**
- Dark section with gold CTA: "Join the Élite Estates team"
- Subtle animated background: slow-moving gold gradient orbs (`motion.div` with `animate={{ x, y }}` on a loop)

---

## 8. Virtual Tour Page

**Route:** `/property/:id/tour`

### Goal
An immersive 360° virtual walkthrough experience embedded directly in the site.

### Component Structure
```
src/pages/VirtualTour/
├── VirtualTourPage.jsx
├── TourViewer.jsx             ← main 360° iframe or Three.js viewer
├── RoomSelector.jsx           ← sidebar room navigation
├── TourControls.jsx           ← fullscreen, mute, help
└── TourOverlay.jsx            ← property info overlay on top of tour
```

### Prompt
Build a `/property/:id/tour` virtual tour page for Élite Estates.

**Tour Viewer (`<TourViewer />`)**
- Primary approach: embed a Matterport or Kuula iframe (client provides tour URL):
```jsx
<iframe
  src={listing.tourUrl}
  className="w-full h-full border-0"
  allowFullScreen
  allow="xr-spatial-tracking; gyroscope; accelerometer"
/>
```
- Fallback (if no tour URL): build a pseudo-360° photo viewer using CSS `perspective` + mouse drag to rotate a panoramic image:
```jsx
const [rotation, setRotation] = useState(0);
const handleDrag = (e, info) => setRotation(r => r + info.delta.x * 0.3);

<motion.div
  drag="x"
  onDrag={handleDrag}
  style={{
    backgroundImage: `url(${panoramaUrl})`,
    backgroundSize: '300% 100%',
    backgroundPositionX: `${rotation % 100}%`,
  }}
  className="w-full h-full cursor-grab active:cursor-grabbing"
/>
```

**Room Selector (`<RoomSelector />`)**
- Left sidebar: vertical list of rooms — Living Room · Kitchen · Master Bedroom · Bathrooms · Garden · Garage
- Each room: small thumbnail + room name
- Clicking a room: animated transition (fade out → fade in new panorama) and URL hash update
- Active room: gold left border highlight

**Tour Overlay (`<TourOverlay />`)**
- Semi-transparent panel top-left: property address + price
- Bottom-right: "Request a Viewing" button (persists over the tour)
- Toggle-able info panel: slide in from right with property highlights

**Tour Controls (`<TourControls />`)**
- Top-right icon bar: Fullscreen (`Maximize2`), Share (`Share2`), Help (`HelpCircle`) from lucide-react
- Fullscreen uses the native Fullscreen API:
```js
document.getElementById('tour-container').requestFullscreen();
```
- Animated entrance: icons drop in from top on load with stagger

**Entry transition**
- When navigating from Property Detail → Virtual Tour, use Framer Motion shared layout animation (`layoutId="property-hero-image"`) so the hero image morphs into the tour background:
```jsx
// In PropertyDetail.jsx
<motion.img layoutId="property-hero-image" src={listing.image} />

// In VirtualTourPage.jsx
<motion.div layoutId="property-hero-image" className="absolute inset-0 bg-black" />
```

---

## Shared Additions Across All Pages

### `react-router-dom` Route Setup (`App.jsx`)
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<BrowserRouter>
  <Routes>
    <Route path="/"                    element={<HomePage />} />
    <Route path="/search"              element={<SearchPage />} />
    <Route path="/property/:id"        element={<PropertyDetail />} />
    <Route path="/property/:id/tour"   element={<VirtualTourPage />} />
    <Route path="/agents"              element={<AgentsPage />} />
    <Route path="/agents/:id"          element={<AgentDetailPage />} />
    <Route path="/insights"            element={<BlogPage />} />
    <Route path="/insights/:slug"      element={<ArticleDetailPage />} />
    <Route path="/calculator"          element={<MortgageCalculator />} />
    <Route path="/favourites"          element={<FavouritesPage />} />
    <Route path="/about"              element={<AboutPage />} />
  </Routes>
</BrowserRouter>
```

### Page Transition Wrapper
Wrap every page in this component for smooth route transitions:
```jsx
export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

### Global Nav Updates
Add these links to the existing `<Navbar />`:
- Search (with filter icon)
- Agents
- Insights
- Calculator
- ♡ Favourites (with count badge from `useFavourites()`)


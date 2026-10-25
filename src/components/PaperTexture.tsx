export const PaperTexture = () => (
  <svg className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.025] z-10 mix-blend-multiply" xmlns="http://www.w3.org/2000/svg">
    <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/></filter>
    <rect width="100%" height="100%" filter="url(#noise)"/>
  </svg>
);

import type { SyntheticEvent } from 'react';

const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><rect width='800' height='600' fill='#e2e8f0'/><path d='M250 330a40 40 0 0 1 80 0v30h140v-30a40 40 0 0 1 80 0v100H250z' fill='#94a3b8'/></svg>"
  );

/** If an image fails to load, show a neutral placeholder instead of a broken icon. */
export function onImgError(e: SyntheticEvent<HTMLImageElement>) {
  const t = e.currentTarget;
  if (t.dataset.failed) return;
  t.dataset.failed = '1';
  t.removeAttribute('srcset');
  t.src = FALLBACK;
}

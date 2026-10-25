import { useEffect } from 'react';

/** Sets the browser tab title (and optional meta description) per page. */
export default function useTitle(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [title, description]);
}

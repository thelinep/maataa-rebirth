/**
 * Simple stroke icons for the eleven public event-type categories
 * (NEVO /event-types) — no photography, one consistent line
 * weight, matching the icon-first direction used across the public site.
 */
const paths: Record<string, string> = {
  corporate: "M4 20.5V6.2c0-.4.3-.7.7-.7H11v15M11 20.5h8.3c.4 0 .7-.3.7-.7V10.3c0-.4-.3-.7-.7-.7H11M7.3 9h1M7.3 12h1M7.3 15h1M14.3 13h1M14.3 16.3h1",
  conferences: "M4 18.5V11a8 8 0 0 1 16 0v7.5M4 15.5h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H4v-5ZM17 15.5h3v5h-3a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Z",
  weddings: "M8.3 15.3a3.7 3.7 0 1 1 0-7.4 3.7 3.7 0 0 1 0 7.4Zm7.4 0a3.7 3.7 0 1 1 0-7.4 3.7 3.7 0 0 1 0 7.4Zm-5.2-2.2 3-3",
  concerts: "M9 17.5a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6Zm9-2.3a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6ZM11.3 15V5.8L20 4v8.9",
  festivals: "M6 21V9.5L12 3l6 6.5V21M6 14h12M9.5 21v-4.5h5V21",
  exhibitions: "M4 20.5h16M6 20.5V9l6-4.5 6 4.5v11.5M10 20.5v-6h4v6",
  fashion: "M12 3.5 9 6l-3.5 1.5L4 12l2 1.5V20h12v-6.5l2-1.5-1.5-4.5L15 6l-3-2.5ZM9 6a3 3 0 0 0 6 0",
  awards: "M12 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm-2.6-.7L8 21l4-2 4 2-1.4-6.7",
  press: "M4 8.5 12 4l8 4.5v3l-8-4.5-8 4.5v-3ZM4 11.5h16v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8Zm5 4h6",
  hybrid: "M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17ZM3.7 12h16.6M12 3.7a13 13 0 0 1 0 16.6 13 13 0 0 1 0-16.6Z",
  virtual: "M4 6.5h16v10H4v-10Zm5 14h6M11 16.5v4",
};

export function EventTypeIcon({ slug, size = 26 }: { slug: string; size?: number }) {
  const d = paths[slug];
  if (!d) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={d} />
    </svg>
  );
}

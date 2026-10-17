import React from 'react';
import type { GroupId } from './catalogueModel';

/** Catalogue-specific symbols on MAATAA's 24px, 2px-stroke icon grid. */
export function CatalogueIcon({group,label='',subtype='',size=22}:{group:GroupId;label?:string;subtype?:string;size?:number}){
  const lower=label.toLowerCase();
  let shape:React.ReactNode;
  if(group==='talents'&&/voice actor|voice-over|voice over/.test(lower))shape=<><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5m-4 0h8M3 6v5m18-5v5"/></>;
  else if(group==='talents'&&/singer|musician/.test(lower))shape=<><path d="M9 18V5l11-2v12M9 8l11-2"/><ellipse cx="6" cy="19" rx="3" ry="2"/><ellipse cx="17" cy="16" rx="3" ry="2"/><path d="M3 5v2m-1-1h2"/></>;
  else if(group==='talents'&&/dancer|cultural performer|stunt performer/.test(lower))shape=<><circle cx="13" cy="4" r="2"/><path d="m11 8-3 4 4 2 2-4 4 2m-9 2-3 5m6-3 4 4m-5-7-4 5-4 1m12-14 3-1"/></>;
  else if(group==='talents'&&/presenter|host|comedian/.test(lower))shape=<><path d="M5 21h14M8 21v-5h8v5M12 16V8"/><rect x="4" y="3" width="16" height="5" rx="2.5"/><path d="M12 8v2"/></>;
  else if(group==='talents'&&/model/.test(lower))shape=<><path d="M12 3 9 6H5l2 6-2 9h14l-2-9 2-6h-4zM9 6l3 3 3-3M7 21l2-8h6l2 8"/></>;
  else if(group==='talents'&&/puppeteer/.test(lower))shape=<><path d="M4 3h16M12 3v6m-6-6v8m12-8v8M6 11l-3 4 3 4 3-4zm12 0-3 4 3 4 3-4zM12 9l-3 5 3 5 3-5z"/></>;
  else if(group==='talents'&&/athlete/.test(lower))shape=<><circle cx="12" cy="12" r="9"/><path d="m12 3 3 4-2 4h-5L6 7m-2 9 5-2 4 3-1 5m6-2-1-5 4-3m-8-3 2-4"/></>;
  else if(group==='talents'&&/digital creator/.test(lower))shape=<><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4m-3-11 6 3-6 3z"/><path d="m19 2 .7 1.8L22 5l-2.3.7L19 8l-.7-2.3L16 5l2.3-.7z"/></>;
  else if(group==='talents')shape=<><path d="M3 4c4 2 8 2 12 0v7a6 6 0 0 1-12 0zM17 8l4-1v8a5 5 0 0 1-6 5"/><path d="M6 9h1m4 0h1M7 13c1 1 3 1 4 0"/></>;
  else if((group==='designations'||group==='services'||group==='departments')&&/camera|photograph|cinema/.test(lower))shape=<><rect x="3" y="7" width="18" height="13" rx="2"/><path d="m7 7 2-4h6l2 4"/><circle cx="12" cy="13" r="4"/></>;
  else if((group==='designations'||group==='services'||group==='departments')&&/gaffer|lighting|electric/.test(lower))shape=<><path d="M9 18h6M9 21h6M8 14a6 6 0 1 1 8 0l-1 4H9zM12 1v1M2 8h2m16 0h2"/></>;
  else if(group==='satellites'&&subtype==='Natural satellite')shape=<><path d="M20 15A9 9 0 0 1 9 3a9 9 0 1 0 11 12Z"/></>;
  else if((group==='designations'||group==='services'||group==='departments')&&/sound|music/.test(lower))shape=<><path d="M9 17V5l11-2v12M9 8l11-2"/><ellipse cx="6" cy="18" rx="3" ry="2"/><ellipse cx="17" cy="16" rx="3" ry="2"/></>;
  else if((group==='designations'||group==='departments')&&/actor|cast|talent/.test(lower))shape=<><path d="M3 4c4 2 8 2 12 0v7a6 6 0 0 1-12 0zM17 8l4-1v8a5 5 0 0 1-6 5"/><path d="M6 9h1m4 0h1M7 13c1 1 3 1 4 0"/></>;
  else switch(group){
    case 'accounts':shape=<><circle cx="12" cy="7" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/></>;break;
    case 'industry':shape=<><path d="M3 21V10l6 3V8l6 4V3h4l2 18zM6 17h2m4 0h2m3 0h1"/></>;break;
    case 'departments':shape=<><rect x="8" y="2" width="8" height="5" rx="1"/><rect x="1" y="16" width="6" height="5" rx="1"/><rect x="9" y="16" width="6" height="5" rx="1"/><rect x="17" y="16" width="6" height="5" rx="1"/><path d="M12 7v9M4 16v-5h16v5"/></>;break;
    case 'designations':shape=<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M9 5V2h6v3M14 11h4m-4 4h4"/><circle cx="8" cy="11" r="2"/><path d="M5 17a3 3 0 0 1 6 0"/></>;break;
    case 'services':shape=<><path d="M14 4a6 6 0 0 0-7 7L2 16a3 3 0 0 0 4 4l5-5a6 6 0 0 0 7-7l-4 4-3-3z"/></>;break;
    case 'features':shape=<><path d="m12 2 2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z"/></>;break;
    case 'other':shape=<><path d="M3 3h8l10 10-8 8L3 11z"/><circle cx="7" cy="7" r="1"/></>;break;
    case 'location':shape=<><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>;break;
    case 'equipment':shape=<><rect x="3" y="7" width="18" height="14" rx="2"/><path d="m7 7 2-4h6l2 4M8 7l-1 3m9-3 1 3"/><circle cx="12" cy="14" r="4"/></>;break;
    case 'transport':shape=<><path d="M2 7h12v11H2zM14 11h5l3 4v3h-8z"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></>;break;
    case 'accommodation':shape=<><path d="M3 20V6m0 10h18v4M3 12h7a4 4 0 0 1 4 4m0 0V9h4a4 4 0 0 1 4 4v3"/><path d="M6 9h2"/></>;break;
    case 'catering':shape=<><path d="M3 12h18a9 9 0 0 1-18 0ZM5 8a7 7 0 0 1 14 0M12 2v2m-5 0-1-2m11 2 1-2"/></>;break;
    case 'costume':shape=<><path d="M12 4a2 2 0 1 0-2-2m2 4c0-1 1-2 2-2a2 2 0 1 1 0 4h-2v3L3 17h18l-9-6"/><path d="M5 17v3h14v-3"/></>;break;
    case 'makeup':shape=<><rect x="4" y="3" width="16" height="18" rx="3"/><circle cx="12" cy="10" r="4"/><path d="M9 17h6m-5-7 1 1 2-2"/></>;break;
    case 'hair':shape=<><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="m8.2 8.2 12.3 12.3M8.2 15.8 20.5 3.5M12 12l3-3"/></>;break;
    case 'props':shape=<><path d="m12 3 9 5v8l-9 5-9-5V8zM3 8l9 5 9-5M12 13v8"/><path d="M7 5.5 16 11"/></>;break;
    case 'vfx':shape=<><path d="m3 7 9-5 9 5-9 5zM3 12l9 5 9-5M3 17l9 5 9-5"/><path d="m19 2 .8 2.2L22 5l-2.2.8L19 8l-.8-2.2L16 5l2.2-.8z"/></>;break;
    case 'sfx':shape=<><path d="m12 2 2 6 6-4-3 7 6 1-6 3 4 6-7-3-2 6-2-6-7 3 4-6-6-3 6-1-3-7 6 4z"/><circle cx="12" cy="13" r="2"/></>;break;
    case 'others':shape=<><path d="M3 6h7l2 2h9v12H3zM3 10h18"/><path d="M12 12v5m-2.5-2.5h5"/></>;break;
    case 'languages':shape=<><path d="M2 5h12M8 2v3M5 5c0 6 3 9 7 11M12 5c0 6-4 10-9 12M13 22l5-13 5 13M15 18h6"/></>;break;
    case 'countries':shape=<><path d="M4 22V3c6-4 10 4 16 0v12c-6 4-10-4-16 0"/></>;break;
    case 'continents':shape=<><circle cx="12" cy="12" r="10"/><path d="m5 5 4 1 1 4-3 3-4-1m10-9-1 4 4 2 4-1m-9 7 5-1 2 4-3 4-4-2z"/></>;break;
    case 'galaxies':shape=<><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-35 12 12)"/><ellipse cx="12" cy="12" rx="4" ry="9" transform="rotate(-35 12 12)"/><circle cx="12" cy="12" r="1"/></>;break;
    case 'stars':shape=<><path d="m12 2 2.8 6.2 6.7.8-5 4.5 1.4 6.7-5.9-3.4-5.9 3.4 1.4-6.7-5-4.5 6.7-.8z"/></>;break;
    case 'systems':shape=<><circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="11" ry="6" transform="rotate(-25 12 12)"/><circle cx="20" cy="6" r="2"/></>;break;
    case 'planets':shape=<><circle cx="12" cy="12" r="7"/><path d="M5 10c-4 2-4 4-3 5 2 2 8 1 13-1s8-5 7-6c-1-1-3-1-5-1"/></>;break;
    case 'satellites':shape=<><path d="m10 7 7 7-5 5-7-7zM7 4l3 3-5 5-3-3zm10 10 4 4-5 5-4-4M13 10l4-4M15 3a6 6 0 0 1 6 6M15 6a3 3 0 0 1 3 3"/></>;break;
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{shape}</svg>;
}

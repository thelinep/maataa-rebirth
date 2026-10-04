export type ViewportDefinition = Readonly<{ id:string; name:string; width:number; height:number; aspectRatio:number }>;

export const VIEWPORT_REGISTRY: readonly ViewportDefinition[] = [
  {
    "id": "VIEWPORT.MOBILE_COMPACT",
    "name": "Mobile Compact",
    "width": 360,
    "height": 800,
    "aspectRatio": 0.45
  },
  {
    "id": "VIEWPORT.MOBILE_STANDARD",
    "name": "Mobile Standard",
    "width": 390,
    "height": 844,
    "aspectRatio": 0.4621
  },
  {
    "id": "VIEWPORT.MOBILE_LARGE",
    "name": "Mobile Large",
    "width": 430,
    "height": 932,
    "aspectRatio": 0.4614
  },
  {
    "id": "VIEWPORT.FOLDABLE_CLOSED",
    "name": "Foldable Closed",
    "width": 360,
    "height": 800,
    "aspectRatio": 0.45
  },
  {
    "id": "VIEWPORT.FOLDABLE_OPEN",
    "name": "Foldable Open",
    "width": 768,
    "height": 900,
    "aspectRatio": 0.8533
  },
  {
    "id": "VIEWPORT.TABLET_MINI",
    "name": "Tablet Mini",
    "width": 744,
    "height": 1133,
    "aspectRatio": 0.6567
  },
  {
    "id": "VIEWPORT.TABLET",
    "name": "Tablet",
    "width": 834,
    "height": 1194,
    "aspectRatio": 0.6985
  },
  {
    "id": "VIEWPORT.TABLET_LARGE",
    "name": "Tablet Large",
    "width": 1024,
    "height": 1366,
    "aspectRatio": 0.7496
  },
  {
    "id": "VIEWPORT.HANDHELD",
    "name": "Handheld",
    "width": 360,
    "height": 640,
    "aspectRatio": 0.5625
  },
  {
    "id": "VIEWPORT.WEARABLE",
    "name": "Wearable",
    "width": 320,
    "height": 320,
    "aspectRatio": 1.0
  },
  {
    "id": "VIEWPORT.LAPTOP",
    "name": "Laptop",
    "width": 1366,
    "height": 768,
    "aspectRatio": 1.7786
  },
  {
    "id": "VIEWPORT.DESKTOP",
    "name": "Desktop",
    "width": 1440,
    "height": 900,
    "aspectRatio": 1.6
  },
  {
    "id": "VIEWPORT.DESKTOP_WIDE",
    "name": "Desktop Wide",
    "width": 1920,
    "height": 1080,
    "aspectRatio": 1.7778
  },
  {
    "id": "VIEWPORT.ULTRAWIDE",
    "name": "Ultrawide",
    "width": 2560,
    "height": 1080,
    "aspectRatio": 2.3704
  },
  {
    "id": "VIEWPORT.SUPER_ULTRAWIDE",
    "name": "Super Ultrawide",
    "width": 3840,
    "height": 1080,
    "aspectRatio": 3.5556
  },
  {
    "id": "VIEWPORT.MULTI_DISPLAY",
    "name": "Multi Display",
    "width": 3840,
    "height": 1080,
    "aspectRatio": 3.5556
  },
  {
    "id": "VIEWPORT.TV_FHD",
    "name": "Tv Fhd",
    "width": 1920,
    "height": 1080,
    "aspectRatio": 1.7778
  },
  {
    "id": "VIEWPORT.TV_UHD",
    "name": "Tv Uhd",
    "width": 3840,
    "height": 2160,
    "aspectRatio": 1.7778
  },
  {
    "id": "VIEWPORT.LARGE_DISPLAY",
    "name": "Large Display",
    "width": 1920,
    "height": 1080,
    "aspectRatio": 1.7778
  },
  {
    "id": "VIEWPORT.SIGNAGE",
    "name": "Signage",
    "width": 1080,
    "height": 1920,
    "aspectRatio": 0.5625
  },
  {
    "id": "VIEWPORT.KIOSK_PORTRAIT",
    "name": "Kiosk Portrait",
    "width": 1080,
    "height": 1920,
    "aspectRatio": 0.5625
  },
  {
    "id": "VIEWPORT.KIOSK_LANDSCAPE",
    "name": "Kiosk Landscape",
    "width": 1920,
    "height": 1080,
    "aspectRatio": 1.7778
  },
  {
    "id": "VIEWPORT.WALLBOARD",
    "name": "Wallboard",
    "width": 1920,
    "height": 1080,
    "aspectRatio": 1.7778
  },
  {
    "id": "VIEWPORT.POS",
    "name": "Pos",
    "width": 1024,
    "height": 768,
    "aspectRatio": 1.3333
  },
  {
    "id": "VIEWPORT.PAYMENT",
    "name": "Payment",
    "width": 480,
    "height": 800,
    "aspectRatio": 0.6
  },
  {
    "id": "VIEWPORT.AUTOMOTIVE",
    "name": "Automotive",
    "width": 1280,
    "height": 480,
    "aspectRatio": 2.6667
  },
  {
    "id": "VIEWPORT.MOBILITY",
    "name": "Mobility",
    "width": 1024,
    "height": 600,
    "aspectRatio": 1.7067
  },
  {
    "id": "VIEWPORT.INDUSTRIAL",
    "name": "Industrial",
    "width": 1280,
    "height": 800,
    "aspectRatio": 1.6
  },
  {
    "id": "VIEWPORT.CONTROL_ROOM",
    "name": "Control Room",
    "width": 1920,
    "height": 1080,
    "aspectRatio": 1.7778
  },
  {
    "id": "VIEWPORT.MEDICAL",
    "name": "Medical",
    "width": 1600,
    "height": 900,
    "aspectRatio": 1.7778
  },
  {
    "id": "VIEWPORT.SMART_DISPLAY",
    "name": "Smart Display",
    "width": 1280,
    "height": 800,
    "aspectRatio": 1.6
  },
  {
    "id": "VIEWPORT.EMBEDDED",
    "name": "Embedded",
    "width": 800,
    "height": 480,
    "aspectRatio": 1.6667
  },
  {
    "id": "VIEWPORT.CONSOLE",
    "name": "Console",
    "width": 1280,
    "height": 720,
    "aspectRatio": 1.7778
  },
  {
    "id": "VIEWPORT.CAMERA",
    "name": "Camera",
    "width": 800,
    "height": 480,
    "aspectRatio": 1.6667
  },
  {
    "id": "VIEWPORT.PRODUCTION",
    "name": "Production",
    "width": 1920,
    "height": 1080,
    "aspectRatio": 1.7778
  },
  {
    "id": "VIEWPORT.GAMING",
    "name": "Gaming",
    "width": 1920,
    "height": 1080,
    "aspectRatio": 1.7778
  },
  {
    "id": "VIEWPORT.REMOTE",
    "name": "Remote",
    "width": 480,
    "height": 800,
    "aspectRatio": 0.6
  },
  {
    "id": "VIEWPORT.DRONE",
    "name": "Drone",
    "width": 1280,
    "height": 720,
    "aspectRatio": 1.7778
  },
  {
    "id": "VIEWPORT.AVIATION",
    "name": "Aviation",
    "width": 1920,
    "height": 720,
    "aspectRatio": 2.6667
  },
  {
    "id": "VIEWPORT.EDUCATION",
    "name": "Education",
    "width": 1366,
    "height": 768,
    "aspectRatio": 1.7786
  },
  {
    "id": "VIEWPORT.RETAIL",
    "name": "Retail",
    "width": 1080,
    "height": 720,
    "aspectRatio": 1.5
  },
  {
    "id": "VIEWPORT.EVENT",
    "name": "Event",
    "width": 768,
    "height": 1024,
    "aspectRatio": 0.75
  },
  {
    "id": "VIEWPORT.SPATIAL_OPS",
    "name": "Spatial Ops",
    "width": 1440,
    "height": 900,
    "aspectRatio": 1.6
  },
  {
    "id": "VIEWPORT.ACCESSIBILITY",
    "name": "Accessibility",
    "width": 1280,
    "height": 800,
    "aspectRatio": 1.6
  },
  {
    "id": "VIEWPORT.XR_COMPACT",
    "name": "Xr Compact",
    "width": 1280,
    "height": 720,
    "aspectRatio": 1.7778
  },
  {
    "id": "VIEWPORT.XR",
    "name": "Xr",
    "width": 1920,
    "height": 1080,
    "aspectRatio": 1.7778
  }
] as const;

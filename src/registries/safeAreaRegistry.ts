export type SafeAreaDefinition = Readonly<{ id:string; name:string; top:number; right:number; bottom:number; left:number }>;

export const SAFE_AREA_REGISTRY: readonly SafeAreaDefinition[] = [
  {
    "id": "SAFE_AREA.NONE",
    "name": "None",
    "top": 0,
    "right": 0,
    "bottom": 0,
    "left": 0
  },
  {
    "id": "SAFE_AREA.MOBILE_NOTCH",
    "name": "Mobile Notch",
    "top": 44,
    "right": 0,
    "bottom": 34,
    "left": 0
  },
  {
    "id": "SAFE_AREA.DYNAMIC_ISLAND",
    "name": "Dynamic Island",
    "top": 59,
    "right": 0,
    "bottom": 34,
    "left": 0
  },
  {
    "id": "SAFE_AREA.FOLDABLE_HINGE",
    "name": "Foldable Hinge",
    "top": 0,
    "right": 18,
    "bottom": 0,
    "left": 18
  },
  {
    "id": "SAFE_AREA.TABLET_ROUNDED",
    "name": "Tablet Rounded",
    "top": 24,
    "right": 24,
    "bottom": 24,
    "left": 24
  },
  {
    "id": "SAFE_AREA.WATCH_ROUND",
    "name": "Watch Round",
    "top": 20,
    "right": 20,
    "bottom": 20,
    "left": 20
  },
  {
    "id": "SAFE_AREA.TV_OVERSCAN",
    "name": "Tv Overscan",
    "top": 32,
    "right": 32,
    "bottom": 32,
    "left": 32
  },
  {
    "id": "SAFE_AREA.KIOSK_BEZEL",
    "name": "Kiosk Bezel",
    "top": 16,
    "right": 16,
    "bottom": 16,
    "left": 16
  },
  {
    "id": "SAFE_AREA.AUTOMOTIVE_CLUSTER",
    "name": "Automotive Cluster",
    "top": 12,
    "right": 24,
    "bottom": 12,
    "left": 24
  },
  {
    "id": "SAFE_AREA.XR_VIEWPORT",
    "name": "Xr Viewport",
    "top": 24,
    "right": 48,
    "bottom": 24,
    "left": 48
  },
  {
    "id": "SAFE_AREA.EMBEDDED_BEZEL",
    "name": "Embedded Bezel",
    "top": 8,
    "right": 8,
    "bottom": 8,
    "left": 8
  }
] as const;

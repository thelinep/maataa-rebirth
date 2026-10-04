export type OrientationDefinition = Readonly<{ id:string; name:string }>;

export const ORIENTATION_REGISTRY: readonly OrientationDefinition[] = [
  {
    "id": "ORIENTATION.PORTRAIT",
    "name": "Portrait"
  },
  {
    "id": "ORIENTATION.PORTRAIT_INVERTED",
    "name": "Portrait Inverted"
  },
  {
    "id": "ORIENTATION.LANDSCAPE",
    "name": "Landscape"
  },
  {
    "id": "ORIENTATION.LANDSCAPE_INVERTED",
    "name": "Landscape Inverted"
  },
  {
    "id": "ORIENTATION.AUTO_ROTATE",
    "name": "Auto Rotate"
  },
  {
    "id": "ORIENTATION.FIXED_LANDSCAPE",
    "name": "Fixed Landscape"
  },
  {
    "id": "ORIENTATION.FIXED_PORTRAIT",
    "name": "Fixed Portrait"
  },
  {
    "id": "ORIENTATION.FOLD_CLOSED",
    "name": "Fold Closed"
  },
  {
    "id": "ORIENTATION.FOLD_OPEN",
    "name": "Fold Open"
  },
  {
    "id": "ORIENTATION.DUAL_SCREEN",
    "name": "Dual Screen"
  },
  {
    "id": "ORIENTATION.SPATIAL",
    "name": "Spatial"
  },
  {
    "id": "ORIENTATION.HEAD_MOUNTED",
    "name": "Head Mounted"
  },
  {
    "id": "ORIENTATION.WALL_MOUNTED",
    "name": "Wall Mounted"
  },
  {
    "id": "ORIENTATION.TABLETOP",
    "name": "Tabletop"
  }
] as const;

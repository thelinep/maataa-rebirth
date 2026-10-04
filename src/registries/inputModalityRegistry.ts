export type InputModalityDefinition = Readonly<{ id:string; name:string }>;

export const INPUT_MODALITY_REGISTRY: readonly InputModalityDefinition[] = [
  {
    "id": "INPUT.KEYBOARD",
    "name": "Keyboard"
  },
  {
    "id": "INPUT.MOUSE",
    "name": "Mouse"
  },
  {
    "id": "INPUT.TRACKPAD",
    "name": "Trackpad"
  },
  {
    "id": "INPUT.TOUCH",
    "name": "Touch"
  },
  {
    "id": "INPUT.PEN",
    "name": "Pen"
  },
  {
    "id": "INPUT.REMOTE",
    "name": "Remote"
  },
  {
    "id": "INPUT.GAMEPAD",
    "name": "Gamepad"
  },
  {
    "id": "INPUT.SWITCH",
    "name": "Switch"
  },
  {
    "id": "INPUT.EYE_TRACKING",
    "name": "Eye Tracking"
  },
  {
    "id": "INPUT.VOICE",
    "name": "Voice"
  },
  {
    "id": "INPUT.SCANNER",
    "name": "Scanner"
  },
  {
    "id": "INPUT.PHYSICAL_BUTTONS",
    "name": "Physical Buttons"
  },
  {
    "id": "INPUT.PHYSICAL_CONTROLS",
    "name": "Physical Controls"
  },
  {
    "id": "INPUT.ROTARY",
    "name": "Rotary"
  },
  {
    "id": "INPUT.STEERING_CONTROLS",
    "name": "Steering Controls"
  },
  {
    "id": "INPUT.GAZE",
    "name": "Gaze"
  },
  {
    "id": "INPUT.SPATIAL_HAND",
    "name": "Spatial Hand"
  },
  {
    "id": "INPUT.CONTROLLER",
    "name": "Controller"
  }
] as const;

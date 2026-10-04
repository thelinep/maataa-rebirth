export type DeviceCapabilityDefinition = Readonly<{ id:string; name:string }>;

export const DEVICE_CAPABILITY_REGISTRY: readonly DeviceCapabilityDefinition[] = [
  {
    "id": "CAPABILITY.DEVICE.TOUCH",
    "name": "Touch"
  },
  {
    "id": "CAPABILITY.DEVICE.MULTI_TOUCH",
    "name": "Multi Touch"
  },
  {
    "id": "CAPABILITY.DEVICE.KEYBOARD",
    "name": "Keyboard"
  },
  {
    "id": "CAPABILITY.DEVICE.POINTER",
    "name": "Pointer"
  },
  {
    "id": "CAPABILITY.DEVICE.HOVER",
    "name": "Hover"
  },
  {
    "id": "CAPABILITY.DEVICE.PEN",
    "name": "Pen"
  },
  {
    "id": "CAPABILITY.DEVICE.CAMERA",
    "name": "Camera"
  },
  {
    "id": "CAPABILITY.DEVICE.MICROPHONE",
    "name": "Microphone"
  },
  {
    "id": "CAPABILITY.DEVICE.SPEAKER",
    "name": "Speaker"
  },
  {
    "id": "CAPABILITY.DEVICE.GPS",
    "name": "Gps"
  },
  {
    "id": "CAPABILITY.DEVICE.NFC",
    "name": "Nfc"
  },
  {
    "id": "CAPABILITY.DEVICE.BARCODE_SCANNER",
    "name": "Barcode Scanner"
  },
  {
    "id": "CAPABILITY.DEVICE.BIOMETRIC",
    "name": "Biometric"
  },
  {
    "id": "CAPABILITY.DEVICE.WEBGL",
    "name": "Webgl"
  },
  {
    "id": "CAPABILITY.DEVICE.WEBGPU",
    "name": "Webgpu"
  },
  {
    "id": "CAPABILITY.DEVICE.AR",
    "name": "Ar"
  },
  {
    "id": "CAPABILITY.DEVICE.VR",
    "name": "Vr"
  },
  {
    "id": "CAPABILITY.DEVICE.SPATIAL_TRACKING",
    "name": "Spatial Tracking"
  },
  {
    "id": "CAPABILITY.DEVICE.HAPTICS",
    "name": "Haptics"
  },
  {
    "id": "CAPABILITY.DEVICE.NETWORK",
    "name": "Network"
  },
  {
    "id": "CAPABILITY.DEVICE.OFFLINE",
    "name": "Offline"
  },
  {
    "id": "CAPABILITY.DEVICE.FILE_SYSTEM",
    "name": "File System"
  },
  {
    "id": "CAPABILITY.DEVICE.PRINTER",
    "name": "Printer"
  },
  {
    "id": "CAPABILITY.DEVICE.EXTERNAL_DISPLAY",
    "name": "External Display"
  },
  {
    "id": "CAPABILITY.DEVICE.MULTI_DISPLAY",
    "name": "Multi Display"
  },
  {
    "id": "CAPABILITY.DEVICE.SAFE_AREA",
    "name": "Safe Area"
  },
  {
    "id": "CAPABILITY.DEVICE.HINGE",
    "name": "Hinge"
  },
  {
    "id": "CAPABILITY.DEVICE.REMOTE",
    "name": "Remote"
  },
  {
    "id": "CAPABILITY.DEVICE.GAMEPAD",
    "name": "Gamepad"
  },
  {
    "id": "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
    "name": "Physical Controls"
  },
  {
    "id": "CAPABILITY.DEVICE.HIGH_CONTRAST",
    "name": "High Contrast"
  },
  {
    "id": "CAPABILITY.DEVICE.REDUCED_MOTION",
    "name": "Reduced Motion"
  },
  {
    "id": "CAPABILITY.DEVICE.SCREEN_READER",
    "name": "Screen Reader"
  },
  {
    "id": "CAPABILITY.DEVICE.BRAILLE",
    "name": "Braille"
  },
  {
    "id": "CAPABILITY.DEVICE.SWITCH_CONTROL",
    "name": "Switch Control"
  },
  {
    "id": "CAPABILITY.DEVICE.EYE_TRACKING",
    "name": "Eye Tracking"
  },
  {
    "id": "CAPABILITY.DEVICE.VOICE_CONTROL",
    "name": "Voice Control"
  },
  {
    "id": "CAPABILITY.DEVICE.BATTERY",
    "name": "Battery"
  },
  {
    "id": "CAPABILITY.DEVICE.HIGH_RESOLUTION",
    "name": "High Resolution"
  },
  {
    "id": "CAPABILITY.DEVICE.OVERSCAN",
    "name": "Overscan"
  },
  {
    "id": "CAPABILITY.DEVICE.LARGE_FORMAT",
    "name": "Large Format"
  },
  {
    "id": "CAPABILITY.DEVICE.KIOSK",
    "name": "Kiosk"
  },
  {
    "id": "CAPABILITY.DEVICE.SECURE_INPUT",
    "name": "Secure Input"
  },
  {
    "id": "CAPABILITY.DEVICE.AUDIO",
    "name": "Audio"
  },
  {
    "id": "CAPABILITY.DEVICE.VIDEO",
    "name": "Video"
  },
  {
    "id": "CAPABILITY.DEVICE.WIRELESS",
    "name": "Wireless"
  }
] as const;

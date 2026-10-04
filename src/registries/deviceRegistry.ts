export type DeviceDefinition = Readonly<{ id:string; name:string; component:string; group:string; groups:readonly string[]; defaultViewport:string; defaultOrientation:string; inputModalities:readonly string[]; capabilities:readonly string[]; safeArea:string }>;

export const DEVICE_REGISTRY: readonly DeviceDefinition[] = [
  {
    "id": "DEVICE.DESKTOP_COMPUTING.DESKTOP",
    "name": "Desktop",
    "component": "DesktopFrame",
    "group": "DESKTOP_COMPUTING",
    "groups": [
      "DESKTOP_COMPUTING"
    ],
    "defaultViewport": "VIEWPORT.DESKTOP",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.KEYBOARD",
      "INPUT.MOUSE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.HOVER",
      "CAPABILITY.DEVICE.KEYBOARD",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.FILE_SYSTEM"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.DESKTOP_COMPUTING.WORKSTATION",
    "name": "Workstation",
    "component": "WorkstationFrame",
    "group": "DESKTOP_COMPUTING",
    "groups": [
      "DESKTOP_COMPUTING"
    ],
    "defaultViewport": "VIEWPORT.DESKTOP",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.KEYBOARD",
      "INPUT.MOUSE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.HOVER",
      "CAPABILITY.DEVICE.KEYBOARD",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.FILE_SYSTEM"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.DESKTOP_COMPUTING.ALL_IN_ONE",
    "name": "All-in-One",
    "component": "AllInOneFrame",
    "group": "DESKTOP_COMPUTING",
    "groups": [
      "DESKTOP_COMPUTING"
    ],
    "defaultViewport": "VIEWPORT.DESKTOP",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.KEYBOARD",
      "INPUT.MOUSE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.HOVER",
      "CAPABILITY.DEVICE.KEYBOARD",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.FILE_SYSTEM"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.DESKTOP_COMPUTING.MINI_PC",
    "name": "Mini PC",
    "component": "MiniPCFrame",
    "group": "DESKTOP_COMPUTING",
    "groups": [
      "DESKTOP_COMPUTING"
    ],
    "defaultViewport": "VIEWPORT.DESKTOP",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.KEYBOARD",
      "INPUT.MOUSE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.HOVER",
      "CAPABILITY.DEVICE.KEYBOARD",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.FILE_SYSTEM"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.DESKTOP_COMPUTING.THIN_CLIENT",
    "name": "Thin Client",
    "component": "ThinClientFrame",
    "group": "DESKTOP_COMPUTING",
    "groups": [
      "DESKTOP_COMPUTING"
    ],
    "defaultViewport": "VIEWPORT.DESKTOP",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.KEYBOARD",
      "INPUT.MOUSE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.HOVER",
      "CAPABILITY.DEVICE.KEYBOARD",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.FILE_SYSTEM"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.DESKTOP_COMPUTING.TERMINAL",
    "name": "Terminal",
    "component": "TerminalFrame",
    "group": "DESKTOP_COMPUTING",
    "groups": [
      "DESKTOP_COMPUTING"
    ],
    "defaultViewport": "VIEWPORT.DESKTOP",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.KEYBOARD",
      "INPUT.MOUSE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.HOVER",
      "CAPABILITY.DEVICE.KEYBOARD",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.FILE_SYSTEM"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.DESKTOP_COMPUTING.DEVELOPER_WORKSTATION",
    "name": "Developer Workstation",
    "component": "DeveloperWorkstationFrame",
    "group": "DESKTOP_COMPUTING",
    "groups": [
      "DESKTOP_COMPUTING"
    ],
    "defaultViewport": "VIEWPORT.DESKTOP",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.KEYBOARD",
      "INPUT.MOUSE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.HOVER",
      "CAPABILITY.DEVICE.KEYBOARD",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.FILE_SYSTEM"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.DESKTOP_COMPUTING.TRADING_WORKSTATION",
    "name": "Trading Workstation",
    "component": "TradingWorkstationFrame",
    "group": "DESKTOP_COMPUTING",
    "groups": [
      "DESKTOP_COMPUTING"
    ],
    "defaultViewport": "VIEWPORT.DESKTOP",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.KEYBOARD",
      "INPUT.MOUSE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.HOVER",
      "CAPABILITY.DEVICE.KEYBOARD",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.FILE_SYSTEM"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.PORTABLE_COMPUTING.LAPTOP",
    "name": "Laptop",
    "component": "LaptopFrame",
    "group": "PORTABLE_COMPUTING",
    "groups": [
      "PORTABLE_COMPUTING"
    ],
    "defaultViewport": "VIEWPORT.LAPTOP",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.KEYBOARD",
      "INPUT.TRACKPAD"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.HOVER",
      "CAPABILITY.DEVICE.KEYBOARD",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.PORTABLE_COMPUTING.NOTEBOOK",
    "name": "Notebook",
    "component": "NotebookFrame",
    "group": "PORTABLE_COMPUTING",
    "groups": [
      "PORTABLE_COMPUTING"
    ],
    "defaultViewport": "VIEWPORT.LAPTOP",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.KEYBOARD",
      "INPUT.TRACKPAD"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.HOVER",
      "CAPABILITY.DEVICE.KEYBOARD",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.PORTABLE_COMPUTING.ULTRABOOK",
    "name": "Ultrabook",
    "component": "UltrabookFrame",
    "group": "PORTABLE_COMPUTING",
    "groups": [
      "PORTABLE_COMPUTING"
    ],
    "defaultViewport": "VIEWPORT.LAPTOP",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.KEYBOARD",
      "INPUT.TRACKPAD"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.HOVER",
      "CAPABILITY.DEVICE.KEYBOARD",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.PORTABLE_COMPUTING.CHROMEBOOK",
    "name": "Chromebook",
    "component": "ChromebookFrame",
    "group": "PORTABLE_COMPUTING",
    "groups": [
      "PORTABLE_COMPUTING"
    ],
    "defaultViewport": "VIEWPORT.LAPTOP",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.KEYBOARD",
      "INPUT.TRACKPAD"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.HOVER",
      "CAPABILITY.DEVICE.KEYBOARD",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.PORTABLE_COMPUTING.CONVERTIBLE_LAPTOP",
    "name": "Convertible Laptop",
    "component": "ConvertibleLaptopFrame",
    "group": "PORTABLE_COMPUTING",
    "groups": [
      "PORTABLE_COMPUTING"
    ],
    "defaultViewport": "VIEWPORT.LAPTOP",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.KEYBOARD",
      "INPUT.TRACKPAD"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.HOVER",
      "CAPABILITY.DEVICE.KEYBOARD",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.PORTABLE_COMPUTING.2_IN_1",
    "name": "2-in-1",
    "component": "Device2In1Frame",
    "group": "PORTABLE_COMPUTING",
    "groups": [
      "PORTABLE_COMPUTING"
    ],
    "defaultViewport": "VIEWPORT.LAPTOP",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.KEYBOARD",
      "INPUT.TRACKPAD"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.HOVER",
      "CAPABILITY.DEVICE.KEYBOARD",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.PORTABLE_COMPUTING.RUGGED_LAPTOP",
    "name": "Rugged Laptop",
    "component": "RuggedLaptopFrame",
    "group": "PORTABLE_COMPUTING",
    "groups": [
      "PORTABLE_COMPUTING"
    ],
    "defaultViewport": "VIEWPORT.LAPTOP",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.KEYBOARD",
      "INPUT.TRACKPAD"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.HOVER",
      "CAPABILITY.DEVICE.KEYBOARD",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.PHONES.SMARTPHONE",
    "name": "Smartphone",
    "component": "SmartphoneFrame",
    "group": "PHONES",
    "groups": [
      "PHONES"
    ],
    "defaultViewport": "VIEWPORT.MOBILE_STANDARD",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.MULTI_TOUCH",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.SAFE_AREA",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.MOBILE_NOTCH"
  },
  {
    "id": "DEVICE.PHONES.COMPACT_PHONE",
    "name": "Compact Phone",
    "component": "CompactPhoneFrame",
    "group": "PHONES",
    "groups": [
      "PHONES"
    ],
    "defaultViewport": "VIEWPORT.MOBILE_STANDARD",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.MULTI_TOUCH",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.SAFE_AREA",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.MOBILE_NOTCH"
  },
  {
    "id": "DEVICE.PHONES.LARGE_PHONE",
    "name": "Large Phone",
    "component": "LargePhoneFrame",
    "group": "PHONES",
    "groups": [
      "PHONES"
    ],
    "defaultViewport": "VIEWPORT.MOBILE_STANDARD",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.MULTI_TOUCH",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.SAFE_AREA",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.MOBILE_NOTCH"
  },
  {
    "id": "DEVICE.PHONES.PHABLET",
    "name": "Phablet",
    "component": "PhabletFrame",
    "group": "PHONES",
    "groups": [
      "PHONES"
    ],
    "defaultViewport": "VIEWPORT.MOBILE_STANDARD",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.MULTI_TOUCH",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.SAFE_AREA",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.MOBILE_NOTCH"
  },
  {
    "id": "DEVICE.PHONES.FEATURE_PHONE",
    "name": "Feature Phone",
    "component": "FeaturePhoneFrame",
    "group": "PHONES",
    "groups": [
      "PHONES"
    ],
    "defaultViewport": "VIEWPORT.MOBILE_STANDARD",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.MULTI_TOUCH",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.SAFE_AREA",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.MOBILE_NOTCH"
  },
  {
    "id": "DEVICE.PHONES.RUGGED_PHONE",
    "name": "Rugged Phone",
    "component": "RuggedPhoneFrame",
    "group": "PHONES",
    "groups": [
      "PHONES"
    ],
    "defaultViewport": "VIEWPORT.MOBILE_STANDARD",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.MULTI_TOUCH",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.SAFE_AREA",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.MOBILE_NOTCH"
  },
  {
    "id": "DEVICE.PHONES.SATELLITE_PHONE",
    "name": "Satellite Phone",
    "component": "SatellitePhoneFrame",
    "group": "PHONES",
    "groups": [
      "PHONES"
    ],
    "defaultViewport": "VIEWPORT.MOBILE_STANDARD",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.MULTI_TOUCH",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.SAFE_AREA",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.MOBILE_NOTCH"
  },
  {
    "id": "DEVICE.FOLDABLES.FOLDABLE_PHONE",
    "name": "Foldable Phone",
    "component": "FoldablePhoneFrame",
    "group": "FOLDABLES",
    "groups": [
      "FOLDABLES"
    ],
    "defaultViewport": "VIEWPORT.FOLDABLE_CLOSED",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.MULTI_TOUCH",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.HINGE",
      "CAPABILITY.DEVICE.SAFE_AREA",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.FOLDABLE_HINGE"
  },
  {
    "id": "DEVICE.FOLDABLES.BOOK_FOLDABLE",
    "name": "Book Foldable",
    "component": "BookFoldableFrame",
    "group": "FOLDABLES",
    "groups": [
      "FOLDABLES"
    ],
    "defaultViewport": "VIEWPORT.FOLDABLE_CLOSED",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.MULTI_TOUCH",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.HINGE",
      "CAPABILITY.DEVICE.SAFE_AREA",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.FOLDABLE_HINGE"
  },
  {
    "id": "DEVICE.FOLDABLES.FLIP_PHONE",
    "name": "Flip Phone",
    "component": "FlipPhoneFrame",
    "group": "FOLDABLES",
    "groups": [
      "FOLDABLES"
    ],
    "defaultViewport": "VIEWPORT.FOLDABLE_CLOSED",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.MULTI_TOUCH",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.HINGE",
      "CAPABILITY.DEVICE.SAFE_AREA",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.FOLDABLE_HINGE"
  },
  {
    "id": "DEVICE.FOLDABLES.DUAL_SCREEN_PHONE",
    "name": "Dual-Screen Phone",
    "component": "DualScreenPhoneFrame",
    "group": "FOLDABLES",
    "groups": [
      "FOLDABLES"
    ],
    "defaultViewport": "VIEWPORT.FOLDABLE_CLOSED",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.MULTI_TOUCH",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.HINGE",
      "CAPABILITY.DEVICE.SAFE_AREA",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.FOLDABLE_HINGE"
  },
  {
    "id": "DEVICE.FOLDABLES.ROLLABLE_PHONE",
    "name": "Rollable Phone",
    "component": "RollablePhoneFrame",
    "group": "FOLDABLES",
    "groups": [
      "FOLDABLES"
    ],
    "defaultViewport": "VIEWPORT.FOLDABLE_CLOSED",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.MULTI_TOUCH",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.HINGE",
      "CAPABILITY.DEVICE.SAFE_AREA",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.FOLDABLE_HINGE"
  },
  {
    "id": "DEVICE.TABLETS.TABLET",
    "name": "Tablet",
    "component": "TabletFrame",
    "group": "TABLETS",
    "groups": [
      "TABLETS"
    ],
    "defaultViewport": "VIEWPORT.TABLET",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PEN"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.MULTI_TOUCH",
      "CAPABILITY.DEVICE.PEN",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.TABLET_ROUNDED"
  },
  {
    "id": "DEVICE.TABLETS.MINI_TABLET",
    "name": "Mini Tablet",
    "component": "MiniTabletFrame",
    "group": "TABLETS",
    "groups": [
      "TABLETS"
    ],
    "defaultViewport": "VIEWPORT.TABLET",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PEN"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.MULTI_TOUCH",
      "CAPABILITY.DEVICE.PEN",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.TABLET_ROUNDED"
  },
  {
    "id": "DEVICE.TABLETS.STANDARD_TABLET",
    "name": "Standard Tablet",
    "component": "StandardTabletFrame",
    "group": "TABLETS",
    "groups": [
      "TABLETS"
    ],
    "defaultViewport": "VIEWPORT.TABLET",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PEN"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.MULTI_TOUCH",
      "CAPABILITY.DEVICE.PEN",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.TABLET_ROUNDED"
  },
  {
    "id": "DEVICE.TABLETS.LARGE_TABLET",
    "name": "Large Tablet",
    "component": "LargeTabletFrame",
    "group": "TABLETS",
    "groups": [
      "TABLETS"
    ],
    "defaultViewport": "VIEWPORT.TABLET",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PEN"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.MULTI_TOUCH",
      "CAPABILITY.DEVICE.PEN",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.TABLET_ROUNDED"
  },
  {
    "id": "DEVICE.TABLETS.PRO_TABLET",
    "name": "Pro Tablet",
    "component": "ProTabletFrame",
    "group": "TABLETS",
    "groups": [
      "TABLETS"
    ],
    "defaultViewport": "VIEWPORT.TABLET",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PEN"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.MULTI_TOUCH",
      "CAPABILITY.DEVICE.PEN",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.TABLET_ROUNDED"
  },
  {
    "id": "DEVICE.TABLETS.RUGGED_TABLET",
    "name": "Rugged Tablet",
    "component": "RuggedTabletFrame",
    "group": "TABLETS",
    "groups": [
      "TABLETS"
    ],
    "defaultViewport": "VIEWPORT.TABLET",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PEN"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.MULTI_TOUCH",
      "CAPABILITY.DEVICE.PEN",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.TABLET_ROUNDED"
  },
  {
    "id": "DEVICE.TABLETS.E_INK_TABLET",
    "name": "E-Ink Tablet",
    "component": "EInkTabletFrame",
    "group": "TABLETS",
    "groups": [
      "TABLETS"
    ],
    "defaultViewport": "VIEWPORT.TABLET",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PEN"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.MULTI_TOUCH",
      "CAPABILITY.DEVICE.PEN",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.TABLET_ROUNDED"
  },
  {
    "id": "DEVICE.TABLETS.DRAWING_TABLET",
    "name": "Drawing Tablet",
    "component": "DrawingTabletFrame",
    "group": "TABLETS",
    "groups": [
      "TABLETS"
    ],
    "defaultViewport": "VIEWPORT.TABLET",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PEN"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.MULTI_TOUCH",
      "CAPABILITY.DEVICE.PEN",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.TABLET_ROUNDED"
  },
  {
    "id": "DEVICE.HANDHELD_ENTERPRISE.PDA",
    "name": "PDA",
    "component": "PDAFrame",
    "group": "HANDHELD_ENTERPRISE",
    "groups": [
      "HANDHELD_ENTERPRISE"
    ],
    "defaultViewport": "VIEWPORT.HANDHELD",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS",
      "INPUT.SCANNER"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.BARCODE_SCANNER",
      "CAPABILITY.DEVICE.NFC",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.OFFLINE",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.HANDHELD_ENTERPRISE.WAREHOUSE_HANDHELD",
    "name": "Warehouse Handheld",
    "component": "WarehouseHandheldFrame",
    "group": "HANDHELD_ENTERPRISE",
    "groups": [
      "HANDHELD_ENTERPRISE"
    ],
    "defaultViewport": "VIEWPORT.HANDHELD",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS",
      "INPUT.SCANNER"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.BARCODE_SCANNER",
      "CAPABILITY.DEVICE.NFC",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.OFFLINE",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.HANDHELD_ENTERPRISE.BARCODE_TERMINAL",
    "name": "Barcode Terminal",
    "component": "BarcodeTerminalFrame",
    "group": "HANDHELD_ENTERPRISE",
    "groups": [
      "HANDHELD_ENTERPRISE"
    ],
    "defaultViewport": "VIEWPORT.HANDHELD",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS",
      "INPUT.SCANNER"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.BARCODE_SCANNER",
      "CAPABILITY.DEVICE.NFC",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.OFFLINE",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.HANDHELD_ENTERPRISE.INVENTORY_SCANNER",
    "name": "Inventory Scanner",
    "component": "InventoryScannerFrame",
    "group": "HANDHELD_ENTERPRISE",
    "groups": [
      "HANDHELD_ENTERPRISE"
    ],
    "defaultViewport": "VIEWPORT.HANDHELD",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS",
      "INPUT.SCANNER"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.BARCODE_SCANNER",
      "CAPABILITY.DEVICE.NFC",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.OFFLINE",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.HANDHELD_ENTERPRISE.FIELD_TERMINAL",
    "name": "Field Terminal",
    "component": "FieldTerminalFrame",
    "group": "HANDHELD_ENTERPRISE",
    "groups": [
      "HANDHELD_ENTERPRISE"
    ],
    "defaultViewport": "VIEWPORT.HANDHELD",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS",
      "INPUT.SCANNER"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.BARCODE_SCANNER",
      "CAPABILITY.DEVICE.NFC",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.OFFLINE",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.HANDHELD_ENTERPRISE.DELIVERY_HANDHELD",
    "name": "Delivery Handheld",
    "component": "DeliveryHandheldFrame",
    "group": "HANDHELD_ENTERPRISE",
    "groups": [
      "HANDHELD_ENTERPRISE"
    ],
    "defaultViewport": "VIEWPORT.HANDHELD",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS",
      "INPUT.SCANNER"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.BARCODE_SCANNER",
      "CAPABILITY.DEVICE.NFC",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.OFFLINE",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.WEARABLES.SMARTWATCH",
    "name": "Smartwatch",
    "component": "SmartwatchFrame",
    "group": "WEARABLES",
    "groups": [
      "WEARABLES"
    ],
    "defaultViewport": "VIEWPORT.WEARABLE",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS",
      "INPUT.VOICE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.HAPTICS",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.BIOMETRIC",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.WATCH_ROUND"
  },
  {
    "id": "DEVICE.WEARABLES.FITNESS_BAND",
    "name": "Fitness Band",
    "component": "FitnessBandFrame",
    "group": "WEARABLES",
    "groups": [
      "WEARABLES"
    ],
    "defaultViewport": "VIEWPORT.WEARABLE",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS",
      "INPUT.VOICE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.HAPTICS",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.BIOMETRIC",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.WATCH_ROUND"
  },
  {
    "id": "DEVICE.WEARABLES.SMART_RING",
    "name": "Smart Ring",
    "component": "SmartRingFrame",
    "group": "WEARABLES",
    "groups": [
      "WEARABLES"
    ],
    "defaultViewport": "VIEWPORT.WEARABLE",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS",
      "INPUT.VOICE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.HAPTICS",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.BIOMETRIC",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.WATCH_ROUND"
  },
  {
    "id": "DEVICE.WEARABLES.MEDICAL_WEARABLE",
    "name": "Medical Wearable",
    "component": "MedicalWearableFrame",
    "group": "WEARABLES",
    "groups": [
      "WEARABLES"
    ],
    "defaultViewport": "VIEWPORT.WEARABLE",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS",
      "INPUT.VOICE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.HAPTICS",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.BIOMETRIC",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.WATCH_ROUND"
  },
  {
    "id": "DEVICE.WEARABLES.BODY_WORN_DEVICE",
    "name": "Body-Worn Device",
    "component": "BodyWornDeviceFrame",
    "group": "WEARABLES",
    "groups": [
      "WEARABLES"
    ],
    "defaultViewport": "VIEWPORT.WEARABLE",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS",
      "INPUT.VOICE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.HAPTICS",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.BIOMETRIC",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.WATCH_ROUND"
  },
  {
    "id": "DEVICE.WEARABLES.BODY_CAMERA",
    "name": "Body Camera",
    "component": "BodyCameraFrame",
    "group": "WEARABLES",
    "groups": [
      "WEARABLES"
    ],
    "defaultViewport": "VIEWPORT.WEARABLE",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS",
      "INPUT.VOICE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.HAPTICS",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.BIOMETRIC",
      "CAPABILITY.DEVICE.BATTERY"
    ],
    "safeArea": "SAFE_AREA.WATCH_ROUND"
  },
  {
    "id": "DEVICE.SMART_GLASSES.SMART_GLASSES",
    "name": "Smart Glasses",
    "component": "SmartGlassesFrame",
    "group": "SMART_GLASSES",
    "groups": [
      "SMART_GLASSES"
    ],
    "defaultViewport": "VIEWPORT.XR_COMPACT",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.VOICE",
      "INPUT.SPATIAL_HAND"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.SPATIAL_TRACKING",
      "CAPABILITY.DEVICE.AR",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.XR_VIEWPORT"
  },
  {
    "id": "DEVICE.SMART_GLASSES.AR_GLASSES",
    "name": "AR Glasses",
    "component": "ARGlassesFrame",
    "group": "SMART_GLASSES",
    "groups": [
      "SMART_GLASSES"
    ],
    "defaultViewport": "VIEWPORT.XR_COMPACT",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.VOICE",
      "INPUT.SPATIAL_HAND"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.SPATIAL_TRACKING",
      "CAPABILITY.DEVICE.AR",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.XR_VIEWPORT"
  },
  {
    "id": "DEVICE.SMART_GLASSES.INDUSTRIAL_GLASSES",
    "name": "Industrial Glasses",
    "component": "IndustrialGlassesFrame",
    "group": "SMART_GLASSES",
    "groups": [
      "SMART_GLASSES"
    ],
    "defaultViewport": "VIEWPORT.XR_COMPACT",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.VOICE",
      "INPUT.SPATIAL_HAND"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.SPATIAL_TRACKING",
      "CAPABILITY.DEVICE.AR",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.XR_VIEWPORT"
  },
  {
    "id": "DEVICE.SMART_GLASSES.ASSISTED_REALITY_GLASSES",
    "name": "Assisted-Reality Glasses",
    "component": "AssistedRealityGlassesFrame",
    "group": "SMART_GLASSES",
    "groups": [
      "SMART_GLASSES"
    ],
    "defaultViewport": "VIEWPORT.XR_COMPACT",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.VOICE",
      "INPUT.SPATIAL_HAND"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.SPATIAL_TRACKING",
      "CAPABILITY.DEVICE.AR",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.XR_VIEWPORT"
  },
  {
    "id": "DEVICE.XR_SPATIAL.VR_HEADSET",
    "name": "VR Headset",
    "component": "VRHeadsetFrame",
    "group": "XR_SPATIAL",
    "groups": [
      "XR_SPATIAL"
    ],
    "defaultViewport": "VIEWPORT.XR",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.SPATIAL_HAND",
      "INPUT.CONTROLLER",
      "INPUT.GAZE",
      "INPUT.VOICE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.SPATIAL_TRACKING",
      "CAPABILITY.DEVICE.AR",
      "CAPABILITY.DEVICE.VR",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.HAPTICS"
    ],
    "safeArea": "SAFE_AREA.XR_VIEWPORT"
  },
  {
    "id": "DEVICE.XR_SPATIAL.AR_HEADSET",
    "name": "AR Headset",
    "component": "ARHeadsetFrame",
    "group": "XR_SPATIAL",
    "groups": [
      "XR_SPATIAL"
    ],
    "defaultViewport": "VIEWPORT.XR",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.SPATIAL_HAND",
      "INPUT.CONTROLLER",
      "INPUT.GAZE",
      "INPUT.VOICE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.SPATIAL_TRACKING",
      "CAPABILITY.DEVICE.AR",
      "CAPABILITY.DEVICE.VR",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.HAPTICS"
    ],
    "safeArea": "SAFE_AREA.XR_VIEWPORT"
  },
  {
    "id": "DEVICE.XR_SPATIAL.MIXED_REALITY_HEADSET",
    "name": "Mixed-Reality Headset",
    "component": "MixedRealityHeadsetFrame",
    "group": "XR_SPATIAL",
    "groups": [
      "XR_SPATIAL"
    ],
    "defaultViewport": "VIEWPORT.XR",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.SPATIAL_HAND",
      "INPUT.CONTROLLER",
      "INPUT.GAZE",
      "INPUT.VOICE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.SPATIAL_TRACKING",
      "CAPABILITY.DEVICE.AR",
      "CAPABILITY.DEVICE.VR",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.HAPTICS"
    ],
    "safeArea": "SAFE_AREA.XR_VIEWPORT"
  },
  {
    "id": "DEVICE.XR_SPATIAL.SPATIAL_COMPUTER",
    "name": "Spatial Computer",
    "component": "SpatialComputerFrame",
    "group": "XR_SPATIAL",
    "groups": [
      "XR_SPATIAL"
    ],
    "defaultViewport": "VIEWPORT.XR",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.SPATIAL_HAND",
      "INPUT.CONTROLLER",
      "INPUT.GAZE",
      "INPUT.VOICE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.SPATIAL_TRACKING",
      "CAPABILITY.DEVICE.AR",
      "CAPABILITY.DEVICE.VR",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.HAPTICS"
    ],
    "safeArea": "SAFE_AREA.XR_VIEWPORT"
  },
  {
    "id": "DEVICE.XR_SPATIAL.IMMERSIVE_HEADSET",
    "name": "Immersive Headset",
    "component": "ImmersiveHeadsetFrame",
    "group": "XR_SPATIAL",
    "groups": [
      "XR_SPATIAL"
    ],
    "defaultViewport": "VIEWPORT.XR",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.SPATIAL_HAND",
      "INPUT.CONTROLLER",
      "INPUT.GAZE",
      "INPUT.VOICE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.SPATIAL_TRACKING",
      "CAPABILITY.DEVICE.AR",
      "CAPABILITY.DEVICE.VR",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.HAPTICS"
    ],
    "safeArea": "SAFE_AREA.XR_VIEWPORT"
  },
  {
    "id": "DEVICE.DESKTOP_DISPLAYS.STANDARD_MONITOR",
    "name": "Standard Monitor",
    "component": "StandardMonitorFrame",
    "group": "DESKTOP_DISPLAYS",
    "groups": [
      "DESKTOP_DISPLAYS"
    ],
    "defaultViewport": "VIEWPORT.DESKTOP",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.MOUSE",
      "INPUT.KEYBOARD"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.HOVER",
      "CAPABILITY.DEVICE.HIGH_RESOLUTION"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.DESKTOP_DISPLAYS.WIDESCREEN_MONITOR",
    "name": "Widescreen Monitor",
    "component": "WidescreenMonitorFrame",
    "group": "DESKTOP_DISPLAYS",
    "groups": [
      "DESKTOP_DISPLAYS"
    ],
    "defaultViewport": "VIEWPORT.DESKTOP",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.MOUSE",
      "INPUT.KEYBOARD"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.HOVER",
      "CAPABILITY.DEVICE.HIGH_RESOLUTION"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.DESKTOP_DISPLAYS.ULTRAWIDE",
    "name": "Ultrawide",
    "component": "UltrawideFrame",
    "group": "DESKTOP_DISPLAYS",
    "groups": [
      "DESKTOP_DISPLAYS"
    ],
    "defaultViewport": "VIEWPORT.DESKTOP",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.MOUSE",
      "INPUT.KEYBOARD"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.HOVER",
      "CAPABILITY.DEVICE.HIGH_RESOLUTION"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.DESKTOP_DISPLAYS.SUPER_ULTRAWIDE",
    "name": "Super Ultrawide",
    "component": "SuperUltrawideFrame",
    "group": "DESKTOP_DISPLAYS",
    "groups": [
      "DESKTOP_DISPLAYS"
    ],
    "defaultViewport": "VIEWPORT.DESKTOP",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.MOUSE",
      "INPUT.KEYBOARD"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.HOVER",
      "CAPABILITY.DEVICE.HIGH_RESOLUTION"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.DESKTOP_DISPLAYS.PORTRAIT_MONITOR",
    "name": "Portrait Monitor",
    "component": "PortraitMonitorFrame",
    "group": "DESKTOP_DISPLAYS",
    "groups": [
      "DESKTOP_DISPLAYS"
    ],
    "defaultViewport": "VIEWPORT.DESKTOP",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.MOUSE",
      "INPUT.KEYBOARD"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.HOVER",
      "CAPABILITY.DEVICE.HIGH_RESOLUTION"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.DESKTOP_DISPLAYS.TOUCH_MONITOR",
    "name": "Touch Monitor",
    "component": "TouchMonitorFrame",
    "group": "DESKTOP_DISPLAYS",
    "groups": [
      "DESKTOP_DISPLAYS"
    ],
    "defaultViewport": "VIEWPORT.DESKTOP",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.MOUSE",
      "INPUT.KEYBOARD"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.HOVER",
      "CAPABILITY.DEVICE.HIGH_RESOLUTION"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.MULTI_DISPLAY.DUAL_MONITOR",
    "name": "Dual Monitor",
    "component": "DualMonitorFrame",
    "group": "MULTI_DISPLAY",
    "groups": [
      "MULTI_DISPLAY"
    ],
    "defaultViewport": "VIEWPORT.MULTI_DISPLAY",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.MOUSE",
      "INPUT.KEYBOARD"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.MULTI_DISPLAY",
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.HOVER"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.MULTI_DISPLAY.TRIPLE_MONITOR",
    "name": "Triple Monitor",
    "component": "TripleMonitorFrame",
    "group": "MULTI_DISPLAY",
    "groups": [
      "MULTI_DISPLAY"
    ],
    "defaultViewport": "VIEWPORT.MULTI_DISPLAY",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.MOUSE",
      "INPUT.KEYBOARD"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.MULTI_DISPLAY",
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.HOVER"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.MULTI_DISPLAY.MULTI_MONITOR_WALL",
    "name": "Multi-Monitor Wall",
    "component": "MultiMonitorWallFrame",
    "group": "MULTI_DISPLAY",
    "groups": [
      "MULTI_DISPLAY"
    ],
    "defaultViewport": "VIEWPORT.MULTI_DISPLAY",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.MOUSE",
      "INPUT.KEYBOARD"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.MULTI_DISPLAY",
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.HOVER"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.MULTI_DISPLAY.OPERATOR_CONSOLE",
    "name": "Operator Console",
    "component": "OperatorConsoleFrame",
    "group": "MULTI_DISPLAY",
    "groups": [
      "MULTI_DISPLAY"
    ],
    "defaultViewport": "VIEWPORT.MULTI_DISPLAY",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.MOUSE",
      "INPUT.KEYBOARD"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.MULTI_DISPLAY",
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.HOVER"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.TELEVISION.TV",
    "name": "TV",
    "component": "TVFrame",
    "group": "TELEVISION",
    "groups": [
      "TELEVISION"
    ],
    "defaultViewport": "VIEWPORT.TV_FHD",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.REMOTE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.REMOTE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.OVERSCAN"
    ],
    "safeArea": "SAFE_AREA.TV_OVERSCAN"
  },
  {
    "id": "DEVICE.TELEVISION.SMART_TV",
    "name": "Smart TV",
    "component": "SmartTVFrame",
    "group": "TELEVISION",
    "groups": [
      "TELEVISION"
    ],
    "defaultViewport": "VIEWPORT.TV_FHD",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.REMOTE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.REMOTE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.OVERSCAN"
    ],
    "safeArea": "SAFE_AREA.TV_OVERSCAN"
  },
  {
    "id": "DEVICE.TELEVISION.LARGE_TV",
    "name": "Large TV",
    "component": "LargeTVFrame",
    "group": "TELEVISION",
    "groups": [
      "TELEVISION"
    ],
    "defaultViewport": "VIEWPORT.TV_FHD",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.REMOTE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.REMOTE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.OVERSCAN"
    ],
    "safeArea": "SAFE_AREA.TV_OVERSCAN"
  },
  {
    "id": "DEVICE.TELEVISION.HOSPITALITY_TV",
    "name": "Hospitality TV",
    "component": "HospitalityTVFrame",
    "group": "TELEVISION",
    "groups": [
      "TELEVISION"
    ],
    "defaultViewport": "VIEWPORT.TV_FHD",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.REMOTE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.REMOTE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.OVERSCAN"
    ],
    "safeArea": "SAFE_AREA.TV_OVERSCAN"
  },
  {
    "id": "DEVICE.LARGE_FORMAT.PROJECTOR",
    "name": "Projector",
    "component": "ProjectorFrame",
    "group": "LARGE_FORMAT",
    "groups": [
      "LARGE_FORMAT"
    ],
    "defaultViewport": "VIEWPORT.LARGE_DISPLAY",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.REMOTE",
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.LARGE_FORMAT",
      "CAPABILITY.DEVICE.EXTERNAL_DISPLAY"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.LARGE_FORMAT.LED_WALL",
    "name": "LED Wall",
    "component": "LEDWallFrame",
    "group": "LARGE_FORMAT",
    "groups": [
      "LARGE_FORMAT"
    ],
    "defaultViewport": "VIEWPORT.LARGE_DISPLAY",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.REMOTE",
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.LARGE_FORMAT",
      "CAPABILITY.DEVICE.EXTERNAL_DISPLAY"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.LARGE_FORMAT.VIDEO_WALL",
    "name": "Video Wall",
    "component": "VideoWallFrame",
    "group": "LARGE_FORMAT",
    "groups": [
      "LARGE_FORMAT"
    ],
    "defaultViewport": "VIEWPORT.LARGE_DISPLAY",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.REMOTE",
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.LARGE_FORMAT",
      "CAPABILITY.DEVICE.EXTERNAL_DISPLAY"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.LARGE_FORMAT.LARGE_INTERACTIVE_DISPLAY",
    "name": "Large Interactive Display",
    "component": "LargeInteractiveDisplayFrame",
    "group": "LARGE_FORMAT",
    "groups": [
      "LARGE_FORMAT"
    ],
    "defaultViewport": "VIEWPORT.LARGE_DISPLAY",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.REMOTE",
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.LARGE_FORMAT",
      "CAPABILITY.DEVICE.EXTERNAL_DISPLAY"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.LARGE_FORMAT.CONFERENCE_DISPLAY",
    "name": "Conference Display",
    "component": "ConferenceDisplayFrame",
    "group": "LARGE_FORMAT",
    "groups": [
      "LARGE_FORMAT"
    ],
    "defaultViewport": "VIEWPORT.LARGE_DISPLAY",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.REMOTE",
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.LARGE_FORMAT",
      "CAPABILITY.DEVICE.EXTERNAL_DISPLAY"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.SIGNAGE.DIGITAL_SIGNAGE",
    "name": "Digital Signage",
    "component": "DigitalSignageFrame",
    "group": "SIGNAGE",
    "groups": [
      "SIGNAGE"
    ],
    "defaultViewport": "VIEWPORT.SIGNAGE",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.REMOTE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.KIOSK",
      "CAPABILITY.DEVICE.EXTERNAL_DISPLAY"
    ],
    "safeArea": "SAFE_AREA.KIOSK_BEZEL"
  },
  {
    "id": "DEVICE.SIGNAGE.MENU_BOARD",
    "name": "Menu Board",
    "component": "MenuBoardFrame",
    "group": "SIGNAGE",
    "groups": [
      "SIGNAGE"
    ],
    "defaultViewport": "VIEWPORT.SIGNAGE",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.REMOTE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.KIOSK",
      "CAPABILITY.DEVICE.EXTERNAL_DISPLAY"
    ],
    "safeArea": "SAFE_AREA.KIOSK_BEZEL"
  },
  {
    "id": "DEVICE.SIGNAGE.INFORMATION_DISPLAY",
    "name": "Information Display",
    "component": "InformationDisplayFrame",
    "group": "SIGNAGE",
    "groups": [
      "SIGNAGE"
    ],
    "defaultViewport": "VIEWPORT.SIGNAGE",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.REMOTE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.KIOSK",
      "CAPABILITY.DEVICE.EXTERNAL_DISPLAY"
    ],
    "safeArea": "SAFE_AREA.KIOSK_BEZEL"
  },
  {
    "id": "DEVICE.SIGNAGE.ADVERTISING_DISPLAY",
    "name": "Advertising Display",
    "component": "AdvertisingDisplayFrame",
    "group": "SIGNAGE",
    "groups": [
      "SIGNAGE"
    ],
    "defaultViewport": "VIEWPORT.SIGNAGE",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.REMOTE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.KIOSK",
      "CAPABILITY.DEVICE.EXTERNAL_DISPLAY"
    ],
    "safeArea": "SAFE_AREA.KIOSK_BEZEL"
  },
  {
    "id": "DEVICE.KIOSK.INFORMATION_KIOSK",
    "name": "Information Kiosk",
    "component": "InformationKioskFrame",
    "group": "KIOSK",
    "groups": [
      "KIOSK"
    ],
    "defaultViewport": "VIEWPORT.KIOSK_PORTRAIT",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.KIOSK",
      "CAPABILITY.DEVICE.SAFE_AREA",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.KIOSK_BEZEL"
  },
  {
    "id": "DEVICE.KIOSK.SELF_SERVICE_KIOSK",
    "name": "Self-Service Kiosk",
    "component": "SelfServiceKioskFrame",
    "group": "KIOSK",
    "groups": [
      "KIOSK"
    ],
    "defaultViewport": "VIEWPORT.KIOSK_PORTRAIT",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.KIOSK",
      "CAPABILITY.DEVICE.SAFE_AREA",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.KIOSK_BEZEL"
  },
  {
    "id": "DEVICE.KIOSK.TICKETING_KIOSK",
    "name": "Ticketing Kiosk",
    "component": "TicketingKioskFrame",
    "group": "KIOSK",
    "groups": [
      "KIOSK"
    ],
    "defaultViewport": "VIEWPORT.KIOSK_PORTRAIT",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.KIOSK",
      "CAPABILITY.DEVICE.SAFE_AREA",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.KIOSK_BEZEL"
  },
  {
    "id": "DEVICE.KIOSK.CHECK_IN_KIOSK",
    "name": "Check-In Kiosk",
    "component": "CheckInKioskFrame",
    "group": "KIOSK",
    "groups": [
      "KIOSK"
    ],
    "defaultViewport": "VIEWPORT.KIOSK_PORTRAIT",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.KIOSK",
      "CAPABILITY.DEVICE.SAFE_AREA",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.KIOSK_BEZEL"
  },
  {
    "id": "DEVICE.KIOSK.ORDERING_KIOSK",
    "name": "Ordering Kiosk",
    "component": "OrderingKioskFrame",
    "group": "KIOSK",
    "groups": [
      "KIOSK"
    ],
    "defaultViewport": "VIEWPORT.KIOSK_PORTRAIT",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.KIOSK",
      "CAPABILITY.DEVICE.SAFE_AREA",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.KIOSK_BEZEL"
  },
  {
    "id": "DEVICE.WALLBOARD.OPERATIONS_WALLBOARD",
    "name": "Operations Wallboard",
    "component": "OperationsWallboardFrame",
    "group": "WALLBOARD",
    "groups": [
      "WALLBOARD"
    ],
    "defaultViewport": "VIEWPORT.WALLBOARD",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.REMOTE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.LARGE_FORMAT",
      "CAPABILITY.DEVICE.EXTERNAL_DISPLAY",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.WALLBOARD.DASHBOARD_WALLBOARD",
    "name": "Dashboard Wallboard",
    "component": "DashboardWallboardFrame",
    "group": "WALLBOARD",
    "groups": [
      "WALLBOARD"
    ],
    "defaultViewport": "VIEWPORT.WALLBOARD",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.REMOTE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.LARGE_FORMAT",
      "CAPABILITY.DEVICE.EXTERNAL_DISPLAY",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.WALLBOARD.COMMAND_WALL",
    "name": "Command Wall",
    "component": "CommandWallFrame",
    "group": "WALLBOARD",
    "groups": [
      "WALLBOARD"
    ],
    "defaultViewport": "VIEWPORT.WALLBOARD",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.REMOTE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.LARGE_FORMAT",
      "CAPABILITY.DEVICE.EXTERNAL_DISPLAY",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.WALLBOARD.SITUATION_BOARD",
    "name": "Situation Board",
    "component": "SituationBoardFrame",
    "group": "WALLBOARD",
    "groups": [
      "WALLBOARD"
    ],
    "defaultViewport": "VIEWPORT.WALLBOARD",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.REMOTE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.LARGE_FORMAT",
      "CAPABILITY.DEVICE.EXTERNAL_DISPLAY",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.POS.POS_TERMINAL",
    "name": "POS Terminal",
    "component": "POSTerminalFrame",
    "group": "POS",
    "groups": [
      "POS"
    ],
    "defaultViewport": "VIEWPORT.POS",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.SCANNER"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.BARCODE_SCANNER",
      "CAPABILITY.DEVICE.NFC",
      "CAPABILITY.DEVICE.PRINTER",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.POS.TOUCH_POS",
    "name": "Touch POS",
    "component": "TouchPOSFrame",
    "group": "POS",
    "groups": [
      "POS"
    ],
    "defaultViewport": "VIEWPORT.POS",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.SCANNER"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.BARCODE_SCANNER",
      "CAPABILITY.DEVICE.NFC",
      "CAPABILITY.DEVICE.PRINTER",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.POS.RETAIL_REGISTER",
    "name": "Retail Register",
    "component": "RetailRegisterFrame",
    "group": "POS",
    "groups": [
      "POS"
    ],
    "defaultViewport": "VIEWPORT.POS",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.SCANNER"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.BARCODE_SCANNER",
      "CAPABILITY.DEVICE.NFC",
      "CAPABILITY.DEVICE.PRINTER",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.POS.RESTAURANT_POS",
    "name": "Restaurant POS",
    "component": "RestaurantPOSFrame",
    "group": "POS",
    "groups": [
      "POS"
    ],
    "defaultViewport": "VIEWPORT.POS",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.SCANNER"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.BARCODE_SCANNER",
      "CAPABILITY.DEVICE.NFC",
      "CAPABILITY.DEVICE.PRINTER",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.POS.MOBILE_POS",
    "name": "Mobile POS",
    "component": "MobilePOSFrame",
    "group": "POS",
    "groups": [
      "POS"
    ],
    "defaultViewport": "VIEWPORT.POS",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.SCANNER"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.BARCODE_SCANNER",
      "CAPABILITY.DEVICE.NFC",
      "CAPABILITY.DEVICE.PRINTER",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.PAYMENT.PAYMENT_TERMINAL",
    "name": "Payment Terminal",
    "component": "PaymentTerminalFrame",
    "group": "PAYMENT",
    "groups": [
      "PAYMENT"
    ],
    "defaultViewport": "VIEWPORT.PAYMENT",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.NFC",
      "CAPABILITY.DEVICE.SECURE_INPUT",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.PAYMENT.CARD_TERMINAL",
    "name": "Card Terminal",
    "component": "CardTerminalFrame",
    "group": "PAYMENT",
    "groups": [
      "PAYMENT"
    ],
    "defaultViewport": "VIEWPORT.PAYMENT",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.NFC",
      "CAPABILITY.DEVICE.SECURE_INPUT",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.PAYMENT.PIN_PAD",
    "name": "PIN Pad",
    "component": "PINPadFrame",
    "group": "PAYMENT",
    "groups": [
      "PAYMENT"
    ],
    "defaultViewport": "VIEWPORT.PAYMENT",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.NFC",
      "CAPABILITY.DEVICE.SECURE_INPUT",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.PAYMENT.QR_PAYMENT_DISPLAY",
    "name": "QR Payment Display",
    "component": "QRPaymentDisplayFrame",
    "group": "PAYMENT",
    "groups": [
      "PAYMENT"
    ],
    "defaultViewport": "VIEWPORT.PAYMENT",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.NFC",
      "CAPABILITY.DEVICE.SECURE_INPUT",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.AUTOMOTIVE.INFOTAINMENT_DISPLAY",
    "name": "Infotainment Display",
    "component": "InfotainmentDisplayFrame",
    "group": "AUTOMOTIVE",
    "groups": [
      "AUTOMOTIVE"
    ],
    "defaultViewport": "VIEWPORT.AUTOMOTIVE",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.STEERING_CONTROLS",
      "INPUT.VOICE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
      "CAPABILITY.DEVICE.VOICE_CONTROL",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.AUTOMOTIVE_CLUSTER"
  },
  {
    "id": "DEVICE.AUTOMOTIVE.INSTRUMENT_CLUSTER",
    "name": "Instrument Cluster",
    "component": "InstrumentClusterFrame",
    "group": "AUTOMOTIVE",
    "groups": [
      "AUTOMOTIVE"
    ],
    "defaultViewport": "VIEWPORT.AUTOMOTIVE",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.STEERING_CONTROLS",
      "INPUT.VOICE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
      "CAPABILITY.DEVICE.VOICE_CONTROL",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.AUTOMOTIVE_CLUSTER"
  },
  {
    "id": "DEVICE.AUTOMOTIVE.AUTOMOTIVE_HUD",
    "name": "Automotive HUD",
    "component": "AutomotiveHUDFrame",
    "group": "AUTOMOTIVE",
    "groups": [
      "AUTOMOTIVE"
    ],
    "defaultViewport": "VIEWPORT.AUTOMOTIVE",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.STEERING_CONTROLS",
      "INPUT.VOICE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
      "CAPABILITY.DEVICE.VOICE_CONTROL",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.AUTOMOTIVE_CLUSTER"
  },
  {
    "id": "DEVICE.AUTOMOTIVE.CENTER_CONSOLE",
    "name": "Center Console",
    "component": "CenterConsoleFrame",
    "group": "AUTOMOTIVE",
    "groups": [
      "AUTOMOTIVE"
    ],
    "defaultViewport": "VIEWPORT.AUTOMOTIVE",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.STEERING_CONTROLS",
      "INPUT.VOICE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
      "CAPABILITY.DEVICE.VOICE_CONTROL",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.AUTOMOTIVE_CLUSTER"
  },
  {
    "id": "DEVICE.AUTOMOTIVE.REAR_SEAT_DISPLAY",
    "name": "Rear-Seat Display",
    "component": "RearSeatDisplayFrame",
    "group": "AUTOMOTIVE",
    "groups": [
      "AUTOMOTIVE"
    ],
    "defaultViewport": "VIEWPORT.AUTOMOTIVE",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.STEERING_CONTROLS",
      "INPUT.VOICE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
      "CAPABILITY.DEVICE.VOICE_CONTROL",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.AUTOMOTIVE_CLUSTER"
  },
  {
    "id": "DEVICE.MOBILITY.EV_CHARGER_SCREEN",
    "name": "EV Charger Screen",
    "component": "EVChargerScreenFrame",
    "group": "MOBILITY",
    "groups": [
      "MOBILITY"
    ],
    "defaultViewport": "VIEWPORT.MOBILITY",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.GPS",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.MOBILITY.TAXI_DISPLAY",
    "name": "Taxi Display",
    "component": "TaxiDisplayFrame",
    "group": "MOBILITY",
    "groups": [
      "MOBILITY"
    ],
    "defaultViewport": "VIEWPORT.MOBILITY",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.GPS",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.MOBILITY.FLEET_TERMINAL",
    "name": "Fleet Terminal",
    "component": "FleetTerminalFrame",
    "group": "MOBILITY",
    "groups": [
      "MOBILITY"
    ],
    "defaultViewport": "VIEWPORT.MOBILITY",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.GPS",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.MOBILITY.NAVIGATION_DISPLAY",
    "name": "Navigation Display",
    "component": "NavigationDisplayFrame",
    "group": "MOBILITY",
    "groups": [
      "MOBILITY"
    ],
    "defaultViewport": "VIEWPORT.MOBILITY",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.GPS",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.INDUSTRIAL.INDUSTRIAL_HMI",
    "name": "Industrial HMI",
    "component": "IndustrialHMIFrame",
    "group": "INDUSTRIAL",
    "groups": [
      "INDUSTRIAL"
    ],
    "defaultViewport": "VIEWPORT.INDUSTRIAL",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.OFFLINE"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.INDUSTRIAL.MACHINE_PANEL",
    "name": "Machine Panel",
    "component": "MachinePanelFrame",
    "group": "INDUSTRIAL",
    "groups": [
      "INDUSTRIAL"
    ],
    "defaultViewport": "VIEWPORT.INDUSTRIAL",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.OFFLINE"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.INDUSTRIAL.PLC_CONSOLE",
    "name": "PLC Console",
    "component": "PLCConsoleFrame",
    "group": "INDUSTRIAL",
    "groups": [
      "INDUSTRIAL"
    ],
    "defaultViewport": "VIEWPORT.INDUSTRIAL",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.OFFLINE"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.INDUSTRIAL.FACTORY_TERMINAL",
    "name": "Factory Terminal",
    "component": "FactoryTerminalFrame",
    "group": "INDUSTRIAL",
    "groups": [
      "INDUSTRIAL"
    ],
    "defaultViewport": "VIEWPORT.INDUSTRIAL",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.OFFLINE"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.INDUSTRIAL.SCADA_CONSOLE",
    "name": "SCADA Console",
    "component": "SCADAConsoleFrame",
    "group": "INDUSTRIAL",
    "groups": [
      "INDUSTRIAL"
    ],
    "defaultViewport": "VIEWPORT.INDUSTRIAL",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.OFFLINE"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.CONTROL_SYSTEMS.CONTROL_ROOM_CONSOLE",
    "name": "Control Room Console",
    "component": "ControlRoomConsoleFrame",
    "group": "CONTROL_SYSTEMS",
    "groups": [
      "CONTROL_SYSTEMS"
    ],
    "defaultViewport": "VIEWPORT.CONTROL_ROOM",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.MOUSE",
      "INPUT.KEYBOARD",
      "INPUT.PHYSICAL_CONTROLS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.MULTI_DISPLAY",
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.KEYBOARD",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.CONTROL_SYSTEMS.OPERATOR_STATION",
    "name": "Operator Station",
    "component": "OperatorStationFrame",
    "group": "CONTROL_SYSTEMS",
    "groups": [
      "CONTROL_SYSTEMS"
    ],
    "defaultViewport": "VIEWPORT.CONTROL_ROOM",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.MOUSE",
      "INPUT.KEYBOARD",
      "INPUT.PHYSICAL_CONTROLS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.MULTI_DISPLAY",
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.KEYBOARD",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.CONTROL_SYSTEMS.MISSION_CONTROL_CONSOLE",
    "name": "Mission-Control Console",
    "component": "MissionControlConsoleFrame",
    "group": "CONTROL_SYSTEMS",
    "groups": [
      "CONTROL_SYSTEMS"
    ],
    "defaultViewport": "VIEWPORT.CONTROL_ROOM",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.MOUSE",
      "INPUT.KEYBOARD",
      "INPUT.PHYSICAL_CONTROLS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.MULTI_DISPLAY",
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.KEYBOARD",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.CONTROL_SYSTEMS.COCKPIT_DISPLAY",
    "name": "Cockpit Display",
    "component": "CockpitDisplayFrame",
    "group": "CONTROL_SYSTEMS",
    "groups": [
      "CONTROL_SYSTEMS",
      "AVIATION"
    ],
    "defaultViewport": "VIEWPORT.CONTROL_ROOM",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.MOUSE",
      "INPUT.KEYBOARD",
      "INPUT.PHYSICAL_CONTROLS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.MULTI_DISPLAY",
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.KEYBOARD",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.MEDICAL.MEDICAL_MONITOR",
    "name": "Medical Monitor",
    "component": "MedicalMonitorFrame",
    "group": "MEDICAL",
    "groups": [
      "MEDICAL"
    ],
    "defaultViewport": "VIEWPORT.MEDICAL",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.MOUSE",
      "INPUT.KEYBOARD"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.HIGH_CONTRAST",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.MEDICAL.BEDSIDE_MONITOR",
    "name": "Bedside Monitor",
    "component": "BedsideMonitorFrame",
    "group": "MEDICAL",
    "groups": [
      "MEDICAL"
    ],
    "defaultViewport": "VIEWPORT.MEDICAL",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.MOUSE",
      "INPUT.KEYBOARD"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.HIGH_CONTRAST",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.MEDICAL.DIAGNOSTIC_CONSOLE",
    "name": "Diagnostic Console",
    "component": "DiagnosticConsoleFrame",
    "group": "MEDICAL",
    "groups": [
      "MEDICAL"
    ],
    "defaultViewport": "VIEWPORT.MEDICAL",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.MOUSE",
      "INPUT.KEYBOARD"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.HIGH_CONTRAST",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.MEDICAL.IMAGING_WORKSTATION",
    "name": "Imaging Workstation",
    "component": "ImagingWorkstationFrame",
    "group": "MEDICAL",
    "groups": [
      "MEDICAL"
    ],
    "defaultViewport": "VIEWPORT.MEDICAL",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.MOUSE",
      "INPUT.KEYBOARD"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.HIGH_CONTRAST",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.MEDICAL.PATIENT_KIOSK",
    "name": "Patient Kiosk",
    "component": "PatientKioskFrame",
    "group": "MEDICAL",
    "groups": [
      "MEDICAL"
    ],
    "defaultViewport": "VIEWPORT.MEDICAL",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.MOUSE",
      "INPUT.KEYBOARD"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.HIGH_CONTRAST",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.SMART_HOME.SMART_DISPLAY",
    "name": "Smart Display",
    "component": "SmartDisplayFrame",
    "group": "SMART_HOME",
    "groups": [
      "SMART_HOME"
    ],
    "defaultViewport": "VIEWPORT.SMART_DISPLAY",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.VOICE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.SMART_HOME.HOME_HUB",
    "name": "Home Hub",
    "component": "HomeHubFrame",
    "group": "SMART_HOME",
    "groups": [
      "SMART_HOME"
    ],
    "defaultViewport": "VIEWPORT.SMART_DISPLAY",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.VOICE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.SMART_HOME.THERMOSTAT_DISPLAY",
    "name": "Thermostat Display",
    "component": "ThermostatDisplayFrame",
    "group": "SMART_HOME",
    "groups": [
      "SMART_HOME"
    ],
    "defaultViewport": "VIEWPORT.SMART_DISPLAY",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.VOICE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.SMART_HOME.INTERCOM_SCREEN",
    "name": "Intercom Screen",
    "component": "IntercomScreenFrame",
    "group": "SMART_HOME",
    "groups": [
      "SMART_HOME"
    ],
    "defaultViewport": "VIEWPORT.SMART_DISPLAY",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.VOICE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.SMART_HOME.DOORBELL_SCREEN",
    "name": "Doorbell Screen",
    "component": "DoorbellScreenFrame",
    "group": "SMART_HOME",
    "groups": [
      "SMART_HOME"
    ],
    "defaultViewport": "VIEWPORT.SMART_DISPLAY",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.VOICE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.MICROPHONE",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.APPLIANCES.REFRIGERATOR_DISPLAY",
    "name": "Refrigerator Display",
    "component": "RefrigeratorDisplayFrame",
    "group": "APPLIANCES",
    "groups": [
      "APPLIANCES"
    ],
    "defaultViewport": "VIEWPORT.EMBEDDED",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS"
    ],
    "safeArea": "SAFE_AREA.EMBEDDED_BEZEL"
  },
  {
    "id": "DEVICE.APPLIANCES.OVEN_DISPLAY",
    "name": "Oven Display",
    "component": "OvenDisplayFrame",
    "group": "APPLIANCES",
    "groups": [
      "APPLIANCES"
    ],
    "defaultViewport": "VIEWPORT.EMBEDDED",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS"
    ],
    "safeArea": "SAFE_AREA.EMBEDDED_BEZEL"
  },
  {
    "id": "DEVICE.APPLIANCES.WASHER_DISPLAY",
    "name": "Washer Display",
    "component": "WasherDisplayFrame",
    "group": "APPLIANCES",
    "groups": [
      "APPLIANCES"
    ],
    "defaultViewport": "VIEWPORT.EMBEDDED",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS"
    ],
    "safeArea": "SAFE_AREA.EMBEDDED_BEZEL"
  },
  {
    "id": "DEVICE.APPLIANCES.APPLIANCE_CONTROL_PANEL",
    "name": "Appliance Control Panel",
    "component": "ApplianceControlPanelFrame",
    "group": "APPLIANCES",
    "groups": [
      "APPLIANCES"
    ],
    "defaultViewport": "VIEWPORT.EMBEDDED",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS"
    ],
    "safeArea": "SAFE_AREA.EMBEDDED_BEZEL"
  },
  {
    "id": "DEVICE.AUDIO_DEVICES.SMART_SPEAKER_DISPLAY",
    "name": "Smart Speaker Display",
    "component": "SmartSpeakerDisplayFrame",
    "group": "AUDIO_DEVICES",
    "groups": [
      "AUDIO_DEVICES"
    ],
    "defaultViewport": "VIEWPORT.CONSOLE",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_CONTROLS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
      "CAPABILITY.DEVICE.AUDIO"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.AUDIO_DEVICES.AUDIO_CONSOLE",
    "name": "Audio Console",
    "component": "AudioConsoleFrame",
    "group": "AUDIO_DEVICES",
    "groups": [
      "AUDIO_DEVICES"
    ],
    "defaultViewport": "VIEWPORT.CONSOLE",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_CONTROLS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
      "CAPABILITY.DEVICE.AUDIO"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.AUDIO_DEVICES.MIXING_CONSOLE",
    "name": "Mixing Console",
    "component": "MixingConsoleFrame",
    "group": "AUDIO_DEVICES",
    "groups": [
      "AUDIO_DEVICES"
    ],
    "defaultViewport": "VIEWPORT.CONSOLE",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_CONTROLS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
      "CAPABILITY.DEVICE.AUDIO"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.AUDIO_DEVICES.DJ_DISPLAY",
    "name": "DJ Display",
    "component": "DJDisplayFrame",
    "group": "AUDIO_DEVICES",
    "groups": [
      "AUDIO_DEVICES"
    ],
    "defaultViewport": "VIEWPORT.CONSOLE",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_CONTROLS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
      "CAPABILITY.DEVICE.AUDIO"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.CAMERAS.CAMERA_LCD",
    "name": "Camera LCD",
    "component": "CameraLCDFrame",
    "group": "CAMERAS",
    "groups": [
      "CAMERAS"
    ],
    "defaultViewport": "VIEWPORT.CAMERA",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_CONTROLS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.CAMERAS.CINEMA_CAMERA_MONITOR",
    "name": "Cinema Camera Monitor",
    "component": "CinemaCameraMonitorFrame",
    "group": "CAMERAS",
    "groups": [
      "CAMERAS"
    ],
    "defaultViewport": "VIEWPORT.CAMERA",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_CONTROLS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.CAMERAS.PTZ_CONTROLLER",
    "name": "PTZ Controller",
    "component": "PTZControllerFrame",
    "group": "CAMERAS",
    "groups": [
      "CAMERAS"
    ],
    "defaultViewport": "VIEWPORT.CAMERA",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_CONTROLS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.CAMERAS.FIELD_MONITOR",
    "name": "Field Monitor",
    "component": "FieldMonitorFrame",
    "group": "CAMERAS",
    "groups": [
      "CAMERAS"
    ],
    "defaultViewport": "VIEWPORT.CAMERA",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_CONTROLS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.PRODUCTION.DIRECTOR_MONITOR",
    "name": "Director Monitor",
    "component": "DirectorMonitorFrame",
    "group": "PRODUCTION",
    "groups": [
      "PRODUCTION"
    ],
    "defaultViewport": "VIEWPORT.PRODUCTION",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_CONTROLS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.VIDEO",
      "CAPABILITY.DEVICE.EXTERNAL_DISPLAY",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.PRODUCTION.VIDEO_VILLAGE_DISPLAY",
    "name": "Video Village Display",
    "component": "VideoVillageDisplayFrame",
    "group": "PRODUCTION",
    "groups": [
      "PRODUCTION"
    ],
    "defaultViewport": "VIEWPORT.PRODUCTION",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_CONTROLS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.VIDEO",
      "CAPABILITY.DEVICE.EXTERNAL_DISPLAY",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.PRODUCTION.PRODUCTION_MONITOR",
    "name": "Production Monitor",
    "component": "ProductionMonitorFrame",
    "group": "PRODUCTION",
    "groups": [
      "PRODUCTION"
    ],
    "defaultViewport": "VIEWPORT.PRODUCTION",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_CONTROLS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.VIDEO",
      "CAPABILITY.DEVICE.EXTERNAL_DISPLAY",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.PRODUCTION.TELEPROMPTER",
    "name": "Teleprompter",
    "component": "TeleprompterFrame",
    "group": "PRODUCTION",
    "groups": [
      "PRODUCTION"
    ],
    "defaultViewport": "VIEWPORT.PRODUCTION",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_CONTROLS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.VIDEO",
      "CAPABILITY.DEVICE.EXTERNAL_DISPLAY",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.GAMING.CONSOLE_DISPLAY",
    "name": "Console Display",
    "component": "ConsoleDisplayFrame",
    "group": "GAMING",
    "groups": [
      "GAMING"
    ],
    "defaultViewport": "VIEWPORT.GAMING",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.GAMEPAD",
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.GAMEPAD",
      "CAPABILITY.DEVICE.HAPTICS",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.GAMING.GAMING_MONITOR",
    "name": "Gaming Monitor",
    "component": "GamingMonitorFrame",
    "group": "GAMING",
    "groups": [
      "GAMING"
    ],
    "defaultViewport": "VIEWPORT.GAMING",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.GAMEPAD",
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.GAMEPAD",
      "CAPABILITY.DEVICE.HAPTICS",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.GAMING.HANDHELD_CONSOLE",
    "name": "Handheld Console",
    "component": "HandheldConsoleFrame",
    "group": "GAMING",
    "groups": [
      "GAMING"
    ],
    "defaultViewport": "VIEWPORT.GAMING",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.GAMEPAD",
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.GAMEPAD",
      "CAPABILITY.DEVICE.HAPTICS",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.GAMING.CLOUD_GAMING_SCREEN",
    "name": "Cloud Gaming Screen",
    "component": "CloudGamingScreenFrame",
    "group": "GAMING",
    "groups": [
      "GAMING"
    ],
    "defaultViewport": "VIEWPORT.GAMING",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.GAMEPAD",
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.GAMEPAD",
      "CAPABILITY.DEVICE.HAPTICS",
      "CAPABILITY.DEVICE.SPEAKER",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.EMBEDDED.EMBEDDED_TOUCHSCREEN",
    "name": "Embedded Touchscreen",
    "component": "EmbeddedTouchscreenFrame",
    "group": "EMBEDDED",
    "groups": [
      "EMBEDDED"
    ],
    "defaultViewport": "VIEWPORT.EMBEDDED",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
      "CAPABILITY.DEVICE.OFFLINE"
    ],
    "safeArea": "SAFE_AREA.EMBEDDED_BEZEL"
  },
  {
    "id": "DEVICE.EMBEDDED.IOT_DISPLAY",
    "name": "IoT Display",
    "component": "IoTDisplayFrame",
    "group": "EMBEDDED",
    "groups": [
      "EMBEDDED"
    ],
    "defaultViewport": "VIEWPORT.EMBEDDED",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
      "CAPABILITY.DEVICE.OFFLINE"
    ],
    "safeArea": "SAFE_AREA.EMBEDDED_BEZEL"
  },
  {
    "id": "DEVICE.EMBEDDED.DEVICE_CONTROL_PANEL",
    "name": "Device Control Panel",
    "component": "DeviceControlPanelFrame",
    "group": "EMBEDDED",
    "groups": [
      "EMBEDDED"
    ],
    "defaultViewport": "VIEWPORT.EMBEDDED",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
      "CAPABILITY.DEVICE.OFFLINE"
    ],
    "safeArea": "SAFE_AREA.EMBEDDED_BEZEL"
  },
  {
    "id": "DEVICE.EMBEDDED.OEM_EMBEDDED_DISPLAY",
    "name": "OEM Embedded Display",
    "component": "OEMEmbeddedDisplayFrame",
    "group": "EMBEDDED",
    "groups": [
      "EMBEDDED"
    ],
    "defaultViewport": "VIEWPORT.EMBEDDED",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_BUTTONS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
      "CAPABILITY.DEVICE.OFFLINE"
    ],
    "safeArea": "SAFE_AREA.EMBEDDED_BEZEL"
  },
  {
    "id": "DEVICE.REMOTE_CONTROLS.SMART_REMOTE",
    "name": "Smart Remote",
    "component": "SmartRemoteFrame",
    "group": "REMOTE_CONTROLS",
    "groups": [
      "REMOTE_CONTROLS"
    ],
    "defaultViewport": "VIEWPORT.REMOTE",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.PHYSICAL_BUTTONS",
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
      "CAPABILITY.DEVICE.WIRELESS"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.REMOTE_CONTROLS.INDUSTRIAL_REMOTE",
    "name": "Industrial Remote",
    "component": "IndustrialRemoteFrame",
    "group": "REMOTE_CONTROLS",
    "groups": [
      "REMOTE_CONTROLS"
    ],
    "defaultViewport": "VIEWPORT.REMOTE",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.PHYSICAL_BUTTONS",
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
      "CAPABILITY.DEVICE.WIRELESS"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.REMOTE_CONTROLS.DRONE_CONTROLLER",
    "name": "Drone Controller",
    "component": "DroneControllerFrame",
    "group": "REMOTE_CONTROLS",
    "groups": [
      "REMOTE_CONTROLS",
      "DRONES"
    ],
    "defaultViewport": "VIEWPORT.REMOTE",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.PHYSICAL_BUTTONS",
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
      "CAPABILITY.DEVICE.WIRELESS"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.REMOTE_CONTROLS.CAMERA_CONTROLLER",
    "name": "Camera Controller",
    "component": "CameraControllerFrame",
    "group": "REMOTE_CONTROLS",
    "groups": [
      "REMOTE_CONTROLS"
    ],
    "defaultViewport": "VIEWPORT.REMOTE",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.PHYSICAL_BUTTONS",
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
      "CAPABILITY.DEVICE.WIRELESS"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.ROBOTICS.ROBOT_CONSOLE",
    "name": "Robot Console",
    "component": "RobotConsoleFrame",
    "group": "ROBOTICS",
    "groups": [
      "ROBOTICS"
    ],
    "defaultViewport": "VIEWPORT.INDUSTRIAL",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_CONTROLS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.OFFLINE"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.ROBOTICS.ROBOT_TEACH_PENDANT",
    "name": "Robot Teach Pendant",
    "component": "RobotTeachPendantFrame",
    "group": "ROBOTICS",
    "groups": [
      "ROBOTICS"
    ],
    "defaultViewport": "VIEWPORT.INDUSTRIAL",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_CONTROLS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.OFFLINE"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.ROBOTICS.AUTONOMOUS_SYSTEM_CONSOLE",
    "name": "Autonomous-System Console",
    "component": "AutonomousSystemConsoleFrame",
    "group": "ROBOTICS",
    "groups": [
      "ROBOTICS"
    ],
    "defaultViewport": "VIEWPORT.INDUSTRIAL",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_CONTROLS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.OFFLINE"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.DRONES.GROUND_CONTROL_STATION",
    "name": "Ground Control Station",
    "component": "GroundControlStationFrame",
    "group": "DRONES",
    "groups": [
      "DRONES"
    ],
    "defaultViewport": "VIEWPORT.DRONE",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.CONTROLLER",
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.GPS",
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.DRONES.FPV_DISPLAY",
    "name": "FPV Display",
    "component": "FPVDisplayFrame",
    "group": "DRONES",
    "groups": [
      "DRONES"
    ],
    "defaultViewport": "VIEWPORT.DRONE",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.CONTROLLER",
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.CAMERA",
      "CAPABILITY.DEVICE.GPS",
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.MARINE.MARINE_NAVIGATION_DISPLAY",
    "name": "Marine Navigation Display",
    "component": "MarineNavigationDisplayFrame",
    "group": "MARINE",
    "groups": [
      "MARINE"
    ],
    "defaultViewport": "VIEWPORT.INDUSTRIAL",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_CONTROLS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.GPS",
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.MARINE.VESSEL_CONSOLE",
    "name": "Vessel Console",
    "component": "VesselConsoleFrame",
    "group": "MARINE",
    "groups": [
      "MARINE"
    ],
    "defaultViewport": "VIEWPORT.INDUSTRIAL",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_CONTROLS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.GPS",
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.MARINE.SONAR_DISPLAY",
    "name": "Sonar Display",
    "component": "SonarDisplayFrame",
    "group": "MARINE",
    "groups": [
      "MARINE"
    ],
    "defaultViewport": "VIEWPORT.INDUSTRIAL",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_CONTROLS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.GPS",
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.AVIATION.FLIGHT_DECK_CONSOLE",
    "name": "Flight Deck Console",
    "component": "FlightDeckConsoleFrame",
    "group": "AVIATION",
    "groups": [
      "AVIATION"
    ],
    "defaultViewport": "VIEWPORT.AVIATION",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_CONTROLS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
      "CAPABILITY.DEVICE.MULTI_DISPLAY",
      "CAPABILITY.DEVICE.OFFLINE"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.AVIATION.CABIN_DISPLAY",
    "name": "Cabin Display",
    "component": "CabinDisplayFrame",
    "group": "AVIATION",
    "groups": [
      "AVIATION"
    ],
    "defaultViewport": "VIEWPORT.AVIATION",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PHYSICAL_CONTROLS"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.PHYSICAL_CONTROLS",
      "CAPABILITY.DEVICE.MULTI_DISPLAY",
      "CAPABILITY.DEVICE.OFFLINE"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.PUBLIC_INFRASTRUCTURE.TRANSIT_DISPLAY",
    "name": "Transit Display",
    "component": "TransitDisplayFrame",
    "group": "PUBLIC_INFRASTRUCTURE",
    "groups": [
      "PUBLIC_INFRASTRUCTURE"
    ],
    "defaultViewport": "VIEWPORT.SIGNAGE",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.REMOTE",
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.LARGE_FORMAT",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.EXTERNAL_DISPLAY"
    ],
    "safeArea": "SAFE_AREA.KIOSK_BEZEL"
  },
  {
    "id": "DEVICE.PUBLIC_INFRASTRUCTURE.AIRPORT_DISPLAY",
    "name": "Airport Display",
    "component": "AirportDisplayFrame",
    "group": "PUBLIC_INFRASTRUCTURE",
    "groups": [
      "PUBLIC_INFRASTRUCTURE"
    ],
    "defaultViewport": "VIEWPORT.SIGNAGE",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.REMOTE",
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.LARGE_FORMAT",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.EXTERNAL_DISPLAY"
    ],
    "safeArea": "SAFE_AREA.KIOSK_BEZEL"
  },
  {
    "id": "DEVICE.PUBLIC_INFRASTRUCTURE.RAILWAY_DISPLAY",
    "name": "Railway Display",
    "component": "RailwayDisplayFrame",
    "group": "PUBLIC_INFRASTRUCTURE",
    "groups": [
      "PUBLIC_INFRASTRUCTURE"
    ],
    "defaultViewport": "VIEWPORT.SIGNAGE",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.REMOTE",
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.LARGE_FORMAT",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.EXTERNAL_DISPLAY"
    ],
    "safeArea": "SAFE_AREA.KIOSK_BEZEL"
  },
  {
    "id": "DEVICE.PUBLIC_INFRASTRUCTURE.WAYFINDING_SCREEN",
    "name": "Wayfinding Screen",
    "component": "WayfindingScreenFrame",
    "group": "PUBLIC_INFRASTRUCTURE",
    "groups": [
      "PUBLIC_INFRASTRUCTURE"
    ],
    "defaultViewport": "VIEWPORT.SIGNAGE",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.REMOTE",
      "INPUT.TOUCH"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.LARGE_FORMAT",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.EXTERNAL_DISPLAY"
    ],
    "safeArea": "SAFE_AREA.KIOSK_BEZEL"
  },
  {
    "id": "DEVICE.EDUCATION.INTERACTIVE_WHITEBOARD",
    "name": "Interactive Whiteboard",
    "component": "InteractiveWhiteboardFrame",
    "group": "EDUCATION",
    "groups": [
      "EDUCATION"
    ],
    "defaultViewport": "VIEWPORT.EDUCATION",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PEN"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.PEN",
      "CAPABILITY.DEVICE.EXTERNAL_DISPLAY",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.EDUCATION.CLASSROOM_DISPLAY",
    "name": "Classroom Display",
    "component": "ClassroomDisplayFrame",
    "group": "EDUCATION",
    "groups": [
      "EDUCATION"
    ],
    "defaultViewport": "VIEWPORT.EDUCATION",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PEN"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.PEN",
      "CAPABILITY.DEVICE.EXTERNAL_DISPLAY",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.EDUCATION.STUDENT_TABLET",
    "name": "Student Tablet",
    "component": "StudentTabletFrame",
    "group": "EDUCATION",
    "groups": [
      "EDUCATION"
    ],
    "defaultViewport": "VIEWPORT.EDUCATION",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PEN"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.PEN",
      "CAPABILITY.DEVICE.EXTERNAL_DISPLAY",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.EDUCATION.LEARNING_KIOSK",
    "name": "Learning Kiosk",
    "component": "LearningKioskFrame",
    "group": "EDUCATION",
    "groups": [
      "EDUCATION"
    ],
    "defaultViewport": "VIEWPORT.EDUCATION",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PEN"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.PEN",
      "CAPABILITY.DEVICE.EXTERNAL_DISPLAY",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.RETAIL.SHELF_DISPLAY",
    "name": "Shelf Display",
    "component": "ShelfDisplayFrame",
    "group": "RETAIL",
    "groups": [
      "RETAIL"
    ],
    "defaultViewport": "VIEWPORT.RETAIL",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.REMOTE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.EXTERNAL_DISPLAY"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.RETAIL.PRICE_DISPLAY",
    "name": "Price Display",
    "component": "PriceDisplayFrame",
    "group": "RETAIL",
    "groups": [
      "RETAIL"
    ],
    "defaultViewport": "VIEWPORT.RETAIL",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.REMOTE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.EXTERNAL_DISPLAY"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.RETAIL.CUSTOMER_DISPLAY",
    "name": "Customer Display",
    "component": "CustomerDisplayFrame",
    "group": "RETAIL",
    "groups": [
      "RETAIL"
    ],
    "defaultViewport": "VIEWPORT.RETAIL",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.REMOTE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.EXTERNAL_DISPLAY"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.RETAIL.INTERACTIVE_PRODUCT_SCREEN",
    "name": "Interactive Product Screen",
    "component": "InteractiveProductScreenFrame",
    "group": "RETAIL",
    "groups": [
      "RETAIL"
    ],
    "defaultViewport": "VIEWPORT.RETAIL",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.REMOTE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.EXTERNAL_DISPLAY"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.EVENT.REGISTRATION_KIOSK",
    "name": "Registration Kiosk",
    "component": "RegistrationKioskFrame",
    "group": "EVENT",
    "groups": [
      "EVENT"
    ],
    "defaultViewport": "VIEWPORT.EVENT",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.SCANNER"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.BARCODE_SCANNER",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.OFFLINE"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.EVENT.CHECK_IN_TABLET",
    "name": "Check-In Tablet",
    "component": "CheckInTabletFrame",
    "group": "EVENT",
    "groups": [
      "EVENT"
    ],
    "defaultViewport": "VIEWPORT.EVENT",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.SCANNER"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.BARCODE_SCANNER",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.OFFLINE"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.EVENT.EVENT_SIGNAGE",
    "name": "Event Signage",
    "component": "EventSignageFrame",
    "group": "EVENT",
    "groups": [
      "EVENT"
    ],
    "defaultViewport": "VIEWPORT.EVENT",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.SCANNER"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.BARCODE_SCANNER",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.OFFLINE"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.EVENT.STAGE_CONFIDENCE_MONITOR",
    "name": "Stage Confidence Monitor",
    "component": "StageConfidenceMonitorFrame",
    "group": "EVENT",
    "groups": [
      "EVENT"
    ],
    "defaultViewport": "VIEWPORT.EVENT",
    "defaultOrientation": "portrait",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.SCANNER"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.BARCODE_SCANNER",
      "CAPABILITY.DEVICE.NETWORK",
      "CAPABILITY.DEVICE.OFFLINE"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.SPATIAL_EVENT_OPS.VENUE_CONTROL_SCREEN",
    "name": "Venue Control Screen",
    "component": "VenueControlScreenFrame",
    "group": "SPATIAL_EVENT_OPS",
    "groups": [
      "SPATIAL_EVENT_OPS"
    ],
    "defaultViewport": "VIEWPORT.SPATIAL_OPS",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PEN",
      "INPUT.MOUSE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.PEN",
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.WEBGL",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.SPATIAL_EVENT_OPS.FLOOR_PLAN_TABLET",
    "name": "Floor-Plan Tablet",
    "component": "FloorPlanTabletFrame",
    "group": "SPATIAL_EVENT_OPS",
    "groups": [
      "SPATIAL_EVENT_OPS"
    ],
    "defaultViewport": "VIEWPORT.SPATIAL_OPS",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PEN",
      "INPUT.MOUSE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.PEN",
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.WEBGL",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.SPATIAL_EVENT_OPS.ACCESS_SCANNER",
    "name": "Access Scanner",
    "component": "AccessScannerFrame",
    "group": "SPATIAL_EVENT_OPS",
    "groups": [
      "SPATIAL_EVENT_OPS"
    ],
    "defaultViewport": "VIEWPORT.SPATIAL_OPS",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PEN",
      "INPUT.MOUSE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.PEN",
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.WEBGL",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.SPATIAL_EVENT_OPS.PRODUCTION_COMMAND_SCREEN",
    "name": "Production Command Screen",
    "component": "ProductionCommandScreenFrame",
    "group": "SPATIAL_EVENT_OPS",
    "groups": [
      "SPATIAL_EVENT_OPS"
    ],
    "defaultViewport": "VIEWPORT.SPATIAL_OPS",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.TOUCH",
      "INPUT.PEN",
      "INPUT.MOUSE"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.TOUCH",
      "CAPABILITY.DEVICE.PEN",
      "CAPABILITY.DEVICE.POINTER",
      "CAPABILITY.DEVICE.WEBGL",
      "CAPABILITY.DEVICE.NETWORK"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.ACCESSIBILITY.SCREEN_READER_HOST",
    "name": "Screen Reader Host",
    "component": "ScreenReaderHostFrame",
    "group": "ACCESSIBILITY",
    "groups": [
      "ACCESSIBILITY"
    ],
    "defaultViewport": "VIEWPORT.ACCESSIBILITY",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.SWITCH",
      "INPUT.EYE_TRACKING",
      "INPUT.KEYBOARD"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.SCREEN_READER",
      "CAPABILITY.DEVICE.BRAILLE",
      "CAPABILITY.DEVICE.SWITCH_CONTROL",
      "CAPABILITY.DEVICE.EYE_TRACKING",
      "CAPABILITY.DEVICE.VOICE_CONTROL"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.ACCESSIBILITY.BRAILLE_DISPLAY_HOST",
    "name": "Braille Display Host",
    "component": "BrailleDisplayHostFrame",
    "group": "ACCESSIBILITY",
    "groups": [
      "ACCESSIBILITY"
    ],
    "defaultViewport": "VIEWPORT.ACCESSIBILITY",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.SWITCH",
      "INPUT.EYE_TRACKING",
      "INPUT.KEYBOARD"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.SCREEN_READER",
      "CAPABILITY.DEVICE.BRAILLE",
      "CAPABILITY.DEVICE.SWITCH_CONTROL",
      "CAPABILITY.DEVICE.EYE_TRACKING",
      "CAPABILITY.DEVICE.VOICE_CONTROL"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.ACCESSIBILITY.SWITCH_CONTROL_DEVICE",
    "name": "Switch-Control Device",
    "component": "SwitchControlDeviceFrame",
    "group": "ACCESSIBILITY",
    "groups": [
      "ACCESSIBILITY"
    ],
    "defaultViewport": "VIEWPORT.ACCESSIBILITY",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.SWITCH",
      "INPUT.EYE_TRACKING",
      "INPUT.KEYBOARD"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.SCREEN_READER",
      "CAPABILITY.DEVICE.BRAILLE",
      "CAPABILITY.DEVICE.SWITCH_CONTROL",
      "CAPABILITY.DEVICE.EYE_TRACKING",
      "CAPABILITY.DEVICE.VOICE_CONTROL"
    ],
    "safeArea": "SAFE_AREA.NONE"
  },
  {
    "id": "DEVICE.ACCESSIBILITY.EYE_TRACKING_DEVICE",
    "name": "Eye-Tracking Device",
    "component": "EyeTrackingDeviceFrame",
    "group": "ACCESSIBILITY",
    "groups": [
      "ACCESSIBILITY"
    ],
    "defaultViewport": "VIEWPORT.ACCESSIBILITY",
    "defaultOrientation": "landscape",
    "inputModalities": [
      "INPUT.SWITCH",
      "INPUT.EYE_TRACKING",
      "INPUT.KEYBOARD"
    ],
    "capabilities": [
      "CAPABILITY.DEVICE.SCREEN_READER",
      "CAPABILITY.DEVICE.BRAILLE",
      "CAPABILITY.DEVICE.SWITCH_CONTROL",
      "CAPABILITY.DEVICE.EYE_TRACKING",
      "CAPABILITY.DEVICE.VOICE_CONTROL"
    ],
    "safeArea": "SAFE_AREA.NONE"
  }
] as const;

# Devices

Alpha 6 defines **187 canonical device types across 41 device groups**. Device components are visual previews only; hardware/runtime access remains host-owned.

## Atomic import model

```tsx
import { SmartphoneFrame } from "@maataa/ui/devices/SmartphoneFrame";
import { DeviceSafeArea } from "@maataa/ui/device-atoms/DeviceSafeArea";
import { DEVICE_REGISTRY } from "@maataa/ui/registries/deviceRegistry";
```

## Device groups

- **Desktop Computing** — Desktop, Workstation, All-in-One, Mini PC, Thin Client, Terminal, Developer Workstation, Trading Workstation
- **Portable Computing** — Laptop, Notebook, Ultrabook, Chromebook, Convertible Laptop, 2-in-1, Rugged Laptop
- **Phones** — Smartphone, Compact Phone, Large Phone, Phablet, Feature Phone, Rugged Phone, Satellite Phone
- **Foldables** — Foldable Phone, Book Foldable, Flip Phone, Dual-Screen Phone, Rollable Phone
- **Tablets** — Tablet, Mini Tablet, Standard Tablet, Large Tablet, Pro Tablet, Rugged Tablet, E-Ink Tablet, Drawing Tablet
- **Handheld Enterprise** — PDA, Warehouse Handheld, Barcode Terminal, Inventory Scanner, Field Terminal, Delivery Handheld
- **Wearables** — Smartwatch, Fitness Band, Smart Ring, Medical Wearable, Body-Worn Device, Body Camera
- **Smart Glasses** — Smart Glasses, AR Glasses, Industrial Glasses, Assisted-Reality Glasses
- **Xr Spatial** — VR Headset, AR Headset, Mixed-Reality Headset, Spatial Computer, Immersive Headset
- **Desktop Displays** — Standard Monitor, Widescreen Monitor, Ultrawide, Super Ultrawide, Portrait Monitor, Touch Monitor
- **Multi Display** — Dual Monitor, Triple Monitor, Multi-Monitor Wall, Operator Console
- **Television** — TV, Smart TV, Large TV, Hospitality TV
- **Large Format** — Projector, LED Wall, Video Wall, Large Interactive Display, Conference Display
- **Signage** — Digital Signage, Menu Board, Information Display, Advertising Display
- **Kiosk** — Information Kiosk, Self-Service Kiosk, Ticketing Kiosk, Check-In Kiosk, Ordering Kiosk
- **Wallboard** — Operations Wallboard, Dashboard Wallboard, Command Wall, Situation Board
- **Pos** — POS Terminal, Touch POS, Retail Register, Restaurant POS, Mobile POS
- **Payment** — Payment Terminal, Card Terminal, PIN Pad, QR Payment Display
- **Automotive** — Infotainment Display, Instrument Cluster, Automotive HUD, Center Console, Rear-Seat Display
- **Mobility** — EV Charger Screen, Taxi Display, Fleet Terminal, Navigation Display
- **Industrial** — Industrial HMI, Machine Panel, PLC Console, Factory Terminal, SCADA Console
- **Control Systems** — Control Room Console, Operator Station, Mission-Control Console, Cockpit Display
- **Medical** — Medical Monitor, Bedside Monitor, Diagnostic Console, Imaging Workstation, Patient Kiosk
- **Smart Home** — Smart Display, Home Hub, Thermostat Display, Intercom Screen, Doorbell Screen
- **Appliances** — Refrigerator Display, Oven Display, Washer Display, Appliance Control Panel
- **Audio Devices** — Smart Speaker Display, Audio Console, Mixing Console, DJ Display
- **Cameras** — Camera LCD, Cinema Camera Monitor, PTZ Controller, Field Monitor
- **Production** — Director Monitor, Video Village Display, Production Monitor, Teleprompter
- **Gaming** — Console Display, Gaming Monitor, Handheld Console, Cloud Gaming Screen
- **Embedded** — Embedded Touchscreen, IoT Display, Device Control Panel, OEM Embedded Display
- **Remote Controls** — Smart Remote, Industrial Remote, Drone Controller, Camera Controller
- **Robotics** — Robot Console, Robot Teach Pendant, Autonomous-System Console
- **Drones** — Drone Controller, Ground Control Station, FPV Display
- **Marine** — Marine Navigation Display, Vessel Console, Sonar Display
- **Aviation** — Cockpit Display, Flight Deck Console, Cabin Display
- **Public Infrastructure** — Transit Display, Airport Display, Railway Display, Wayfinding Screen
- **Education** — Interactive Whiteboard, Classroom Display, Student Tablet, Learning Kiosk
- **Retail** — Shelf Display, Price Display, Customer Display, Interactive Product Screen
- **Event** — Registration Kiosk, Check-In Tablet, Event Signage, Stage Confidence Monitor
- **Spatial Event Ops** — Venue Control Screen, Floor-Plan Tablet, Access Scanner, Production Command Screen
- **Accessibility** — Screen Reader Host, Braille Display Host, Switch-Control Device, Eye-Tracking Device

## Responsive/device registries

- Device Registry — 187 canonical devices
- Viewport Registry — 46 viewport classes
- Input Modality Registry — 18 modalities
- Orientation Registry — 14 orientation/folding modes
- Device Capability Registry — 46 capabilities
- Safe Area Registry — 11 profiles
- Responsive Transformation Registry — 25 transformation rules

## Architecture

```text
DEVICE → VIEWPORT → INPUT MODALITY → CAPABILITY → ORIENTATION → SAFE AREA → RESPONSIVE TRANSFORMATION → LAYOUT → PAGE → WORKSPACE
```

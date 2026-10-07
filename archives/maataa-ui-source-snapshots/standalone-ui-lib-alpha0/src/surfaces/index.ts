/**
 * @maataa/ui/surfaces
 * Surface components - larger UI containers and layouts
 *
 * Includes: Modal, Toast, Tooltip, Popover, Dropdown
 */

// Core Surface Components
export { Modal, type ModalProps } from "./Modal";
export { Toast, ToastContainer, type ToastProps, type ToastType } from "./Toast";

// Overlay Components (MUI-03 Phase 2)
export { Tooltip, type TooltipProps } from "./Tooltip";
export { Popover, type PopoverProps } from "./Popover";
export { Dropdown, type DropdownProps, type DropdownItem } from "./Dropdown";

// Core surface components (MUI-05)
export { Panel, type PanelProps } from "./Panel";
export { Drawer, type DrawerProps, type DrawerPlacement } from "./Drawer";
export { Sheet, type SheetProps } from "./Sheet";

// Component metadata
export const surfaceComponents = [
  {
    id: "modal",
    name: "Modal",
    component: "Modal",
    category: "Surfaces",
    description: "A dialog component for displaying content in a focused modal overlay",
    sizes: ["sm", "md", "lg"],
  },
  {
    id: "toast",
    name: "Toast",
    component: "Toast",
    category: "Surfaces",
    description: "A notification component that appears temporarily",
    variants: ["success", "error", "warning", "info"],
  },
  {
    id: "panel",
    name: "Panel",
    component: "Panel",
    category: "Surfaces",
    description: "A static layout region with an optional header, actions, and collapse toggle",
  },
  {
    id: "drawer",
    name: "Drawer",
    component: "Drawer",
    category: "Surfaces",
    description: "A slide-in overlay panel anchored to a screen edge",
    variants: ["left", "right", "top", "bottom"],
  },
  {
    id: "sheet",
    name: "Sheet",
    component: "Sheet",
    category: "Surfaces",
    description: "A bottom sheet overlay — the mobile-friendly counterpart to Modal/Drawer",
    sizes: ["sm", "md", "lg", "full"],
  },
];

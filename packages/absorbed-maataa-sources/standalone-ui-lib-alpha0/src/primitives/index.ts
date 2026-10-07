/**
 * @maataa/ui/primitives
 * Core UI primitives - foundational components
 *
 * Includes: Button, Input, Card, Badge, Stack, Portal, VisuallyHidden,
 * Box, Flex, Grid, Container, Divider, Spacer, ScrollArea, AspectRatio
 */

// Core Components
export { Button, type ButtonProps, type ButtonVariant, type ButtonSize } from "./Button";
export { Input, type InputProps } from "./Input";
export { Card, type CardProps } from "./Card";
export { Badge, type BadgeProps, type BadgeVariant, type BadgeSize } from "./Badge";

// Foundation Layout Primitives (MUI-02)
export { Stack, type StackProps } from "./Stack";
export { Portal, type PortalProps } from "./Portal";
export { VisuallyHidden, type VisuallyHiddenProps } from "./VisuallyHidden";
export { Box, type BoxProps } from "./Box";
export { Flex, type FlexProps } from "./Flex";
export { Grid, type GridProps } from "./Grid";
export { Container, type ContainerProps } from "./Container";
export { Divider, type DividerProps } from "./Divider";
export { Spacer, type SpacerProps } from "./Spacer";
export { ScrollArea, type ScrollAreaProps } from "./ScrollArea";
export { AspectRatio, type AspectRatioProps } from "./AspectRatio";

// Component metadata for Storybook and docs
export const primitiveComponents = [
  {
    id: "button",
    name: "Button",
    component: "Button",
    category: "Primitives",
    description: "A versatile button component with multiple variants and sizes",
    variants: ["primary", "secondary", "tertiary", "danger"],
    sizes: ["sm", "md", "lg"],
  },
  {
    id: "input",
    name: "Input",
    component: "Input",
    category: "Primitives",
    description: "A text input component with optional label and error messaging",
  },
  {
    id: "card",
    name: "Card",
    component: "Card",
    category: "Primitives",
    description: "A flexible container component with optional header and footer",
  },
  {
    id: "badge",
    name: "Badge",
    component: "Badge",
    category: "Primitives",
    description: "A compact status indicator component",
    variants: ["default", "success", "warning", "error", "info"],
    sizes: ["sm", "md", "lg"],
  },
  {
    id: "box",
    name: "Box",
    component: "Box",
    category: "Primitives",
    description:
      "The most generic layout primitive, with token-based padding, margin, background, and radius shorthands",
  },
  {
    id: "flex",
    name: "Flex",
    component: "Flex",
    category: "Primitives",
    description:
      "A low-level flexbox container primitive for direction, alignment, and gap control",
  },
  {
    id: "grid",
    name: "Grid",
    component: "Grid",
    category: "Primitives",
    description: "A CSS Grid layout primitive with column/row track and gap shorthands",
  },
  {
    id: "container",
    name: "Container",
    component: "Container",
    category: "Primitives",
    description:
      "Constrains content to a maximum width and centers it, with consistent horizontal padding",
    sizes: ["sm", "md", "lg", "xl", "full"],
  },
  {
    id: "divider",
    name: "Divider",
    component: "Divider",
    category: "Primitives",
    description: "A visual separator between sections of content, with an optional inline label",
  },
  {
    id: "spacer",
    name: "Spacer",
    component: "Spacer",
    category: "Primitives",
    description: "A flexible or fixed-size gap for flex layouts",
  },
  {
    id: "scroll-area",
    name: "ScrollArea",
    component: "ScrollArea",
    category: "Primitives",
    description: "A scrollable container with consistent, themed scrollbar styling",
  },
  {
    id: "aspect-ratio",
    name: "AspectRatio",
    component: "AspectRatio",
    category: "Primitives",
    description: "Constrains content to a fixed width-to-height ratio",
  },
];

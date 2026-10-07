import type { IconBaseProps, IconType } from "react-icons";
import {
  FiAlertTriangle, FiArrowLeft, FiArrowRight, FiArrowUpRight, FiAward, FiCheck, FiCheckCircle, FiChevronDown, FiCompass,
  FiGlobe, FiHeart, FiLoader, FiLock, FiLogOut, FiMapPin, FiMenu, FiMusic, FiShield, FiStar, FiTarget, FiUsers, FiX,
} from "react-icons/fi";

/**
 * Line glyphs for inline UI (menu, arrows, status marks). NevoIcon is the
 * branded, themed icon set for navigation and surfaces; Glyph is the small
 * functional set. Add a name here rather than importing an icon library
 * from an app.
 */
export const glyphs = {
  "alert-triangle": FiAlertTriangle,
  "arrow-left": FiArrowLeft,
  "arrow-right": FiArrowRight,
  "arrow-up-right": FiArrowUpRight,
  award: FiAward,
  check: FiCheck,
  "check-circle": FiCheckCircle,
  "chevron-down": FiChevronDown,
  compass: FiCompass,
  globe: FiGlobe,
  heart: FiHeart,
  loader: FiLoader,
  lock: FiLock,
  "log-out": FiLogOut,
  "map-pin": FiMapPin,
  menu: FiMenu,
  music: FiMusic,
  shield: FiShield,
  star: FiStar,
  target: FiTarget,
  users: FiUsers,
  x: FiX,
} satisfies Record<string, IconType>;

export type GlyphName = keyof typeof glyphs;

export type GlyphProps = Omit<IconBaseProps, "name"> & { name: GlyphName };

/** Decorative by default (aria-hidden, not focusable); pass `aria-label` + `aria-hidden={false}` to make it meaningful. */
export function Glyph({ name, ...props }: GlyphProps) {
  const Icon = glyphs[name];
  return <Icon aria-hidden="true" focusable="false" {...props} />;
}

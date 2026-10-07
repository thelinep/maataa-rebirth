export const primitiveNames = Object.freeze([
  "Button","Input","Textarea","Select","Checkbox","Radio","Switch","Form","Label","Field","Icon","Text",
  "Box","Stack","Grid","Flex","Container","Portal","FocusTrap","VisuallyHidden","AriaLive","Toast","Alert",
  "Avatar","Menu","Popover","Pagination","CommandPalette","NotificationCenter","SettingsPanel","UserMenu","Search",
  "Dialog","Drawer","Tabs","Table","Tooltip"
]);
export function primitive(name, options={}) {
  if (!primitiveNames.includes(name)) throw new Error(`UNKNOWN_PRIMITIVE:${name}`);
  return Object.freeze({ kind:"maataa.primitive", name, ...options });
}

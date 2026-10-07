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

const coreComponentIds = new Set(primitiveNames.map(name => `maataa.core.${name.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`));
export function createHeadlessComponent(componentId, props={}) {
  if (!coreComponentIds.has(componentId)) throw new Error(`UNKNOWN_CORE_COMPONENT:${componentId}`);
  return Object.freeze({kind:"maataa.headless",componentId,props:Object.freeze({...props})});
}

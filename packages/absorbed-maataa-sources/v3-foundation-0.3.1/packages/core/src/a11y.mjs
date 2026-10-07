export function accessibleName(props={}) {
  return String(props["aria-label"] ?? props.label ?? props.children ?? "").trim();
}
export function assertInteractiveA11y(componentId, props={}) {
  const name=accessibleName(props);
  if (!name) throw new Error(`ACCESSIBLE_NAME_REQUIRED:${componentId}`);
  if (props.disabled && props["aria-disabled"]===false) throw new Error(`DISABLED_STATE_CONFLICT:${componentId}`);
  return true;
}
export const liveRegionPoliteness = Object.freeze(["off","polite","assertive"]);

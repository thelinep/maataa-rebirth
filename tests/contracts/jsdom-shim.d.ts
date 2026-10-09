// Minimal local typing for the jsdom already present in node_modules (no @types/jsdom installed).
declare module "jsdom" {
  export class JSDOM {
    constructor(html?: string);
    window: Window & typeof globalThis;
  }
}

import { assertDesktopProductsFresh } from "./desktop-products-fingerprint.mjs";

export default async function desktopProductsFresh() {
  await assertDesktopProductsFresh();
}

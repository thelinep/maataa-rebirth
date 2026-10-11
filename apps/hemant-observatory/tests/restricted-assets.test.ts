import assert from "node:assert/strict";
import { test } from "node:test";
import {
  assertAdityaMagCommercialRegistrationAllowed,
  restrictedAssetRegistration,
} from "../lib/restricted-assets.ts";

test("Aditya MAG stays unregistered until a permission verifier exists", () => {
  assert.deepEqual(restrictedAssetRegistration, {
    adityaMag: false,
    proprietaryAgencyConnectors: false,
  });
});

test("commercial registration fails closed even if an environment flag is set", () => {
  assert.throws(
    () => assertAdityaMagCommercialRegistrationAllowed("true"),
    /ADITYA_MAG_QUARANTINED/,
  );
});

test("non-commercial build configuration does not claim permission", () => {
  assert.doesNotThrow(() => assertAdityaMagCommercialRegistrationAllowed(undefined));
  assert.equal(restrictedAssetRegistration.adityaMag, false);
});

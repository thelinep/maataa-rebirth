/** Restricted external assets stay unavailable until a written-permission
 * verifier and a trusted signing key are implemented and configured. */
export const restrictedAssetRegistration = Object.freeze({
  adityaMag: false,
  proprietaryAgencyConnectors: false,
});

export function assertAdityaMagCommercialRegistrationAllowed(
  commercialRelease: string | undefined,
): void {
  if (commercialRelease === "true") {
    throw new Error(
      "ADITYA_MAG_QUARANTINED: commercial registration requires a verified written-permission token and configured trust anchor.",
    );
  }
}

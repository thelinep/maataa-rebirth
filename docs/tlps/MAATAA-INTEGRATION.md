# MAATAA features integrated into TLPS

TLPS Studio lives at /#/tlps/studio and is reachable from desktop navigation and mobile More. Six existing feature surfaces are reused inside the TLPS shell:

| TLPS route suffix | Existing MAATAA implementation |
|---|---|
| theme | ThemeStudio; preview, apply and export theme |
| branding | BrandingStudio; brand editing and theme handoff |
| components | SurfaceExplorer; searchable catalogue and previews |
| playground | Playground; interactive component configuration |
| builder | Sandbox; existing composition editor |
| workflow | TlpsWorkflow; browser-local production walkthrough |

Theme/Branding/Playground navigation is remapped to internal TLPS routes. Tool loading has its own Suspense boundary so lazy loading does not unmount the retained connected-project session. Project credentials are not handed to the tools. Existing theme/brand storage remains shared by design; this is not per-project asset persistence.

These are real reused implementations rather than screenshots or links out to another shell. Existing limitations remain: component previews are illustrative, compositions and workflow data are local, and these tools do not generate a finished production, book resources, approve rights or move funds. This integration does not claim every MAATAA feature/backend is now TLPS functionality.

Verification: six routes rendered without browser errors or 390px page overflow; Theme Studio→Branding Studio retained the TLPS route. Production build and demo typecheck passed. Studio hub captures are stored privately under .local/tlps-api/captures/.

export type DemoIdentityFamily = "maataa" | "deva" | "saptarishi" | "panchtatva";

export type DemoIdentityId =
  | "IDENTITY.BRAHMINI"
  | "IDENTITY.SHIV"
  | "IDENTITY.PARVATI"
  | "IDENTITY.SAPTARISHI.ATRI"
  | "IDENTITY.SAPTARISHI.BHARADVAJA"
  | "IDENTITY.SAPTARISHI.GAUTAMA"
  | "IDENTITY.SAPTARISHI.JAMADAGNI"
  | "IDENTITY.SAPTARISHI.KASHYAPA"
  | "IDENTITY.SAPTARISHI.VASHISTHA"
  | "IDENTITY.SAPTARISHI.VISHVAMITRA"
  | "IDENTITY.PANCHTATVA.PRITHVI"
  | "IDENTITY.PANCHTATVA.VARUNA"
  | "IDENTITY.PANCHTATVA.AGNI"
  | "IDENTITY.PANCHTATVA.VAYU"
  | "IDENTITY.PANCHTATVA.AKASHA";

export type IdentityMotif =
  | "lotus"
  | "trishul"
  | "mountain-lotus"
  | "star"
  | "book"
  | "evidence"
  | "flame-staff"
  | "leaf"
  | "lamp"
  | "bow-star"
  | "earth"
  | "water"
  | "fire"
  | "air"
  | "space";

export interface DemoIdentityDefinition {
  id: DemoIdentityId;
  name: string;
  family: DemoIdentityFamily;
  title: string;
  demoRole: string;
  motif: IdentityMotif;
  accent: string;
  surface: string;
  glyph: string;
  description: string;
}

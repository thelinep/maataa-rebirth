/**
 * @maataa/ui
 * Production-grade UI component library for Maataa OS
 *
 * Main entry point - re-exports all categories
 */

// Core exports by category
export * from "./primitives";
export * from "./typography";
export * from "./forms";
export * from "./actions";
export * from "./surfaces";
export * from "./navigation";
export * from "./maps";
export * from "./effects";
export * from "./data";
export * from "./status";
export * from "./trust";
export * from "./devices";
export * from "./graph";
export * from "./topology";
export * from "./observability";
export * from "./hud";
export * from "./runtime";
export * from "./knowledge";
export * from "./ai";
export * from "./code";
export * from "./notebook";
export * from "./whiteboard";
export * from "./deploy";
export * from "./mobile";
export * from "./themes";
export * from "./masterPrimitiveRegistry";
export { createMaataaProduct } from "./kernelIntegration";
export type {
  GovernedButtonProps,
  ProductApproval,
  ProductPolicyDecision,
} from "./kernelIntegration";

// Version
export const VERSION = "1.0.0-alpha.0";
export const PACKAGE_NAME = "@maataa/ui";

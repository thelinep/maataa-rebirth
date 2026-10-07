import { expect, afterEach, vi } from "vitest";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Make vi available as jest for backward compatibility in tests
globalThis.jest = vi;

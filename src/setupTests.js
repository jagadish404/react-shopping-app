import "@testing-library/jest-dom";
import { vi } from "vitest";

// Setup global fetch mock for Vitest
Object.defineProperty(window, "fetch", {
  writable: true,
  value: vi.fn(),
});

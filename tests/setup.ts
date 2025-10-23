/**
 * Vitest Test Setup
 *
 * Configures testing-library matchers and jsdom environment
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

/// <reference types="vitest" />

import "@testing-library/jest-dom";
import { vi } from "vitest";

// Polyfill scrollIntoView for jsdom
Element.prototype.scrollIntoView = vi.fn();

// Polyfill matchMedia for responsive hooks
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Polyfill IntersectionObserver for animation tests
global.IntersectionObserver = vi.fn().mockImplementation((callback) => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  root: null,
  rootMargin: "",
  thresholds: [],
}));

// Polyfill requestAnimationFrame and cancelAnimationFrame for spring animations
global.requestAnimationFrame = vi.fn((callback) => {
  return setTimeout(callback, 16) as unknown as number; // ~60fps
});

global.cancelAnimationFrame = vi.fn((id) => {
  clearTimeout(id);
});

// Polyfill performance.now for spring timing
global.performance = {
  ...global.performance,
  now: vi.fn(() => Date.now()),
};

// Polyfill DataTransfer for file upload tests
interface MockDataTransferItems {
  add: ReturnType<typeof vi.fn>;
}

interface MockDataTransfer {
  items: MockDataTransferItems;
  files: File[];
}

global.DataTransfer = class DataTransfer implements MockDataTransfer {
  items = {
    add: vi.fn(),
  };
  files: File[] = [];
} as unknown as typeof global.DataTransfer;

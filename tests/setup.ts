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

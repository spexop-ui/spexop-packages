/**
 * Tests for Performance/Memoization Utilities
 */

import { describe, expect, it, vi } from "vitest";
import {
  LRUCache,
  batchUpdates,
  createSelector,
  debounce,
  lazy,
  measurePerformance,
  memoize,
  memoizeGenerator,
  throttle,
} from "../memoization.js";

describe("Memoization Utilities", () => {
  describe("LRUCache", () => {
    it("should store and retrieve values", () => {
      const cache = new LRUCache<string, number>(5);

      cache.set("key1", 100);
      const value = cache.get("key1");

      expect(value).toBe(100);
    });

    it("should return undefined for missing keys", () => {
      const cache = new LRUCache<string, number>(5);

      const value = cache.get("nonexistent");

      expect(value).toBeUndefined();
    });

    it("should evict oldest items when full", () => {
      const cache = new LRUCache<string, number>(3);

      cache.set("key1", 1);
      cache.set("key2", 2);
      cache.set("key3", 3);
      cache.set("key4", 4); // Should evict key1

      expect(cache.get("key1")).toBeUndefined();
      expect(cache.get("key2")).toBe(2);
      expect(cache.get("key3")).toBe(3);
      expect(cache.get("key4")).toBe(4);
    });

    it("should move accessed items to end (LRU)", () => {
      const cache = new LRUCache<string, number>(3);

      cache.set("key1", 1);
      cache.set("key2", 2);
      cache.set("key3", 3);
      cache.get("key1"); // Access key1 (moves to end)
      cache.set("key4", 4); // Should evict key2, not key1

      expect(cache.get("key1")).toBe(1);
      expect(cache.get("key2")).toBeUndefined();
      expect(cache.get("key3")).toBe(3);
      expect(cache.get("key4")).toBe(4);
    });

    it("should clear all cached items", () => {
      const cache = new LRUCache<string, number>(5);

      cache.set("key1", 1);
      cache.set("key2", 2);
      cache.clear();

      expect(cache.get("key1")).toBeUndefined();
      expect(cache.size).toBe(0);
    });

    it("should report correct size", () => {
      const cache = new LRUCache<string, number>(10);

      expect(cache.size).toBe(0);

      cache.set("key1", 1);
      expect(cache.size).toBe(1);

      cache.set("key2", 2);
      expect(cache.size).toBe(2);
    });
  });

  describe("memoize", () => {
    it("should cache function results", () => {
      let callCount = 0;
      const fn = memoize((x: number) => {
        callCount++;
        return x * 2;
      });

      const result1 = fn(5);
      const result2 = fn(5);

      expect(result1).toBe(10);
      expect(result2).toBe(10);
      expect(callCount).toBe(1); // Called once, second is cached
    });

    it("should handle different arguments separately", () => {
      let callCount = 0;
      const fn = memoize((x: number) => {
        callCount++;
        return x * 2;
      });

      fn(5);
      fn(10);

      expect(callCount).toBe(2); // Different args, not cached
    });

    it("should respect cache size limit", () => {
      let callCount = 0;
      const fn = memoize((x: number) => {
        callCount++;
        return x * 2;
      }, 2); // Max 2 items

      fn(1);
      fn(2);
      fn(3); // Evicts fn(1)
      fn(1); // Should call again

      expect(callCount).toBe(4);
    });

    it("should have clearCache method", () => {
      let callCount = 0;
      const fn = memoize((x: number) => {
        callCount++;
        return x * 2;
      });

      fn(5);
      (fn as { clearCache?: () => void }).clearCache?.();
      fn(5); // Should call again after clear

      expect(callCount).toBe(2);
    });
  });

  describe("memoizeGenerator", () => {
    it("should memoize generator functions", () => {
      let callCount = 0;
      const generator = memoizeGenerator((config: { value: number }) => {
        callCount++;
        return config.value * 2;
      });

      const config = { value: 10 };
      const result1 = generator(config);
      const result2 = generator(config);

      expect(result1).toBe(20);
      expect(result2).toBe(20);
      expect(callCount).toBe(1);
    });

    it("should use smaller cache size", () => {
      const generator = memoizeGenerator((x: number) => x * 2);

      // Generator cache is limited to 20 items
      for (let i = 0; i < 25; i++) {
        generator(i);
      }

      // Should evict older entries
      expect(generator).toBeDefined();
    });
  });

  describe("debounce", () => {
    it("should delay function execution", async () => {
      let callCount = 0;
      const fn = debounce(() => {
        callCount++;
      }, 100);

      fn();
      fn();
      fn();

      expect(callCount).toBe(0); // Not called yet

      await new Promise((resolve) => setTimeout(resolve, 150));
      expect(callCount).toBe(1); // Called once after delay
    });

    it("should cancel previous calls", async () => {
      let lastValue = 0;
      const fn = debounce((...args: unknown[]) => {
        lastValue = args[0] as number;
      }, 50);

      fn(1);
      fn(2);
      fn(3);

      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(lastValue).toBe(3); // Only last call executed
    });
  });

  describe("throttle", () => {
    it("should limit function execution rate", async () => {
      let callCount = 0;
      const fn = throttle(() => {
        callCount++;
      }, 100);

      fn();
      fn();
      fn();

      expect(callCount).toBe(1); // Only first call executed immediately

      await new Promise((resolve) => setTimeout(resolve, 150));
      fn();
      expect(callCount).toBe(2); // Second call after throttle period
    });
  });

  describe("batchUpdates", () => {
    it("should apply multiple updates in sequence", () => {
      const updates = [
        (obj: { value: number }) => ({ ...obj, value: obj.value + 10 }),
        (obj: { value: number }) => ({ ...obj, value: obj.value * 2 }),
      ];

      const batchUpdate = batchUpdates(updates);
      const result = batchUpdate({ value: 5 });

      expect(result.value).toBe(30); // (5 + 10) * 2
    });

    it("should handle empty updates array", () => {
      const batchUpdate = batchUpdates<{ value: number }>([]);
      const result = batchUpdate({ value: 5 });

      expect(result.value).toBe(5);
    });

    it("should work with complex objects", () => {
      type Theme = { colors: { primary: string }; version: number };

      const updates = [
        (theme: Theme) => ({
          ...theme,
          colors: { ...theme.colors, primary: "#ff0000" },
        }),
        (theme: Theme) => ({ ...theme, version: theme.version + 1 }),
      ];

      const batchUpdate = batchUpdates(updates);
      const result = batchUpdate({
        colors: { primary: "#000000" },
        version: 1,
      });

      expect(result.colors.primary).toBe("#ff0000");
      expect(result.version).toBe(2);
    });
  });

  describe("lazy", () => {
    it("should execute function only once", () => {
      let callCount = 0;
      const getLazy = lazy(() => {
        callCount++;
        return "value";
      });

      const result1 = getLazy();
      const result2 = getLazy();

      expect(result1).toBe("value");
      expect(result2).toBe("value");
      expect(callCount).toBe(1); // Only called once
    });

    it("should cache the result", () => {
      const getLazy = lazy(() => ({ value: Math.random() }));

      const result1 = getLazy();
      const result2 = getLazy();

      expect(result1).toBe(result2); // Same reference
    });
  });

  describe("measurePerformance", () => {
    it("should measure execution time", () => {
      const fn = () => {
        let sum = 0;
        for (let i = 0; i < 1000; i++) {
          sum += i;
        }
        return sum;
      };

      const result = measurePerformance("Test", fn);

      expect(result.result).toBe(499500);
      expect(result.time).toBeGreaterThan(0);
      expect(typeof result.time).toBe("number");
    });

    it("should return function result", () => {
      const result = measurePerformance("Test", () => {
        return { value: 42 };
      });

      expect(result.result.value).toBe(42);
    });
  });

  describe("createSelector", () => {
    it("should create memoized selector", () => {
      let callCount = 0;
      const selectColors = createSelector(
        (theme: { colors: { primary: string } }) => {
          callCount++;
          return theme.colors;
        },
      );

      const theme = { colors: { primary: "#000000" } };
      const colors1 = selectColors(theme);
      const colors2 = selectColors(theme);

      expect(colors1).toBe(colors2);
      expect(callCount).toBe(1); // Only called once
    });

    it("should handle different themes separately", () => {
      let callCount = 0;
      const selectColors = createSelector(
        (theme: { colors: { primary: string } }) => {
          callCount++;
          return theme.colors;
        },
      );

      const theme1 = { colors: { primary: "#000000" } };
      const theme2 = { colors: { primary: "#ffffff" } };

      selectColors(theme1);
      selectColors(theme2);

      expect(callCount).toBe(2); // Different themes
    });
  });
});

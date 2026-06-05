import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach } from "vitest";

const storage = new Map<string, string>();

beforeEach(() => {
  storage.clear();
  Object.defineProperty(window, "localStorage", {
    configurable: true,
    value: {
      clear: () => storage.clear(),
      getItem: (key: string) => storage.get(key) ?? null,
      removeItem: (key: string) => storage.delete(key),
      setItem: (key: string, value: string) => storage.set(key, value),
    },
  });
});

afterEach(() => {
  cleanup();
  document.documentElement.dataset.theme = "light";
  document.documentElement.dataset.contrast = "normal";
  window.localStorage.clear();
});

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
  document.documentElement.lang = "en";
  document.documentElement.dataset.language = "en";
  document.documentElement.dataset.theme = "light";
  document.documentElement.dataset.contrast = "normal";
  document.cookie = "legado-de-diogenes-language=; path=/; max-age=0";
  window.localStorage.clear();
});

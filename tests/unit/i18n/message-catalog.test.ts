import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import enMessages from "@/i18n/messages/en";
import ptBRMessages from "@/i18n/messages/pt-BR";

type MessageNode = string | string[] | { [key: string]: MessageNode };

function flattenKeys(node: MessageNode, prefix = ""): string[] {
  if (typeof node === "string" || Array.isArray(node)) {
    return [prefix];
  }

  return Object.entries(node).flatMap(([key, value]) =>
    flattenKeys(value, prefix ? `${prefix}.${key}` : key),
  );
}

function flattenValues(node: MessageNode): string[] {
  if (typeof node === "string") {
    return [node];
  }

  if (Array.isArray(node)) {
    return node;
  }

  return Object.values(node).flatMap((value) => flattenValues(value));
}

describe("message catalogs", () => {
  it("keeps English and Portuguese catalog key shapes aligned", () => {
    expect(flattenKeys(ptBRMessages).toSorted()).toEqual(flattenKeys(enMessages).toSorted());
  });

  it("keeps message values non-empty", () => {
    for (const value of [...flattenValues(enMessages), ...flattenValues(ptBRMessages)]) {
      expect(value.trim()).not.toHaveLength(0);
    }
  });

  it("keeps obsolete root message catalogs removed", () => {
    expect(existsSync(path.join(process.cwd(), "messages/en.json"))).toBe(false);
    expect(existsSync(path.join(process.cwd(), "messages/pt-BR.json"))).toBe(false);
  });
});

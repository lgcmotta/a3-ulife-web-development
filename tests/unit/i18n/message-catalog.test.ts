import { describe, expect, it } from "vitest";
import enMessages from "../../../messages/en.json";
import ptBRMessages from "../../../messages/pt-BR.json";

type MessageNode = string | { [key: string]: MessageNode };

function flattenKeys(node: MessageNode, prefix = ""): string[] {
  if (typeof node === "string") {
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
});

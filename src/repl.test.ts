import { cleanInput } from "./repl.js";
import { describe, expect, test } from "vitest";

describe.each([
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: "\nfoobar foo   \n   bar ",
    expected: ["foobar", "foo", "bar"],
  },
  {
    input: "oneword",
    expected: ["oneword"],
  },
  {
    input: "",
    expected: [],
  },
  {
    input: "   \n  \n",
    expected: [],
  },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input);
    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});

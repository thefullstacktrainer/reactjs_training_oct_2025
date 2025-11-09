import { render, cleanup } from "@testing-library/react";
import { test, expect, describe, beforeEach, afterEach, vi } from "vitest";
import CareerGrid from "../src/components/CareerGrid";

const careers = [
  { id: 1, title: "DevOps Engineer", category: "IT Infrastructure" },
  { id: 2, title: "Product Manager", category: "Management" },
];

describe("Snapshot Example 5 – Nested Component", () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  test("matches snapshot of composed grid", () => {
    const { asFragment } = render(<CareerGrid careers={careers} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

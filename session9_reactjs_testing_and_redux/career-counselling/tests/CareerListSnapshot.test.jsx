import { render, cleanup } from "@testing-library/react";
import { test, expect, describe, beforeEach, afterEach, vi } from "vitest";
import CareerListSnapshot from "../src/components/CareerListSnapshot";

const mockCareers = [
  { id: 1, title: "Cloud Engineer" },
  { id: 2, title: "Data Scientist" },
  { id: 3, title: "AI Researcher" },
];

describe("Snapshot Example 4 – List Rendering", () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  test("matches snapshot for multiple list items", () => {
    const { asFragment } = render(<CareerListSnapshot careers={mockCareers} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

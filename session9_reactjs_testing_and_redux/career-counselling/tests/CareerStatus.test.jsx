import { render, cleanup } from "@testing-library/react";
import { test, expect, describe, beforeEach, afterEach, vi } from "vitest";
import CareerStatus from "../src/components/CareerStatus";

describe("Snapshot Example 3 – Conditional Rendering", () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  test("matches snapshot when registered", () => {
    const { asFragment } = render(<CareerStatus isRegistered={true} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("matches snapshot when not registered", () => {
    const { asFragment } = render(<CareerStatus isRegistered={false} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

import { render, cleanup } from "@testing-library/react";
import { test, expect, describe, beforeEach, afterEach, vi } from "vitest";
import Greeting from "../src/components/Greeting";

describe("Snapshot Example 1 – Static Component", () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  test("matches snapshot for static text", () => {
    const { asFragment } = render(<Greeting />);
    expect(asFragment()).toMatchSnapshot();
  });
});


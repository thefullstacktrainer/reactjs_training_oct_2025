import { render, cleanup } from "@testing-library/react";
import { test, expect, describe, beforeEach, afterEach, vi } from "vitest";
import WelcomeUser from "../src/components/WelcomeUser";

describe("Snapshot Example 2 – Props-based", () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  test("matches snapshot for different user names", () => {
    const { asFragment: firstRender } = render(<WelcomeUser name="Lakshmikant" />);
    expect(firstRender()).toMatchSnapshot();

    const { asFragment: secondRender } = render(<WelcomeUser name="Priya" />);
    expect(secondRender()).toMatchSnapshot();
  });
});

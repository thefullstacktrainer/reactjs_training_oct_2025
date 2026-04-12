import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  test,
  expect,
  describe,
  beforeAll,
  beforeEach,
  afterEach,
  afterAll,
  vi,
} from "vitest";
import CareerFormInteractive from "../src/components/CareerFormInteractive";

describe("User Interaction Tests", () => {
  beforeAll(() => console.log("Starting interactive tests"));
  beforeEach(() => render(<CareerFormInteractive />));
  afterEach(() => cleanup());
  afterAll(() => console.log("Completed interactive tests"));

  test("initially renders empty form", () => {
    expect(screen.getByPlaceholderText("Enter your name").value).toBe("");
    expect(screen.getByRole("combobox").value).toBe("");
  });

  test("allows typing name using fireEvent", () => {
    const input = screen.getByPlaceholderText("Enter your name");
    fireEvent.change(input, { target: { value: "Lakshmikant" } });
    expect(input.value).toBe("Lakshmikant");
  });

  test("allows selecting career using userEvent", async () => {
    const select = screen.getByRole("combobox");
    await userEvent.selectOptions(select, "AI Engineer");
    expect(select.value).toBe("AI Engineer");
  });

  test("shows success message after submit", async () => {
    const input = screen.getByPlaceholderText("Enter your name");
    const select = screen.getByRole("combobox");
    const button = screen.getByRole("button", { name: /submit/i });

    await userEvent.type(input, "Priya");
    await userEvent.selectOptions(select, "Cloud Architect");
    await userEvent.click(button);

    expect(
      screen.getByText(/Welcome Priya, you selected Cloud Architect!/i)
    ).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
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
import CareerForm from "../src/components/CareerForm";

describe("CareerForm screen() queries", () => {
  beforeAll(() => console.log("Starting CareerForm tests"));
  beforeEach(() => render(<CareerForm />));
  afterEach(() => vi.clearAllMocks());
  afterAll(() => console.log("Completed CareerForm tests"));

  test("finds heading by role", () => {
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Career Counselling Form");
  });

  test("finds form by role with label", () => {
    expect(screen.getByRole("form", { name: /career application/i })).toBeInTheDocument();
  });

  test("finds input by label text", () => {
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
  });

  test("finds input by placeholder", () => {
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
  });

  test("finds input by display value", () => {
    expect(screen.getByDisplayValue("Lakshmikant Deshpande")).toBeInTheDocument();
  });

  test("finds image by alt and title", () => {
    expect(screen.getByAltText("Career logo")).toBeInTheDocument();
    expect(screen.getByTitle("Career Path Info")).toBeInTheDocument();
  });

  test("finds button by test id", () => {
    expect(screen.getByTestId("submit-btn")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("queryBy* returns null for missing element", () => {
    expect(screen.queryByText("Nonexistent Text")).toBeNull();
  });
});

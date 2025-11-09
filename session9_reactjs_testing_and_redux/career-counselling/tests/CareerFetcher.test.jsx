import { render, screen, waitFor, cleanup } from "@testing-library/react";
import {
  test,
  expect,
  describe,
  beforeEach,
  afterEach,
  vi,
} from "vitest";
import CareerFetcher from "../src/components/CareerFetcher";

describe("Async CareerFetcher Component", () => {
  const mockCareers = [
    { id: 1, title: "AI Engineer" },
    { id: 2, title: "Cloud Architect" },
  ];

  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  test("shows loading message initially", () => {
    const mockFn = vi.fn(() => new Promise(() => {})); // never resolves
    render(<CareerFetcher loadCareers={mockFn} />);
    expect(screen.getByText("Loading careers...")).toBeInTheDocument();
  });

  test("renders careers after successful fetch", async () => {
    const mockFn = vi.fn().mockResolvedValue(mockCareers);
    render(<CareerFetcher loadCareers={mockFn} />);

    // wait until element appears
    expect(await screen.findByText("AI Engineer")).toBeInTheDocument();
    expect(screen.getByText("Cloud Architect")).toBeInTheDocument();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test("renders error message when fetch fails", async () => {
    const mockFn = vi.fn().mockRejectedValue(new Error("Network Error"));
    render(<CareerFetcher loadCareers={mockFn} />);

    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent("Failed to load careers.")
    );
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});

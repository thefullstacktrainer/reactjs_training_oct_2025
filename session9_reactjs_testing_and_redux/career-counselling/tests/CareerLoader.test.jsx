import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import {
  test,
  expect,
  describe,
  beforeEach,
  afterEach,
  vi,
} from "vitest";
import CareerLoader from "../src/components/CareerLoader";
import { fetchCareers } from "../src/services/api";

// mock the entire api module
vi.mock("../src/services/api");

describe("CareerLoader with mocked API and retry logic", () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  test("renders success flow when API resolves", async () => {
    const mockData = [
      { id: 1, title: "AI Engineer" },
      { id: 2, title: "Cloud Architect" },
    ];
    fetchCareers.mockResolvedValueOnce(mockData);

    render(<CareerLoader />);
    expect(screen.getByText("Loading careers...")).toBeInTheDocument();

    expect(await screen.findByText("AI Engineer")).toBeInTheDocument();
    expect(screen.getByText("Cloud Architect")).toBeInTheDocument();
    expect(fetchCareers).toHaveBeenCalledTimes(1);
  });

  test("renders error and retries successfully", async () => {
    fetchCareers
      .mockRejectedValueOnce(new Error("Network down"))
      .mockResolvedValueOnce([{ id: 3, title: "Data Scientist" }]);

    render(<CareerLoader />);
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent("Failed to load careers.")
    );

    fireEvent.click(screen.getByRole("button", { name: /retry/i }));
    expect(await screen.findByText("Data Scientist")).toBeInTheDocument();

    expect(fetchCareers).toHaveBeenCalledTimes(2);
  });

  test("stays in error state after two failures", async () => {
    fetchCareers.mockRejectedValue(new Error("Server down"));

    render(<CareerLoader />);
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent("Failed to load careers.")
    );
    expect(fetchCareers).toHaveBeenCalledTimes(1);
  });
});


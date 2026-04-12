import { render, screen, cleanup } from "@testing-library/react";
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
import CareerList from "../src/components/CareerList";

// sample data
const mockCareers = [
  { id: 1, title: "Data Scientist", description: "Analyze data and build models" },
  { id: 2, title: "Cloud Architect", description: "Design scalable systems" },
  { id: 3, title: "AI Engineer", description: "Develop intelligent solutions" },
];

describe("CareerList Component", () => {
  beforeAll(() => console.log("Starting CareerList tests"));
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());
  afterAll(() => console.log("Completed CareerList tests"));

  test("renders heading correctly", () => {
    render(<CareerList careers={mockCareers} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Available Career Paths"
    );
  });

  test("renders all CareerCard components", () => {
    render(<CareerList careers={mockCareers} />);
    const cards = screen.getAllByTestId("career-card");
    expect(cards).toHaveLength(mockCareers.length);
  });

  test("renders correct text content in first card", () => {
    render(<CareerList careers={mockCareers} />);
    expect(screen.getByText("Data Scientist")).toBeInTheDocument();
    expect(screen.getByText("Analyze data and build models")).toBeInTheDocument();
  });

  test("renders message when careers list is empty", () => {
    render(<CareerList careers={[]} />);
    expect(screen.getByText("No careers available")).toBeInTheDocument();
  });

  test("snapshot matches for list rendering", () => {
    const { asFragment } = render(<CareerList careers={mockCareers} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

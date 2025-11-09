import {render, screen, cleanup} from "@testing-library/react"

import { test, expect, describe, beforeAll, beforeEach, afterAll, afterEach, vi } from "vitest";
import CareerCard from "../src/components/CareerCard";

describe("Career component unit test", () => {
    beforeAll(() => {
        console.log("Starting Career Card suite")
    })
    beforeEach(() => {
        console.log("Before each test")
    })
    afterEach(() => {
        cleanup();
        console.log("After each test")
    })
    afterAll(() => {
        console.log("Completing Career Card suite")
    })

     test("render the given title", () => {
        render(<CareerCard title="AI Engineer" description="Build AI models"/>)
        expect(screen.getByText("AI Engineer")).toBeInTheDocument()
    })

})
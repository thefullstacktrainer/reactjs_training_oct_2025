import { test, expect, describe, beforeAll, beforeEach, afterAll, afterEach, vi } from "vitest";

describe("Sanity Tests", () => {
    beforeAll(() => {
        console.log("Starting sanity suite")
    })
    beforeEach(() => {
        console.log("Before each test")
    })
    afterEach(() => {
        console.log("After each test")
    })
    afterAll(() => {
        console.log("Completing sanity suite")
    })

    test("should verify true as true", () => {
        expect(true).toBe(true)
    })

    // test("should check basic arithmetic", () => {
    //     expect(2 + 2).toBe(5)
    // })
    test("should check basic arithmetic", () => {
        expect(2 + 2).toBe(4)
    })

    test("string concatenation", () => {
        const greeting = "Career" + " Counselling";
        expect(greeting).toBe("Career Counselling")
    })
    test("should verify an object structure", () => {
        const career = { id: 1, title: "AI Engineer" }
        expect(career).toHaveProperty("title", "AI Engineer")
    })

    test("should test a mocked function using vi.fn() ", () => {
        const mockFn = vi.fn().mockReturnValue("Career Added")
        const result = mockFn("AI Engineer")
        expect(mockFn).toHaveBeenCalledWith("AI Engineer")
        expect(result).toBe("Career Added")

    })
})
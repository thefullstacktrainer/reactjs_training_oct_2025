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
})
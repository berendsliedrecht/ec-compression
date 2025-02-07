import { describe, expect, test } from "bun:test"

import { modSqrt } from "../src/math"

describe("math", () => {
	test("modSqrt", () => {
		expect(modSqrt(2n, 113n)).toBe(62n)
		expect(modSqrt(10n, 13n)).toBe(7n)
		expect(modSqrt(56n, 101n)).toBe(37n)
		expect(modSqrt(1030n, 10009n)).toBe(1632n)
		expect(modSqrt(44402n, 100049n)).toBe(30468n)
		expect(modSqrt(665820697n, 1000000009n)).toBe(378633312n)
		expect(modSqrt(881398088036n, 1000000000039n)).toBe(791399408049n)
		expect(() => modSqrt(1032n, 10009n)).toThrow()
	})
})

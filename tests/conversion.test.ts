import { describe, expect, test } from "bun:test"
import { bigintToBytes, bytesToBigint } from "../src/conversion"

describe("conversion", () => {
	test("round trip bigint to bytes to bigint", () => {
		const testVectors = [
			123123123123n,
			0x02873468235fafafan,
			0x036b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c2n,
			0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296n,
			0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5n,
		]

		for (const val of testVectors) {
			expect(bytesToBigint(bigintToBytes(val))).toStrictEqual(val)
		}
	})

	test("round trip bytes to bigint to bytes", () => {
		const testVectors = [new Uint8Array([3, 12, 18, 36, 88, 4])]

		for (const val of testVectors) {
			expect(bigintToBytes(bytesToBigint(val))).toStrictEqual(val)
		}
	})
})

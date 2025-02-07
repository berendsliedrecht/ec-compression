import { bigintToBytes, bytesToBigint } from "./conversion"
import type { CurveParams } from "./curveParams"
import { modSqrt } from "./math"

export class AffinePoint {
	public constructor(
		public x: bigint,
		public y: bigint,
	) {}

	public static fromCompressedPoint(
		compressedForm: bigint,
		curveParams: CurveParams,
	): AffinePoint {
		const compressedAsBytes = bigintToBytes(compressedForm)
		const initialByte = compressedAsBytes[0]

		if (initialByte !== 0x02 && initialByte !== 0x03) {
			throw new Error("Invalid initial byte for compressed form")
		}

		const isYEven = compressedAsBytes[0] % 2 === 0
		const xAsBytes = compressedAsBytes.slice(1)

		const x = bytesToBigint(xAsBytes)
		const y = AffinePoint.findAssociatedY(
			isYEven,
			bytesToBigint(xAsBytes),
			curveParams,
		)

		return new AffinePoint(x, y)
	}

	private static findAssociatedY(
		isYEven: boolean,
		x: bigint,
		curveParams: CurveParams,
	): bigint {
		const { p, a, b } = curveParams
		if (x < 0n || x > p - 1n) {
			throw Error("X coordinate is outside of the plane")
		}

		const yPrime = modSqrt((x ** 3n % p) + a * x + b, p)
		const isYPrimeEven = yPrime % 2n === 0n
		const y = isYPrimeEven === isYEven ? yPrime : p - yPrime

		return y
	}

	public get xAsBytes() {
		return bigintToBytes(this.x)
	}

	public get yAsBytes() {
		return bigintToBytes(this.y)
	}

	private get isYEven() {
		return Number(this.y % 2n) === 0
	}

	public get compressedForm(): Uint8Array {
		const xAsBytes = this.xAsBytes
		const out = new Uint8Array(xAsBytes.length + 1)
		out[0] = Number(this.isYEven ? 0x02 : 0x03)
		out.set(xAsBytes, 1)
		return out
	}

	public get decompressedForm(): Uint8Array {
		return Uint8Array.from([0x04, ...this.xAsBytes, ...this.yAsBytes])
	}
}

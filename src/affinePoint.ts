import { bigintToBytes, bytesToBigint } from './conversion'
import { isValidCompressedPublicKeyFormat, isValidDecompressedPublicKeyFormat } from './crypto'
import { type CurveParams, getCurveParamsByName } from './curveParams'
import { modSqrt } from './math'

export const PREFIX_COMPRESSED_Y_IS_EVEN = 0x02
export const PREFIX_COMPRESSED_Y_IS_ODD = 0x03
export const PREFIX_UNCOMPRESSED = 0x04

export class AffinePoint {
  public xBytes: Uint8Array
  public yBytes: Uint8Array

  public constructor(x: Uint8Array | bigint, y: Uint8Array | bigint) {
    this.xBytes = typeof x === 'bigint' ? bigintToBytes(x) : x
    this.yBytes = typeof y === 'bigint' ? bigintToBytes(y) : y
  }

  public get x() {
    return bytesToBigint(this.xBytes)
  }

  public get y() {
    return bytesToBigint(this.yBytes)
  }

  public static fromCompressedPoint(
    compressedForm: bigint | Uint8Array,
    curveParams: CurveParams | string
  ): AffinePoint {
    const compressedAsBytes = typeof compressedForm === 'bigint' ? bigintToBytes(compressedForm) : compressedForm

    if (!isValidCompressedPublicKeyFormat(compressedAsBytes, curveParams)) {
      throw new Error('Invalid format for compressed form')
    }

    const isYEven = compressedAsBytes[0] % 2 === 0
    const x = compressedAsBytes.slice(1)

    const y = AffinePoint.findAssociatedY(isYEven, bytesToBigint(x), curveParams)

    return new AffinePoint(x, y)
  }

  public static fromDecompressedPoint(
    decompressedForm: bigint | Uint8Array,
    curveParams: CurveParams | string
  ): AffinePoint {
    const decompressedAsBytes =
      typeof decompressedForm === 'bigint' ? bigintToBytes(decompressedForm) : decompressedForm

    if (!isValidDecompressedPublicKeyFormat(decompressedAsBytes, curveParams)) {
      throw new Error('Invalid format for decompressed form')
    }

    const foundCurve = typeof curveParams === 'string' ? getCurveParamsByName(curveParams) : curveParams
    if (!foundCurve) throw new Error('Curve not found')

    const { pointBitLength } = foundCurve

    let x: Uint8Array | undefined = undefined
    let y: Uint8Array | undefined = undefined

    const r = pointBitLength % 8

    // Key length is always the same
    if (r === 0) {
      x = decompressedAsBytes.slice(1, pointBitLength / 8 + 1)
      y = decompressedAsBytes.slice(pointBitLength / 8 + 1)

      // Key length may be different
      // This happens when the x or y coordinate starts with a 0 bit
    } else if (r === 1) {
      const xAndYBothShort = decompressedAsBytes.length === Math.floor(pointBitLength / 8) * 2 + 1
      const xAndYBothLong = decompressedAsBytes.length === Math.ceil(pointBitLength / 8) * 2 + 1
      const xOrYLong = !xAndYBothShort && !xAndYBothLong

      if (xAndYBothShort) {
        x = decompressedAsBytes.slice(1, Math.floor(pointBitLength / 8) + 1)
        y = decompressedAsBytes.slice(Math.floor(pointBitLength / 8) + 1)
      }

      if (xAndYBothLong) {
        x = decompressedAsBytes.slice(1, Math.ceil(pointBitLength / 8) + 1)
        y = decompressedAsBytes.slice(Math.ceil(pointBitLength / 8) + 1)
      }

      // Algorithm to figure out whether x or y is long
      if (xOrYLong) {
        const initialY = decompressedAsBytes[Math.ceil(pointBitLength / 8 + 1)]
        console.log('initial y: from func', initialY)

        const xWithoutZero = decompressedAsBytes.slice(1, Math.ceil(pointBitLength / 8))
        x = new Uint8Array(Math.ceil(pointBitLength / 8))
        x[0] = 0
        x.set(xWithoutZero, 1)

        y = decompressedAsBytes.slice(Math.ceil(pointBitLength / 8))

        // two coordinates are shorter
      }
    }

    if (!x || !y) {
      throw new Error('Could not deconstruct decompressed form into affine points')
    }

    return new AffinePoint(x, y)
  }

  private static findAssociatedY(isYEven: boolean, x: bigint, curveParams: CurveParams | string): Uint8Array {
    const foundCurve = typeof curveParams === 'string' ? getCurveParamsByName(curveParams) : curveParams
    if (!foundCurve) throw new Error('Curve not found')

    const { p, a, b, pointBitLength } = foundCurve
    if (x < 0n || x > p - 1n) {
      throw Error('X coordinate is outside of the plane')
    }

    const yPrime = modSqrt((x ** 3n % p) + a * x + b, p)
    const isYPrimeEven = yPrime % 2n === 0n
    const y = isYPrimeEven === isYEven ? yPrime : p - yPrime

    if (pointBitLength % 8 !== 0) {
      const expectedKeyLength = Math.ceil(pointBitLength / 8)
      const _y = new Uint8Array(expectedKeyLength).fill(0)
      const yAsBytes = bigintToBytes(y)
      _y.set(yAsBytes, expectedKeyLength - yAsBytes.length)
      return _y
    }

    return bigintToBytes(y)
  }

  private get isYEven(): boolean {
    return Number(bytesToBigint(this.yBytes) % 2n) === 0
  }

  public get compressedForm(): Uint8Array {
    const out = new Uint8Array(this.xBytes.length + 1)
    out[0] = Number(this.isYEven ? PREFIX_COMPRESSED_Y_IS_EVEN : PREFIX_COMPRESSED_Y_IS_ODD)
    out.set(this.xBytes, 1)
    return out
  }

  public get decompressedForm(): Uint8Array {
    return Uint8Array.from([PREFIX_UNCOMPRESSED, ...this.xBytes, ...this.yBytes])
  }
}

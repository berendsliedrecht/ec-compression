import { bigintToBytes, bytesToBigint } from './conversion'
import { isValidCompressedPublicKeyFormat, isValidDecompressedPublicKeyFormat } from './crypto'
import { type CurveParams, getCurveParamsByName } from './curveParams'
import { modSqrt } from './math'

export const PREFIX_COMPRESSED_Y_IS_EVEN = 0x02
export const PREFIX_COMPRESSED_Y_IS_ODD = 0x03
export const PREFIX_UNCOMPRESSED = 0x04

export class AffinePoint {
  public constructor(
    public x: bigint,
    public y: bigint
  ) {}

  public static fromCompressedPoint(compressedForm: bigint, curveParams: CurveParams | string): AffinePoint {
    const compressedAsBytes = bigintToBytes(compressedForm)

    if (!isValidCompressedPublicKeyFormat(compressedAsBytes, curveParams)) {
      throw new Error('Invalid format for compressed form')
    }

    const isYEven = compressedAsBytes[0] % 2 === 0
    const xAsBytes = compressedAsBytes.slice(1)

    const x = bytesToBigint(xAsBytes)
    const y = AffinePoint.findAssociatedY(isYEven, bytesToBigint(xAsBytes), curveParams)

    return new AffinePoint(x, y)
  }

  public static fromDecompressedPoint(decompressedForm: bigint, curveParams: CurveParams | string): AffinePoint {
    const decompressedAsBytes = bigintToBytes(decompressedForm)

    if (!isValidDecompressedPublicKeyFormat(decompressedAsBytes, curveParams)) {
      throw new Error('Invalid format for decompressed form')
    }

    const foundCurve = typeof curveParams === 'string' ? getCurveParamsByName(curveParams) : curveParams
    if (!foundCurve) throw new Error('Curve not found')

    const { pointBitLength } = foundCurve

    let x: Uint8Array | undefined = undefined
    let y: Uint8Array | undefined = undefined

    const r = pointBitLength % 8

    console.log('len: ', decompressedAsBytes.length)
    console.log('flo: ', Math.floor(pointBitLength / 8) * 2 + 1)
    console.log('cei: ', Math.ceil(pointBitLength / 8) * 2 + 1)

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

      // One coordinate, X, is shorter
      // TODO: we assume the X no 0 prefix and not Y
      //       assumption is made because when the uncompressed form
      //       is made it should account for the Y value needing a 0
      if (xAndYBothShort) {
        x = decompressedAsBytes.slice(1, Math.floor(pointBitLength / 8) + 1)
        y = decompressedAsBytes.slice(Math.floor(pointBitLength / 8) + 1)
      }

      if (xAndYBothLong) {
        x = decompressedAsBytes.slice(1, Math.ceil(pointBitLength / 8) + 1)
        y = decompressedAsBytes.slice(Math.ceil(pointBitLength / 8) + 1)
      }

      if (xOrYLong) {
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

    return new AffinePoint(bytesToBigint(x), bytesToBigint(y))
  }

  private static findAssociatedY(isYEven: boolean, x: bigint, curveParams: CurveParams | string): bigint {
    const foundCurve = typeof curveParams === 'string' ? getCurveParamsByName(curveParams) : curveParams
    if (!foundCurve) throw new Error('Curve not found')

    const { p, a, b } = foundCurve
    if (x < 0n || x > p - 1n) {
      throw Error('X coordinate is outside of the plane')
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
    out[0] = Number(this.isYEven ? PREFIX_COMPRESSED_Y_IS_EVEN : PREFIX_COMPRESSED_Y_IS_ODD)
    out.set(xAsBytes, 1)
    return out
  }

  public get decompressedForm(): Uint8Array {
    return Uint8Array.from([PREFIX_UNCOMPRESSED, ...this.xAsBytes, ...this.yAsBytes])
  }
}

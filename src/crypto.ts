import {
  AffinePoint,
  PREFIX_COMPRESSED_Y_IS_EVEN,
  PREFIX_COMPRESSED_Y_IS_ODD,
  PREFIX_UNCOMPRESSED,
} from './affinePoint'
import { bytesToBigint } from './conversion'
import { type CurveParams, Secp256k1, Secp256r1, Secp384r1, Secp521r1, getCurveParamsByName } from './curveParams'

const decompressPublicKeyGenerator =
  (curve: CurveParams) =>
  (compressedPublicKey: Uint8Array): Uint8Array =>
    AffinePoint.fromCompressedPoint(bytesToBigint(compressedPublicKey), curve).decompressedForm

export const decompressPublicKeySecp256k1 = decompressPublicKeyGenerator(Secp256k1)
export const decompressPublicKeySecp256r1 = decompressPublicKeyGenerator(Secp256r1)
export const decompressPublicKeySecp384r1 = decompressPublicKeyGenerator(Secp384r1)
export const decompressPublicKeySecp521r1 = decompressPublicKeyGenerator(Secp521r1)

export const decompressPublicKeyWithCurve = (
  compressedPublicKey: Uint8Array,
  curve: CurveParams | string
): Uint8Array => {
  const foundCurve = typeof curve === 'string' ? getCurveParamsByName(curve) : curve
  if (!foundCurve) throw new Error('Curve not found')

  return decompressPublicKeyGenerator(foundCurve)(compressedPublicKey)
}

export const decompressPublicKeyIfPossible = (
  compressedPublicKey: Uint8Array,
  curve: CurveParams | string
): Uint8Array => {
  try {
    return decompressPublicKeyWithCurve(compressedPublicKey, curve)
  } catch {
    return compressedPublicKey
  }
}

const compressPublicKeyGenerator =
  (curve: CurveParams) =>
  (decompressedPublicKey: Uint8Array): Uint8Array =>
    AffinePoint.fromDecompressedPoint(bytesToBigint(decompressedPublicKey), curve).compressedForm

export const compressPublicKeySecp256k1 = compressPublicKeyGenerator(Secp256k1)
export const compressPublicKeySecp256r1 = compressPublicKeyGenerator(Secp256r1)
export const compressPublicKeySecp384r1 = compressPublicKeyGenerator(Secp384r1)
export const compressPublicKeySecp521r1 = compressPublicKeyGenerator(Secp521r1)

export const compressPublicKeyWithCurve = (
  decompressedPublicKey: Uint8Array,
  curve: CurveParams | string
): Uint8Array => {
  const foundCurve = typeof curve === 'string' ? getCurveParamsByName(curve) : curve
  if (!foundCurve) throw new Error('Curve not found')

  return compressPublicKeyGenerator(foundCurve)(decompressedPublicKey)
}

export const compressPublicKeyIfPossible = (
  decompressedPublicKey: Uint8Array,
  curve: CurveParams | string
): Uint8Array => {
  try {
    return compressPublicKeyWithCurve(decompressedPublicKey, curve)
  } catch {
    return decompressedPublicKey
  }
}

export const isValidCompressedPublicKeyFormat = (publicKey: Uint8Array, curve: CurveParams | string) => {
  if (publicKey[0] !== PREFIX_COMPRESSED_Y_IS_EVEN && publicKey[0] !== PREFIX_COMPRESSED_Y_IS_ODD) return false

  const affinePoint = AffinePoint.fromCompressedPoint(publicKey, curve)
  return affinePoint.isValidPoint(curve)
}

export const isValidDecompressedPublicKeyFormat = (publicKey: Uint8Array, curve: CurveParams | string) => {
  if (publicKey[0] !== PREFIX_UNCOMPRESSED) return false

  const affinePoint = AffinePoint.fromDecompressedPoint(publicKey, curve)
  return affinePoint.isValidPoint(curve)
}

export const isValidPublicKeyFormat = (publicKey: Uint8Array, curve: CurveParams | string) => {
  return isValidCompressedPublicKeyFormat(publicKey, curve) || isValidDecompressedPublicKeyFormat(publicKey, curve)
}

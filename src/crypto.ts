import { AffinePoint } from './affinePoint'
import { bytesToBigint } from './conversion'
import { type CurveParams, Secp256k1, Secp256r1, Secp384r1, Secp521r1 } from './curveParams'

const decompressPublicKeyGenerator =
  (curve: CurveParams) =>
  (compressedPublicKey: Uint8Array): Uint8Array =>
    AffinePoint.fromCompressedPoint(bytesToBigint(compressedPublicKey), curve).decompressedForm

export const decompressPublicKeySecp256k1 = decompressPublicKeyGenerator(Secp256k1)
export const decompressPublicKeySecp256r1 = decompressPublicKeyGenerator(Secp256r1)
export const decompressPublicKeySecp384r1 = decompressPublicKeyGenerator(Secp384r1)
export const decompressPublicKeySecp521r1 = decompressPublicKeyGenerator(Secp521r1)
export const decompressPublicKey = (compressedPublicKey: Uint8Array, curve: CurveParams) =>
  decompressPublicKeyGenerator(curve)(compressedPublicKey)

const compressPublicKeyGenerator =
  (curve: CurveParams) =>
  (decompressedPublicKey: Uint8Array): Uint8Array =>
    AffinePoint.fromDecompressedPoint(bytesToBigint(decompressedPublicKey), curve).compressedForm

export const compressPublicKeySecp256k1 = compressPublicKeyGenerator(Secp256k1)
export const compressPublicKeySecp256r1 = compressPublicKeyGenerator(Secp256r1)
export const compressPublicKeySecp384r1 = compressPublicKeyGenerator(Secp384r1)
export const compressPublicKeySecp521r1 = compressPublicKeyGenerator(Secp521r1)
export const compressPublicKey = (decompressedPublicKey: Uint8Array, curve: CurveParams) =>
  compressPublicKeyGenerator(curve)(decompressedPublicKey)

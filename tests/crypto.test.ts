import { deepStrictEqual } from 'node:assert'
import { describe, test } from 'node:test'
import { AffinePoint, Secp521r1, bigintToBytes, decompressPublicKeySecp256k1 } from '../src'

describe('crypto', () => {
  describe('secp256k1', () => {
    test('decompress public key', () => {
      deepStrictEqual(
        decompressPublicKeySecp256k1(
          bigintToBytes(0x0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798n)
        ),
        bigintToBytes(
          0x0479be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8n
        )
      )
    })
  })

  describe('secp521r1', () => {
    test('jwk x[0] = 1 | y[0] = 0', () => {
      const jwk = {
        kty: 'EC',
        use: 'sig',
        crv: 'P-521',
        x: 'AbbyiWkT4i0uqnc5iBq_UwoMrFZBFGeGtyXgUzyuWNfl5cZErTq7_Vx-Kdu7ImOcpZWydMbNNiiMBC5V9y1rjrh-',
        y: 'AL1i0j9rujZjoTlJe2rpG7xHGefoivPEGQFjDeYZDQfe4R8-TwNR3lLKvcm10AVwwvrCUQQlT5snluXvnwg736iZ',
        alg: 'ES256',
      }

      const uncompressedKey = Uint8Array.from([
        0x04,
        ...Buffer.from(jwk.x, 'base64url'),
        ...Buffer.from(jwk.y, 'base64url'),
      ])
      const decompressed = AffinePoint.fromDecompressedPoint(uncompressedKey, Secp521r1).decompressedForm
      deepStrictEqual(decompressed, uncompressedKey)
    })

    test('jwk x[0] = 0 | y[0] = 0', () => {
      const jwk = {
        kty: 'EC',
        use: 'sig',
        crv: 'P-521',
        x: 'ADHS_i0q7Cdf9HDUMi77-U6ZsbozJm0UE02D-wRAYjetxFAbTbvqf_iRPMfIu6T4ARuxWZsWMa7FQDU_rmISVlKc',
        y: 'ANSbzkSBIb9SCI9ncTsUPY02twIMlo6hU-CHX8khJvzGkSbgz0_TmaDSr6_eLTatvQZhS--eo82UmA5zMTcCJD0j',
        alg: 'ES256',
      }

      const uncompressedKey = Uint8Array.from([
        0x04,
        ...Buffer.from(jwk.x, 'base64url'),
        ...Buffer.from(jwk.y, 'base64url'),
      ])
      const decompressed = AffinePoint.fromDecompressedPoint(uncompressedKey, Secp521r1).decompressedForm
      deepStrictEqual(decompressed, uncompressedKey)
    })

    test('jwk x[0] = 1 | y[0] = 1', () => {
      const jwk = {
        kty: 'EC',
        use: 'sig',
        crv: 'P-521',
        x: 'AdkglGSFfgWeXcD22c5ilN30YS_ZWf4a5BrmknB_FfeQRmh2ZOgGWKjANoO4g_Frc6MbOqklbsbbJURXPSlxmQBk',
        y: 'AURHQHbqeTmvKMqJEz6_fH63dzJ-BmuM9AiTfeHDauB1sjjco1K-srmwIeaUHfY-ggnLWUOjdaeubjto7qlyZ6_W',
        alg: 'ES256',
      }

      const uncompressedKey = Uint8Array.from([
        0x04,
        ...Buffer.from(jwk.x, 'base64url'),
        ...Buffer.from(jwk.y, 'base64url'),
      ])
      const decompressed = AffinePoint.fromDecompressedPoint(uncompressedKey, Secp521r1).decompressedForm
      deepStrictEqual(decompressed, uncompressedKey)
    })

    test('jwk x[0] = 0 | y[0] = 1', () => {
      const jwk = {
        kty: 'EC',
        use: 'sig',
        crv: 'P-521',
        x: 'AB45mqPjk2nHcVpaWvW7msnbO98km4uGiOdZvpieGb14DstK-g82zbm-88Bj2vV9XyHiaRim5RJoDYEJ_srf01Q_',
        y: 'AedyXKSFRK3txVnkPNMpYY-2VtCKnhw25lMJvtIdLivks6iBwlpfrN7gYwO_a-1pHBbvYxj2XBUt0hB3bNiO6hn8',
        alg: 'ES256',
      }

      const uncompressedKey = Uint8Array.from([
        0x04,
        ...Buffer.from(jwk.x, 'base64url'),
        ...Buffer.from(jwk.y, 'base64url'),
      ])
      const decompressed = AffinePoint.fromDecompressedPoint(uncompressedKey, Secp521r1).decompressedForm
      deepStrictEqual(decompressed, uncompressedKey)
    })
  })
})

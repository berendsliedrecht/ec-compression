import { deepStrictEqual } from 'node:assert'
import test, { describe } from 'node:test'
import { bigintToBytes, decompressPublicKeySecp256k1 } from '../src'

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
})

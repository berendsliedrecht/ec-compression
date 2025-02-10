import { deepStrictEqual, ok } from 'node:assert'
import { describe, test } from 'node:test'
import {
  Secp256k1,
  Secp256r1,
  Secp384r1,
  Secp521r1,
  bigintToBytes,
  decompressPublicKeySecp256k1,
  isValidPublicKeyFormat,
} from '../src'

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

  describe('isValidPublicKeySize', () => {
    test('secp256k1', () => {
      ok(isValidPublicKeyFormat(new Uint8Array([0x03, ...new Array(32).fill(0)]), Secp256k1))
      ok(isValidPublicKeyFormat(new Uint8Array([0x02, ...new Array(32).fill(0)]), Secp256k1))

      ok(isValidPublicKeyFormat(new Uint8Array([0x04, ...new Array(64).fill(0)]), Secp256k1))

      ok(!isValidPublicKeyFormat(new Uint8Array([0x02, ...new Array(33).fill(0)]), Secp256k1))
      ok(!isValidPublicKeyFormat(new Uint8Array([0x04, ...new Array(65).fill(0)]), Secp256k1))

      ok(!isValidPublicKeyFormat(new Uint8Array([0x01, ...new Array(32).fill(0)]), Secp256k1))
      ok(!isValidPublicKeyFormat(new Uint8Array([0x04, ...new Array(32).fill(0)]), Secp256k1))

      ok(!isValidPublicKeyFormat(new Uint8Array([0x03, ...new Array(64).fill(0)]), Secp256k1))
      ok(!isValidPublicKeyFormat(new Uint8Array([0x05, ...new Array(64).fill(0)]), Secp256k1))
    })

    test('secp256r1', () => {
      ok(isValidPublicKeyFormat(new Uint8Array([0x03, ...new Array(32).fill(0)]), Secp256r1))
      ok(isValidPublicKeyFormat(new Uint8Array([0x02, ...new Array(32).fill(0)]), Secp256r1))

      ok(isValidPublicKeyFormat(new Uint8Array([0x04, ...new Array(64).fill(0)]), Secp256r1))

      ok(!isValidPublicKeyFormat(new Uint8Array([0x02, ...new Array(33).fill(0)]), Secp256r1))
      ok(!isValidPublicKeyFormat(new Uint8Array([0x04, ...new Array(65).fill(0)]), Secp256r1))

      ok(!isValidPublicKeyFormat(new Uint8Array([0x01, ...new Array(32).fill(0)]), Secp256r1))
      ok(!isValidPublicKeyFormat(new Uint8Array([0x04, ...new Array(32).fill(0)]), Secp256r1))

      ok(!isValidPublicKeyFormat(new Uint8Array([0x03, ...new Array(64).fill(0)]), Secp256r1))
      ok(!isValidPublicKeyFormat(new Uint8Array([0x05, ...new Array(64).fill(0)]), Secp256r1))
    })

    test('secp384r1', () => {
      ok(isValidPublicKeyFormat(new Uint8Array([0x03, ...new Array(48).fill(0)]), Secp384r1))
      ok(isValidPublicKeyFormat(new Uint8Array([0x02, ...new Array(48).fill(0)]), Secp384r1))

      ok(isValidPublicKeyFormat(new Uint8Array([0x04, ...new Array(96).fill(0)]), Secp384r1))

      ok(!isValidPublicKeyFormat(new Uint8Array([0x02, ...new Array(49).fill(0)]), Secp384r1))
      ok(!isValidPublicKeyFormat(new Uint8Array([0x04, ...new Array(97).fill(0)]), Secp384r1))

      ok(!isValidPublicKeyFormat(new Uint8Array([0x01, ...new Array(48).fill(0)]), Secp384r1))

      ok(!isValidPublicKeyFormat(new Uint8Array([0x03, ...new Array(96).fill(0)]), Secp384r1))
    })

    test('secp521r1', () => {
      ok(isValidPublicKeyFormat(new Uint8Array([0x03, ...new Array(65).fill(0)]), Secp521r1))
      ok(isValidPublicKeyFormat(new Uint8Array([0x03, ...new Array(66).fill(0)]), Secp521r1))
      ok(isValidPublicKeyFormat(new Uint8Array([0x02, ...new Array(65).fill(0)]), Secp521r1))
      ok(isValidPublicKeyFormat(new Uint8Array([0x02, ...new Array(66).fill(0)]), Secp521r1))

      ok(isValidPublicKeyFormat(new Uint8Array([0x04, ...new Array(130).fill(0)]), Secp521r1))
      ok(isValidPublicKeyFormat(new Uint8Array([0x04, ...new Array(131).fill(0)]), Secp521r1))
      ok(isValidPublicKeyFormat(new Uint8Array([0x04, ...new Array(132).fill(0)]), Secp521r1))

      ok(!isValidPublicKeyFormat(new Uint8Array([0x02, ...new Array(64).fill(0)]), Secp521r1))
      ok(!isValidPublicKeyFormat(new Uint8Array([0x04, ...new Array(129).fill(0)]), Secp521r1))

      ok(!isValidPublicKeyFormat(new Uint8Array([0x01, ...new Array(65).fill(0)]), Secp521r1))

      ok(!isValidPublicKeyFormat(new Uint8Array([0x03, ...new Array(130).fill(0)]), Secp521r1))
    })
  })
})

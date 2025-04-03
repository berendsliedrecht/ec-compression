import { deepStrictEqual, ok } from 'node:assert'
import { describe, test } from 'node:test'
import { compressPublicKeyWithCurve, decompressPublicKeyWithCurve, isValidPublicKeyFormat } from '../src'

import { p256 } from '@noble/curves/p256'
import { p384 } from '@noble/curves/p384'
import { p521 } from '@noble/curves/p521'

const testsPerCurve = Number(process.env.TESTS_PER_CURVE) ?? 100

describe('keys roundtrip', () => {
  describe('is valid public key for curve p256', () => {
    for (let i = 0; i < testsPerCurve; i++) {
      test(`p256 - ${i}`, () => {
        const sk = p256.utils.randomPrivateKey()

        const uncompressed = p256.getPublicKey(sk, false)
        const compressed = p256.getPublicKey(sk, true)

        ok(isValidPublicKeyFormat(uncompressed, 'p256'))
        ok(isValidPublicKeyFormat(compressed, 'p256'))

        deepStrictEqual(compressPublicKeyWithCurve(uncompressed, 'p256'), compressed)
        deepStrictEqual(decompressPublicKeyWithCurve(compressed, 'p256'), uncompressed)
      })
    }
  })

  describe('is valid public key for curve p384', () => {
    for (let i = 0; i < testsPerCurve; i++) {
      test(`p384 - ${i}`, () => {
        const sk = p384.utils.randomPrivateKey()

        const uncompressed = p384.getPublicKey(sk, false)
        const compressed = p384.getPublicKey(sk, true)

        ok(isValidPublicKeyFormat(uncompressed, 'p384'))
        ok(isValidPublicKeyFormat(compressed, 'p384'))

        deepStrictEqual(compressPublicKeyWithCurve(uncompressed, 'p384'), compressed)
        deepStrictEqual(decompressPublicKeyWithCurve(compressed, 'p384'), uncompressed)
      })
    }
  })

  describe('is valid public key for curve p521', () => {
    for (let i = 0; i < testsPerCurve; i++) {
      test(`p521 - ${i}`, () => {
        const sk = p521.utils.randomPrivateKey()

        const uncompressed = p521.getPublicKey(sk, false)
        const compressed = p521.getPublicKey(sk, true)

        ok(isValidPublicKeyFormat(uncompressed, 'p521'))
        ok(isValidPublicKeyFormat(compressed, 'p521'))

        deepStrictEqual(compressPublicKeyWithCurve(uncompressed, 'p521'), compressed)
        deepStrictEqual(decompressPublicKeyWithCurve(compressed, 'p521'), uncompressed)
      })
    }
  })
})

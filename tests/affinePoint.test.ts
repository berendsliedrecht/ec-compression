import { strictEqual } from 'node:assert'
import { describe, test } from 'node:test'
import { AffinePoint, Secp256k1, Secp256r1, Secp384r1, Secp521r1, bytesToBigint } from '../src'

describe('affine point', () => {
  describe('secp256k1', () => {
    test('from compressed', () => {
      const affinePoint = AffinePoint.fromCompressedPoint(
        0x0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798n,
        Secp256k1
      )

      strictEqual(affinePoint.x, 0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798n)

      strictEqual(affinePoint.y, 0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8n)
    })

    test('from decompressed', () => {
      const affinePoint = AffinePoint.fromDecompressedPoint(
        0x0479be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8n,
        Secp256k1
      )

      strictEqual(affinePoint.x, 0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798n)

      strictEqual(affinePoint.y, 0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8n)
    })

    test('compress and decompress generator point', () => {
      const affinePoint = new AffinePoint(
        0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798n,
        0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8n
      )

      strictEqual(affinePoint.compressedForm.length, 33)
      strictEqual(affinePoint.decompressedForm.length, 65)

      strictEqual(
        bytesToBigint(affinePoint.compressedForm),
        0x0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798n
      )

      strictEqual(
        bytesToBigint(affinePoint.decompressedForm),
        0x0479be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8n
      )
    })
  })

  describe('secp256r1', () => {
    test('from compressed', () => {
      const affinePoint = AffinePoint.fromCompressedPoint(
        0x036b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296n,
        Secp256r1
      )

      strictEqual(affinePoint.x, 0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296n)

      strictEqual(affinePoint.y, 0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5n)
    })

    test('from decompressed', () => {
      const affinePoint = AffinePoint.fromDecompressedPoint(
        0x046b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c2964fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5n,
        Secp256r1
      )

      strictEqual(affinePoint.x, 0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296n)

      strictEqual(affinePoint.y, 0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5n)
    })

    test('compress and decompress generator point', () => {
      const affinePoint = new AffinePoint(
        0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296n,
        0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5n
      )

      strictEqual(affinePoint.compressedForm.length, 33)
      strictEqual(affinePoint.decompressedForm.length, 65)

      strictEqual(
        bytesToBigint(affinePoint.compressedForm),
        0x036b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296n
      )

      strictEqual(
        bytesToBigint(affinePoint.decompressedForm),
        0x046b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c2964fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5n
      )
    })
  })

  describe('secp384r1', () => {
    test('from compressed', () => {
      const affinePoint = AffinePoint.fromCompressedPoint(
        0x03aa87ca22be8b05378eb1c71ef320ad746e1d3b628ba79b9859f741e082542a385502f25dbf55296c3a545e3872760ab7n,
        Secp384r1
      )

      strictEqual(
        affinePoint.x,
        0xaa87ca22be8b05378eb1c71ef320ad746e1d3b628ba79b9859f741e082542a385502f25dbf55296c3a545e3872760ab7n
      )
      strictEqual(
        affinePoint.y,
        0x3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5fn
      )
    })

    test('from decompressed', () => {
      const affinePoint = AffinePoint.fromDecompressedPoint(
        0x04aa87ca22be8b05378eb1c71ef320ad746e1d3b628ba79b9859f741e082542a385502f25dbf55296c3a545e3872760ab73617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5fn,
        Secp384r1
      )

      strictEqual(
        affinePoint.x,
        0xaa87ca22be8b05378eb1c71ef320ad746e1d3b628ba79b9859f741e082542a385502f25dbf55296c3a545e3872760ab7n
      )

      strictEqual(
        affinePoint.y,
        0x3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5fn
      )
    })

    test('compress and decompress generator point', () => {
      const affinePoint = new AffinePoint(
        0xaa87ca22be8b05378eb1c71ef320ad746e1d3b628ba79b9859f741e082542a385502f25dbf55296c3a545e3872760ab7n,
        0x3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5fn
      )

      strictEqual(affinePoint.compressedForm.length, 49)
      strictEqual(affinePoint.decompressedForm.length, 97)

      strictEqual(
        bytesToBigint(affinePoint.compressedForm),
        0x03aa87ca22be8b05378eb1c71ef320ad746e1d3b628ba79b9859f741e082542a385502f25dbf55296c3a545e3872760ab7n
      )

      strictEqual(
        bytesToBigint(affinePoint.decompressedForm),
        0x04aa87ca22be8b05378eb1c71ef320ad746e1d3b628ba79b9859f741e082542a385502f25dbf55296c3a545e3872760ab73617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5fn
      )
    })
  })

  describe('secp521r1', () => {
    test('from compressed', () => {
      const affinePoint = AffinePoint.fromCompressedPoint(
        0x0200c6858e06b70404e9cd9e3ecb662395b4429c648139053fb521f828af606b4d3dbaa14b5e77efe75928fe1dc127a2ffa8de3348b3c1856a429bf97e7e31c2e5bd66n,
        Secp521r1
      )

      strictEqual(
        affinePoint.x,
        0x00c6858e06b70404e9cd9e3ecb662395b4429c648139053fb521f828af606b4d3dbaa14b5e77efe75928fe1dc127a2ffa8de3348b3c1856a429bf97e7e31c2e5bd66n
      )

      strictEqual(
        affinePoint.y,
        0x011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650n
      )
    })

    test('from decompressed', () => {
      const affinePoint = AffinePoint.fromDecompressedPoint(
        0x04c6858e06b70404e9cd9e3ecb662395b4429c648139053fb521f828af606b4d3dbaa14b5e77efe75928fe1dc127a2ffa8de3348b3c1856a429bf97e7e31c2e5bd66011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650n,
        Secp521r1
      )

      strictEqual(
        affinePoint.x,
        0x00c6858e06b70404e9cd9e3ecb662395b4429c648139053fb521f828af606b4d3dbaa14b5e77efe75928fe1dc127a2ffa8de3348b3c1856a429bf97e7e31c2e5bd66n
      )

      strictEqual(
        affinePoint.y,
        0x011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650n
      )
    })

    test('compress and decompress generator point', () => {
      const affinePoint = new AffinePoint(
        0x00c6858e06b70404e9cd9e3ecb662395b4429c648139053fb521f828af606b4d3dbaa14b5e77efe75928fe1dc127a2ffa8de3348b3c1856a429bf97e7e31c2e5bd66n,
        0x011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650n
      )

      strictEqual(affinePoint.compressedForm.length, 66)
      strictEqual(affinePoint.decompressedForm.length, 132)

      strictEqual(
        bytesToBigint(affinePoint.compressedForm),
        0x02c6858e06b70404e9cd9e3ecb662395b4429c648139053fb521f828af606b4d3dbaa14b5e77efe75928fe1dc127a2ffa8de3348b3c1856a429bf97e7e31c2e5bd66n
      )

      strictEqual(
        bytesToBigint(affinePoint.decompressedForm),
        0x04c6858e06b70404e9cd9e3ecb662395b4429c648139053fb521f828af606b4d3dbaa14b5e77efe75928fe1dc127a2ffa8de3348b3c1856a429bf97e7e31c2e5bd66011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650n
      )
    })
  })
})

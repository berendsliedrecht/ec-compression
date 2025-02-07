import { describe, test } from 'node:test'

import { strictEqual, throws } from 'node:assert'
import { modSqrt } from '../src/math'

describe('math', () => {
  test('modSqrt', () => {
    strictEqual(modSqrt(2n, 113n), 62n)
    strictEqual(modSqrt(10n, 13n), 7n)
    strictEqual(modSqrt(56n, 101n), 37n)
    strictEqual(modSqrt(1030n, 10009n), 1632n)
    strictEqual(modSqrt(44402n, 100049n), 30468n)
    strictEqual(modSqrt(665820697n, 1000000009n), 378633312n)
    strictEqual(modSqrt(881398088036n, 1000000000039n), 791399408049n)
    throws(() => modSqrt(1032n, 10009n))
  })
})

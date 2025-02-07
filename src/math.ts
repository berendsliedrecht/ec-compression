// Helper function to compute (a^b) % mod using binary exponentiation
function modExp(a: bigint, b: bigint, mod: bigint): bigint {
	let _a = a
	let _b = b

	let res = 1n
	_a = _a % mod
	while (_b > 0n) {
		if (_b % 2n === 1n) {
			res = (res * _a) % mod
		}
		_a = (_a * _a) % mod
		_b = _b / 2n
	}
	return res
}

// Tonelli-Shanks algorithm to find square root of n mod p
export function modSqrt(n: bigint, p: bigint): bigint {
	// If p is 2, the solution is trivial
	if (p === 2n) return n % 2n

	// Check if n is a quadratic residue modulo p using Euler's criterion
	if (modExp(n, (p - 1n) / 2n, p) !== 1n) {
		throw new Error("No solution: n is not a quadratic residue modulo p")
	}

	// Case 1: If n is a perfect square mod p
	if (modExp(n, (p + 1n) / 4n, p) ** 2n % p === n) {
		return modExp(n, (p + 1n) / 4n, p)
	}

	// Tonelli-Shanks algorithm
	let q = p - 1n
	let s = 0n
	while (q % 2n === 0n) {
		q /= 2n
		s++
	}

	// Initial values
	let z = 2n
	while (modExp(z, (p - 1n) / 2n, p) === 1n) {
		z++
	}
	let m = s
	let c = modExp(z, q, p)
	let t = modExp(n, q, p)
	let r = modExp(n, (q + 1n) / 2n, p)

	// Loop to find the square root
	while (t !== 0n && t !== 1n) {
		let t2i = t
		let i = 0n
		for (i = 1n; i < m; i++) {
			t2i = (t2i * t2i) % p
			if (t2i === 1n) break
		}

		const b = modExp(c, 1n << (m - i - 1n), p)
		m = i
		c = (b * b) % p
		t = (t * c) % p
		r = (r * b) % p
	}

	// Return the square root if t is 1, otherwise throw an error
	if (t === 0n) return 0n
	return r
}

/**
 *
 * Modular exponentiation optimalization
 *
 * Equivalent to: base ** exponent % modulus
 * However, because base ** exponent can be very large, this optimalization has to be done
 * to keep the number managable for the BigInt type in JS
 *
 */
export function modPow(base: bigint, exponent: bigint, modulus: bigint) {
	let e = exponent
	let b = base

	if (modulus === 1n) return 0n

	let result = 1n
	b = ((b % modulus) + modulus) % modulus

	while (e > 0n) {
		if (e & 1n) {
			result = (result * b) % modulus
		}
		b = (b * b) % modulus
		e >>= 1n
	}
	return result
}

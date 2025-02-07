export function bigintToBytes(b: bigint): Uint8Array {
	if (b < 0n) {
		throw new Error("Negative values are not supported")
	}

	if (b === 0n) {
		return new Uint8Array([0])
	}

	const byteLength = Math.ceil(b.toString(16).length / 2)
	const bytes = new Uint8Array(byteLength)

	let tempValue = b
	for (let i = byteLength - 1; i >= 0; i--) {
		bytes[i] = Number(tempValue & 0xffn)
		tempValue = tempValue >> 8n
	}

	return bytes
}

export function bytesToBigint(b: Uint8Array): bigint {
	if (b.length === 0) {
		throw new Error("Empty byte array is not supported")
	}

	let value = 0n
	for (let i = 0; i < b.length; i++) {
		value = (value << 8n) | BigInt(b[i])
	}

	return value
}

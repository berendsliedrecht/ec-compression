export class CurveParams {
  public constructor(
    public p: bigint,
    public a: bigint,
    public b: bigint,
    public pointBitLength: number,
    public names: Array<string> = []
  ) {}
}

export const getCurveParamsByName = (
  name: string,
  curveParams: Array<CurveParams> = [Secp256k1, Secp256r1, Secp384r1, Secp521r1]
) => curveParams.find((c) => c.names.map((n) => n.toLowerCase()).includes(name.toLowerCase()))

export const Secp256r1 = new CurveParams(
  0xffffffff00000001000000000000000000000000ffffffffffffffffffffffffn,
  0xffffffff00000001000000000000000000000000fffffffffffffffffffffffcn,
  0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604bn,
  256,
  ['secp256r1', 'p256', 'p-256']
)

export const Secp384r1 = new CurveParams(
  0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000ffffffffn,
  0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000fffffffcn,
  0xb3312fa7e23ee7e4988e056be3f82d19181d9c6efe8141120314088f5013875ac656398d8a2ed19d2a85c8edd3ec2aefn,
  384,
  ['secp384r1', 'p384', 'p-384']
)

export const Secp521r1 = new CurveParams(
  0x01ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn,
  0x01fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcn,
  0x0051953eb9618e1c9a1f929a21a0b68540eea2da725b99b315f3b8b489918ef109e156193951ec7e937b1652c0bd3bb1bf073573df883d2c34f1ef451fd46b503f00n,
  521,
  ['secp521r1', 'p521', 'p-521']
)

export const Secp256k1 = new CurveParams(
  0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2fn,
  0x0n,
  0x7n,
  256,
  ['secp256k1', 'k256', 'k-256']
)

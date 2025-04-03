import { subtle } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const pemDirToUncompressed = (path: string) =>
  readdirSync(join(__dirname, 'keys', path)).map((f) =>
    Uint8Array.from(
      Buffer.from(f.replace('-----BEGIN PUBLIC KEY-----', '').replace('-----END PUBLIC KEY-----', ''), 'base64')
    )
  )

//export const opensslKeyToBytes = (directory: string) => {
//  const path = join(__dirname, 'keys', directory)
//  const files = readdirSync(path)
//
//  const keys: Array<Uint8Array> = files.map((f) => {
//    const key = readFileSync(join(path, f))
//    const keyString = key.toString()
//    const keyStringOnlyBytes = keyString.replace('-----BEGIN PUBLIC KEY-----','').replace('-----END PUBLIC KEY-----', '')
//    const x = subtle.importKey('spki', keyStringOnlyBytes, {name: directory}, true, ['verify'])
//
//    return x
//  })
//
//  return keys
//}

export const uncompressedToBase64 = (key: Uint8Array) => Buffer.from(key).toString('base64')

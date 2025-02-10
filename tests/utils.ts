import { readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const pemDirToUncompressed = (path: string) =>
  readdirSync(join(__dirname, path)).map((f) =>
    Uint8Array.from(
      Buffer.from(f.replace('-----BEGIN EC PRIVATE KEY-----', '').replace('-----END EC PRIVATE KEY-----', ''), 'base64')
    )
  )

export const uncompressedToBase64 = (key: Uint8Array) => Buffer.from(key).toString('base64')

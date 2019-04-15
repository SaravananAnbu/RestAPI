const crypto = require('crypto')

export function Hash (data, secretKey) {
  return crypto.createHmac(
    'sha256',
    secretKey || process.env.HASH_KEY
  ).update(data).digest('hex')
}
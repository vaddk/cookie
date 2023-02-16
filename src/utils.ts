export function getEncodedKey(key: string) {
  return encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&')
}

export function getDecodedValue(value: string) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

export function makeRegExp(key: string) {
  return new RegExp(`(?:(?:^|.*;)\\s*${getEncodedKey(key)}\\s*\\=\\s*([^;]*).*$)|^.*$`)
}

export function isString(str: any): boolean {
  if (typeof str !== 'string' || str === '') {
    console.error('Cookie name must be a string and not be empty')
    return false
  }
  return true
}

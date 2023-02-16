import type {
  Cookie,
  CookiesItem,
  ExpireTime,
  KeyName,
  RemoveCookieOptions,
  SetCookieOptions,
} from './types'

import { getDecodedValue, getEncodedKey, isString, makeRegExp } from './utils'
import { defaultConfig, setConfig } from './config'

function getCookie(keyName: string): string | object {
  if (!isString(keyName)) return ''

  const value: string = getDecodedValue(document.cookie.replace(makeRegExp(keyName), '$1'))
  if (value == null || value === '') return ''
  try {
    return JSON.parse(value)
  } catch (e) {
    return value
  }
}

function setCookie(
  keyName: KeyName,
  value: string | object,
  options?: SetCookieOptions,
) {
  if (!isString(keyName)) return false

  if (/^(?:expires|max\-age|path|domain|secure|SameSite)$/i.test(keyName))
    throw new Error(`Cookie name illegal, cannot be set to ["expires","max-age","path","domain","secure","SameSite"]\t current key name: ${keyName}`)

  if (typeof value !== 'string' && typeof value !== 'object') throw new Error('Cookie value must be a string or object (not Array)')
  if (typeof value === 'object') value = JSON.stringify(value)

  const { expires, path, domain, secure, sameSite } = options || {}
  const expireTime: ExpireTime = expires == null ? defaultConfig.expires : expires

  const cookie = {
    key: encodeURIComponent(keyName),
    value: encodeURIComponent(value),
    expires: '',
    domain: domain ? `domain=${domain}` : defaultConfig.domain,
    path: path ? `path=${path}` : `path=${defaultConfig.path}`,
    secure: secure == null ? defaultConfig.secure : 'Secure',
    sameSite: sameSite == null ? `SameSite=${defaultConfig.sameSite}` : `SameSite=${sameSite}`,
  }

  switch (typeof expireTime) {
    case 'number':
      if (!isFinite(expireTime) || expireTime === -1) cookie.expires = 'expires=Fri, 31 Dec 9999 23:59:59 GMT'
      else cookie.expires = `max-age=${expireTime}`
      break
    case 'string': {
      if (/^(?:\d+(y|m|d|h|min|s))$/i.test(expireTime)) {
        const _expireTime = expireTime.replace(/^(\d+)(?:y|m|d|h|min|s)$/i, '$1')
        switch (expireTime.replace(/^(?:\d+)(y|m|d|h|min|s)$/i, '$1').toLowerCase()) {
          case 'm':
            cookie.expires = `max-age=${+_expireTime * 2592000}`
            break
          case 'd':
            cookie.expires = `max-age=${+_expireTime * 86400}`
            break
          case 'h':
            cookie.expires = `max-age=${+_expireTime * 3600}`
            break
          case 'min':
            cookie.expires = `max-age=${+_expireTime * 60}`
            break
          case 's':
            cookie.expires = `max-age=${+_expireTime}`
            break
          case 'y':
            cookie.expires = `max-age=${+_expireTime * 31104000}`
            break
          default:
            throw new Error('unknown exception of "set operation"')
        }
      } else {
        cookie.expires = `expires=${expireTime}`
      }
      break
    }
    case 'object':
      if (expireTime instanceof Date) cookie.expires = `expires=${expireTime.toUTCString()}`
      break
  }

  document.cookie = `${cookie.key}=${cookie.value}; ${cookie.expires}; ${cookie.domain}; ${cookie.path}; ${cookie.secure}; ${cookie.sameSite};`
  return true
}

function removeCookie(keyName: KeyName, options?: RemoveCookieOptions): boolean {
  if (!isString(keyName)) return false
  if (!isCookieAvailable(keyName)) return false

  const { path, domain } = options || {}
  const cookie = {
    key: encodeURIComponent(keyName),
    expires: 'expires=Thu, 01 Jan 1970 00:00:00 GMT',
    domain: domain ? `domain=${domain}` : defaultConfig.domain,
    path: path ? `path=${path}` : `path=${defaultConfig.path}`,
  }

  document.cookie = `${cookie.key}=; ${cookie.expires}; ${cookie.domain}; ${cookie.path}; SameSite=Lax;`
  return true
}

function removeAllCookies(): void {
  cookieKeys().forEach(cookie => removeCookie(cookie))
}

function isCookieAvailable(keyName: KeyName): boolean {
  if (!isString(keyName)) return false
  return new RegExp(`(?:^|;\\s*)${getEncodedKey(keyName)}\\s*\\=`).test(document.cookie)
}

function cookieKeys(): string[] {
  if (!document.cookie) return []
  return document.cookie
    .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:|$)/g, '')
    .split(/\s*(?:\=[^;]*)?;\s*/)
    .map(el => getDecodedValue(el))
}

function cookieEntries(): CookiesItem[] {
  if (!document.cookie) return []
  return document.cookie.split(';').map((currentCookie) => {
    const [cookieName, cookieValue] = currentCookie.split('=')
    return { key: getDecodedValue(cookieName), value: getDecodedValue(cookieValue.trim()) }
  })
}

export const cookie: Cookie = {
  setConfig,
  getCookie,
  setCookie,
  removeCookie,
  removeAllCookies,
  isCookieAvailable,
  cookieKeys,
  cookieEntries,
}

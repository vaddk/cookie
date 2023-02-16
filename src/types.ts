type KeyName = string
type ExpireTime = string | number | Date

interface CookiesItem {
  key: string
  value: string
}

interface _CookieBase {
  expires: ExpireTime
  path?: string
  domain?: string
  secure?: string
  sameSite?: string
}
interface CookieConfigOptions extends _CookieBase { }
interface SetCookieOptions extends _CookieBase { }
interface RemoveCookieOptions {
  path?: string
  domain?: string
}
interface IsCookieAvailable {
  keyName: KeyName
}

interface Cookie {
  setConfig(options: CookieConfigOptions): void
  setCookie(keyName: KeyName, value: string, options?: SetCookieOptions): boolean
  getCookie(keyName: KeyName): string | object
  removeCookie(keyName: KeyName, options?: RemoveCookieOptions): boolean
  removeAllCookies(): void
  isCookieAvailable(keyName: KeyName): boolean
  cookieKeys(): string[]
  cookieEntries(): CookiesItem[]
}

export {
  KeyName,
  ExpireTime,
  CookiesItem,
  CookieConfigOptions,
  SetCookieOptions,
  RemoveCookieOptions,
  IsCookieAvailable,
  Cookie,
}

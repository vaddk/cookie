import type { CookieConfigOptions } from './types'

export const defaultConfig: CookieConfigOptions = {
  expires: '1d',
  path: '/',
  domain: '',
  secure: '',
  sameSite: 'Lax',
}

export function setConfig(options: CookieConfigOptions) {
  const { expires, path, domain, secure, sameSite } = options
  defaultConfig.expires = expires || '1d'
  defaultConfig.path = path ? `path=${path}; path=/` : ''
  defaultConfig.domain = domain ? `domain=${domain}` : ''
  defaultConfig.secure = secure ? 'Secure' : ''
  defaultConfig.sameSite = sameSite ? `SameSite=${sameSite}` : 'SameSite=Lax'
}

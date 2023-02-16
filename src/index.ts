import type { App } from 'vue'
import { inject } from 'vue'
import { cookie } from './cookie'
import type { Cookie, CookieConfigOptions } from './types'

export default {
  install(app: App, config: CookieConfigOptions | undefined) {
    app.config.globalProperties.$cookie = cookie
    if (typeof config === 'object' && config != null) cookie.setConfig(config)
    app.provide('cookie', cookie)
  },
}

export function useCookie(): Cookie {
  return inject<Cookie>('cookie')!
}

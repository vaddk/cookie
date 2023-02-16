# @vaddk/cookie

*Доработанный fork [vue-cookie-next](https://github.com/anish2690/vue-cookie-next)*

Vue-Typescript плагин для удобной работы с document.cookie

## Установка

```
npm install @vaddk/cookie
// или
pnpm add @vaddk/cookie
```

### Внимание!!! Для установки плагина необходим приватный токен

```ts
import { createApp } from 'vue'
import Cookie from '@vaddk/cookie'

import App from 'App.vue'
const app = createApp(App)
app.use(Cookie)
// или с измененной конфигурацией по умолчанию
app.use(Cookie, {
  expire: '7d', // '1d'
  path: '/api/', // '/'
  domain: 'localhost', // ''
  secure: 'Secure', // ''
  sameSite: 'Strict', // 'Lax'
})

app.mount('#app')
```

## Пример использования

```ts
import { useCookie } from '@vaddk/cookie'

const {
  setCookie,
  getCookie,
  removeCookie,
  removeAllCookies,
  isCookieAvailable,
  cookieKeys,
  cookieEntries,
} = useCookie()
// Создать куки
setCookie('theme', 'default')
setCookie('token', 'eyJpdiI6ImkvUVhTQnhJWVE5VlZBVWVIeXdRZ1E9PSIsInZhb', { expire: '1s' })

// Получить значение куки
const token = getCookie('token')

// Удалить куки (функция возвращает булево значение)
removeCookie('theme')

// Проверить доступна ли куки
isCookieAvailable('theme') // false

// Получить названия всех куки
const keys = cookieKeys()

// Получить массив вида [{ key, value }] всех доступных куки
const entries = cookieEntries()

// Удалить все куки
removeAllCookies()
```

## Конфигурация

```ts
import { useCookie } from '@vaddk/cookie'

const { setConfig } = useCookie()
setConfig({
  expire: '30d', // Время жизни - 30 дней
  path: '/api/', // Префикс путей, по которым доступна куки
  domain: 'localhost', // Доступ к куки для поддоменов
  secure: true, // Только с https
  sameSite: 'Strict' // Lax, Strict
})
```

## Types

```ts
type ExpireTime = string | number | Date
interface _CookieBase {
  expires: ExpireTime
  path?: string
  domain?: string
  secure?: string
  sameSite?: string
}

interface CookieConfigOptions extends _CookieBase { }
interface SetCookieOptions extends _CookieBase { }

interface Cookie {
  setConfig(options: CookieConfigOptions): void
  setCookie(keyName: KeyName, value: string, options?: SetCookieOptions): boolean
  getCookie(keyName: KeyName): string | object
  removeCookie(keyName: KeyName, options?: RemoveCookieOptions): boolean
  isCookieAvailable(keyName: KeyName): boolean
  cookieKeys(): string[]
  cookieEntries(): CookiesItem[]
}
```

## Api

### Поддержка json объекта

```ts
const user = {
  user_id: 1,
  name: 'Пашка',
  session: '75442486-0878-440c-9db1-a7006c25a39f',
  session_start_time: new Date(),
}
setCookie('user', user)

console.log(getCookie('user').name)
```

### Установка expire time (времени жизни)

```ts
// По умолчанию - 1 day
setCookie('user_session', '75442486-0878-440c-9db1-a7006c25a39f')

// Синтаксис строки: number + [m,d,h,min,s,y], регистр игнорируется
setCookie('user_session', '75442486-0878-440c-9db1-a7006c25a39f', {
  expire: '1d',
})
setCookie('user_session', '75442486-0878-440c-9db1-a7006c25a39f', {
  expire: '1D',
})

// Также можно передать строку в ISO формате
setCookie('user_session', '75442486-0878-440c-9db1-a7006c25a39f', {
  expire: 'Sat, 13 Mar 2013 12:25:57 GMT',
})

// Число (время жизни куки в секундах)
setCookie('user_session', '75442486-0878-440c-9db1-a7006c25a39f', {
  expire: 60 * 60 * 24,
})

// Объект даты
setCookie('user_session', '75442486-0878-440c-9db1-a7006c25a39f', {
  expire: new Date('2023-06-24'),
})
// Текущая дата + 1 день
const date = new Date()
setCookie('user_session', '75442486-0878-440c-9db1-a7006c25a39f', {
  expire: date.setDate(date.getDate() + 1),
})

// Время жизни сессии в браузере
setCookie('user_session', '75442486-0878-440c-9db1-a7006c25a39f', { expire: 0 })

// Вечная куки (только -1, остальные отрицательные значения не валидны)
setCookie('user_session', '75442486-0878-440c-9db1-a7006c25a39f', { expire: -1 })
```

| Сивмол | Значение  |
| ------ | --------- |
| y      | year      |
| m      | month     |
| d      | day       |
| h      | hour      |
| min    | minute    |
| s      | second    |

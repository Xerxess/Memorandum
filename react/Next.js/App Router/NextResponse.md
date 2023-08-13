# NextResponse

* NextResponse 通过额外的便捷方法扩展了 Web Response API。

## cookies

```tsx
// Given incoming request /home
let response = NextResponse.next()
// Set a cookie to hide the banner
response.cookies.set('show-banner', 'false')
// Response will have a `Set-Cookie:show-banner=false;path=/home` header
return response


// Given incoming request /home
let response = NextResponse.next()
// { name: 'show-banner', value: 'false', Path: '/home' }
response.cookies.get('show-banner')


// Given incoming request /home
let response = NextResponse.next()
// [
//   { name: 'experiments', value: 'new-pricing-page', Path: '/home' },
//   { name: 'experiments', value: 'winter-launch', Path: '/home' },
// ]
response.cookies.getAll('experiments')
// Alternatively, get all cookies for the response
response.cookies.getAll()


// Given incoming request /home
let response = NextResponse.next()
// Returns true for deleted, false is nothing is deleted
response.cookies.delete('experiments')
```

## json()

使用给定的 JSON 正文生成响应。

```jsx
import { NextResponse } from 'next/server'
 
export async function GET(request: Request) {
  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
}
```

## redirect()

生成重定向到 URL 的响应

```tsx
import { NextResponse } from 'next/server'
 
return NextResponse.redirect(new URL('/new', request.url))
```

## rewrite()

生成一个重写（代理）给定 URL 的响应，同时保留原始 URL。

```tsx
import { NextResponse } from 'next/server'
 
// Incoming request: /about, browser shows /about
// Rewritten request: /proxy, browser shows /about
return NextResponse.rewrite(new URL('/proxy', request.url))
```

## next()

next() 方法对于中间件很有用，因为它允许您提前返回并继续路由。

```tsx
import { NextResponse } from 'next/server'
 
// Given an incoming request...
const newHeaders = new Headers(request.headers)
// Add a new header
newHeaders.set('x-version', '123')
// And produce a response with the new headers
return NextResponse.next({
  request: {
    // New request headers
    headers: newHeaders,
  },
})
```
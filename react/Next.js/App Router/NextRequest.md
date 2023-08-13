# NextRequest

* NextRequest 通过额外的便捷方法扩展了 Web 请求 API。

## cookies

```tsx
// Given incoming request /home
// Set a cookie to hide the banner
// request will have a `Set-Cookie:show-banner=false;path=/home` header
request.cookies.set('show-banner', 'false')

// Given incoming request /home
// { name: 'show-banner', value: 'false', Path: '/home' }
request.cookies.get('show-banner')


// Given incoming request /home
// [
//   { name: 'experiments', value: 'new-pricing-page', Path: '/home' },
//   { name: 'experiments', value: 'winter-launch', Path: '/home' },
// ]
request.cookies.getAll('experiments')
// Alternatively, get all cookies for the request
request.cookies.getAll()


// Returns true for deleted, false is nothing is deleted
request.cookies.delete('experiments')

// Returns true if cookie exists, false if it does not
request.cookies.has('experiments')

request.cookies.clear()
```

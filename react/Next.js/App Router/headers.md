# headers

* headers 函数允许您从服务器组件读取 HTTP 传入请求标头。

```tsx
import { headers } from 'next/headers'
 
export default function Page() {
  const headersList = headers()
  const referer = headersList.get('referer')
 
  return <div>Referer: {referer}</div>
}
```

* Headers.entries(): 返回一个迭代器，允许遍历该对象中包含的所有键/值对。
* Headers.forEach(): 对此 Headers 对象中的每个键/值对执行一次提供的函数。
* Headers.get(): 返回具有给定名称的 Headers 对象中标头的所有值的字符串序列。
* Headers.has(): 返回一个布尔值，指示 Headers 对象是否包含特定标头。
* Headers.keys(): 返回一个迭代器，允许您遍历此对象中包含的键/值对的所有键。
* Headers.values(): 返回一个迭代器，允许您遍历该对象中包含的键/值对的所有值。

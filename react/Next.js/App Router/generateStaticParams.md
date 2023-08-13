# generateStaticParams

* generateStaticParams 函数可以与动态路由段结合使用，在构建时静态生成路由，而不是在请求时按需生成路由。
* 构建时通过此方法生成多个静态页面，如新闻页面，不必通过 ajax 获取数据动态构建


```tsx
// app/blog/[slug]/page.js

// 返回“params”列表以填充 [slug] 动态段
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())
 
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
 
// 该页面的多个版本将静态生成
// 使用“generateStaticParams”返回的“params”
export default function Page({ params }) {
  const { slug } = params
  // ...
}
```

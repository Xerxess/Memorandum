# Metadata

* 仅服务器组件支持对象metadata和generateMetadata函数导出。
* 您无法从同一线路段中同时导出metadata对象和函数。generateMetadata

```tsx
import { Metadata } from 'next'
 
// either Static metadata
export const metadata: Metadata = {
  title: '...',
}
 
// or Dynamic metadata
export async function generateMetadata({ params }) {
  return {
    title: '...',
  }
}
```

```tsx
import { Metadata, ResolvingMetadata } from 'next'
 
type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id
 
  // fetch data
  const product = await fetch(`https://.../${id}`).then((res) => res.json())
 
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: product.title,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}
 
export default function Page({ params, searchParams }: Props) {}
```

## 元数据字段

* title  设置文档的标题
* description

```ts
export const metadata = {
  generator: 'Next.js',
  applicationName: 'Next.js',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [{ name: 'Seb' }, { name: 'Josh', url: 'https://nextjs.org' }],
  colorScheme: 'dark',
  creator: 'Jiachi Liu',
  publisher: 'Sebastian Markbåge',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}
// 输出内容
// <meta name="application-name" content="Next.js" />
// <meta name="author" content="Seb" />
// <link rel="author" href="https://nextjs.org" />
// <meta name="author" content="Josh" />
// <meta name="generator" content="Next.js" />
// <meta name="keywords" content="Next.js,React,JavaScript" />
// <meta name="referrer" content="origin-when-cross-origin" />
// <meta name="color-scheme" content="dark" />
// <meta name="creator" content="Jiachi Liu" />
// <meta name="publisher" content="Sebastian Markbåge" />
// <meta name="format-detection" content="telephone=no, address=no, email=no" />
```
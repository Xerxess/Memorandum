<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [next-auth](#next-auth)
  - [自定义验证](#自定义验证)

<!-- /code_chunk_output -->

# next-auth

- 版本v5
- Auth.js是一个基于标准Web API的运行时不可知论库，它与多个现代JavaScript框架深入集成，以提供易于入门，易于扩展，始终私有且安全的身份验证体验！
- 可以通过数据库适配器将auth.js与外部数据库集成，以防您需要或要存储用户数据
- 支持：
  - OAuth身份验证（与Google，Github，LinkedIn等签名... ）
  - Magic Links（电子邮件提供商如远期电子邮件，重新发送，sendgrid，nodemailer等... ）
  - Credentials（用户名和密码，与外部API集成等等…… ）
  - WebAuthn （ Passkeys等... ）

```tsx
// 第一步
npm install next-auth@beta
npx auth secret

// 第二步 根目录中创建一个新的 auth.ts
import NextAuth from "next-auth"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [],
})

// 第三步 创建 ./app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth" // Referring to the auth.ts we just created
export const { GET, POST } = handlers

// 第四步 ./middleware.ts
export { auth as middleware } from "@/auth"
```

## 自定义验证

Credentials:https://authjs.dev/getting-started/authentication/credentials?framework=next-js

官方DEMO:https://github.com/nextauthjs/next-auth/tree/main/apps/examples/nextjs

- 基于 Credentials Provider 实现

```tsx
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const { handlers, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      // 显示在登录页面的名称
      name: "账号密码",
      
      // 定义凭证字段
      credentials: {
        username: { 
          label: "用户名",
          type: "text",
          placeholder: "请输入用户名" 
        },
        password: { 
          label: "密码",
          type: "password",
          placeholder: "请输入密码"
        }
      },
      
      // 验证函数
      async authorize(credentials) {
        try {
          // 调用 API 验证用户
          const res = await fetch("https://api.example.com/login", {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          })
          
          const user = await res.json()

          if (res.ok && user) {
            // 返回用户对象会创建登录会话
            return user
          }
          return null
          
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  
  // 自定义页面
  pages: {
    signIn: '/auth/login',  // 自定义登录页面
    error: '/auth/error',   // 自定义错误页面
  },
  
  // 回调函数
  callbacks: {
    // JWT 回调
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.permissions = user.permissions
      }
      return token
    },
    
    // Session 回调
    async session({ session, token }) {
      session.user.role = token.role
      session.user.permissions = token.permissions
      return session
    }
  }
})
```

```tsx
// 自定义登录页面 page.tsx
'use client'

import { signIn } from "next-auth/react"
import { useState } from "react"

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    try {
      const res = await signIn("credentials", {
        username: formData.get("username"),
        password: formData.get("password"),
        redirect: false
      })
      
      if (res?.error) {
        setError("登录失败，请检查用户名和密码")
      } else {
        // 登录成功，重定向
        window.location.href = "/"
      }
    } catch (error) {
      setError("登录过程发生错误")
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="text-red-500">{error}</div>}
      
      <div>
        <label htmlFor="username">用户名</label>
        <input
          type="text"
          id="username"
          name="username"
          required
        />
      </div>
      
      <div>
        <label htmlFor="password">密码</label>
        <input
          type="password"
          id="password"
          name="password"
          required
        />
      </div>
      
      <button type="submit">
        登录
      </button>
    </form>
  )
}
```

```tsx
// 中间件保护路由
import { auth } from "./auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isApiRoute = req.nextUrl.pathname.startsWith('/api/')
  const isAuthRoute = req.nextUrl.pathname.startsWith('/auth/')
  
  // 未登录用户只能访问登录相关页面
  if (!isLoggedIn && !isAuthRoute) {
    return Response.redirect(new URL('/auth/login', req.nextUrl))
  }
  
  // API 路由保护
  if (isApiRoute && !isLoggedIn) {
    return new Response(null, { status: 401 })
  }
  
  return null
})

export const config = {
  matcher: ['/((?!_next/static|favicon.ico).*)']
}
```

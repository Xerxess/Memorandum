# vue-router
<!-- TOC -->

- [vue-router](#vue-router)
    - [路由组件传参](#路由组件传参)
    - [$route](#route)
    - [router.beforeEach 全局前置守卫](#routerbeforeeach-全局前置守卫)
    - [router.afterEach 全局后置钩子](#routeraftereach-全局后置钩子)
    - [组件内的守卫](#组件内的守卫)

<!-- /TOC -->

## 路由组件传参

* props 被设置为 true，route.params 将会被设置为组件属性。

## $route

* $route.path 字符串，对应当前路由的路径，总是解析为绝对路径，如 "/foo/bar"。
* $route.params 路由参数(/user/:id=> $route.params.id)
* $route.query ('/foo?user=1'=> $route.query.user == 1)
* $route.hash hash 值 (带 #) 
* $route.fullPath 完成解析后的 URL，包含查询参数和 hash 的完整路径。
* $route.matched 路由记录
* $route.name 当前路由的名称
* $route.redirectedFrom 如果存在重定向，即为重定向来源的路由的名字。

## router.beforeEach 全局前置守卫

https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB

* to: Route: 即将要进入的目标 路由对象
* from: Route: 当前导航正要离开的路由
* next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```

## router.afterEach 全局后置钩子

```js
router.afterEach((to, from) => {
  // ...
})
```

## 组件内的守卫

* beforeRouteEnter
* beforeRouteUpdate (2.2 新增)
* beforeRouteLeave

```js
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```
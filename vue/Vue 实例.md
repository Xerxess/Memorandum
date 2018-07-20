# Vue 实例

```js
var vm = new Vue({
    ... //选项
});
```

> data

`type` : [Object | Function] 

`limit` : 组件的定义只接受 function

`describe` : Vue 实例的数据对象

`data: vm => ({ a: vm.myProp }) 箭头函数 vm==this实例对象`  

`组件`被定义，data 必须声明为返回一个初始数据对象的`函数`，因为组件可能被用来创建多个实例。

`Examples` :
```js
var data = { a: 1 }

// 直接创建一个实例
var vm = new Vue({
  data: data
})
vm.a // => 1
vm.$data === data // => true

// Vue.extend() 中 data 必须是函数
var Component = Vue.extend({
  data: function () {
    return { a: 1 }
  }
})
```

> methods

type: { [key: string]: Function }

methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 this 自动绑定为 Vue 实例。

```js
var vm = new Vue({
  data: { a: 1 },
  methods: {
    plus: function () {
      this.a++
    }
  }
})
vm.plus()
vm.a // 2
```

> props

`type`: Array<string> | Object
`describe` : props 可以是数组或对象，用于接收来自父组件的数据。
`Examples` :
```js
//数组形式
props: ['title', 'likes', 'isPublished', 'commentIds', 'author']

//指定的值类型
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object
}
```

> computed

自定义`属性`混入到 Vue 实例中。  
`可参考java,C#的对象属性`

```js
var vm = new Vue({
  computed: {
    // 仅get
    aDouble: function () {
      ...
    },
    // get 和 set
    aPlus: {
      get: function () {
        ...
      },
      set: function (v) {
        ...
      }
    }
  }
})
```


> watch

`watch` 对象的每一个属性对应 `data` 对象的每一个属性 并监听data的每一个属性值的`change`

```js
var vm = new Vue({
  data: {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: {
      f: {
        g: 5
      }
    }
  },
  watch: {
    a: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    },
    // 方法名
    b: 'someMethod',
    // 深度 watcher
    c: {
      handler: function (val, oldVal) { /* ... */ },
      deep: true
    },
    // 该回调将会在侦听开始之后被立即调用
    d: {
      handler: function (val, oldVal) { /* ... */ },
      immediate: true
    },
    e: [
      function handle1 (val, oldVal) { /* ... */ },
      function handle2 (val, oldVal) { /* ... */ }
    ],
    // watch vm.e.f's value: {g: 5}
    'e.f': function (val, oldVal) { /* ... */ }
  }
})
vm.a = 2 // => new: 2, old: 1
```


#  生命周期钩子

* `beforeCreate` 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。
* `created` 在实例创建完成后被立即调用。`$el`不可见
* `beforeMount` 在挂载开始之前被调用
* `mounted` el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
* `beforeUpdate` 数据更新时调用，发生在虚拟 DOM 打补丁之前。
* `updated` 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
* `activated` keep-alive 组件激活时调用。
* `deactivated` keep-alive 组件停用时调用。
* `beforeDestroy` 实例销毁之前调用。
* `destroyed` Vue 实例销毁后调用。
* `errorCaptured` 当捕获一个来自子孙组件的错误时被调用。


> directives

创建局部自定义指令

> filters

创建局部过滤器


> components

创建局部组件
# Vuex

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。

* Getter 是 State 的计算属性 属性访问时缓存在响应式系统
* Mutation - 唯一个性 State
* Action - 异步
* Module - store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块

注意下面使用方法`store`
```js
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    ...
  },
  mutations: {
    ...
  }
});

const app = new Vue({
  el: '#app',
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
});
```

# State

Vuex 使用单一状态树——是的，用一个对象就包含了全部的应用层级状态。
```js


```

* mapState 辅助函数

生成计算属性，方便获取全局状态

```js
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}

// 计算属性的名称与 state 的子节点名称相同时
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])

// 与局部状态混合
computed: {
  localComputed () { /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}
```

# Getter

计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。  
可以理解为给store设置属性，可以参考vue的`computed`,

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
     },
    doneTodosCount: (state, getters) => {//getters可作为第二个参数
      return getters.doneTodos.length
    }，
    getTodoById: (state) => (id) => {//返回一个函数,实现给 getter 传参
      return state.todos.find(todo => todo.id === id)
    }
  }
})
```

* mapGetters 辅助函数

辅助函数仅仅是将 store 中的 getter 映射到局部计算属性

```js
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```
# Mutation

* Mutation 必须是同步函数

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation,属于`同步提交`
```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    },
    increment2 (state,payload) {//传递额外的参数
      // 变更状态
      state.count++
    }
  }
});


store.commit('increment');//唯一提交方法
store.commit('increment1', 10)//唯一提交方法,带参数

//提交对象语法糖
store.commit({
  type: 'increment'
});
store.commit({
  type: 'increment1',
  amount: 10
});
```

* Mutation 需遵守 Vue 的响`应规则`

    * 最好提前在你的 store 中初始化好所有所需属性。

    * 当需要在对象上添加新属性时，你应该

        使用 Vue.set(obj, 'newProp', 123),   
        或者   
        以新对象替换老对象    
        state.obj = { ...state.obj, newProp: 123 }

* mapMutations 辅助函数

mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）
```js 
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```
# Action

Action 类似于 mutation，不同在于：

1. Action 提交的是 mutation，而不是直接变更状态。
2. Action 可以包含任意异步操作。

* 接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {//context具有store 实例相同方法和属性
      context.commit('increment')
    },
    incrementAsync ({ commit }) {//异步
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  }
})

store.dispatch('increment');//触发action
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```
* mapActions 辅助函数

mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store）

* Promise组合action

store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise，并且 store.dispatch 仍旧返回 Promise
```js
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}
```
# Module

将 store 分割成模块（module）,每个模块state相互独立

* 模块的局部状态
* 命名空间

每个模块拥有自己的 `state`、`mutation`、`action`、`getter`、`甚至是嵌套子模块`

* action|getter 局部状态通过 context.state 暴露出来，
* action|getter  根节点状态则为 context.rootState

```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

```js
// action
const moduleA = {
  // ...
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}

// getter
const moduleA = {
  // ...
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}
```

> 模块动态注册

```js
// 注册模块 `myModule`
store.registerModule('myModule', {
  // ...
})
// 注册嵌套模块 `nested/myModule`
store.registerModule(['nested', 'myModule'], {
  // ...
})
```

> 带命名空间的绑定函数

* 使用 mapState, mapGetters, mapActions 和 mapMutations

```js
computed: {
  ...mapState('some/nested/module', {
    a: state => state.a,
    b: state => state.b
  })
},
methods: {
  ...mapActions('some/nested/module', [
    'foo', // -> this.foo()
    'bar' // -> this.bar()
  ])
}
```

> createNamespacedHelpers

* 通过createNamespacedHelpers 取出命名空间中 module  mapState, mapActions 

```js
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')
```


> 保留 state

* state 不会重写

```
store.registerModule('a', module, { preserveState: true })
```

# 插件

```js
const myPlugin = store => {
  // 当 store 初始化后调用
  store.subscribe((mutation, state) => {//可以理解订阅mutation执行后的事件
    // 每次 mutation 之后调用
    // mutation 的格式为 { type, payload }
  })
}
```
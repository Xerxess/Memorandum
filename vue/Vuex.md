# Vuex

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。

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

使用该函数比使用属性方便很多，在属性中需要使用`this.$store.state`来获得`state`很麻烦重复

```js
mapState({
    key0:state=>{
    },
    key1:"key1",
    key2:function(state){
    }
})
```

# Getter

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

将 store 分割成模块（module）

每个模块拥有自己的 `state`、`mutation`、`action`、`getter`、`甚至是嵌套子模块`

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
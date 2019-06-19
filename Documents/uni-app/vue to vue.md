vue to vue 通信

* 通过路由参数

```
uni.navigateTo({
    url: 'test?id=1&name=uniapp'
});

onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
        console.log(option.id); //打印出上个页面传递的参数。
        console.log(option.name); //打印出上个页面传递的参数。
    }
```

* 数据缓存

```
uni.setStorage({
    key: 'storage_key',
    data: 'hello',
    success: function () {
        console.log('success');
    }
});
```

* 通过 Vuex 状态管理

* 全局订阅模式

* uni-app 提供
  * uni.$emit(eventName,OBJECT)
  * uni.$on(eventName,callback)
  * uni.$once(eventName,callback)
  * uni.$off([eventName, callback])

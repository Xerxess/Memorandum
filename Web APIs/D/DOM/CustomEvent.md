# CustomEvent

https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent  
自定义事件

# 兼容

Chrome:-
Edge:-
Firefox:-
Internet Explorer:-

# 语法

```js
CustomEvent(typeArg);
CustomEvent(typeArg, options);
```

# Note

-

# polyfill

```js

```

# 示例

```js
// create custom events
const catFound = new CustomEvent('animalfound', {
  detail: {
    name: 'cat'
  }
});
const dogFound = new CustomEvent('animalfound', {
  detail: {
    name: 'dog'
  }
});

// add an appropriate event listener
obj.addEventListener('animalfound', (e) => console.log(e.detail.name));

// dispatch the events
obj.dispatchEvent(catFound);
obj.dispatchEvent(dogFound);

// "cat" and "dog" logged in the console
```

# 笔记

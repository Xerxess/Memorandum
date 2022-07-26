<!-- TOC -->

- [MutationObserver](#mutationobserver)
    - [observetarget, options](#observetarget-options)

<!-- /TOC -->

# MutationObserver

https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver

https://developer.mozilla.org/en-US/docs/Web/API/MutationEvent

MutationObserver 接口提供了监视对 DOM 树进行更改的能力。它旨在替代旧的 Mutation Events 功能，该功能是 DOM3 事件规范的一部分。

```js
// Select the node that will be observed for mutations
const targetNode = document.getElementById('some-id');

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function (mutationList, observer) {
  // Use traditional 'for loops' for IE 11
  for (const mutation of mutationList) {
    if (mutation.type === 'childList') {
      console.log('A child node has been added or removed.');
    } else if (mutation.type === 'attributes') {
      console.log('The ' + mutation.attributeName + ' attribute was modified.');
    }
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

// Later, you can stop observing
observer.disconnect();
```

## observe(target, options)

调用 observe() 时，至少 `childList`、`attributes`或 `characterData `之一必须为true。否则会抛出 TypeError 异常。

- options
  - subtree 默认:false 设置为 true 以将监视扩展到以目标为根的节点的整个子树。然后将所有其他属性扩展到子树中的所有节点，而不是仅应用于目标节点。
  - childList 默认:false 设置为 true 以监视目标节点（如果 subtree 为 true，则监视其后代）以添加新的子节点或删除现有的子节点。
  - attributes 设置为 true 以监视正在监视的一个或多个节点上的属性值的更改。如果指定了 attributeFilter 或 attributeOldValue 中的任何一个，则默认值为 true，否则默认值为 false。
  - attributeFilter 要监视的特定属性名称的数组。如果不包含此属性，则对所有属性的更改都会导致突变通知。
  - attributeOldValue 设置为 true 以记录在监视节点或节点的属性更改时发生更改的任何属性的先前值；
  - characterData 设置为 true 以监视指定的目标节点（并且，如果 subtree 为 true，则监视其后代）对包含在一个或多个节点中的字符数据的更改。
  - characterDataOldValue 默认:false 设置为 true 以在被监视节点上的文本更改时记录节点文本的先前值。

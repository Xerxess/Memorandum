<!-- TOC -->

- [WebAssembly](#webassembly)
- [asm.js](#asmjs)
- [emscripten](#emscripten)
  - [docker](#docker)

<!-- /TOC -->

https://developer.mozilla.org/en-US/docs/WebAssembly

https://developer.mozilla.org/zh-CN/docs/WebAssembly/Concepts

https://webassembly.org/

https://github.com/emscripten-core/emscripten

http://asmjs.org/

https://developer.mozilla.org/en-US/docs/Games/Tools

# WebAssembly

WebAssembly是一种运行在现代网络浏览器中的新型代码，并且提供新的性能特性和效果。它设计的目的不是为了手写代码而是为诸如C、C++和Rust等低级源语言提供一个高效的编译目标。


# asm.js

* asm.js是一种提升js执行效率的解决方案。asm.js能带来非常高的效率提升。甚至能让浏览器运行3d游戏。
* asm.js 在浏览器里的运行速度，甚至可以达到原生代码运行速度的一半。


# emscripten

将c/c++ 编译成asm.js/WebAssembly

## docker

```
docker run --rm -v $(pwd):/src -u $(id -u):$(id -g) emscripten/emsdk
```

# StrictMode

* StrictMode 是一个用来突出显示应用程序中潜在问题的工具。
* 与 Fragment 一样，StrictMode 不会渲染任何可见的 UI。它为其后代元素触发额外的检查和警告。
* 严格模式检查仅在开发模式下运行；它们不会影响生产构建。


```js
import React from 'react';

function ExampleApplication() {
  return (
    <div>
      <Header />
      <React.StrictMode>
        <div>
          <ComponentOne />
          <ComponentTwo />
        </div>
      </React.StrictMode>
      <Footer />
    </div>
  );
}
```
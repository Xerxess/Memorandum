<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Mock Functions](#mock-functions)
  - [Methods 方法](#methods-方法)
    - [mockFn.getMockName()](#mockfngetmockname)
    - [mockFn.mock.calls](#mockfnmockcalls)
    - [mockFn.mock.results](#mockfnmockresults)
    - [mockFn.mock.instances](#mockfnmockinstances)
    - [mockFn.mock.contexts](#mockfnmockcontexts)
    - [mockFn.mock.lastCall](#mockfnmocklastcall)
    - [mockFn.mockClear() *](#mockfnmockclear-span-stylecolorredspan)
    - [mockFn.mockReset() *](#mockfnmockreset-span-stylecolorredspan)
    - [mockFn.mockRestore()](#mockfnmockrestore)
    - [mockFn.mockImplementation(fn) *](#mockfnmockimplementationfn-span-stylecolorredspan)
    - [jest.fn(implementation) *](#jestfnimplementation-span-stylecolorredspan)
    - [mockFn.mockImplementationOnce(fn)](#mockfnmockimplementationoncefn)
    - [mockFn.mockName(name)](#mockfnmocknamename)
    - [mockFn.mockReturnThis() 简写语法](#mockfnmockreturnthis-简写语法)
    - [mockFn.mockReturnValue(value) 简写语法](#mockfnmockreturnvaluevalue-简写语法)
    - [mockFn.mockReturnValueOnce(value) 简写语法](#mockfnmockreturnvalueoncevalue-简写语法)
    - [mockFn.mockResolvedValue(value) 简写语法](#mockfnmockresolvedvaluevalue-简写语法)
    - [mockFn.mockResolvedValueOnce(value) 简写语法](#mockfnmockresolvedvalueoncevalue-简写语法)
    - [mockFn.mockRejectedValue(value) 简写语法](#mockfnmockrejectedvaluevalue-简写语法)
    - [mockFn.mockRejectedValueOnce(value) 简写语法](#mockfnmockrejectedvalueoncevalue-简写语法)
    - [mockFn.withImplementation(fn, callback)](#mockfnwithimplementationfn-callback)
  - [TypeScript Usage TypeScript 使用方法](#typescript-usage-typescript-使用方法)
    - [jest.fn(implementation?)](#jestfnimplementation)
    - [jest.Mock<T>](#jestmockt)
    - [jest.Mocked<Source>](#jestmockedsource)

<!-- /code_chunk_output -->

# Mock Functions

模拟函数也被称为 "间谍"，因为它可以让你监视被其他代码间接调用的函数的行为，而不是只测试输出。您可以使用 jest.fn() 创建一个 mock 函数。如果没有给出实现，则调用 mock 函数时将返回 undefined 。

```js
jest.fn()
```

## Methods 方法

```js
const mockFn = jest.fn()
```

### mockFn.getMockName()

返回通过调用 .mockName() 设置的模拟名称字符串

### mockFn.mock.calls

一个数组，包含该 mock 函数所有调用的调用参数。数组中的每一项都是在调用过程中传递的参数数组。

```js
// 例如一个模拟函数 f 被调用了两次，一次是调用参数 f('arg1', 'arg2') ，另一次是调用参数 f('arg3', 'arg4') ，其数组 mock.calls 将如下所示：
[
  ['arg1', 'arg2'],
  ['arg3', 'arg4'],
];
```

### mockFn.mock.results

数组，包含对该 mock 函数的所有调用结果。数组中的每个条目都是一个对象，包含一个 type 属性和一个 value 属性。

### mockFn.mock.instances

数组，包含使用 new 从该 mock 函数实例化的所有对象实例。

```js
const mockFn = jest.fn();

const a = new mockFn();
const b = new mockFn();

mockFn.mock.instances[0] === a; // true
mockFn.mock.instances[1] === b; // true
```

### mockFn.mock.contexts

一个数组，包含 mock 函数所有调用的上下文。

```js
const mockFn = jest.fn();

const boundMockFn = mockFn.bind(thisContext0);
boundMockFn('a', 'b');
mockFn.call(thisContext1, 'a', 'b');
mockFn.apply(thisContext2, ['a', 'b']);

mockFn.mock.contexts[0] === thisContext0; // true
mockFn.mock.contexts[1] === thisContext1; // true
mockFn.mock.contexts[2] === thisContext2; // true
```

### mockFn.mock.lastCall

数组，包含最后一次调用此 mock 函数的调用参数。如果函数未被调用，将返回 undefined 。

### mockFn.mockClear() <span style="color:red;">*</span>

清除存储在 mockFn.mock.calls 、 mockFn.mock.instances 、 mockFn.mock.contexts 和 mockFn.mock.results 数组中的所有信息。当你想清理两个断言之间的 mocks 使用数据时，这通常很有用。

### mockFn.mockReset() <span style="color:red;">*</span>

执行 mockFn.mockClear() 所做的一切，并用空函数替换 mock 实现，返回 undefined 。

### mockFn.mockRestore()

执行 mockFn.mockReset() 所做的一切，并还原原始（非模拟）实现。

当您想在某些测试用例中模拟函数，而在其他测试用例中恢复原始实现时，这一点非常有用。

### mockFn.mockImplementation(fn) <span style="color:red;">*</span>

接受一个应被用作 mock 实现的函数。mock 本身仍将记录所有调入和调出的实例，唯一的区别是在调用 mock 时也将执行该实现。

`jest.fn(implementation) 是 jest.fn().mockImplementation(implementation) 的简写。`

### jest.fn(implementation) <span style="color:red;">*</span>

`jest.fn(implementation) 是 jest.fn().mockImplementation(implementation) 的简写。`

### mockFn.mockImplementationOnce(fn)

接受一个函数，该函数将用作一次调用被模拟函数时的模拟实现。可进行链式处理，使多次函数调用产生不同的结果。

```ts
import {jest} from '@jest/globals';

const mockFn = jest
  .fn<(cb: (a: null, b: boolean) => void) => void>()
  .mockImplementationOnce(cb => cb(null, true))
  .mockImplementationOnce(cb => cb(null, false));

mockFn((err, val) => console.log(val)); // true
mockFn((err, val) => console.log(val)); // false


// 当模拟函数用完用 .mockImplementationOnce() 定义的实现时，它将执行用 jest.fn(() => defaultValue) 或 .mockImplementation(() => defaultValue) 设置的默认实现（如果它们被调用）：
const mockFn = jest
  .fn(() => 'default')
  .mockImplementationOnce(() => 'first call')
  .mockImplementationOnce(() => 'second call');

mockFn(); // 'first call'
mockFn(); // 'second call'
mockFn(); // 'default'
mockFn(); // 'default'
```

### mockFn.mockName(name)

接受一个字符串，用于在测试结果输出中代替 'jest.fn()' 指示引用的是哪个 mock 函数。

### mockFn.mockReturnThis() 简写语法

```js
jest.fn(function () {
  return this;
});
```

### mockFn.mockReturnValue(value) 简写语法

```js
jest.fn().mockImplementation(() => value);
```

### mockFn.mockReturnValueOnce(value) 简写语法

```js
jest.fn().mockImplementationOnce(() => value);
```

### mockFn.mockResolvedValue(value) 简写语法

```js
jest.fn().mockImplementation(() => Promise.resolve(value));
```

### mockFn.mockResolvedValueOnce(value) 简写语法

```js
jest.fn().mockImplementationOnce(() => Promise.resolve(value));
```

### mockFn.mockRejectedValue(value) 简写语法

```js
jest.fn().mockImplementation(() => Promise.reject(value));
```

### mockFn.mockRejectedValueOnce(value) 简写语法

```js
jest.fn().mockImplementationOnce(() => Promise.reject(value));
```

### mockFn.withImplementation(fn, callback)

接受一个函数，该函数在执行回调时应暂时用作 mock 的实现。

```js
test('test', () => {
  const mock = jest.fn(() => 'outside callback');

  mock.withImplementation(
    () => 'inside callback',
    () => {
      mock(); // 'inside callback'
    },
  );

  mock(); // 'outside callback'
});

// 无论回调是否异步（返回 thenable ），都可以使用 mockFn.withImplementation 。如果回调是异步的，则将返回一个 promise。等待承诺将等待回调并重置实现。
test('async test', async () => {
  const mock = jest.fn(() => 'outside callback');

  // We await this call since the callback is async
  await mock.withImplementation(
    () => 'inside callback',
    async () => {
      mock(); // 'inside callback'
    },
  );

  mock(); // 'outside callback'
});
```

## TypeScript Usage TypeScript 使用方法

### jest.fn(implementation?)

如果将实现传递给 jest.fn() ，将推断出正确的模拟类型。在许多用例中，都会省略实现。为确保类型安全，您可以传递一个通用类型参数（更多参考，请参阅上面的示例）

```js
import {expect, jest, test} from '@jest/globals';
import type add from './add';
import calculate from './calc';

test('calculate calls add', () => {
  // Create a new mock that can be used in place of `add`.
  const mockAdd = jest.fn<typeof add>();

  // `.mockImplementation()` now can infer that `a` and `b` are `number`
  // and that the returned value is a `number`.
  mockAdd.mockImplementation((a, b) => {
    // Yes, this mock is still adding two numbers but imagine this
    // was a complex function we are mocking.
    return a + b;
  });

  // `mockAdd` is properly typed and therefore accepted by anything
  // requiring `add`.
  calculate(mockAdd, 1, 2);

  expect(mockAdd).toHaveBeenCalledTimes(1);
  expect(mockAdd).toHaveBeenCalledWith(1, 2);
});
```

### jest.Mock<T>

构造 mock 函数的类型，例如 jest.fn() 的返回类型。如果需要定义递归 mock 函数，它将非常有用：

```ts
import {jest} from '@jest/globals';

const sumRecursively: jest.Mock<(value: number) => number> = jest.fn(value => {
  if (value === 0) {
    return 0;
  } else {
    return value + fn(value - 1);
  }
});
```

### jest.Mocked<Source>

jest.Mocked<Source> 实用程序类型返回用 Jest mock 函数的类型定义包装的 Source 类型

```ts
import {expect, jest, test} from '@jest/globals';
import type {fetch} from 'node-fetch';

jest.mock('node-fetch');

let mockedFetch: jest.Mocked<typeof fetch>;

afterEach(() => {
  mockedFetch.mockClear();
});

test('makes correct call', () => {
  mockedFetch = getMockedFetch();
  // ...
});

test('returns correct data', () => {
  mockedFetch = getMockedFetch();
  // ...
});
```

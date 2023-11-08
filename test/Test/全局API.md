
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [全局API](#全局api)
  - [afterAll](#afterall)
  - [afterEach](#aftereach)
  - [beforeAll](#beforeall)
  - [beforeEach](#beforeeach)
  - [describe 常用](#describe-常用)
  - [describe.each](#describeeach)
  - [describe.only](#describeonly)
  - [describe.only.each](#describeonlyeach)
  - [describe.skip](#describeskip)
  - [describe.skip.each](#describeskipeach)
  - [test](#test)
  - [test.only](#testonly)
  - [test.each](#testeach)
  - [test.only.each](#testonlyeach)
  - [test.skip](#testskip)
  - [test.skip.each](#testskipeach)
  - [test.concurrent](#testconcurrent)
  - [test.concurrent.each](#testconcurrenteach)
  - [test.concurrent.only.each](#testconcurrentonlyeach)
  - [test.concurrent.skip.each](#testconcurrentskipeach)
  - [test.failing](#testfailing)
  - [test.failing.each](#testfailingeach)
  - [test.only.failing](#testonlyfailing)
  - [test.skip.failing](#testskipfailing)
  - [test.todo](#testtodo)

<!-- /code_chunk_output -->

Jest 是一个简单易用的 JavaScript 测试框架。  
它适用于使用以下语言的项目Babel、TypeScript、Node、React、Angular、Vue 等！

# API {ignore=true}

## 全局API

Jest会将这些方法和对象注入到测试文件的全局环境里， 所以你在使用的时候不再需要进行require或者import。  
如果你习惯编写明确的导入，你可以在测试文件顶部添加 import {describe, expect, test} from '@jest/globals'。

### afterAll

```js
afterAll(fn, timeout)
```

文件内所有测试完成后执行的钩子函数。 如果传入的回调函数返回值是 promise 或者 generator，Jest 会等待 promise resolve 再继续执行。

可选地传入第二个参数 timeout（毫秒） 指定函数执行超时时间。 The default timeout is 5 seconds.

使用 afterAll 非常方便你清理一些在测试用例之间共享的全局状态。

`如果 afterAll 定义在 describe 块的内部，它将会在 describe 块结束时执行。`

### afterEach

```js
afterEach(fn, timeout)
```

文件内每个测试完成后执行的钩子函数。 如果传入的回调函数返回值是 promise 或者 generator，Jest 会等待 promise resolve 再继续执行。

可选地传入第二个参数 timeout（毫秒） 指定函数执行超时时间。 The default timeout is 5 seconds.

使用 afterEach 会非常方便你清理一些在每个测试中创建的临时状态。

`如果 afterEach 定义在 describe 块的内部，它会在该 describe 块内的每一个测试结束时执行。`

### beforeAll

```js
beforeAll(fn, timeout)
```

文件内所有测试开始前执行的钩子函数。 如果传入的回调函数返回值是 promise 或者 generator，Jest 会等待 promise resolve 再继续执行。

可选地传入第二个参数 timeout（毫秒） 指定函数执行超时时间。 The default timeout is 5 seconds.

使用 beforeAll 会非常方便你设置一些在测试用例之间共享的全局状态。

`如果 beforeAll 定义在 describe 块的内部，它将会在 describe 块开始前执行。`

### beforeEach

```js
beforeEach(fn, timeout)
```

文件内每个测试开始前执行的钩子函数。 如果传入的回调函数返回值是 promise 或者 generator，Jest 会等待 promise resolve 再继续执行测试。

可选地传入第二个参数 timeout（毫秒） 指定函数执行超时时间。 The default timeout is 5 seconds.

使用 beforeEach 非常方便你重新设置一些全局状态在每个测试开始前。

`如果 beforeEach 定义在 describe 块内，它将会在该 describe 块内的每个测试运行之前执行。`

### describe 常用

```js
describe(name, fn)
```

describe(name, fn) 是一个将多个相关的测试组合在一起的块。

`注意：这不是强制的，你甚至可以直接把 test 块直接写在最外层。 但是如果你习惯按组编写测试，使用 describe 包裹相关测试用例更加友好。`

`有多层级的测试，也可以嵌套使用 describe 块`

```js
describe('binaryStringToNumber', () => {
  describe('given an invalid binary string', () => {
    test('composed of non-numbers throws CustomError', () => {
      expect(() => binaryStringToNumber('abc')).toThrow(CustomError);
    });

    test('with extra whitespace throws CustomError', () => {
      expect(() => binaryStringToNumber('  100')).toThrow(CustomError);
    });
  });

  describe('given a valid binary string', () => {
    test('returns the correct number', () => {
      expect(binaryStringToNumber('100')).toBe(4);
    });
  });
});
```

### describe.each

```js
describe.each(table)(name, fn, timeout)
```

如果您使用不同的数据不断重复相同的测试套件，请使用 describe.each 。 describe.each 允许您编写一次测试套件，并将数据传入。

describe.each 有两个应用程序接口：

```js
// 接口一
// describe.each(table)(name, fn, timeout)
// table ： Array 数组，每一行的参数都会传入 fn 中。如果输入的是一维基元数组，内部会将其映射为一个表格，即 [1, 2, 3] -> [[1], [2], [3]] 。
// name ： String 测试套件的标题

describe.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])('.add(%i, %i)', (a, b, expected) => {
  test(`returns ${expected}`, () => {
    expect(a + b).toBe(expected);
  });

  test(`returned value not be greater than ${expected}`, () => {
    expect(a + b).not.toBeGreaterThan(expected);
  });

  test(`returned value not be less than ${expected}`, () => {
    expect(a + b).not.toBeLessThan(expected);
  });
});
```

```js
// 接口二
// describe.each`table`(name, fn, timeout)
// table: 第一行变量名列标题用 | 分隔;
//        使用 ${value} 语法作为模板字面表达式提供的一行或多行后续数据。
describe.each`
  a    | b    | expected
  ${1} | ${1} | ${2}
  ${1} | ${2} | ${3}
  ${2} | ${1} | ${3}
`('$a + $b', ({a, b, expected}) => {
  test(`returns ${expected}`, () => {
    expect(a + b).toBe(expected);
  });

  test(`returned value not be greater than ${expected}`, () => {
    expect(a + b).not.toBeGreaterThan(expected);
  });

  test(`returned value not be less than ${expected}`, () => {
    expect(a + b).not.toBeLessThan(expected);
  });
});
```

### describe.only

```js
describe.only(name, fn)

```

别名

```js
fdescribe(name, fn)
```

如果只想运行一个描述块，可以使用 describe.only

```js
describe.only('my beverage', () => {
  test('is delicious', () => {
    expect(myBeverage.delicious).toBeTruthy();
  });

  test('is not sour', () => {
    expect(myBeverage.sour).toBeFalsy();
  });
});

describe('my other beverage', () => {
  // ... 将跳过
});
```

`可以用于过滤掉其他测试`

### describe.only.each

```js
describe.only.each(table)(name, fn)
```

别名

```js
fdescribe.each(table)(name, fn)
fdescribe.each`table`(name, fn)
```

两种用法 参考`describe.each`  

如果只想运行特定的数据驱动测试套件，请使用 describe.only.each

### describe.skip

```js
describe.skip(name, fn)
```

别名

```js
xdescribe(name, fn)
```

```js
describe('my beverage', () => {
  test('is delicious', () => {
    expect(myBeverage.delicious).toBeTruthy();
  });

  test('is not sour', () => {
    expect(myBeverage.sour).toBeFalsy();
  });
});

describe.skip('my other beverage', () => {
  // ... 将跳过
});
```

如果不想运行特定 describe 块的测试，可以使用 describe.skip

`使用 describe.skip 通常比暂时注释掉一大块测试更干净利落`。请注意， describe 块仍将运行。如果有一些设置也应跳过，请在 beforeAll 或 beforeEach 块中进行。

### describe.skip.each

```js
describe.skip.each(table)(name, fn)
```

### test

```js
test(name, fn, timeout)
```

别名

```js
it(name, fn, timeout)
```

```js
test('did not rain', () => {
  expect(inchesOfRain()).toBe(0);
});
```

测试文件中只需要运行测试的 test 方法。

第一个参数是测试名称；

第二个参数是包含要测试的期望值的函数。

第三个参数（可选）是 timeout （毫秒），用于指定终止测试前的等待时间。默认超时为 5 秒。

如果 test 返回了一个承诺，Jest 将等待该承诺解析后再让测试完成。

```js
test('has lemon in it', () => {
  return fetchBeverageList().then(list => {
    expect(list).toContain('lemon');
  });
});
```

`done 的参数`

Jest 会等到 done 回调被调用后才完成测试。

```js
test('the data is peanut butter', done => {
  function callback(error, data) {
    if (error) {
      done(error);
      return;
    }
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});
```

### test.only

```js
test.only(name, fn, timeout)
it.only(name, fn, timeout)
fit(name, fn, timeout)
```

`在调试大型测试文件时，您通常只想运行一部分测试。您可以使用 .only 来指定您只想在该测试文件中运行哪些测试。`

`通常情况下，您不会将使用 test.only 的代码检查到源代码控制中--您会将其用于调试，并在修复损坏的测试后将其删除。`

### test.each

```js
test.each(table)(name, fn, timeout)
it.each(table)(name, fn) 
it.each`table`(name, fn)
```

如果您使用不同的数据不断重复相同的测试，请使用 test.each 。 test.each 允许您编写一次测试，并将数据传入。

`参考 describe.each`

### test.only.each

```js
test.only.each(table)(name, fn)
it.only.each(table)(name, fn)
fit.each(table)(name, fn) 
it.only.each`table`(name, fn) 
fit.each`table`(name, fn)
```

如果只想使用不同的测试数据运行特定测试，请使用 test.only.each 。

### test.skip

```js
test.skip(name, fn)
it.skip(name, fn) 
xit(name, fn) 
xtest(name, fn)
```

```js
// 只有 "it is raining "测试才会运行，因为其他测试是通过 test.skip 运行的。
test('it is raining', () => {
  expect(inchesOfRain()).toBeGreaterThan(0);
});

test.skip('it is not snowing', () => {
  expect(inchesOfSnow()).toBe(0);
});
```

在维护大型代码库时，有时您可能会发现某个测试由于某些原因而暂时损坏。

如果您想跳过运行这个测试，但又不想删除这段代码，可以使用 test.skip 来指定一些要跳过的测试。

### test.skip.each

```js
test.skip.each(table)(name, fn)
it.skip.each(table)(name, fn) 
xit.each(table)(name, fn) 
xtest.each(table)(name, fn) 
it.skip.each`table`(name, fn) 
xit.each`table`(name, fn) 
xtest.each`table`(name, fn)
```

### test.concurrent

```js
test.concurrent(name, fn, timeout)
```

别名

```js
it.concurrent(name, fn, timeout)
```

如果希望测试同时运行，请使用 test.concurrent

第一个参数是测试名称；

`第二个参数是一个异步函数，其中包含要测试的期望值。`

第三个参数（可选）是 timeout （毫秒），用于指定终止测试前的等待时间。默认超时为 5 秒。

`使用 maxConcurrency 配置选项可防止 Jest 同时执行超过指定数量的测试。`

### test.concurrent.each

```js
test.concurrent.each(table)(name, fn, timeout)
```

别名

```js
it.concurrent.each(table)(name, fn, timeout)
```

使用不同的数据不断重复相同的测试，请使用 test.concurrent.each 。 test.each 允许您编写一次测试并传递数据，所有测试都是异步运行的。

fn：Function 要运行的测试，这是接收每一行参数作为函数参数的函数，`必须是异步函数`

### test.concurrent.only.each

```js
test.concurrent.only.each(table)(name, fn)
it.concurrent.only.each(table)(name, fn) 
```

如果只想使用不同的测试数据同时运行特定的测试，请使用 test.concurrent.only.each

`参考 describe.only`

### test.concurrent.skip.each

```js
test.concurrent.skip.each(table)(name, fn)
it.concurrent.skip.each(table)(name, fn)
```

如果要停止运行一组异步数据驱动测试，请使用 test.concurrent.skip.each

`参考 describe.skip`

### test.failing

```js
test.failing(name, fn, timeout)
it.failing(name, fn, timeout)
```

`这仅适用于默认的 jest-circus 运行程序。`

在编写测试并希望测试失败时，请使用 test.failing 。这些测试的行为方式与普通测试不同。如果 failing 测试将抛出任何错误，那么它将通过。如果不抛出错误，则会失败。

### test.failing.each

```js
test.failing.each(name, fn, timeout)
it.failing.each(table)(name, fn) 
it.failing.each`table`(name, fn)
```

### test.only.failing

```js
test.only.failing(name, fn, timeout)
it.only.failing(name, fn, timeout)
fit.failing(name, fn, timeout)
```

如果只想运行特定的失败测试，请使用 test.only.failing 。

### test.skip.failing

```js
test.skip.failing(name, fn, timeout)
it.skip.failing(name, fn, timeout) 
xit.failing(name, fn, timeout) 
xtest.failing(name, fn, timeout)
```

### test.todo

```js
test.todo(name)
it.todo(name)
```

计划编写测试时，请使用 test.todo 。这些测试将在最后的摘要输出中突出显示，这样你就能知道还有多少测试需要完成。

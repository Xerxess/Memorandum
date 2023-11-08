<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Jest Object](#jest-object)
  - [Mock Modules 模拟模块](#mock-modules-模拟模块)
    - [jest.disableAutomock()](#jestdisableautomock)
    - [jest.enableAutomock()](#jestenableautomock)
    - [jest.createMockFromModule(moduleName)](#jestcreatemockfrommodulemodulename)
    - [jest.mock(moduleName, factory, options) *](#jestmockmodulename-factory-options-span-stylecolorredspan)
    - [jest.unmock(moduleName) *](#jestunmockmodulename-span-stylecolorredspan)
    - [jest.deepUnmock(moduleName)](#jestdeepunmockmodulename)
    - [jest.doMock(moduleName, factory, options)](#jestdomockmodulename-factory-options)
    - [jest.dontMock(moduleName)](#jestdontmockmodulename)
    - [jest.setMock(moduleName, moduleExports)](#jestsetmockmodulename-moduleexports)
    - [jest.requireActual(moduleName)](#jestrequireactualmodulename)
    - [jest.requireMock(moduleName)](#jestrequiremockmodulename)
    - [jest.resetModules()](#jestresetmodules)
    - [jest.isolateModules(fn)](#jestisolatemodulesfn)
    - [jest.isolateModulesAsync(fn)](#jestisolatemodulesasyncfn)
  - [Mock Functions 模拟函数](#mock-functions-模拟函数)
    - [jest.fn(implementation?) *](#jestfnimplementation-span-stylecolorredspan)
    - [jest.isMockFunction(fn)](#jestismockfunctionfn)
    - [jest.replaceProperty(object, propertyKey, value)](#jestreplacepropertyobject-propertykey-value)
    - [jest.spyOn(object, methodName)](#jestspyonobject-methodname)
    - [jest.spyOn(object, methodName, accessType?)](#jestspyonobject-methodname-accesstype)
    - [jest.clearAllMocks()](#jestclearallmocks)
    - [jest.resetAllMocks()](#jestresetallmocks)
    - [jest.restoreAllMocks()](#jestrestoreallmocks)
  - [Fake Timers 假计时器 *](#fake-timers-假计时器-span-stylecolorredspan)
    - [jest.useFakeTimers(fakeTimersConfig?)](#jestusefaketimersfaketimersconfig)
    - [jest.useRealTimers()](#jestuserealtimers)
    - [jest.runAllTicks()](#jestrunallticks)
    - [jest.runAllTimers()](#jestrunalltimers)
    - [jest.runAllTimersAsync()](#jestrunalltimersasync)
    - [jest.runAllImmediates()](#jestrunallimmediates)
    - [jest.advanceTimersByTime(msToRun)](#jestadvancetimersbytimemstorun)
    - [jest.advanceTimersByTimeAsync(msToRun)](#jestadvancetimersbytimeasyncmstorun)
    - [jest.runOnlyPendingTimers()](#jestrunonlypendingtimers)
    - [jest.runOnlyPendingTimersAsync()](#jestrunonlypendingtimersasync)
    - [jest.advanceTimersToNextTimer(steps)](#jestadvancetimerstonexttimersteps)
    - [jest.advanceTimersToNextTimerAsync(steps)](#jestadvancetimerstonexttimerasyncsteps)
    - [jest.clearAllTimers()](#jestclearalltimers)
    - [jest.getTimerCount()](#jestgettimercount)
    - [jest.now() *](#jestnow-span-stylecolorredspan)
    - [jest.setSystemTime(now?: number | Date)](#jestsetsystemtimenow-number--date)
    - [jest.getRealSystemTime()](#jestgetrealsystemtime)
  - [Misc 杂项](#misc-杂项)
    - [jest.getSeed()](#jestgetseed)
    - [jest.isEnvironmentTornDown()](#jestisenvironmenttorndown)
    - [jest.retryTimes(numRetries, options?) *](#jestretrytimesnumretries-options-span-stylecolorredspan)
    - [jest.setTimeout(timeout) *](#jestsettimeouttimeout-span-stylecolorredspan)

<!-- /code_chunk_output -->

# Jest Object

jest 对象中的方法有助于创建模拟，并让你控制 Jest 的整体行为。也可以通过 import {jest} from '@jest/globals' 明确导入该对象。

## Mock Modules 模拟模块

### jest.disableAutomock()

禁用模块加载器中的自动模拟

`Jest 的默认设置中，自动模拟是启用的。`

`必须通过 automock 配置选项启用自动模拟，此方法才能生效。`

在 Jest 中，jest.disableAutomock()函数用于禁用自动模拟（automocking）功能。自动模拟是 Jest 的一个特性，它会自动模拟（mock）模块的导入，以便在测试中使用模拟版本而不是真实的模块实现。

通过调用jest.disableAutomock()，您可以告诉 Jest 在运行测试时不自动模拟导入的模块。这对于需要测试真实模块行为的情况非常有用，或者对于某些模块，您希望明确地指定使用真实实现而不是模拟。

### jest.enableAutomock()

在模块加载器中启用自动模拟

### jest.createMockFromModule(moduleName)

给定模块名称后，自动模拟系统会为你生成该模块的模拟版本。

### jest.mock(moduleName, factory, options) <span style="color:red;">*</span>

在需要使用模块时，用自动模拟版本来模拟该模块。
`factory 和 options 是可选项`
`使用 jest.mock 模拟的模块仅在调用 jest.mock 的文件中被模拟。`

```js
// banana.js
module.exports = () => 'banana';

// __tests__/test.js
jest.mock('../banana');
const banana = require('../banana'); // banana will be explicitly mocked.
banana(); // will return 'undefined' because the function is auto-mocked.
```

```ts
// 第二个参数可用于指定正在运行的显式模块工厂，而不是使用 Jest 的自动模拟功能：
// The optional type argument provides typings for the module factory
jest.mock<typeof import('../moduleName')>('../moduleName', () => {
  return jest.fn(() => 42);
});

// This runs the function specified as second argument to `jest.mock`.
const moduleName = require('../moduleName');
moduleName(); // Will return '42';
```

```ts
// 第三个参数可用于创建虚拟模拟（virtual mock），即系统中不存在的模块模拟：
jest.mock(
  '../moduleName',
  () => {
    /*
     * Custom implementation of a module that doesn't exist in JS,
     * like a generated module or a native module in react-native.
     */
  },
  {virtual: true},
);
```

### jest.unmock(moduleName) <span style="color:red;">*</span>

表示模块系统不应返回 require() 中指定模块的模拟版本（例如，应始终返回真实模块）。
该 API 最常用的用途是指定某个测试打算测试的模块（因此不希望自动模拟）。

### jest.deepUnmock(moduleName)

表示模块系统不应返回指定模块及其依赖模块的模拟版本。

### jest.doMock(moduleName, factory, options)

使用 babel-jest 时，对 mock 的调用将自动提升到代码块的顶部。如果您想明确避免这种行为，请使用此方法。

### jest.dontMock(moduleName)

使用 babel-jest 时，对 unmock 的调用将自动提升到代码块的顶部。如果您想明确避免这种行为，请使用此方法。

### jest.setMock(moduleName, moduleExports)

明确提供模块系统应返回的指定模块的 mock 对象。

### jest.requireActual(moduleName)

返回实际模块而非模拟模块，绕过所有关于模块是否应接收模拟实现的检查。

### jest.requireMock(moduleName)

返回一个模拟模块，而不是实际模块，绕过所有关于模块是否正常需要的检查。

### jest.resetModules()

重置模块注册表--所有所需模块的缓存。这对隔离本地状态可能在测试间发生冲突的模块非常有用。

### jest.isolateModules(fn)

jest.isolateModules(fn) 比 jest.resetModules() 更进一步，它为回调函数内部加载的模块创建了一个沙盒注册表。这有助于为每个测试隔离特定模块，从而避免本地模块状态在测试之间发生冲突。

### jest.isolateModulesAsync(fn)

jest.isolateModulesAsync() 等同于 jest.isolateModules() ，但适用于异步回调。调用者应 await 完成 isolateModulesAsync

## Mock Functions 模拟函数

### jest.fn(implementation?) <span style="color:red;">*</span>

返回一个新的、未使用过的 mock 函数。可选择接收一个 mock 实现。

```js
const mockFn = jest.fn();
mockFn();
expect(mockFn).toHaveBeenCalled();

// With a mock implementation:
const returnsTrue = jest.fn(() => true);
console.log(returnsTrue()); // true;
```

### jest.isMockFunction(fn)

确定给定函数是否为模拟函数。

### jest.replaceProperty(object, propertyKey, value)

用 value 替换 object[propertyKey] 。该属性必须已存在于对象中。同一属性可能会被替换多次。
`返回被替换的 Jest 属性。`

### jest.spyOn(object, methodName)

创建与 jest.fn 类似的 mock 函数，但也会跟踪对 object[methodName] 的调用。
`返回 Jest 模拟函数。`

### jest.spyOn(object, methodName, accessType?)

自 Jest 22.1.0+ 以来， jest.spyOn 方法的第三个可选参数是 accessType ，它可以是 'get' 或 'set' ，当你想分别监视一个 getter 或一个 setter 时，这证明是非常有用的。

### jest.clearAllMocks()

清除所有模拟函数的 mock.calls , mock.instances , mock.contexts 和 mock.results 属性。相当于在每个模拟函数上调用 .mockClear() 。

### jest.resetAllMocks()

重置所有模拟的状态。相当于在每个模拟函数上调用 .mockReset() 。

### jest.restoreAllMocks()

将所有模拟和替换的属性恢复为初始值。相当于在每个模拟函数上调用 .mockRestore() 和在每个被替换属性上调用 .restore() 。请注意， jest.restoreAllMocks() 只适用于用 jest.spyOn() 创建的模拟和用 jest.replaceProperty() 替换的属性；其他模拟需要手动恢复。

## Fake Timers 假计时器 <span style="color:red;">*</span>

### jest.useFakeTimers(fakeTimersConfig?)

指示 Jest 使用伪造版本的全局日期、性能、时间和计时器 API。伪造计时器的实现由 @sinonjs/fake-timers 支持

假计时器会将 Date , performance.now() , queueMicrotask() , setImmediate() , clearImmediate() , setInterval() , clearInterval() , setTimeout() , clearTimeout() 替换为从假时钟获取时间的实现。

`调用 jest.useFakeTimers() 将对文件中的所有测试使用假计时器，直到使用 jest.useRealTimers() 恢复原始计时器。`

```js
test('advance the timers automatically', () => {
  jest.useFakeTimers({advanceTimers: true});
  // ...
});

test('do not advance the timers and do not fake `performance`', () => {
  jest.useFakeTimers({doNotFake: ['performance']});
  // ...
});

test('uninstall fake timers for the rest of tests in the file', () => {
  jest.useRealTimers();
  // ...
});
```

### jest.useRealTimers()

指示 Jest 恢复全局日期、性能、时间和定时器 API 的原始实现。
例如，您可以在 afterEach 钩子内调用 jest.useRealTimers() 以在每次测试后恢复计时器：

### jest.runAllTicks()

耗尽微任务队列（通常通过 process.nextTick 接口接入node)

调用此 API 时，通过 process.nextTick 排入队列的所有待执行微任务都将被执行。此外，如果这些微任务本身安排了新的微任务，那么这些微任务将不断耗尽，直到队列中没有剩余的微任务。

### jest.runAllTimers()

同时耗尽宏任务队列（即由 setTimeout() 、 setInterval() 和 setImmediate() 所排队的所有任务）和微任务队列（通常通过 process.nextTick 接口接入node）。

调用此 API 时，将执行所有待处理的宏任务和微任务。如果这些任务本身安排了新任务，那么这些任务将被不断执行，直到队列中没有剩余任务。

### jest.runAllTimersAsync()

jest.runAllTimers() 的异步等价物。它允许在运行计时器之前执行任何计划的承诺回调。

### jest.runAllImmediates()

耗尽 setImmediate() 队列中的所有任务

### jest.advanceTimersByTime(msToRun)

仅执行宏任务队列（即 setTimeout() 或 setInterval() 和 setImmediate() 队列中的所有任务）

调用此 API 时，所有计时器都会提前 msToRun 毫秒。所有通过 setTimeout() 或 setInterval() 排在队列中的待执行 "宏任务 "都将在该时间段内执行。此外，如果这些宏任务安排了将在同一时限内执行的新宏任务，这些宏任务将被执行，直到队列中不再有应在 msToRun 毫秒内运行的宏任务。

### jest.advanceTimersByTimeAsync(msToRun)

est.advanceTimersByTime(msToRun) 的异步等价物。它允许在运行计时器之前执行任何计划的承诺回调。

### jest.runOnlyPendingTimers()

仅执行当前待处理的宏任务（即仅执行到此为止已被 setTimeout() 或 setInterval() 置为队列的任务）。如果任何当前待处理的宏任务安排了新的宏任务，则该调用不会执行这些新任务。

### jest.runOnlyPendingTimersAsync()

jest.runOnlyPendingTimers() 的异步等价物。它允许在运行计时器之前执行任何计划的承诺回调。

### jest.advanceTimersToNextTimer(steps)

将所有定时器提前所需毫秒，以便只运行下一个超时/间隔。

### jest.advanceTimersToNextTimerAsync(steps)

jest.advanceTimersToNextTimer(steps) 的异步等价物。它允许在运行计时器之前执行任何计划的承诺回调。

### jest.clearAllTimers()

从定时器系统中删除任何待处理的定时器

### jest.getTimerCount()

返回假计时器的剩余运行次数

### jest.now() <span style="color:red;">*</span>

返回当前时钟的时间（毫秒）。如果使用的是真实定时器，或如果模拟的是 Date ，则该值等同于 Date.now() 。在其他情况下（如传统定时器），它可能有助于实现 Date.now() 、 performance.now() 等的自定义模拟。

### jest.setSystemTime(now?: number | Date)

设置假计时器使用的当前系统时间。

模拟用户在程序运行时更改系统时钟。它会影响当前时间，但其本身并不会导致定时器等启动；它们的启动方式与不调用 jest.setSystemTime() 时的启动方式完全相同。

### jest.getRealSystemTime()

模拟时间时， Date.now() 也将被模拟。如果出于某种原因需要访问真实的当前时间，可以调用该函数。

## Misc 杂项

### jest.getSeed()

每次运行 Jest 都会随机生成一个种子值，您可以将其用于伪随机数生成器或其他任何地方。

### jest.isEnvironmentTornDown()

如果测试环境已拆除，则返回 true 。

### jest.retryTimes(numRetries, options?) <span style="color:red;">*</span>

对失败的测试运行 n 次，直到测试通过或用尽最大重试次数。

### jest.setTimeout(timeout) <span style="color:red;">*</span>

设置测试文件中所有测试和前后钩子的默认超时间隔（毫秒）。这只会影响调用此函数的测试文件。如果不调用此方法，
默认超时时间间隔为 5 秒。
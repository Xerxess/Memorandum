<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Expect](#expect)
  - [expect(value)](#expectvalue)
  - [Modifiers 修饰器](#modifiers-修饰器)
  - [Matchers 匹配器](#matchers-匹配器)
    - [.toBe(value)](#tobevalue)
    - [.toHaveBeenCalled()](#tohavebeencalled)
    - [.toHaveBeenCalledTimes(number)](#tohavebeencalledtimesnumber)
    - [.toHaveBeenCalledWith(arg1, arg2, ...)](#tohavebeencalledwitharg1-arg2-)
    - [.toHaveBeenLastCalledWith(arg1, arg2, ...)](#tohavebeenlastcalledwitharg1-arg2-)
    - [.toHaveBeenNthCalledWith(nthCall, arg1, arg2, ....)](#tohavebeennthcalledwithnthcall-arg1-arg2-)
    - [.toHaveReturned()](#tohavereturned)
    - [.toHaveReturnedTimes(number)](#tohavereturnedtimesnumber)
    - [.toHaveReturnedWith(value)](#tohavereturnedwithvalue)
    - [.toHaveLastReturnedWith(value)](#tohavelastreturnedwithvalue)
    - [.toHaveNthReturnedWith(nthCall, value)](#tohaventhreturnedwithnthcall-value)
    - [.toHaveLength(number)](#tohavelengthnumber)
    - [.toHaveProperty(keyPath, value?)](#tohavepropertykeypath-value)
    - [.toBeCloseTo(number, numDigits?)](#tobeclosetonumber-numdigits)
    - [.toBeDefined()](#tobedefined)
    - [.toBeFalsy()](#tobefalsy)
    - [.toBeGreaterThan()](#tobegreaterthan)
    - [.toBeGreaterThanOrEqual()](#tobegreaterthanorequal)
    - [.toBeLessThan(number | bigint)](#tobelessthannumber--bigint)
    - [.toBeLessThanOrEqual(number | bigint)](#tobelessthanorequalnumber--bigint)
    - [.toBeInstanceOf(Class)](#tobeinstanceofclass)
    - [.toBeNull()](#tobenull)
    - [.toBeTruthy()](#tobetruthy)
    - [.toBeUndefined()](#tobeundefined)
    - [.toBeNaN()](#tobenan)
    - [.toContain(item)](#tocontainitem)
    - [.toContainEqual(item)](#tocontainequalitem)
    - [.toEqual(value)](#toequalvalue)
    - [.toMatch(regexp | string)](#tomatchregexp--string)
    - [.toMatchObject(object)](#tomatchobjectobject)
    - [.toMatchSnapshot(propertyMatchers?, hint?)](#tomatchsnapshotpropertymatchers-hint)
    - [.toMatchInlineSnapshot(propertyMatchers?, inlineSnapshot)](#tomatchinlinesnapshotpropertymatchers-inlinesnapshot)
    - [.toStrictEqual(value)](#tostrictequalvalue)
    - [.toThrow(error?)](#tothrowerror)
    - [.toThrowErrorMatchingSnapshot(hint?)](#tothrowerrormatchingsnapshothint)
    - [.toThrowErrorMatchingInlineSnapshot(inlineSnapshot)](#tothrowerrormatchinginlinesnapshotinlinesnapshot)
  - [Asymmetric Matchers 非对称匹配器](#asymmetric-matchers-非对称匹配器)
    - [expect.anything()](#expectanything)
    - [expect.any(constructor)](#expectanyconstructor)
    - [expect.arrayContaining(array)](#expectarraycontainingarray)
    - [expect.not.arrayContaining(array)](#expectnotarraycontainingarray)
    - [expect.closeTo(number, numDigits?)](#expectclosetonumber-numdigits)
    - [expect.objectContaining(object)](#expectobjectcontainingobject)
    - [expect.not.objectContaining(object)](#expectnotobjectcontainingobject)
    - [expect.stringContaining(string)](#expectstringcontainingstring)
    - [expect.not.stringContaining(string)](#expectnotstringcontainingstring)
    - [expect.stringMatching(string | regexp)](#expectstringmatchingstring--regexp)
    - [expect.not.stringMatching(string | regexp)](#expectnotstringmatchingstring--regexp)
  - [Assertion Count 断言计数](#assertion-count-断言计数)
    - [expect.assertions(number)](#expectassertionsnumber)
    - [expect.hasAssertions()](#expecthasassertions)
  - [Extend Utilities 扩展实用程序](#extend-utilities-扩展实用程序)
    - [expect.addEqualityTesters(testers)](#expectaddequalitytesterstesters)
    - [expect.addSnapshotSerializer(serializer)](#expectaddsnapshotserializerserializer)
    - [expect.extend(matchers)](#expectextendmatchers)

<!-- /code_chunk_output -->

# Expect

在编写测试时，您经常需要检查数值是否满足某些条件。 expect 为您提供了许多 "匹配器"，让您可以验证不同的内容。

## expect(value)

每次要测试一个值时，都要使用 expect 函数。您很少会单独调用 expect 函数。相反，您会使用 expect 和一个 "匹配器 "函数来断言某个值。

```js
test('the best flavor is grapefruit', () => {
  expect(bestLaCroixFlavor()).toBe('grapefruit');
});
```

## Modifiers 修饰器

- .not 测试其反面
- .resolves 使用 resolves 解除已履行承诺的值，以便可以链入任何其他匹配器。如果承诺被拒绝，则断言失败。
- .rejects 使用 .rejects 解包被拒绝的承诺的原因，以便可以链入任何其他匹配器。如果承诺已履行，则断言失败。

## Matchers 匹配器

### .toBe(value)

使用 .toBe 比较基元值或检查对象实例的引用同一性。它调用 Object.is 来比较值，这比 === 严格相等运算符更适合测试。

`浮点数不要使用 .toBe 。例如，由于四舍五入的原因，在 JavaScript 中 0.2 + 0.1 并不严格等于 0.3 。如果使用浮点数，请尝试使用 .toBeCloseTo 代替。`

### .toHaveBeenCalled()

```js
.toHaveBeenCalled()
.toBeCalled()
```

它用于验证一个Mock函数是否在测试过程中被正确调用。

```js
// toHaveBeenCalled()断言会检查Mock函数是否至少被调用过一次，无论调用时传入的参数是什么。如果Mock函数未被调用，或者调用次数不符合预期，断言将失败。

const myMockFunction = jest.fn();
// 调用 myMockFunction
myMockFunction();

// 验证 myMockFunction 是否被调用
expect(myMockFunction).toHaveBeenCalled();
```

### .toHaveBeenCalledTimes(number)

```js
.toHaveBeenCalledTimes(number)
.toBeCalledTimes(number) 
```

使用 .toHaveBeenCalledTimes 可确保模拟函数被调用的次数准确无误。

```js
// 想检查drink被调用的确切次数。您可以使用此.toHaveBeenCalledTimes(number)来实现这一目的
test('drinkEach drinks each drink', () => {
  const drink = jest.fn();
  drinkEach(drink, ['lemon', 'octopus']);
  expect(drink).toHaveBeenCalledTimes(2);
});
```

### .toHaveBeenCalledWith(arg1, arg2, ...)

```js
.toHaveBeenCalledWith(arg1, arg2, ...)
.toBeCalledWith()
```

.toHaveBeenCalledWith 可确保使用特定参数调用 mock 函数。使用与 .toEqual 相同的算法检查参数

```js
// 例如，假设您可以使用 register 函数注册beverage，而 applyToAll(f) 应将函数 f 应用于所有注册的beverages。为了确保这一功能有效，您可以这样写
test('registration applies correctly to orange La Croix', () => {
  const beverage = new LaCroix('orange');
  register(beverage);
  const f = jest.fn();
  applyToAll(f);
  expect(f).toHaveBeenCalledWith(beverage);
});
```

### .toHaveBeenLastCalledWith(arg1, arg2, ...)

```js
.toHaveBeenLastCalledWith(arg1, arg2, ...)
.lastCalledWith(arg1, arg2, ...)
```

```js
//如果您有一个 mock 函数，您可以使用 .toHaveBeenLastCalledWith 来测试上次调用该函数时使用了哪些参数。例如，假设您有一个 applyToAllFlavors(f) 函数，该函数会将 f 应用于一系列味道，而您想确保在调用该函数时，它最后操作的味道是 'mango' 。您可以这样写
test('applying to all flavors does mango last', () => {
  const drink = jest.fn();
  applyToAllFlavors(drink);
  expect(drink).toHaveBeenLastCalledWith('mango');
});
```

### .toHaveBeenNthCalledWith(nthCall, arg1, arg2, ....)

```js
.toHaveBeenNthCalledWith(nthCall, arg1, arg2, ....) 
.nthCalledWith(nthCall, arg1, arg2, ...)
```

```js
// 如果您有一个 mock 函数，您可以使用 .toHaveBeenNthCalledWith 来测试第 n 次调用该函数时使用了哪些参数。例如，假设你有一个 drinkEach(drink, Array<flavor>) 函数，该函数会将 f 应用于一系列味道，而你想确保调用该函数时，它操作的第一个味道是 'lemon' 而第二个味道是 'octopus' 。您可以这样写
test('drinkEach drinks each drink', () => {
  const drink = jest.fn();
  drinkEach(drink, ['lemon', 'octopus']);
  expect(drink).toHaveBeenNthCalledWith(1, 'lemon');
  expect(drink).toHaveBeenNthCalledWith(2, 'octopus');
});
```

### .toHaveReturned()

```js
.toHaveReturned() 
.toReturn()
```

```js
// 如果您有一个 mock 函数，您可以使用 .toHaveReturned 测试该 mock 函数是否至少一次成功返回（即没有抛出错误）。例如，假设您有一个返回 true 的 mock drink 函数。您可以编写
test('drinks returns', () => {
  const drink = jest.fn(() => true);

  drink();

  expect(drink).toHaveReturned();
});
```

### .toHaveReturnedTimes(number)

```js
.toHaveReturnedTimes(number) 
.toReturnTimes(number)
```

```js
// 使用 .toHaveReturnedTimes 可确保模拟函数成功返回（即未抛出错误）的次数准确无误。对抛出错误的 mock 函数的任何调用都不计入函数返回的次数。
// 假设您有一个返回 true 的模拟 drink 。您可以这样写
test('drink returns twice', () => {
  const drink = jest.fn(() => true);

  drink();
  drink();

  expect(drink).toHaveReturnedTimes(2);
});
```

### .toHaveReturnedWith(value)

```js
.toHaveReturnedWith(value) 
.toReturnWith(value)
```

```js
// 使用 .toHaveReturnedWith 可确保模拟函数返回特定值。
// 假设您有一个模拟 drink ，可以返回已饮用饮料的名称。您可以编写
test('drink returns La Croix', () => {
  const beverage = {name: 'La Croix'};
  const drink = jest.fn(beverage => beverage.name);

  drink(beverage);

  expect(drink).toHaveReturnedWith('La Croix');
});
```

### .toHaveLastReturnedWith(value)

```js
.toHaveLastReturnedWith(value) 
.lastReturnedWith(value)
```

```js
// 使用 .toHaveLastReturnedWith 测试模拟函数最后返回的特定值。如果对模拟函数的最后一次调用出错，那么无论你提供的预期返回值是什么，该匹配器都将失败。
// 假设您有一个模拟 drink ，可以返回已饮用饮料的名称。您可以编写
test('drink returns La Croix (Orange) last', () => {
  const beverage1 = {name: 'La Croix (Lemon)'};
  const beverage2 = {name: 'La Croix (Orange)'};
  const drink = jest.fn(beverage => beverage.name);

  drink(beverage1);
  drink(beverage2);

  expect(drink).toHaveLastReturnedWith('La Croix (Orange)');
});
```

### .toHaveNthReturnedWith(nthCall, value)

```js
.toHaveNthReturnedWith(nthCall, value) 
.nthReturnedWith(nthCall, value)
```

```js
// 使用 .toHaveNthReturnedWith 测试第 n 次调用模拟函数返回的特定值。如果对模拟函数的第 n 次调用出错，那么无论您提供的预期返回值是什么，该匹配器都将失败。
// 例如，假设您有一个模拟 drink ，可以返回已饮用饮料的名称。您可以编写
test('drink returns expected nth calls', () => {
  const beverage1 = {name: 'La Croix (Lemon)'};
  const beverage2 = {name: 'La Croix (Orange)'};
  const drink = jest.fn(beverage => beverage.name);

  drink(beverage1);
  drink(beverage2);

  expect(drink).toHaveNthReturnedWith(1, 'La Croix (Lemon)');
  expect(drink).toHaveNthReturnedWith(2, 'La Croix (Orange)');
});
```

### .toHaveLength(number)

```js
// 使用 .toHaveLength 检查对象是否具有 .length 属性，并将其设置为某个数值。
// 这对检查数组或字符串大小特别有用。
expect([1, 2, 3]).toHaveLength(3);
expect('abc').toHaveLength(3);
expect('').not.toHaveLength(5);
```

### .toHaveProperty(keyPath, value?)

```js
// 使用 .toHaveProperty 检查对象是否存在所提供引用 keyPath 中的属性。要检查对象中深层嵌套的属性，可以使用点符号或包含深层引用 keyPath 的数组。
// 您可以提供一个可选的 value 参数来比较接收到的属性值（对象实例所有属性的递归比较，也称为深度相等，如 toEqual 匹配器）。
// Object containing house features to be tested
const houseForSale = {
  bath: true,
  bedrooms: 4,
  kitchen: {
    amenities: ['oven', 'stove', 'washer'],
    area: 20,
    wallColor: 'white',
    'nice.oven': true,
  },
  livingroom: {
    amenities: [
      {
        couch: [
          ['large', {dimensions: [20, 20]}],
          ['small', {dimensions: [10, 10]}],
        ],
      },
    ],
  },
  'ceiling.height': 2,
};

test('this house has my desired features', () => {
  // Example Referencing
  expect(houseForSale).toHaveProperty('bath');
  expect(houseForSale).toHaveProperty('bedrooms', 4);

  expect(houseForSale).not.toHaveProperty('pool');

  // Deep referencing using dot notation
  expect(houseForSale).toHaveProperty('kitchen.area', 20);
  expect(houseForSale).toHaveProperty('kitchen.amenities', [
    'oven',
    'stove',
    'washer',
  ]);

  expect(houseForSale).not.toHaveProperty('kitchen.open');

  // Deep referencing using an array containing the keyPath
  expect(houseForSale).toHaveProperty(['kitchen', 'area'], 20);
  expect(houseForSale).toHaveProperty(
    ['kitchen', 'amenities'],
    ['oven', 'stove', 'washer'],
  );
  expect(houseForSale).toHaveProperty(['kitchen', 'amenities', 0], 'oven');
  expect(houseForSale).toHaveProperty(
    'livingroom.amenities[0].couch[0][1].dimensions[0]',
    20,
  );
  expect(houseForSale).toHaveProperty(['kitchen', 'nice.oven']);
  expect(houseForSale).not.toHaveProperty(['kitchen', 'open']);

  // Referencing keys with dot in the key itself
  expect(houseForSale).toHaveProperty(['ceiling.height'], 'tall');
});
```

### .toBeCloseTo(number, numDigits?)

```js
// 使用 toBeCloseTo 比较浮点数是否近似相等。
// 可选参数 numDigits 限制了小数点后要检查的位数。对于默认值 2 ，测试标准是 Math.abs(expected - received) < 0.005 （即 10 ** -2 / 2 ）。
test('adding works sanely with decimals', () => {
  expect(0.2 + 0.1).toBe(0.3); // 失败!
});

test('adding works sanely with decimals', () => {
  expect(0.2 + 0.1).toBeCloseTo(0.3, 5);
});
```

### .toBeDefined()

```js
.toBeDefined()
```

使用 .toBeDefined 检查变量是否未定义

```js
// 检查函数 fetchNewFlavorIdea() 是否有返回值
test('there is a new flavor idea', () => {
  expect(fetchNewFlavorIdea()).toBeDefined();
});
```

### .toBeFalsy()

```js
.toBeFalsy()
```

当您不关心值是什么，而希望确保布尔上下文中的值为假时，请使用 .toBeFalsy 。

`在 JavaScript 中，有六种虚假值： false 、 0 、 '' 、 null 、 undefined 和 NaN 。其他所有内容都是真实的。`

### .toBeGreaterThan()

```js
.toBeGreaterThan(number | bigint)
```

使用 toBeGreaterThan 比较 received > expected 的数字或大整数值

```js
// 测试 ouncesPerCan() 返回的数值是否超过 10
test('ounces per can is more than 10', () => {
  expect(ouncesPerCan()).toBeGreaterThan(10);
});
```

### .toBeGreaterThanOrEqual()

使用 toBeGreaterThanOrEqual 比较 received >= expected 的数字或大整数值。

### .toBeLessThan(number | bigint)

使用 toBeLessThan 比较 received < expected 的数字或大整数值

### .toBeLessThanOrEqual(number | bigint)

使用 toBeLessThanOrEqual 比较 received <= expected 的数字或大整数值。

### .toBeInstanceOf(Class)

使用 .toBeInstanceOf(Class) 检查对象是否是类的实例。

```js
class A {}

expect(new A()).toBeInstanceOf(A);
expect(() => {}).toBeInstanceOf(Function);
expect(new A()).toBeInstanceOf(Function); // throws
```

### .toBeNull()

.toBeNull() 与 .toBe(null) 相同，但错误信息更漂亮一些。

### .toBeTruthy()

当您不关心值是什么，而希望确保布尔上下文中的值为真时，请使用 .toBeTruthy

```js
test('drinking La Croix leads to having thirst info', () => {
  drinkSomeLaCroix();
  expect(thirstInfo()).toBeTruthy();
});
```

### .toBeUndefined()

使用 .toBeUndefined 检查变量是否未定义。

```js
// 检查函数 bestDrinkForFlavor(flavor) 是否返回 undefined 的 'octopus' 味，因为没有章鱼味的好饮料：
test('the best drink for octopus flavor is undefined', () => {
  expect(bestDrinkForFlavor('octopus')).toBeUndefined();
});
```

### .toBeNaN()

检查值为 NaN

### .toContain(item)

如果要检查某个项目是否在数组中，请使用 .toContain 。

如果要测试数组中的项目，则使用 === ，这是一种严格的相等检查。

.toContain 也可以检查一个字符串是否是另一个字符串的子串。

`匹配器还接受其他迭代表，如字符串、集合、节点列表和 HTML 集合。`

### .toContainEqual(item)

如果要检查数组中是否包含具有特定结构和值的项目，请使用 .toContainEqual

为了测试数组中的项目，该匹配器会递归检查所有字段的相等性，而不是检查对象的标识。

```js
describe('my beverage', () => {
  test('is delicious and not sour', () => {
    const myBeverage = {delicious: true, sour: false};
    expect(myBeverages()).toContainEqual(myBeverage);
  });
});
```

### .toEqual(value)

使用 .toEqual 递归比较对象实例的所有属性（也称为 "深度 "相等）。

`它调用 Object.is 来比较基元值，这比 === 严格相等运算符更适合测试。`

### .toMatch(regexp | string)

使用 .toMatch 检查字符串是否匹配正则表达式

### .toMatchObject(object)

使用 .toMatchObject 检查 JavaScript 对象是否与对象属性的子集相匹配。它将匹配接收到的对象中不在预期对象中的属性。

```js
const houseForSale = {
  bath: true,
  bedrooms: 4,
  kitchen: {
    amenities: ['oven', 'stove', 'washer'],
    area: 20,
    wallColor: 'white',
  },
};
const desiredHouse = {
  bath: true,
  kitchen: {
    amenities: ['oven', 'stove', 'washer'],
    wallColor: expect.stringMatching(/white|yellow/),
  },
};

test('the house has my desired features', () => {
  expect(houseForSale).toMatchObject(desiredHouse);
});
```

### .toMatchSnapshot(propertyMatchers?, hint?)

这可确保值与最新快照相匹配

### .toMatchInlineSnapshot(propertyMatchers?, inlineSnapshot)

确保数值与最新快照一致

### .toStrictEqual(value)

使用 .toStrictEqual 测试对象是否具有相同的结构和类型

与 .toEqual 的区别 ：

- 属性的键进行检查，例如 {a: undefined, b: 2} 不等于 {b: 2} ；
- undefined 项会被考虑在内，例如 [2] 将不等于 [2, undefined] ；
- 检查数组的稀疏性，例如 [, 1] 将不等于 [undefined, 1] ；
- 对象类型进行检查，例如，带有 a 和 b 字段的类实例不等于带有 a 和 b 字段的字面对象。

```js
class LaCroix {
  constructor(flavor) {
    this.flavor = flavor;
  }
}

describe('the La Croix cans on my desk', () => {
  test('are not semantically the same', () => {
    expect(new LaCroix('lemon')).toEqual({flavor: 'lemon'});
    expect(new LaCroix('lemon')).not.toStrictEqual({flavor: 'lemon'});
  });
});
```

### .toThrow(error?)

```js
.toThrow(error?)
.toThrowError(error?)
```

使用 .toThrow 来测试函数在被调用时是否抛出。

```js
// 如果我们想测试 drinkFlavor('octopus') 是否抛出，因为章鱼的味道太恶心，不能喝，我们可以这样写
test('throws on octopus', () => {
  expect(() => {
    drinkFlavor('octopus');
  }).toThrow();
});
```

### .toThrowErrorMatchingSnapshot(hint?)

使用 .toThrowErrorMatchingSnapshot 测试函数在被调用时是否会抛出与最新快照匹配的错误。

### .toThrowErrorMatchingInlineSnapshot(inlineSnapshot)

使用 .toThrowErrorMatchingInlineSnapshot 测试函数在被调用时是否会抛出与最新快照匹配的错误。

## Asymmetric Matchers 非对称匹配器

### expect.anything()

expect.anything() 可匹配除 null 或 undefined 以外的任何内容

```js
// 您可以在 toEqual 或 toHaveBeenCalledWith 中使用它来代替字面值。例如，如果要检查一个 mock 函数是否使用非空参数调用：
test('map calls its argument with a non-null argument', () => {
  const mock = jest.fn();
  [1].map(x => mock(x));
  expect(mock).toHaveBeenCalledWith(expect.anything());
});
```

### expect.any(constructor)

expect.any(constructor) 与任何使用给定构造函数创建的内容匹配，或者如果它是属于传递类型的基元。

```js
class Cat {}
function getCat(fn) {
  return fn(new Cat());
}

test('randocall calls its callback with a class instance', () => {
  const mock = jest.fn();
  getCat(mock);
  expect(mock).toHaveBeenCalledWith(expect.any(Cat));
});

function randocall(fn) {
  return fn(Math.floor(Math.random() * 6 + 1));
}

test('randocall calls its callback with a number', () => {
  const mock = jest.fn();
  randocall(mock);
  expect(mock).toHaveBeenCalledWith(expect.any(Number));
});
```

### expect.arrayContaining(array)

expect.arrayContaining(array) 与接收到的数组匹配，该数组包含预期数组中的所有元素。
也就是说，预期数组是接收数组的子集。
因此，它匹配的接收数组包含的元素不在预期数组中。

```js
describe('arrayContaining', () => {
  const expected = ['Alice', 'Bob'];
  it('matches even if received contains additional elements', () => {
    expect(['Alice', 'Bob', 'Eve']).toEqual(expect.arrayContaining(expected));
  });
  it('does not match if received does not contain expected elements', () => {
    expect(['Bob', 'Eve']).not.toEqual(expect.arrayContaining(expected));
  });
});
```

### expect.not.arrayContaining(array)

expect.not.arrayContaining(array) 匹配的接收数组不包含预期数组中的所有元素。也就是说，预期数组不是接收数组的子集。

### expect.closeTo(number, numDigits?)

expect.closeTo(number, numDigits?) 在比较对象属性或数组项中的浮点数时非常有用。如果需要比较数字，请使用 .toBeCloseTo 代替

```js
// 例如，该测试通过的精度为 5 位数
test('compare float in object properties', () => {
  expect({
    title: '0.1 + 0.2',
    sum: 0.1 + 0.2,
  }).toEqual({
    title: '0.1 + 0.2',
    sum: expect.closeTo(0.3, 5),
  });
});
```

### expect.objectContaining(object)

expect.objectContaining(object) 匹配任何与预期属性递归匹配的接收对象。也就是说，预期对象是接收对象的子集。因此，它与包含预期对象中存在的属性的接收对象相匹配。

```js
// 例如，假设我们希望使用 Event 对象调用 onPress 函数，而我们需要验证的是事件是否具有 event.x 和 event.y 属性。我们可以使用
test('onPress gets called with the right thing', () => {
  const onPress = jest.fn();
  simulatePresses(onPress);
  expect(onPress).toHaveBeenCalledWith(
    expect.objectContaining({
      x: expect.any(Number),
      y: expect.any(Number),
    }),
  );
});
```

### expect.not.objectContaining(object)

expect.not.objectContaining(object) 匹配任何不递归匹配预期属性的接收对象。也就是说，预期对象不是接收对象的子集。因此，它会匹配包含预期对象中不包含的属性的接收对象。

### expect.stringContaining(string)

expect.stringContaining(string) 如果接收到的值是一个字符串，且该字符串完全包含预期的字符串，则与该值匹配。

### expect.not.stringContaining(string)

expect.not.stringContaining(string) 如果接收到的值不是字符串，或者接收到的字符串不包含准确的预期字符串，则匹配该值。

### expect.stringMatching(string | regexp)

如果接收到的值是与预期字符串或正则表达式匹配的字符串，则匹配该值。

```js
describe('stringMatching in arrayContaining', () => {
  const expected = [
    expect.stringMatching(/^Alic/),
    expect.stringMatching(/^[BR]ob/),
  ];
  it('matches even if received contains additional elements', () => {
    expect(['Alicia', 'Roberto', 'Evelina']).toEqual(
      expect.arrayContaining(expected),
    );
  });
  it('does not match if received does not contain expected elements', () => {
    expect(['Roberto', 'Evelina']).not.toEqual(
      expect.arrayContaining(expected),
    );
  });
});
```

### expect.not.stringMatching(string | regexp)

expect.not.stringMatching(string | regexp) 如果接收到的值不是字符串，或者是与预期字符串或正则表达式不匹配的字符串，则匹配该值。

## Assertion Count 断言计数

### expect.assertions(number)

验证在测试过程中是否调用了一定数量的断言。`这在测试异步代码时通常很有用，可以确保回调中的断言确实被调用。`

```js
// 例如，假设我们有一个函数 doAsync 接收到两个回调 callback1 和 callback2 ，它会以未知的顺序异步调用这两个回调。我们可以用以下方法进行测试
// expect.assertions(2) 调用可确保两个回调都被调用
test('doAsync calls both callbacks', () => {
  expect.assertions(2);
  function callback1(data) {
    expect(data).toBeTruthy();
  }
  function callback2(data) {
    expect(data).toBeTruthy();
  }

  doAsync(callback1, callback2);
});
```

### expect.hasAssertions()

验证在测试过程中至少有一个断言被调用。这在测试异步代码时通常很有用，可以确保回调中的断言确实被调用。

```js
// 例如，假设我们有几个函数都在处理状态。 prepareState 调用一个带有状态对象的回调， validateState 在该状态对象上运行，而 waitOnState 返回一个承诺，该承诺将等待所有 prepareState 回调完成。我们可以用以下方法进行测试
// expect.hasAssertions() 调用可确保 prepareState 回调真正被调用
test('prepareState prepares a valid state', () => {
  expect.hasAssertions();
  prepareState(state => {
    expect(validateState(state)).toBeTruthy();
  });
  return waitOnState();
});
```

## Extend Utilities 扩展实用程序

### expect.addEqualityTesters(testers)

您可以使用 expect.addEqualityTesters 添加自己的方法来测试两个对象是否相等

### expect.addSnapshotSerializer(serializer)

您可以调用 expect.addSnapshotSerializer 来添加一个模块，格式化特定于应用程序的数据结构。

### expect.extend(matchers)

您可以使用 expect.extend 为 Jest 添加自己的匹配器。
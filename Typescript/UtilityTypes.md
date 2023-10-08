<!-- TOC -->

- [Utility Types](#utility-types)
    - [Awaited\<Type>](#awaited%5Ctype)
    - [Partial\<Type>](#partial%5Ctype)
    - [Required\<Type>](#required%5Ctype)
    - [Readonly\<Type>](#readonly%5Ctype)
    - [Record\<Keys, Type>](#record%5Ckeys-type)
    - [Pick\<Type, Keys>](#pick%5Ctype-keys)
    - [Omit\<Type, Keys>](#omit%5Ctype-keys)
    - [Exclude\<UnionType, ExcludedMembers>](#exclude%5Cuniontype-excludedmembers)
    - [Extract\<Type, Union>](#extract%5Ctype-union)
    - [NonNullable\<Type>](#nonnullable%5Ctype)
    - [Parameters\<Type>](#parameters%5Ctype)
    - [ConstructorParameters\<Type>](#constructorparameters%5Ctype)
    - [ReturnType\<Type>](#returntype%5Ctype)
    - [InstanceType\<Type>](#instancetype%5Ctype)
    - [ThisParameterType\<Type>](#thisparametertype%5Ctype)
    - [OmitThisParameter\<Type>](#omitthisparameter%5Ctype)
    - [ThisType\<Type>](#thistype%5Ctype)
    - [Intrinsic String Manipulation Types](#intrinsic-string-manipulation-types)
    - [Uppercase\<StringType>](#uppercase%5Cstringtype)
    - [Lowercase\<StringType>](#lowercase%5Cstringtype)
    - [Capitalize\<StringType>](#capitalize%5Cstringtype)
    - [Uncapitalize\<StringType>](#uncapitalize%5Cstringtype)

<!-- /TOC -->

# Utility Types

TypeScript 提供了多种实用程序类型来促进常见的类型转换。这些实用程序在全球范围内可用。

<https://www.typescriptlang.org/docs/handbook/utility-types.html>

## Awaited\<Type>

此类型旨在对异步函数中的wait等操作进行建模，或Promises上的.then()方法——特别是它们递归解包Promises的方式。

```ts
// type A = string
type A = Awaited<Promise<string>>
```

## Partial\<Type>

构造一个类型，并将 Type 的所有属性设置为`可选`。

```ts
interface Todo {
  title: string;
  description: string;
}
 
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}
 
const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};
 
const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});
```

## Required\<Type>

构造一个类型，其中包含设置为`必需`的 Type 的所有属性。与 `Partial` 相反。

```ts
interface User {
  name?: string;
  age?: number;
  email?: string;
}

function createUser(user: Required<User>): void {
  // 创建用户
  // ...
}

const newUser: Required<User> = {
  name: 'John',
  age: 25,
  email: 'john@example.com',
};

createUser(newUser);
```

## Readonly\<Type>

构造一个类型，并将 Type 的所有属性设置为只读，这意味着构造类型的属性不能重新分配。

## Record\<Keys, Type>

创建一个新类型，该新类型将由指定的键和类型组成的属性构成。  
Record\<Keys, Type> 接受两个类型参数：Keys 表示键的类型，Type 表示属性值的类型。它会创建一个对象类型，该对象类型的属性由 Keys 类型的值作为键，Type 类型的值作为属性值。

```ts
type Fruit = 'apple' | 'banana' | 'orange';
type Price = number;

const fruitPrices: Record<Fruit, Price> = {
  apple: 0.5,
  banana: 0.3,
  orange: 0.8,
};

console.log(fruitPrices.apple); // 输出: 0.5
console.log(fruitPrices.banana); // 输出: 0.3
console.log(fruitPrices.orange); // 输出: 0.8
```

## Pick\<Type, Keys>

用于从给定类型 Type 中选择指定的属性 Keys，并创建一个新类型。  

```ts
interface User {
  name: string;
  age: number;
  email: string;
  address: string;
}

type UserProfile = Pick<User, 'name' | 'email'>;

const user: UserProfile = {
  name: 'John',
  email: 'john@example.com',
};
```

## Omit\<Type, Keys>

用于创建一个新类型，该新类型将原始类型 Type 中指定的属性 Keys 移除。

```ts
interface User {
  name: string;
  age: number;
  email: string;
  address: string;
}

type UserWithoutEmail = Omit<User, 'email'>;

const user: UserWithoutEmail = {
  name: 'John',
  age: 30,
  address: '123 Main St',
};
```

## Exclude\<UnionType, ExcludedMembers>

用于创建一个新类型，该新类型从联合类型 UnionType 中排除指定的成员 ExcludedMembers。

```ts
// type T0 = "b" | "c"
type T0 = Exclude<"a" | "b" | "c", "a">;

// type T1 = "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">;

// type T2 = string | number
type T2 = Exclude<string | number | (() => void), Function>;

// type T3 = {
//     kind: "square";
//     x: number;
// } | {
//     kind: "triangle";
//     x: number;
//     y: number;
// }
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };

type T3 = Exclude<Shape, { kind: "circle" }>
```

## Extract\<Type, Union>

用于创建一个新类型，该新类型包含了在联合类型 Union 中与给定类型 Type 相匹配的成员。

```ts
// type T0 = "a"
type T0 = Extract<"a" | "b" | "c", "a" | "f">;

// type T1 = () => void
type T1 = Extract<string | number | (() => void), Function>;

// type T2 = { kind: "circle"; radius: number;}
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };
 
type T2 = Extract<Shape, { kind: "circle" }>
```

## NonNullable\<Type>

通过从 Type 中排除 null 和 undefined 来构造类型

```ts
// type T0 = string | number
type T0 = NonNullable<string | number | undefined>;
```

## Parameters\<Type>

用于获取函数类型 Type 的参数类型  
根据函数类型 Type 的参数中使用的类型构造元组类型。

```ts
declare function f1(arg: { a: number; b: string }): void;

// type T0 = []
type T0 = Parameters<() => string>;

// type T1 = [s: string]
type T1 = Parameters<(s: string) => void>;

// type T2 = [arg: unknown]
type T2 = Parameters<<T>(arg: T) => T>;

// type T3 = [arg: {
//    a: number;
//    b: string;
// }]
type T3 = Parameters<typeof f1>;

// type T4 = unknown[]
type T4 = Parameters<any>;

// type T5 = never
type T5 = Parameters<never>;
```

## ConstructorParameters\<Type>

从构造函数类型的类型构造元组或数组类型。它生成一个包含所有参数类型的元组类型（如果 Type 不是函数，则永远不会生成该类型）。

```ts
// type T0 = [message?: string]
type T0 = ConstructorParameters<ErrorConstructor>;

class C {
  constructor(a: number, b: string) {}
}
// type T3 = [a: number, b: string]
type T3 = ConstructorParameters<typeof C>;
```

## ReturnType\<Type>

用于获取函数类型 Type 的返回值类型。  
构造一个由函数 Type 的返回类型组成的类型。

```ts
declare function f1(): { a: number; b: string };

// type T0 = string
type T0 = ReturnType<() => string>;

// type T1 = void
type T1 = ReturnType<(s: string) => void>;

// type T4 = {a: number;b: string;}
type T4 = ReturnType<typeof f1>;
```

## InstanceType\<Type>

构造一个由 Type 中构造函数的实例类型组成的类型。

```ts
class C {
  x = 0;
  y = 0;
}

// type T0 = C
type T0 = InstanceType<typeof C>;


class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

type PersonInstance = InstanceType<typeof Person>;

// PersonInstance 的类型为 Person
```

## ThisParameterType\<Type>

用于获取函数类型 Type 的 this 参数的类型。  
提取函数类型的 this 参数的类型，如果函数类型没有 this 参数，则为未知

```ts
function toHex(this: Number) {
  return this.toString(16);
}
 
function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n);
}
```

## OmitThisParameter\<Type>

用于创建一个新函数类型，该新函数类型排除了原始函数类型 Type 的 this 参数。

```ts
function toHex(this: Number) {
  return this.toString(16);
}
 
const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);
 
console.log(fiveToHex());
```

## ThisType\<Type>

用于将一个对象字面量类型 Type 中的 this 类型设置为特定类型。  
此实用程序不返回转换后的类型。相反，它充当上下文 this 类型的标记。请注意，必须启用 noImplicitThis 标志才能使用此实用程序。

```ts
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
};
 
function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}
 
let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx; // Strongly typed this
      this.y += dy; // Strongly typed this
    },
  },
});
 
obj.x = 10;
obj.y = 20;
obj.moveBy(5, 5);
```

## Intrinsic String Manipulation Types

## Uppercase\<StringType>

## Lowercase\<StringType>

## Capitalize\<StringType>

## Uncapitalize\<StringType>

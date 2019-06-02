# JSDoc

https://jsdoc.app/

## 标签

* @abstract (synonyms: @virtual)  必须由继承该成员的对象实现（或覆盖）的成员。
* @access 指定成员的访问级别。
* @alias 将成员视为具有不同的名称。
* @async 指示的功能是异步的，这意味着它使用的语法声明async function foo() {}。
* @augments (synonyms: @extends) @augments或@extends标签指示一个符号从继承
* @author 识别项目的作者。
* @borrows 此对象使用来自另一个对象的内容。
* @callback 记录回调函数。
* @class (synonyms: @constructor) 此函数旨在使用“new”关键字进行调用。
* @classdesc 使用以下文本来描述整个类。
* @constant (synonyms: @const) 将对象记录为常量。
* @constructs 构造函数。
* @copyright 版权信息。
* @default (synonyms: @defaultvalue) 默认值。
* @deprecated 记录这不再是首选方式。
* @description (synonyms: @desc) 描述一个符号。
* @enum 相关属性的集合。
* @event 事件。
* @example 项目的示例。
* @exports 模块导出的成员。
* @external (synonyms: @host) 标识外部类，命名空间或模块。
* @file (synonyms: @fileoverview, @overview) 描述一个文件。
* @fires (synonyms: @emits) 可能触发的事件
* @function (synonyms: @func, @method) 描述一种功能或方法。
* @generator 函数是生成器函数。
* @global 全局对象。
* @hideconstructor 指示不应显示构造函数。
* @ignore 省略文档中的符号。
* @implements 此符号实现了一个接口。
* @inheritdoc 继承其父文档。documentation.
* @inner 内部对象。
* @instance 实例成员。
* @interface 可以实现的接口。
* @kind 什么样的符号？
* @lends 在对象文字上记录属性，就好像它们属于具有给定名称的符号一样。
* @license 此代码的许可证。
* @listens 列出符号侦听的事件。
* @member (synonyms: @var) 成员。
* @memberof 属于父级成员。
* @mixes 对象合并了另一个对象的所有成员。
* @mixin 记录mixin对象。
* @module 记录JavaScript模块。
* @name 对象的名称。
* @namespace 命名空间对象。
* @override 覆盖其父级。
* @package 此符号旨在为包私有。
* @param (synonyms: @arg, @argument) 将参数记录到函数中。
* @private 私有的。
* @property (synonyms: @prop) 对象的属性。
* @protected 受到保护。
* @public 公开。
* @readonly 只读的。
* @requires 此文件需要JavaScript模块。
* @returns (synonyms: @return) 返回值
* @see 有关更多信息，请参阅其他一些文档。
* @since 功能何时添加？
* @static 静态成员。
* @summary 完整描述的较短版本。
* @this 'this'关键字在这里引用了什么？
* @throws (synonyms: @exception) 描述可能抛出的错误。
* @todo 要完成的任务。
* @tutorial 插入包含的教程文件的链接。
* @type 对象的类型。
* @typedef 自定义类型。
* @variation 用相同的名称区分不同的对象。
* @version 记录项目的版本号。
* @yields (synonyms: @yield) 记录生成器函数产生的值。


## @async

该@async标签指示的功能是异步的，这意味着它使用的语法声明async function foo() {}。
通常，您不需要使用此标记，因为JSDoc会自动检测异步函数并在生成的文档中标识它们。

## @author

标记标识项目的作者

```js
@author <name> [<emailAddress>]

/**
 * @author Jane Smith <jsmith@example.com>
 */
function MyClass() {}
```

## @callback

@callback标记提供有关可以传递给其他函数的回调函数的信息，包括回调的参数和返回值。您可以包含可以为@method提供的任何标记。

```js
/**
 * @class
 */
function Requester() {}

/**
 * Send a request.
 * @param {Requester~requestCallback} cb - The callback that handles the response.
 */
Requester.prototype.send = function(cb) {
    // code
};

/**
 * This callback is displayed as part of the Requester class.
 * @callback Requester~requestCallback
 * @param {number} responseCode
 * @param {string} responseMessage
 */
```

## @class

标记将函数标记为构造函数，意味着使用new关键字调用以返回实例。

```js
/**
 * Creates a new Person.
 * @class
 */
function Person() {
}

var p = new Person();
```

## @classdesc

```js
/**
 * This is a description of the MyClass constructor function.
 * @class
 * @classdesc This is a description of the MyClass class.
 */
function MyClass() {
}
```

## @constant

标记用于将文档标记为属于常量的符号

```js
/** @constant
    @type {string}
    @default
*/
const RED = 'FF0000';

/** @constant {number} */
var ONE = 1;
```

## @constructs


## @enum

记录了一组静态属性，这些属性的值都是相同的类型。

```js
/**
 * Enum for tri-state values.
 * @readonly
 * @enum {number}
 */
var triState = {
    /** The true value */
    TRUE: 1,
    FALSE: -1,
    /** @type {boolean} */
    MAYBE: true
};
```

## @event

标记允许您记录可以触发的事件。典型事件由具有已定义属性集的对象表示。

```js
@event <className>#[event:]<eventName>

/**
 * Throw a snowball.
 *
 * @fires Hurl#snowball
 */
Hurl.prototype.snowball = function() {
    /**
     * Snowball event.
     *
     * @event Hurl#snowball
     * @type {object}
     * @property {boolean} isPacked - Indicates whether the snowball is tightly packed.
     */
    this.emit('snowball', {
        isPacked: this._snowball.isPacked
    });
};
```

## @example

提供如何使用记录的项目的示例

```js
/**
 * Solves equations of the form a * x = b
 * @example
 * // returns 2
 * globalNS.method1(5, 10);
 * @example
 * // returns 3
 * globalNS.method(5, 15);
 * @returns {Number} Returns the value of x for the equation.
 */
globalNS.method1 = function (a, b) {
    return b / a;
};
```

## @file

```js
/**
 * @file Manages the configuration settings for the widget.
 * @author Rowina Sanela 
 */
```

## @function

这将对象标记为函数，即使它似乎不是解析器的对象。

```js
/** @function */
var paginate = paginateFactory(pages);
```

## @mixin

提供了旨在添加到其他对象的功能

```js
/**
 * This provides methods used for event handling. It's not meant to
 * be used directly.
 *
 * @mixin
 */
var Eventful = {
    on: function(eventName, handler) {
        // code...
    },
    fire: function(eventName, eventData) {
        // code...
    }
};
```

## @name

标记强制JSDoc将JSDoc注释的其余部分与给定名称相关联，忽略所有周围的代码。

```js
/**
 * @name highlightSearchTerm
 * @function
 * @global
 * @param {string} term - The search term to highlight.
 */
eval("window.highlightSearchTerm = function(term) {};")
```

## @param

标记提供的名称，类型和函数参数的描述。

```js
1.名称，类型和描述，在描述之前用连字符表示
/**
 * @param {string} somebody - Somebody's name.
 */
function sayHello(somebody) {
    alert('Hello ' + somebody);
}



2.记录参数的属性
/**
 * Assign the project to an employee.
 * @param {Object} employee - The employee who is responsible for the project.
 * @param {string} employee.name - The name of the employee.
 * @param {string} employee.department - The employee's department.
 */
Project.prototype.assign = function(employee) {
    // ...
};


3.记录解构参数
/**
 * Assign the project to an employee.
 * @param {Object} employee - The employee who is responsible for the project.
 * @param {string} employee.name - The name of the employee.
 * @param {string} employee.department - The employee's department.
 */
Project.prototype.assign = function({ name, department }) {
    // ...
};

4.记录数组中值的属性
/**
 * Assign the project to a list of employees.
 * @param {Object[]} employees - The employees who are responsible for the project.
 * @param {string} employees[].name - The name of an employee.
 * @param {string} employees[].department - The employee's department.
 */
Project.prototype.assign = function(employees) {
    // ...
};


5.可选参数（使用JSDoc语法）
/**
 * @param {string} [somebody] - Somebody's name.
 */
function sayHello(somebody) {
    if (!somebody) {
        somebody = 'John Doe';
    }
    alert('Hello ' + somebody);
}

6.可选参数和默认值
/**
 * @param {string} [somebody=John Doe] - Somebody's name.
 */
function sayHello(somebody) {
    if (!somebody) {
        somebody = 'John Doe';
    }
    alert('Hello ' + somebody);
}

7.允许一种类型或另一种类型
/**
 * @param {(string|string[])} [somebody=John Doe] - Somebody's name, or an array of names.
 */
function sayHello(somebody) {
    if (!somebody) {
        somebody = 'John Doe';
    } else if (Array.isArray(somebody)) {
        somebody = somebody.join(', ');
    }
    alert('Hello ' + somebody);
}
```

## @readonly

## @returns

记录了一个函数返回值

```js
/**
 * Returns the sum of a and b
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function sum(a, b) {
    return a + b;
}
```

## @todo

标记允许您记录代码的某些部分要完成的任务

```js
/**
 * @todo Write the documentation.
 * @todo Implement this function.
 */
function foo() {
    // write me
}
```

## @type
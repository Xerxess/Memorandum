<!-- TOC -->

- [chaijs](#chaijs)
- [ADD](#add)
- [`BDD`](#bdd)
    - [expect风格](#expect风格)
    - [should风格](#should风格)
    - [Chains 语义连接 getter 没有实至意义](#chains-语义连接-getter-没有实至意义)
    - [断言链](#断言链)

<!-- /TOC -->

https://www.chaijs.com/

# chaijs

BDD / TDD断言库

# ADD

通过assert接口公开,经典的assert-dot表示法

```js
var assert = require('chai').assert
  , foo = 'bar'
  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

assert.typeOf(foo, 'string'); // without optional message
assert.typeOf(foo, 'string', 'foo is a string'); // with optional message
assert.equal(foo, 'bar', 'foo equal `bar`');
assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');
```

# `BDD`

* BDD样式有两种风格：expect和should
* 两者都使用相同的可链接语言来构造断言，但是它们在初始构造断言的方式上有所不同
* 对于should，还有一些警告和克服警告的其他工具

## expect风格

```js
var expect = require('chai').expect

let foo = 'bar'
let beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

expect(foo).to.be.a('string');
expect(foo).to.equal('bar');
expect(foo).to.have.lengthOf(3);
expect(beverages).to.have.property('tea').with.lengthOf(3);
```

## should风格

它扩展了每个对象should ，开始您的链

```js
var should = require('chai').should()
  , foo = 'bar'
  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

foo.should.be.a('string');
foo.should.equal('bar');
foo.should.have.lengthOf(3);
beverages.should.have.property('tea').with.lengthOf(3);
```

## Chains 语义连接 getter 没有实至意义

```js
to 前往、向、朝向
be 发生、存在、有、位于
been 属于
is 存在
that 那一个
which 哪一个、哪一些
and 和、而且
has 具有
have 具有
with 随着、关于、和...一致
at 在
of 关于、属于
same 相同 
but 但是 转则
does 做、工作
still 还是、任然

```

## 断言链

* .not 否定链中的所有断言
* .deep （使.equal, .include, .members, .keys，.property不使用=== 严格相等）
* .nested (在链中的所有.property和.include断言中启用点和括号表示法。)

```js
expect({a: {b: ['x', 'y']}}).to.have.nested.property('a.b[1]');
expect({a: {b: ['x', 'y']}}).to.nested.include({'a.b[1]': 'y'});
```
* .own (导致链中跟随的所有.property和.include断言忽略继承的属性。)
* .ordered (导致链中的所有.members断言要求成员处于相同的顺序。)
* .any
* .all
* .a(type[, msg]) 断言目标的类型等于给定的字符串类型
  .an是.a的别名
```js
expect('foo').to.be.a('string');
expect({a: 1}).to.be.an('object');
expect(null).to.be.a('null');
expect(undefined).to.be.an('undefined');
expect(new Error).to.be.an('error');
expect(Promise.resolve()).to.be.a('promise');
expect(new Float32Array).to.be.a('float32array');
expect(Symbol()).to.be.a('symbol');
```
* .include(val[, msg]) 断言给定的字符串val是目标的子字符串。
* .ok 断言目标是一个真值
* .true 断言目标严格（===）等于true
* .false 断言目标严格（===）等于false
* .null 断言目标严格（===）等于null
* .undefined 断言目标严格（===）等于undefined
* .NaN 断言目标正好是NaN
* .exist 断言目标不严格（===）等于null或undefined
* .empty 断言目标的长度属性严格（===）等于0
* .arguments 断言目标是参数对象
* .equal(val[, msg]) 断言目标严格（===）等于给定的val
* .eql(obj[, msg]) 断言目标与给定的obj非常相等
* .above(n[, msg])
* .least(n[, msg]) 
* .below(n[, msg])
* .most(n[, msg])
* .within(start, finish[, msg])
* .instanceof(constructor[, msg]) 断言目标是给定构造函数的实例
* .property(name[, val[, msg]]) 断言目标具有具有给定键名的属性
* .ownPropertyDescriptor(name[, descriptor[, msg]]) 断言目标具有自己的具有给定键名的属性描述符
* .lengthOf(n[, msg]) 断言目标的长度或大小等于给定的数字n
* .match(re[, msg]) 断言目标与给定的正则表达式匹配
* .string(str[, msg]) 断言目标字符串包含给定的子字符串str
* .keys(key1[, key2[, …]]) 断言目标对象，数组，映射或集合具有给定的键。搜索中仅包含目标自己的继承属性。
* .throw([errorLike], [errMsgMatcher], [msg]) 如果没有提供参数，.throw将调用目标函数并断言抛出错误
* .respondTo(method[, msg]) 当目标是非函数对象时，.respondTo断言目标具有给定名称方法的方法。该方法可以是自己的或继承的，并且可以是可枚举的或不可枚举的。
* .itself 
* .satisfy(matcher[, msg])
* .closeTo(expected, delta[, msg])
* .members(set[, msg]) 断言目标数组与给定数组集具有相同的成员
* .oneOf(list[, msg]) 断言目标是给定数组列表的成员
* .change(subject[, prop[, msg]])
* .increase(subject[, prop[, msg]])
* .decrease(subject[, prop[, msg]])
* .by(delta[, msg])
* .extensible 断言目标是可扩展的，这意味着可以向其添加新属性
* .sealed 断言目标是密封的，这意味着无法将新属性添加到其中，并且无法重新配置或删除其现有属性
* .frozen  断言目标已冻结，这意味着无法将新属性添加到其中，并且无法将其现有属性重新分配给不同的值，重新配置或删除
* .finite 断言目标是一个数字，而不是NaN或正/负Infinity
* .fail([message]) || .fail(actual, expected, [message], [operator]) 失败了

<!-- TOC -->

- [mochajs](#mochajs)
- [BDD钩子](#bdd钩子)
- [接口](#接口)
    - [BDD](#bdd)
    - [TDD](#tdd)

<!-- /TOC -->

https://mochajs.org/

# mochajs

JavaScript测试框架

从v8.0.0开始，Mocha需要Node.js v10.12.0或更高版本

```node
npm install --save-dev mocha
```

```js
// demo
var assert = require('assert')
describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal(-1, [1, 2, 3].indexOf(4))
        })
    })
})

// $ ./node_modules/mocha/bin/mocha

// Array
//     #indexOf()
//       ✓ should return -1 when the value is not present


//   1 passing (9ms)
```


```js
//异步 demo
describe('User', function() {
    describe('#save()', function() {
        it('should save without error', function(done) {
            var user = new User('Luna')
            user.save(function(err) {
                if(err) done(err);
                else done()
            })
        })
    })
})
```

```js
//使用Chai Assertions for Promises
//.eventually  将任何现有的Chai断言转换为对承诺起作用的断言

(2 + 2).should.equal(4);
 
// becomes
return Promise.resolve(2 + 2).should.eventually.equal(4);
 
 
expect({ foo: "bar" }).to.have.property("foo");
 
// becomes
return expect(Promise.resolve({ foo: "bar" })).to.eventually.have.property("foo");
```

```js
//使用 使用ASYNC / AWAIT

describe('#find()', function() {
  it('responds with matching records', async function() {
    const users = await db.find({type: 'User'});
    users.should.have.length(3);
  });
});
```

```js
//钩子函数
describe('hooks', function() {
  before(function() {
    // 在此块中的所有测试之前运行
  });

  after(function() {
    // 在此块中的所有测试之后运行
  });

  beforeEach(function() {
    // 在此块中的每个测试之前运行
  });

  afterEach(function() {
    // 在此块中的每个测试之后运行
  });

  // test cases
});
```

# BDD钩子

```js
describe('hooks', function () {
  before(function () {
    // 在此块中的第一个测试之前运行一次
  });

  after(function () {
    // 在该块中的最后一个测试之后运行一次
  });

  beforeEach(function () {
    // 在此块中的每个测试之前运行
  });

  afterEach(function () {
    // 在此块中的每个测试之后运行
  });

  // test cases
});
```

# 接口

## BDD

* describe() === context()
* context()
* it() === specify()
* specify()
* before()
* after()
* beforeEach()
* afterEach()

## TDD

* suite()
* test()
* suiteSetup()
* suiteTeardown()
* setup()
* teardown()
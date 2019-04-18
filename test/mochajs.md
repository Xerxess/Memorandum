# mochajs

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
async-validator
<!-- TOC -->

- [Validate](#validate)
- [Rules](#rules)
- [Rules.Type](#rulestype)

<!-- /TOC -->
验证表单异步

https://github.com/yiminghe/async-validator

asyncValidator():https://github.com/yiminghe/async-validator/blob/master/examples/async-validator.js

```js
var schema = require("async-validator");
// 编写验证描述
var descriptor = {
  name: {
    type: "string",
    required: true,
    validator: (rule, value) => value === "muji"
  }
};

// 创建验证对象
var validator = new schema(descriptor);

// 开始验证
// 同步验证
validator.validate({ name: "muji" }, (errors, fields) => {
  if (errors) {
    return handleErrors(errors, fields);
  }
});

// PROMISE 用法
validator
  .validate(
    {
      name: "muji",
      asyncValidator: (rule, value) =>
        axios.post("/nameValidator", { name: value })
    },
    (errors, fields) => {
      if (errors) {
        return handleErrors(errors, fields);
      }
    }
  )
  .then(() => {})
  .catch(({ errors, fields }) => {
    return handleErrors(errors, fields);
  });
```
# Validate

```js
function(source, [options], callback): Promise
```

* options
    * first
    * firstFields

# Rules

* {type: "string", required: true, pattern: schema.pattern.email}
* function(rule, value, callback, source, options)

example
```js

// 规则可以是执行验证的函数。
var descriptor = {
  name(rule, value, callback, source, options) {
    var errors = [];
    if(!/^[a-z0-9]+$/.test(value)) {
      errors.push(
        new Error(
          util.format("%s must be lowercase alphanumeric characters",
            rule.field)));
    }
    return errors;
  }
}

```

```js
// 多个验证规则
var descriptor = {
  email: [
    {type: "string", required: true, pattern: schema.pattern.email},
    {validator(rule, value, callback, source, options) {
      var errors = [];
      // test if email address already exists in a database
      // and add a validation error to the errors array if it does
      return errors;
    }}
  ]
}
```

# Rules.Type

* string：必须是类型string。This is the default type.
* number：必须是类型number。
* boolean：必须是类型boolean。
* method：必须是类型function。
* regexp：必须是RegExp创建新项时不生成异常的实例或字符串RegExp。
* integer：必须是类型number和整数。
* float：必须是类型number和浮点数。
* array：必须是由...确定的数组Array.isArray。
* object：必须是类型object而不是Array.isArray。
* enum：价值必须存在于enum。
* date：值必须有效，由确定 Date
* url：必须是类型url。
* hex：必须是类型hex。
* email：必须是类型email。

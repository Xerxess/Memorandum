<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Hooks](#hooks)
  - [实例 hooks](#实例-hooks)
  - [模型 hooks](#模型-hooks)

<!-- /code_chunk_output -->

# Hooks

Hooks(也称为生命周期事件)是在执行 sequelize 中的调用之前和之后调用的函数. 例如,如果要在保存之前始终在模型上设置一个值,则可以添加一个 beforeUpdate hook.
- 不能对实例使用 hook. Hook 用于模型


```ts
// 声明 Hooks
// 方法 1 通过 .init() 方法
class User extends Model {}
User.init({
  username: DataTypes.STRING,
  mood: {
    type: DataTypes.ENUM,
    values: ['happy', 'sad', 'neutral']
  }
}, {
  hooks: {
    beforeValidate: (user, options) => {
      user.mood = 'happy';
    },
    afterValidate: (user, options) => {
      user.username = 'Toni';
    }
  },
  sequelize
});

// 方法 2 通过 .addHook() 方法
User.addHook('beforeValidate', (user, options) => {
  user.mood = 'happy';
});

User.addHook('afterValidate', 'someCustomName', (user, options) => {
  return Promise.reject(new Error("I'm afraid I can't let you do that!"));
});

// 方法 3 通过 direct 方法
User.beforeCreate(async (user, options) => {
  const hashedPassword = await hashPassword(user.password);
  user.password = hashedPassword;
});

User.afterValidate('myHookAfter', (user, options) => {
  user.username = 'Toni';
});


// 全局 / 通用 hooks
const User = sequelize.define('User', {}, {
    tableName: 'users',
    hooks : {
        beforeCreate : (record, options) => {
            record.dataValues.createdAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
            record.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
        },
        beforeUpdate : (record, options) => {
            record.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
        }
    }
});
```

## 实例 hooks

* beforeValidate
* afterValidate / validationFailed
* beforeCreate / beforeUpdate / beforeSave / beforeDestroy
* afterCreate / afterUpdate / afterSave / afterDestroy

## 模型 hooks


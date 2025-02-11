<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Sequelize](#sequelize)
  - [入门](#入门)
    - [记录日志](#记录日志)
    - [Promises 和 async/await](#promises-和-asyncawait)
  - [模型](#模型)
    - [表名推断](#表名推断)
    - [模型同步](#模型同步)
    - [时间戳](#时间戳)
    - [列声明简写语法](#列声明简写语法)
    - [默认值 defaultValue](#默认值-defaultvalue)
    - [列参数](#列参数)
    - [利用模型作为类](#利用模型作为类)

<!-- /code_chunk_output -->


# Sequelize

<https://www.sequelize.cn/>
<https://sequelize.org/>

Sequelize 是适用于 Oracle、Postgres、MySQL、MariaDB、SQLite 和 SQL Server 等的现代 TypeScript 和 Node.js ORM。具有可靠的事务支持、关系、即时加载和延迟加载、读取复制等功能。

## 入门

```
npm install --save sequelize

# 选择以下之一:
$ npm install --save pg pg-hstore # Postgres
$ npm install --save mysql2
$ npm install --save mariadb
$ npm install --save sqlite3
$ npm install --save tedious # Microsoft SQL Server
$ npm install --save oracledb # Oracle Database
```

```ts
const { Sequelize } = require('sequelize');

// 方法 1: 传递一个连接 URI
const sequelize = new Sequelize('sqlite::memory:') // Sqlite 示例
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Postgres 示例

// 方法 2: 分别传递参数 (sqlite)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'path/to/database.sqlite'
});

// 方法 3: 分别传递参数 (其它数据库)
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});
```

demo

```ts
import pg from 'pg'
import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize(
  'postgres://user:pass@example.com:5432/dbname',
  {
    dialect: 'postgres',
    dialectModule: pg,
    timezone: 'Asia/Shanghai',
  }
)

sequelize.authenticate().then(()=>{
    console.log('连接成功')
},()=>{
    console.log('连接失败')
})

// 默认情况下,Sequelize 将保持连接打开状态,并对所有查询使用相同的连接. 如果你需要关闭连接,请调用 sequelize.close()(这是异步的并返回一个 Promise).

// 注意: 一旦 sequelize.close() 被调用, 就不可能打开新的连接. 你将需要创建一个新的 Sequelize 实例以再次访问你的数据库.
// sequelize.close()
```

### 记录日志

```ts
const sequelize = new Sequelize('sqlite::memory:', {
  // 选择一种日志记录参数
  logging: console.log,                  // 默认值,显示日志函数调用的第一个参数
  logging: (...msg) => console.log(msg), // 显示所有日志函数调用参数
  logging: false,                        // 禁用日志记录
  logging: msg => logger.debug(msg),     // 使用自定义记录器(例如Winston 或 Bunyan),显示第一个参数
  logging: logger.debug.bind(logger)     // 使用自定义记录器的另一种方法,显示所有消息
});
```

### Promises 和 async/await

Sequelize 提供的大多数方法都是异步的,因此返回 Promises. 它们都是 Promises, 因此你可以直接使用Promise API(例如,使用 then, catch, finally).

当然,使用 async 和 await 也可以正常工作.

## 模型

- 调用 sequelize.define(modelName, attributes, options)
- 扩展 Model 并调用 init(attributes, options)

```ts
// 使用 sequelize.define
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
  // 在这里定义模型属性
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull 默认为 true
  }
}, {
  // 这是其他模型参数
});
```

```ts
// 扩展 Model 

const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class User extends Model {}

User.init({
  // 在这里定义模型属性
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull 默认为 true
  }
}, {
  // 这是其他模型参数
  sequelize, // 我们需要传递连接实例
  modelName: 'User' // 我们需要选择模型名称
});

// 定义的模型是类本身
console.log(User === sequelize.models.User); // true
```

### 表名推断

* 模型名称(User) -> 表名(Users) (默认规则)

> 强制表名称等于模型名称

```ts
// 模型名称(User) -> 表名(User)
sequelize.define('User', {
  // ... (属性)
}, {
  freezeTableName: true
});

// 全局定义
const sequelize = new Sequelize('sqlite::memory:', {
  define: {
    freezeTableName: true
  }
});
```

> 直接提供表名

```ts
// 模型名称(User) -> 表名(Employees)
sequelize.define('User', {
  // ... (属性)
}, {
  tableName: 'Employees'
});
```

### 模型同步

- User.sync() - 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
- User.sync({ force: true }) - 将创建表,如果表已经存在,则将其首先删除
- User.sync({ alter: true }) - 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.

```ts
await User.sync({ force: true });
console.log("用户模型表刚刚(重新)创建！");

await sequelize.sync({ force: true });
console.log("所有模型均已成功同步.");

await User.drop();
console.log("用户表已删除!");

await sequelize.drop();
console.log("所有表已删除!");
```

### 时间戳

默认情况下,Sequelize 使用数据类型 DataTypes.DATE 自动向每个模型添加 `createdAt` 和 `updatedAt` 字段. 这些字段会自动进行管理 - 每当你使用Sequelize 创建或更新内容时,这些字段都会被自动设置. createdAt 字段将包含代表创建时刻的时间戳,而 updatedAt 字段将包含最新更新的时间戳.

```ts
// 禁用 createdAt 和 updatedAt 字段
sequelize.define('User', {
  // ... (属性)
}, {
  timestamps: false
});

// 选择性
class Foo extends Model {}
Foo.init({ /* 属性 */ }, {
  sequelize,

  // 不要忘记启用时间戳！
  timestamps: true,

  // 不想要 createdAt
  createdAt: false,

  // 想要 updatedAt 但是希望名称叫做 updateTimestamp
  updatedAt: 'updateTimestamp'
});
```

### 列声明简写语法

```ts
// 例如:
sequelize.define('User', {
  name: {
    type: DataTypes.STRING
  }
});

// 唯一指定内容是其数据类型,则可以缩短语法
// 可以简写为:
sequelize.define('User', { name: DataTypes.STRING });
```

### 默认值 defaultValue

```ts
sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    defaultValue: "John Doe"
  }
});

// DataTypes.NOW
sequelize.define('Foo', {
  bar: {
    type: DataTypes.DATETIME,
    defaultValue: DataTypes.NOW
    // 这样,当前日期/时间将用于填充此列(在插入时)
  }
});
```



### 列参数

```ts
const { Model, DataTypes, Deferrable } = require("sequelize");

class Foo extends Model {}
Foo.init({
  // 实例化将自动将 flag 设置为 true (如果未设置)
  flag: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },

  // 日期的默认值 => 当前时间
  myDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },

  // 将 allowNull 设置为 false 将为该列添加 NOT NULL,
  // 这意味着如果该列为 null,则在执行查询时将从数据库引发错误.
  // 如果要在查询数据库之前检查值是否不为 null,请查看下面的验证部分.
  title: { type: DataTypes.STRING, allowNull: false },

  // 创建两个具有相同值的对象将引发错误.
  // unique 属性可以是布尔值或字符串.
  // 如果为多个列提供相同的字符串,则它们将形成一个复合唯一键.
  uniqueOne: { type: DataTypes.STRING,  unique: 'compositeIndex' },
  uniqueTwo: { type: DataTypes.INTEGER, unique: 'compositeIndex' },

  // unique 属性是创建唯一约束的简写.
  someUnique: { type: DataTypes.STRING, unique: true },

  // 继续阅读有关主键的更多信息
  identifier: { type: DataTypes.STRING, primaryKey: true },

  // autoIncrement 可用于创建 auto_incrementing 整数列
  incrementMe: { type: DataTypes.INTEGER, autoIncrement: true },

  // 你可以通过 'field' 属性指定自定义列名称：
  fieldWithUnderscores: { type: DataTypes.STRING, field: 'field_with_underscores' },

  // 可以创建外键：
  bar_id: {
    type: DataTypes.INTEGER,

    references: {
      // 这是对另一个模型的参考
      model: Bar,

      // 这是引用模型的列名
      key: 'id',

      // 使用 PostgreSQL,可以通过 Deferrable 类型声明何时检查外键约束.
      deferrable: Deferrable.INITIALLY_IMMEDIATE
      // 参数:
      // - `Deferrable.INITIALLY_IMMEDIATE` - 立即检查外键约束
      // - `Deferrable.INITIALLY_DEFERRED` - 将所有外键约束检查推迟到事务结束
      // - `Deferrable.NOT` - 完全不推迟检查(默认) - 这将不允许你动态更改事务中的规则
    }
  },

  // 注释只能添加到 MySQL,MariaDB,PostgreSQL 和 MSSQL 的列中
  commentMe: {
    type: DataTypes.INTEGER,
    comment: '这是带有注释的列'
  }
}, {
  sequelize,
  modelName: 'foo',

  // 在上面的属性中使用 `unique: true` 与在模型的参数中创建索引完全相同：
  indexes: [{ unique: true, fields: ['someUnique'] }]
});
```

### 利用模型作为类

```ts
class User extends Model {
  static classLevelMethod() {
    return 'foo';
  }
  instanceLevelMethod() {
    return 'bar';
  }
  getFullname() {
    return [this.firstname, this.lastname].join(' ');
  }
}
User.init({
  firstname: Sequelize.TEXT,
  lastname: Sequelize.TEXT
}, { sequelize });

console.log(User.classLevelMethod()); // 'foo'
const user = User.build({ firstname: 'Jane', lastname: 'Doe' });
console.log(user.instanceLevelMethod()); // 'bar'
console.log(user.getFullname()); // 'Jane Doe'
```

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [OpTypes](#optypes)
  - [Demo](#demo)
  - [逻辑组合](#逻辑组合)

<!-- /code_chunk_output -->


# OpTypes

Sequelize 提供了多种运算符

```ts
interface OpTypes {
    /**
     * Operator -|- (PG range is adjacent to operator)
     *
     * ```js
     * [Op.adjacent]: [1, 2]
     * ```
     * In SQL
     * ```sql
     * -|- [1, 2)
     * ```
     */
    readonly adjacent: unique symbol;


    /**
     * Operator ALL
     *
     * ```js
     * [Op.gt]: {
     *  [Op.all]: literal('SELECT 1')
     * }
     * ```
     * In SQL
     * ```sql
     * > ALL (SELECT 1)
     * ```
     */
    readonly all: unique symbol;


    /**
     * Operator AND
     *
     * ```js
     * [Op.and]: {a: 5}
     * ```
     * In SQL
     * ```sql
     * AND (a = 5)
     * ```
     */
    readonly and: unique symbol;


    /**
     * Operator ANY ARRAY (PG only)
     *
     * ```js
     * [Op.any]: [2,3]
     * ```
     * In SQL
     * ```sql
     * ANY ARRAY[2, 3]::INTEGER
     * ```
     *
     * Operator LIKE ANY ARRAY (also works for iLike and notLike)
     *
     * ```js
     * [Op.like]: { [Op.any]: ['cat', 'hat']}
     * ```
     * In SQL
     * ```sql
     * LIKE ANY ARRAY['cat', 'hat']
     * ```
     */
    readonly any: unique symbol;


    /**
     * Operator BETWEEN
     *
     * ```js
     * [Op.between]: [6, 10]
     * ```
     * In SQL
     * ```sql
     * BETWEEN 6 AND 10
     * ```
     */
    readonly between: unique symbol;
    /**
     * With dialect specific column identifiers (PG in this example)
     *
     * ```js
     * [Op.col]: 'user.organization_id'
     * ```
     * In SQL
     * ```sql
     * = "user"."organization_id"
     * ```
     */
    readonly col: unique symbol;


    /**
     * Operator <@ (PG array contained by operator)
     *
     * ```js
     * [Op.contained]: [1, 2]
     * ```
     * In SQL
     * ```sql
     * <@ [1, 2)
     * ```
     */
    readonly contained: unique symbol;


    /**
     * Operator @> (PG array contains operator)
     *
     * ```js
     * [Op.contains]: [1, 2]
     * ```
     * In SQL
     * ```sql
     * @> [1, 2)
     * ```
     */
    readonly contains: unique symbol;


    /**
     * Operator LIKE
     *
     * ```js
     * [Op.endsWith]: 'hat'
     * ```
     * In SQL
     * ```sql
     * LIKE '%hat'
     * ```
     */
    readonly endsWith: unique symbol;


    /**
     * Operator =
     *
     * ```js
     * [Op.eq]: 3
     * ```
     * In SQL
     * ```sql
     * = 3
     * ```
     */
    readonly eq: unique symbol;


    /**
     * Operator >
     *
     * ```js
     * [Op.gt]: 6
     * ```
     * In SQL
     * ```sql
     * > 6
     * ```
     */
    readonly gt: unique symbol;


    /**
     * Operator >=
     *
     * ```js
     * [Op.gte]: 6
     * ```
     * In SQL
     * ```sql
     * >= 6
     * ```
     */
    readonly gte: unique symbol;


    /**
     * Operator ILIKE (case insensitive) (PG only)
     *
     * ```js
     * [Op.iLike]: '%hat'
     * ```
     * In SQL
     * ```sql
     * ILIKE '%hat'
     * ```
     */
    readonly iLike: unique symbol;


    /**
     * Operator IN
     *
     * ```js
     * [Op.in]: [1, 2]
     * ```
     * In SQL
     * ```sql
     * IN [1, 2]
     * ```
     */
    readonly in: unique symbol;


    /**
     * Operator ~* (PG only)
     *
     * ```js
     * [Op.iRegexp]: '^[h|a|t]'
     * ```
     * In SQL
     * ```sql
     * ~* '^[h|a|t]'
     * ```
     */
    readonly iRegexp: unique symbol;


    /**
     * Operator IS
     *
     * ```js
     * [Op.is]: null
     * ```
     * In SQL
     * ```sql
     * IS null
     * ```
     */
    readonly is: unique symbol;


    /**
     * Operator LIKE
     *
     * ```js
     * [Op.like]: '%hat'
     * ```
     * In SQL
     * ```sql
     * LIKE '%hat'
     * ```
     */
    readonly like: unique symbol;


    /**
     * Operator <
     *
     * ```js
     * [Op.lt]: 10
     * ```
     * In SQL
     * ```sql
     * < 10
     * ```
     */
    readonly lt: unique symbol;
    /**
     * Operator <=
     *
     * ```js
     * [Op.lte]: 10
     * ```
     * In SQL
     * ```sql
     * <= 10
     * ```
     */
    readonly lte: unique symbol;


    /**
     * Operator @@
     *
     * ```js
     * [Op.match]: Sequelize.fn('to_tsquery', 'fat & rat')`
     * ```
     * In SQL
     * ```sql
     * @@ to_tsquery('fat & rat')
     * ```
     */
    readonly match: unique symbol;


    /**
     * Operator !=
     *
     * ```js
     * [Op.ne]: 20
     * ```
     * In SQL
     * ```sql
     * != 20
     * ```
     */
    readonly ne: unique symbol;


    /**
     * Operator &> (PG range does not extend to the left of operator)
     *
     * ```js
     * [Op.noExtendLeft]: [1, 2]
     * ```
     * In SQL
     * ```sql
     * &> [1, 2)
     * ```
     */
    readonly noExtendLeft: unique symbol;


    /**
     * Operator &< (PG range does not extend to the right of operator)
     *
     * ```js
     * [Op.noExtendRight]: [1, 2]
     * ```
     * In SQL
     * ```sql
     * &< [1, 2)
     * ```
     */
    readonly noExtendRight: unique symbol;


    /**
     * Operator NOT
     *
     * ```js
     * [Op.not]: true
     * ```
     * In SQL
     * ```sql
     * IS NOT TRUE
     * ```
     */
    readonly not: unique symbol;


    /**
     * Operator NOT BETWEEN
     *
     * ```js
     * [Op.notBetween]: [11, 15]
     * ```
     * In SQL
     * ```sql
     * NOT BETWEEN 11 AND 15
     * ```
     */
    readonly notBetween: unique symbol;


    /**
     * Operator NOT ILIKE (case insensitive) (PG only)
     *
     * ```js
     * [Op.notILike]: '%hat'
     * ```
     * In SQL
     * ```sql
     * NOT ILIKE '%hat'
     * ```
     */
    readonly notILike: unique symbol;


    /**
     * Operator NOT IN
     *
     * ```js
     * [Op.notIn]: [1, 2]
     * ```
     * In SQL
     * ```sql
     * NOT IN [1, 2]
     * ```
     */
    readonly notIn: unique symbol;


    /**
     * Operator !~* (PG only)
     *
     * ```js
     * [Op.notIRegexp]: '^[h|a|t]'
     * ```
     * In SQL
     * ```sql
     * !~* '^[h|a|t]'
     * ```
     */
    readonly notIRegexp: unique symbol;


    /**
     * Operator NOT LIKE
     *
     * ```js
     * [Op.notLike]: '%hat'
     * ```
     * In SQL
     * ```sql
     * NOT LIKE '%hat'
     * ```
     */
    readonly notLike: unique symbol;


    /**
     * Operator NOT REGEXP (MySQL/PG only)
     *
     * ```js
     * [Op.notRegexp]: '^[h|a|t]'
     * ```
     * In SQL
     * ```sql
     * NOT REGEXP/!~ '^[h|a|t]'
     * ```
     */
    readonly notRegexp: unique symbol;


    /**
     * Operator OR
     *
     * ```js
     * [Op.or]: [{a: 5}, {a: 6}]
     * ```
     * In SQL
     * ```sql
     * (a = 5 OR a = 6)
     * ```
     */
    readonly or: unique symbol;


    /**
     * Operator && (PG array overlap operator)
     *
     * ```js
     * [Op.overlap]: [1, 2]
     * ```
     * In SQL
     * ```sql
     * && [1, 2)
     * ```
     */
    readonly overlap: unique symbol;


    /**
     * Internal placeholder
     *
     * ```js
     * [Op.placeholder]: true
     * ```
     */
    readonly placeholder: unique symbol;


    /**
     * Operator REGEXP (MySQL/PG only)
     *
     * ```js
     * [Op.regexp]: '^[h|a|t]'
     * ```
     * In SQL
     * ```sql
     * REGEXP/~ '^[h|a|t]'
     * ```
     */
    readonly regexp: unique symbol;


    /**
     * Operator LIKE
     *
     * ```js
     * [Op.startsWith]: 'hat'
     * ```
     * In SQL
     * ```sql
     * LIKE 'hat%'
     * ```
     */
    readonly startsWith: unique symbol;


    /**
     * Operator << (PG range strictly left of operator)
     *
     * ```js
     * [Op.strictLeft]: [1, 2]
     * ```
     * In SQL
     * ```sql
     * << [1, 2)
     * ```
     */
    readonly strictLeft: unique symbol;


    /**
     * Operator >> (PG range strictly right of operator)
     *
     * ```js
     * [Op.strictRight]: [1, 2]
     * ```
     * In SQL
     * ```sql
     * >> [1, 2)
     * ```
     */
    readonly strictRight: unique symbol;


    /**
     * Operator LIKE
     *
     * ```js
     * [Op.substring]: 'hat'
     * ```
     * In SQL
     * ```sql
     * LIKE '%hat%'
     * ```
     */
    readonly substring: unique symbol;


    /**
     * Operator VALUES
     *
     * ```js
     * [Op.values]: [4, 5, 6]
     * ```
     * In SQL
     * ```sql
     * VALUES (4), (5), (6)
     * ```
     */
    readonly values: unique symbol;


}
export declare const Op: OpTypes;
export default Op;

```

## Demo

```ts
const { Op } = require("sequelize");
Post.findAll({
  where: {
    [Op.and]: [{ a: 5 }, { b: 6 }],            // (a = 5) AND (b = 6)
    [Op.or]: [{ a: 5 }, { b: 6 }],             // (a = 5) OR (b = 6)
    someAttribute: {
      // 基本
      [Op.eq]: 3,                              // = 3
      [Op.ne]: 20,                             // != 20
      [Op.is]: null,                           // IS NULL
      [Op.not]: true,                          // IS NOT TRUE
      [Op.or]: [5, 6],                         // (someAttribute = 5) OR (someAttribute = 6)

      // 使用方言特定的列标识符 (以下示例中使用 PG):
      [Op.col]: 'user.organization_id',        // = "user"."organization_id"

      // 数字比较
      [Op.gt]: 6,                              // > 6
      [Op.gte]: 6,                             // >= 6
      [Op.lt]: 10,                             // < 10
      [Op.lte]: 10,                            // <= 10
      [Op.between]: [6, 10],                   // BETWEEN 6 AND 10
      [Op.notBetween]: [11, 15],               // NOT BETWEEN 11 AND 15

      // 其它操作符

      [Op.all]: sequelize.literal('SELECT 1'), // > ALL (SELECT 1)

      [Op.in]: [1, 2],                         // IN [1, 2]
      [Op.notIn]: [1, 2],                      // NOT IN [1, 2]

      [Op.like]: '%hat',                       // LIKE '%hat'
      [Op.notLike]: '%hat',                    // NOT LIKE '%hat'
      [Op.startsWith]: 'hat',                  // LIKE 'hat%'
      [Op.endsWith]: 'hat',                    // LIKE '%hat'
      [Op.substring]: 'hat',                   // LIKE '%hat%'
      [Op.iLike]: '%hat',                      // ILIKE '%hat' (不区分大小写) (仅 PG)
      [Op.notILike]: '%hat',                   // NOT ILIKE '%hat'  (仅 PG)
      [Op.regexp]: '^[h|a|t]',                 // REGEXP/~ '^[h|a|t]' (仅 MySQL/PG)
      [Op.notRegexp]: '^[h|a|t]',              // NOT REGEXP/!~ '^[h|a|t]' (仅 MySQL/PG)
      [Op.iRegexp]: '^[h|a|t]',                // ~* '^[h|a|t]' (仅 PG)
      [Op.notIRegexp]: '^[h|a|t]',             // !~* '^[h|a|t]' (仅 PG)

      [Op.any]: [2, 3],                        // ANY (ARRAY[2, 3]::INTEGER[]) (PG only)
      [Op.match]: Sequelize.fn('to_tsquery', 'fat & rat') // 匹配文本搜索字符串 'fat' 和 'rat' (仅 PG)

      // 在 Postgres 中, Op.like/Op.iLike/Op.notLike 可以结合 Op.any 使用:
      [Op.like]: { [Op.any]: ['cat', 'hat'] }  // LIKE ANY (ARRAY['cat', 'hat'])

      // 还有更多的仅限 postgres 的范围运算符,请参见下文
    }
  }
});
```

## 逻辑组合

```ts
const { Op } = require("sequelize");

Foo.findAll({
  where: {
    rank: {
      [Op.or]: {
        [Op.lt]: 1000,
        [Op.eq]: null
      }
    },
    // rank < 1000 OR rank IS NULL

    {
      createdAt: {
        [Op.lt]: new Date(),
        [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
      }
    },
    // createdAt < [timestamp] AND createdAt > [timestamp]

    {
      [Op.or]: [
        {
          title: {
            [Op.like]: 'Boat%'
          }
        },
        {
          description: {
            [Op.like]: '%boat%'
          }
        }
      ]
    }
    // title LIKE 'Boat%' OR description LIKE '%boat%'
  }
});
```

> not

```ts
// SELECT *
// FROM `Projects`
// WHERE (
//   `Projects`.`name` = 'Some Project'
//   AND NOT (
//     `Projects`.`id` IN (1,2,3)
//     AND
//     `Projects`.`description` LIKE 'Hello%'
//   )
// )
Project.findAll({
  where: {
    name: 'Some Project',
    [Op.not]: [
      { id: [1,2,3] },
      {
        description: {
          [Op.like]: 'Hello%'
        }
      }
    ]
  }
});

```
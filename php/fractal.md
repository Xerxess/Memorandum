# fractal

Fractal为复杂数据输出（如在RESTful API中找到）提供了表示和转换层，并且与JSON配合得很好。可以将其视为JSON / YAML / etc的视图层。

构建API时，人们通常只是从数据库中获取内容并将其传递给json_encode()。这对于“琐碎”的API可能是可以通过的，但是如果它们被公众使用或被移动应用程序使用，那么这将很快导致输出不一致。

## 目标

* 在源数据和输出之间创建“屏障”，因此架构更改不会影响用户
* 系统化的数据类型转换，避免foreach()遍历(bool)所有内容
* 包含（也称为嵌入，嵌套或侧向加载）关系以用于复杂的数据结构
* 使用HAL和JSON-API等标准，但也允许自定义序列化
* 支持数据结果的分页，无论大小数据集都一样
* 通常可以轻松地在非平凡的API中输出数据的细微复杂性

## 一般概念(关键词)

> Cursor (游标)

游标是一种非智能的分页形式，它不需要计算数据库中的数据总量。这使得不可能知道“下一个”页面是否存在，这意味着API客户端将需要不断地进行HTTP请求，直到无法找到数据（404）。

> Include (嵌入或嵌套)

数据通常与其他数据有关系。用户有帖子，帖子有评论，评论属于帖子，等等。当用restfulapi表示时，这些数据通常被“包含”（即嵌入或嵌套）到资源中。转换器将包含includePosts（）方法，该方法将期望返回资源，因此可以将其放置在父资源中。

> Manager

Fractal有一个名为Manager的类，负责维护所请求的嵌入式数据的记录，并递归地将嵌套数据转换为数组、JSON、YAML等。

> Pagination

分页是将内容分为页面的过程，相对于Fractal而言，分页是通过两种替代方式完成的：Cursors 和Paginators。

> Paginator (分页器)

分页器是一种智能的分页形式，它需要对数据库中有多少数据进行总计数。这将向响应元数据添加一个“paginator”项，该项将在适用时包含下一个/上一个链接。

> Resource (资源)

* 自己的数据  
资源是充当泛型数据包装器的对象。资源将附加一个转换器，因为当它最终转换为准备序列化和输出时。

> Serializer (序列化程序)

序列化程序以某种方式构造转换后的数据。API有许多输出结构，其中两种流行的结构是HAL和JSON-API。Twitter和Facebook输出数据的方式各不相同，而Google也有不同。序列化程序允许您在各种输出格式之间切换，对转换器的影响最小。

> Transformer (转换器)

转换器是类或匿名函数，负责获取资源数据的一个实例并将其转换为基本数组。这个过程是为了模糊你的数据存储，避免对象关系阻抗不匹配，甚至允许你把不同数据存储中的不同元素粘合在一起。数据是从这些复杂的数据存储中获取的，并被制成一种更易于管理和准备序列化的格式。


## Resource (资源) 

表示数据的对象，并且具有“ Transformer”

* League\Fractal\Resource\Item  单个资源，可能是数据存储中的一个条目
* League\Fractal\Resource\Collection 资源的集合

在Item和Collection构造将作为第一个参数的数据，然后将“Transformer””为第二个参数。

```php
use Acme\Model\Book;
use League\Fractal;

$book = Book::find($id);

$resource = new Fractal\Resource\Item($book, function(Book $book) {
    return [
        'id'      => (int) $book->id,
        'title'   => $book->title,
        'year'    => (int) $book->yr,
        'links'   => [
        'self' => '/books/'.$book->id,
        ]
    ];
});
```

```php
use Acme\Model\Book;
use League\Fractal;

$books = Book::all();

$resource = new Fractal\Resource\Collection($books, function(Book $book) {
    return [
        'id'    => (int) $book->id,
        'title' => $book->title,
        'year'  => (int) $book->yr,
        'links' => [
        'self' => '/books/'.$book->id,
        ]
    ];
});

```

## Serializer (序列化程序)

https://fractal.thephpleague.com/serializers/

可以在各种输出格式之间切换，而对Transformers的影响最小。

* $manager->setSerializer(new DataArraySerializer()); 是Fractal中默认序列化器
* $manager->setSerializer(new ArraySerializer());
* $manager->setSerializer(new JsonApiSerializer()); 这是JSON-API标准（v1.0）


```php
use Acme\Model\Book;
use Acme\Transformer\BookTransformer;
use League\Fractal\Manager;
use League\Fractal\Resource\Item;
use League\Fractal\Serializer\DataArraySerializer;

$manager = new Manager();
$manager->setSerializer(new DataArraySerializer()); // 设置序列化器 

// Some sort of ORM call
$book = Book::find(1);

// Make a resource out of the data and
$resource = new Item($book, new BookTransformer(), 'book');

// Run all transformers
$manager->createData($resource)->toArray();

// Outputs:
// [
//     'data' => [
//         'id' => 'Foo',
//         'title' => 'Foo',
//         'year' => 1991,
//     ],
// ];
```

## Transformers （转换器）

* 转换器回调，回调的用途有限
* Classes for Transformers  (推荐) 可以定义，实例化和传递类来代替回调。

Classes for Transformers 必须扩展League\Fractal\TransformerAbstract并至少包含一个名称为的方法transform()。

```php
<?php
namespace Acme\Transformer;

use Acme\Model\Book;
use League\Fractal;

class BookTransformer extends Fractal\TransformerAbstract
{
	public function transform(Book $book)
	{
	    return [
	        'id'      => (int) $book->id,
	        'title'   => $book->title,
	        'year'    => (int) $book->yr,
            'links'   => [
                [
                    'rel' => 'self',
                    'uri' => '/books/'.$book->id,
                ]
            ],
	    ];
	}
}
```

```php
<?php
use Acme\Transformer\BookTransformer;
use League\Fractal;

$resource = new Fractal\Resource\Item($book, new BookTransformer);
$resource = new Fractal\Resource\Collection($books, new BookTransformer);
```

* Including Data (可选包含数据) 只是为您提供一种方法，以处理从数据源（或模型返回的任何数据）到简单数组的数组转换。

简单理解为可以通过指定某个字段是否转换出来。

Manager::parseIncludes()

* 默认包括 像可选包含一样，默认包含在转换器

* 不包括

Manager::parseExcludes()

* 包含参数

## 分页

### 分页器

分页器对象已创建，并且必须实现League\Fractal\Pagination\PaginatorInterface 及其指定的方法。然后必须将实例化的对象传递给League\Fractal\Resource\Collection::setPaginator()方法。
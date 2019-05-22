# JSON:API v1.1 

https://jsonapi.org/format/#status

客户端必须使用标头发送请求文档中的所有JSON：

```js
Content-Type: application/vnd.api+json
```

## JSON对象 顶层

* data：文档的“主要数据”
* errors：一组错误对象
* meta：包含非标准元信息的元对象。

-- data和errors 不得同时存在

## 可以包含以下任何顶级成员

* jsonapi：描述服务器实现的对象
* links：与主数据相关的链接对象。
* included：与主数据和/或彼此相关的资源对象数组（“包含的资源”）。

-- included 依赖 data 不能独立存在  

## 顶级链接对象 可以包含以下成员：

```js
link{
    self:'',//生成当前响应文档的链接
    related:'',//主数据表示资源关系时的相关资源链接
    pagination:{}//主要数据的链接
}
```

## 资源对象

```json
// ...
{
  "type": "articles",
  "id": "1",
  "attributes": {//表示某些资源数据的属性对象
    "title": "Rails is Omakase"
  },
  "relationships": {//描述资源与其他JSON：API资源之间关系的关系对象。
    "author": {
      "links": {
        "self": "/articles/1/relationships/author",
        "related": "/articles/1/author"
      },
      "data": { "type": "people", "id": "9" }
    }
  }
}
// ...
```

## JSON：API对象 jsonapi

```json
{
  "jsonapi": {
    "version": "1.0"
  }
}
```

## meta 元数据 包括非标准元信息

```json
{
  "meta": {
    "copyright": "Copyright 2015 Example Corp.",
    "authors": [
      "Yehuda Katz",
      "Steve Klabnik",
      "Dan Gebhardt",
      "Tyler Kellen"
    ]
  },
  "data": {
    // ...
  }
}
```

## Pagination 分页

```json
{
    "links":{
        "self":"http://example.com",
        "first":"http://example.com",
        "last":"http://example.com",
        "prev":"http://example.com",
        "next":"http://example.com"
    }
}
```

## Error 错误

```json
{
  "errors": [
    {
      "id":"",//此特定问题发生的唯一标识符
      "links":{
          "about":""//一个链接，可以获得有关此特定问题的详细信息
      },
      "status": "422",//适用于此问题的HTTP状态代码，表示为字符串值。
      "source": { //包含对错误源的引用的对象
          "pointer": "/data/attributes/firstName" ,
          "parameter": ""//一个字符串，指示哪个URI查询参数导致错误
          },
      "title":  "Invalid Attribute",//问题摘要。
      "detail": "First name must contain at least three characters."//特定于此问题发生的人类可读解释。
      "meta":{...meta}//元信息
    }
  ]
}
```

## GET 

```json
//有数据列表

HTTP/1.1 200 OK
Content-Type: application/vnd.api+json

{
  "links": {
    "self": "http://example.com/articles"
  },
  "data": [{
    "type": "articles",
    "id": "1",
    "attributes": {
      "title": "JSON:API paints my bikeshed!"
    }
  }, {
    "type": "articles",
    "id": "2",
    "attributes": {
      "title": "Rails is Omakase"
    }
  }]
}

//表示空集合的类似响应将是：

HTTP/1.1 200 OK
Content-Type: application/vnd.api+json

{
  "links": {
    "self": "http://example.com/articles"
  },
  "data": []
}
```

```json
//GET对单个文章

HTTP/1.1 200 OK
Content-Type: application/vnd.api+json

{
  "links": {
    "self": "http://example.com/articles/1"
  },
  "data": {
    "type": "articles",
    "id": "1",
    "attributes": {
      "title": "JSON:API paints my bikeshed!"
    },
    "relationships": {
      "author": {
        "links": {
          "related": "http://example.com/articles/1/author"
        }
      }
    }
  }
}

//无数据


HTTP/1.1 200 OK
Content-Type: application/vnd.api+json

{
  "links": {
    "self": "http://example.com/articles/1/author"
  },
  "data": null
}
```

## POST

```json
//请求必须包含单个资源对象 作为主数据。的资源对象 必须含有至少一个type构件。 

POST /photos HTTP/1.1
Content-Type: application/vnd.api+json
Accept: application/vnd.api+json

{
  "data": {
    "type": "photos",
    "attributes": {
      "title": "Ember Hamster",
      "src": "http://example.com/images/productivity.png"
    },
    "relationships": {
      "photographer": {
        "data": { "type": "people", "id": "9" }
      }
    }
  }
}
```
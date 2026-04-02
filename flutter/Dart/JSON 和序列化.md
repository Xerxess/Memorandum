<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [JSON 和序列化](#json-和序列化)
  - [手动序列化](#手动序列化)
  - [使用代码生成器进行自动序列化](#使用代码生成器进行自动序列化)
  - [在模型类中序列化 JSON](#在模型类中序列化-json)

<!-- /code_chunk_output -->

# JSON 和序列化

<https://docs.flutter.dev/data-and-backend/serialization/json#manual-encoding>

## 手动序列化

- 使用内置的 JSON 解码器 dart:convert

```dart
import 'dart:convert';

String jsonString = '''
{
  "name": "John Smith",
  "email": "john@example.com"
}
''';

final user = jsonDecode(jsonString) as Map<String, dynamic>;

void pr() {
  print('Howdy, ${user['name']}!');
  print('We sent the verification link to ${user['email']}.');
}
```

## 使用代码生成器进行自动序列化

- json_annotation

```dart
flutter pub add json_annotation dev:build_runner dev:json_serializable
```

```dart
import 'package:json_annotation/json_annotation.dart';

part 'user.g.dart';

@JsonSerializable()
class User {
  User(this.name, this.email, this.avatar);

  String name;
  String email;
  Avatar avatar;

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  Map<String, dynamic> toJson() => _$UserToJson(this);
}

@JsonSerializable()
class Avatar {
  Avatar(this.url);

  String url;

  factory Avatar.fromJson(Map<String, dynamic> json) => _$AvatarFromJson(json);
  Map<String, dynamic> toJson() => _$AvatarToJson(this);
}
```

```cmd
# 一次性代码生成
dart run build_runner build --delete-conflicting-outputs

# 持续生成代码
dart run build_runner watch --delete-conflicting-outputs
```

```dart
var userString = json.encode(user.toJson());
print(userString);
var newUser = User.fromJson(jsonDecode(userString));
print(newUser.name);
```

## 在模型类中序列化 JSON

```dart
class User {
  final String name;
  final String email;
  int age;
  final int sex;

  User({
    required this.name,
    required this.email,
    required this.age,
    required this.sex,
  });
  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      name: json['name'] as String,
      email: json['email'] as String,
      age: json['age'] as int,
      sex: json['sex'] as int,
    );
  }

  Map<String, dynamic> toJson() => {
    'name': name,
    'email': email,
    'age': age,
    'sex': sex,
  };
}



  String jsonString = '''
{
  "name": "John Smith",
  "email": "john@example.com",
  "age": 18,
  "sex": 0
}
''';
  var user = User.fromJson(jsonDecode(jsonString));
  print(user.name);
```

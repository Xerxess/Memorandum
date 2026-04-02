
# Using packages

```cmd
# 使用 flutter pub add 向应用添加包依赖项
flutter pub add css_colors

# 向应用程序添加包依赖项
# pubspec.yaml 文件，并在 dependencies 下添加 css_colors: ^1.0.0 。
flutter pub get

# 使用 flutter pub remove 从应用中移除包依赖项
flutter pub remove css_colors

# 更新软件包依赖项
flutter pub upgrade

# 对未发布软件包的依赖关系
dependencies:
  packageA:
    path: ../packageA/
```
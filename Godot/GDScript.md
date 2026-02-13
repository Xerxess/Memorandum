
# GDScript

https://docs.godotengine.org/zh-cn/4.4/tutorials/scripting/gdscript/index.html

GDScript 是一门面向对象的指令式编程语言，专为 Godot 构建，是游戏开发者为游戏开发所制作的，目的是节省编写游戏代码的时间。

GDScript 用缩进来做代码块结构，看上去像 Python，然而实际上这两者的原理截然不同。GDScript 的设计灵感是从 Squirrel、Lua、Python 等诸多语言中得到的。

## 特性

- 简洁的语法，让文件更轻量。
- 极快的编译与加载速度。
- 与编辑器紧密集成，包括节点、信号以及脚本所挂载场景的更多信息等元素的代码补全。
- 内置向量与变换类型，让海量线性代数计算更高效，游戏必备。
- 支持多线程，与静态类型语言的一样高效。
- 没有垃圾回收，因为垃圾回收最终会影响游戏的开发。引擎会默认进行引用计数，在大多数情况下为你管理内存，但你也可以在需要时自行控制内存。
- 渐进类型。变量默认是动态类型，但你也可以使用类型提示来做强类型检查。

## GDScript 编写风格指南

- 使用换行符（LF）换行，而非 CRLF 或 CR。（编辑器默认）
- 在每个文件的末尾使用一个换行符。（编辑器默认）
- 使用不带字节顺序标记的 UTF-8 编码。（编辑器默认）
- 使用制表符代替空格进行缩进。（编辑器默认）

## 命名规定

文件名
snake_case
yaml_parser.gd

类名
PascalCase
class_name YAMLParser

节点名称
PascalCase
Camera3D、Player

函数
snake_case
func load_level():

变量
snake_case
var particle_effect

信号
snake_case
signal door_opened

常量
CONSTANT_CASE
const MAX_SPEED = 200

枚举名称
PascalCase
enum Element

枚举成员
CONSTANT_CASE
{EARTH, WATER, AIR, FIRE}
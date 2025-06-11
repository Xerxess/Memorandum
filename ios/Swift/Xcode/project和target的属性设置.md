<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Project 和 Target 的属性设置](#project-和-target-的属性设置)
  - [Project 属性设置](#project-属性设置)
    - [Info](#info)
  - [Target 属性设置](#target-属性设置)
    - [General](#general)
    - [Signing & Capabilities](#signing--capabilities)
    - [Resource Tags](#resource-tags)
    - [Info](#info-1)
    - [Build Settings](#build-settings)
    - [Build Phases](#build-phases)
    - [Build Rules](#build-rules)

<!-- /code_chunk_output -->

# Project 和 Target 的属性设置

- Project 的比较简单，只有Info 、 Build Setting 、 Package Dependencies，对项目资源进行简单的设置
  - Info
  - Build Setting
  - Package Dependencies
- Target 的设置则比较复杂，有General 、Signing & Capabilities 、Resource Tags 、Info 、Build Settings 、Build Phases 、Build Rules七项，因为target的每一项设置都直接决定了我们最终App的显示效果。
  - General
  - Signing & Capabilities
  - Resource Tags
  - Info
  - Build Settings
  - Build Phases
  - Build Rules

## Project 属性设置

### Info

- Configurations 用来配置iOS项目的xcconfig文件，主要用于在几套不同的开发环境编译。xcconfig文件其实就是xcode里的config文件，本质是一个用来保存Build Settings键值对的纯文本文件。这些键值对覆盖Build Settings中的值，所以当在xcconfig文件中配置了的选项,在Build Settings中设置将失效。
- Localizations 本地化，这里的功能主要是添加我们的App所支持的语言，通过上图最下面的红色圈内的【+】【-】按钮可以添加或删除不同的语种，并可以选择根据手机的设置进行不同语种的自适应。关于最下面的选择是否开启国际化，默认是开启的

## Target 属性设置

### General

- Supported Destinations 支持的设备
- Minimum Deployments 最小部署要求
- Identity 标识符）栏主要定义了一些和应用发布有关的标识属性
  - App Category 应用类型
  - Display Name（App应用显示名）：安装到iOS手机或iPad上App的名称。
  - Bundle Identifier（包标识符）是该应用的唯一ID，用来让操作系统和AppStore识别。在创建项目或者对象过程中Xcode就自行创建了包标识符，一般情况下不要修改它。
  - Version（外部版本号）使用户能够看到的版本号。
  - Build（内部版本号）开发者自己看到的版本号，以区分内部测试版本。
- Deployment Info 部署信息
  - iPhone Orientation 设备方向
  - Status Bar Style 状态栏样式
- App Icons and Launch Screen 应用程序图标和启动屏幕
  - App Icon
  - App Icons Source
  - Launch Screen File
- Frameworks, Libraries, and Embedded Content 框架、库和嵌入式内容 选择要链接的框架和库，既可以是SDK自带的框架，也可以是第三方框架，在Build Phases中也有类似的功能选项。
- Development Assets 资产
- Supported Intents 支持

### Signing & Capabilities

主要是一些性能设置开关选择，例如推送通知、云存储、游戏中心、后台模式等，我们选择需要的开关进行打开或者关闭，这些相应的状态都会在info.plist中进行修改。

- App Groups 允许访问在多个相关应用程序之间共享的组容器，并允许应用程序之间进行某些额外的进程间通信。
- Background Modes 后台模式指定应用程序提供特定的后台服务，并且必须允许在后台继续运行。这些密钥应少用，并且只能由提供指定服务的应用程序使用。如果存在在后台运行的替代方案，则应使用这些替代方案。
- App Transport Security Exception  设置应用程序传输安全例外，以允许您的应用程序与指定域建立不安全的连接。
- AutoFill Credential Provider AutoFill 凭据提供商允许应用在用户许可的情况下，在 Safari 浏览器和其他应用中为自动填充提供用户名和密码。
- Data Protection 数据保护允许处理敏感用户数据的应用程序利用某些设备上可用的内置加密。当您的应用程序指定特定文件为受保护时，系统将该文件以加密格式存储在磁盘上。
- Game Center 游戏中心允许玩家连接到游戏中心服务，使他们能够与朋友互动，查看排行榜，或在游戏中进行正面交锋。
- Game Controllers 为您的应用程序添加对游戏控制器的支持。
- HealthKit 允许应用读取和写入“健康”应用中显示的健康和活动用户数据。
- HomeKit HomeKit允许用户使用应用程序管理家中连接的配件。
- Increased Memory Limit 使应用程序能够超过受支持设备上的默认应用程序内存限制。
- Inter-App Audio Inter-App Audio允许应用程序向其他支持Inter-App Audio的应用程序发送音频并接收音频。
- Keychain Sharing 允许此应用程序与您的团队制作的其他应用程序共享其钥匙串中的密码。
- Maps 使用MapKit，您可以创建用户可以从地图访问的路由应用程序。您的应用程序可以提供地图应用程序支持的特定方向，包括地铁路线、远足径或自行车道。
- Wireless Accessory Configuration 无线配件配置功能允许应用程序配置MFi Wi-Fi配件。

-

### Resource Tags

主要是为项目中的资源进行添加tag分类，方便我们对齐加载顺序和加载时机进行选择和设置，即实现按需加载，在需要的时候才加载资源，属性设置界面如下图所示

### Info

在 Target 的 Info 选项卡中的五项信息与项目资源目录下的info.plist文件中的内容是一致，并且修改其中一个另一个会自动修改

- Custom iOS Target Properties 自定义iOS目标属性（最重要）与项目资源目录下的info.plist文件中的内容是一致
- Document Types 文档类型：定义了应用程序所能识别的文档类型，并且还可以定义在系统中显示的该类型文档的自定义图标。
- Exported Type Identifiers 导出的UTI：UTI Uniform Type Identifiers同一类型标识符。
- Imported Type Identifters 导入的UTI：
- URL Types URL类型：用来定义URL以便让应用程序理解应用间交换的数据结构。可用于：IOS唤醒其他程序，程序间相互调用。

### Build Settings

https://developer.apple.com/documentation/xcode/configuring-the-build-settings-of-a-target
https://developer.apple.com/documentation/xcode/build-settings-reference

最主要的一部分编译选项设置

- 每一项的配置都有四列: 优先级顺序：带Target图标列 >> 带Project图标列 >> iOS Default列。
  - Resolved列：最终确定的编译方式，无法自己设定，其结果是根据其右边三栏的选择结果以及优先级顺序来确定最后编译时采用的编译方式。在图的第二行选项卡中选择combined选项，可以直接地看到只有该栏的最后结果。
  - 带Target图标列：target的build setting配置的编译选项，可自定义。其优先级最高，一旦进行设置，则最后的编译方式以该栏的结果为准。
  - 带Project图标列：project的build setting配置的编译选项，可自定义，这一栏的结果与project中build setting选项卡中的结果是一致的，修改其中一个地方，另一处也会自动修改。其优先级介于target和default之间，当target没有设置编译选项，而该栏进行了设置时，则最后的编译方式以该栏为准。
  - iOS Default列：在创建项目时系统自带的默认编译选项，无法修改。优先级最低，只有当其他两栏都没有设置选项时，最后的编译方式才会以该栏为准。
- Architectures 应用支持哪些处理器架构（CPU 架构），即编译器会为哪些设备生成可执行代码。
- Assets
- Build Locations 编译相关
- Build Options 编译相关
- Deployment 部署相关
- Headers 头文件
- Info.plist Values
- Kernel Module
- Linking - General
- Linking - Mergeable Libraries
- Linking - Warnings
- Localization
- Packaging
- Search Paths
- Signing
- Siri
- Testing
- Text-Based API
- Versioning
- Apple Clang - Address Sanitizer
- Apple Clang - Code Generation
- Apple Clang - Custom Compiler Flags
- Apple Clang - Language
- Apple Clang - Language - C++
- Apple Clang - Language - Modules
- Apple Clang - Language - Objective-C
- Apple Clang - Preprocessing
- Apple Clang - Undefined Behavior Sanitizer
- Apple Clang - Warning Policies
- Apple Clang - Warnings - All languages
- Apple Clang - Warnings - C++
- Apple Clang - Warnings - Objective-C
- Apple Clang - Warnings - Objective-C and ARC
- Apple Clang Module Verifier - Options
- Asset Catalog Compiler - Options
- Designed for iPhone & iPad - Deployment
- Documentation Compiler - Options
- Interface Builder Storyboard Compiler - Options
- Mac Catalyst - Deployment
- OSACompile - Build Options
- Static Analysis - Analysis Policy
- Static Analysis - Generic Issues
- Static Analysis - Issues - Apple APIs
- Static Analysis - Issues - C++
- Static Analysis - Issues - Objective-C
- Static Analysis - Issues - Security
- Static Analysis - Issues - Unused Code
- Swift Compiler - Code Generation
- Swift Compiler - Custom Flags
- Swift Compiler - General
- Swift Compiler - Language
- Swift Compiler - Search Paths
- Swift Compiler - Upcoming Features
- Swift Compiler - Warnings Policies
- User-Defined 用户自定义设置

### Build Phases

主要功能是配置编译器在不同编译阶段的参数，包括编译所需的资源文件（包括代码、配置以及各种资源文件）

- Target Dependencies 对象依赖阶段 某些Target可能依赖某个Target输出的值,这里设置依赖
- Run Build Tool Plug-ins 运行构建工具插件
- Compile Sources 源文件编译阶段 指将有哪些源代码被编译，可以通过红框中的【+】【-】按钮进行添加或删除资源来控制编译的代码文件。并且可以通过修改改阶段的Compiler Flags（编译器标识）来为每个单独文件设置其编译器编织，比如优化设置等等
- Link Binary With Libraries 链接二进制库阶段 指编译过程中会引用哪些库文件
- Copy Bundle Resources 复制资源文件阶段 生成的product的.app内将包含哪些资源文件，同样可以通过红框中的【+】【-】按钮进行添加或删除资源来控制编译的资源文件。该阶段定义了对象中的资源文件，包括应用程序、图标、界面构造器、视频、模板等等。这些资源都会被复制到安装包的Contents／Resources文件夹下。

### Build Rules

<!-- TOC -->

- [bpmn-js](#bpmn-js)
- [bpmn-js 结构](#bpmn-js-结构)
    - [diagram-js/lib/core/*](#diagram-jslibcore)
    - [bpmn-js 国际化](#bpmn-js-国际化)
    - [node_modules/bpmn-js/lib/BaseViewer.js](#node_modulesbpmn-jslibbaseviewerjs)
    - [bpmn-moddle](#bpmn-moddle)
    - [辅助服务](#辅助服务)
- [使用](#使用)

<!-- /TOC -->

# bpmn-js

https://bpmn.io/

# bpmn-js 结构

* bpmn-js
    * diagram-js 绘制形状和连接、元素交互、事件、插件
    * bpmn-moddle解析BPMN 2.0架构兼容的XML文档



## diagram-js/lib/core/*

* Canvas- 提供用于添加和删除图形元素的API；处理元素的生命周期，并提供用于缩放和滚动的API。
* EventBus- 订阅各种事件，并在事件发生后立即采取行动。
* ElementFactory - 用于根据diagram-js的内部数据模型创建形状和连接的工厂。
* ElementRegistry- 知道添加到图中的所有元素，并提供API来通过id检索元素及其图形表示。
* GraphicsFactory- 负责创建形状和连接的图形表示

## bpmn-js 国际化

Modeler.Viewer._modules.TranslateModule

## node_modules/bpmn-js/lib/BaseViewer.js

* 继承 diagram-js
    * Canvas.prototype.scroll 画布滚动
    * Canvas.prototype.zoom 缩放
    * Canvas.prototype.getSize 获取size
* Modeler.prototype.createDiagram
* BaseViewer.prototype.importXML
* BaseViewer.prototype.importDefinitions
* BaseViewer.prototype.open
* BaseViewer.prototype.saveXML
* BaseViewer.prototype.saveSVG
* BaseViewer.prototype.getModules
* BaseViewer.prototype.clear
* BaseViewer.prototype.destroy 
* BaseViewer.prototype.on
* BaseViewer.prototype.off
* BaseViewer.prototype.attachTo
* BaseViewer.prototype.getDefinitions
* BaseViewer.prototype.detach

## bpmn-moddle

fromXML - create a BPMN tree from a given XML string
toXML - write a BPMN object tree to BPMN 2.0 XML

## 辅助服务

* CommandStack -在建模期间负责重做和撤消。
* ContextPad -提供围绕元素的上下文操作。
* Overlays -提供用于将其他信息附加到图表元素的API。
* Modeling -提供用于更新画布上的元素（移动，删除）的API
* Palette

# 使用


* 预览bpmn

```js
 var bpmnXML;

  // BpmnJS is the BPMN viewer instance
  var viewer = new BpmnJS({ container: '#canvas' });

  // import a BPMN 2.0 diagram
  viewer.importXML(bpmnXML, function(err) {
    if (err) {
      // import failed :-(
    } else {
      // we did well!

      var canvas = viewer.get('canvas');
      canvas.zoom('fit-viewport');
    }
  });
```

* 建模,可进行编辑


```js
import Modeler from 'bpmn-js/lib/Modeler';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
// <link rel="stylesheet" href="bpmn-js/dist/assets/diagram-js.css" />
// <link rel="stylesheet" href="bpmn-js/dist/assets/bpmn-font/css/bpmn.css" />

// create a modeler
var modeler = new Modeler({ container: '#canvas' });

// import diagram
modeler.importXML(bpmnXML, function(err) {
  // ...
});
```

* 事件

```js
// 执行撤消/重做操作
modeler.on('commandStack.changed', function() {
  
});

// 元素更改
modeler.on('element.changed', function(event) {
  var element = event.element;

  // the element was changed by the user
});
```
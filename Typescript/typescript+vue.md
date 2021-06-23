<!-- TOC -->

- [Typescript + Vue](#typescript--vue)
  - [https://www.typescriptlang.org/](#httpswwwtypescriptlangorg)
  - [https://www.tslang.cn/index.html](#httpswwwtslangcnindexhtml)
  - [https://github.com/zhongsp/TypeScript](#httpsgithubcomzhongsptypescript)
  - [https://class-component.vuejs.org/](#httpsclass-componentvuejsorg)
  - [https://github.com/kaorun343/vue-property-decorator](#httpsgithubcomkaorun343vue-property-decorator)
- [一些坑](#一些坑)
  - [vue-property-decorator](#vue-property-decorator)
    - [@Provide](#provide)

<!-- /TOC -->

# Typescript + Vue

## https://www.typescriptlang.org/

- typescript 官网 (必备知识)

## https://www.tslang.cn/index.html

- 中文停止更新

## https://github.com/zhongsp/TypeScript

- 中文翻译 git

## https://class-component.vuejs.org/

vue 官方注解

- @Component (必备)

## https://github.com/kaorun343/vue-property-decorator

vue 常用注解：

- @Prop (必备)
- @PropSync (必备)
- @Model (必备)
- @ModelSync (必备)
- @Watch (必备)
- @Provide (必备)
- @Inject (必备)
- @ProvideReactive (必备)
- @InjectReactive (必备)
- @Emit (必备)
- @Ref (必备)
- @VModel (必备)
- @Component (由 vue-class-component 提供)
- Mixins (vue-class-component 提供的名为 mixins 的辅助函数)

# 一些坑

## vue-property-decorator

### @Provide

```ts
// 如下代码中this.ddd无法添加，原因Object.create() 将@Component({provide:})的对象对为新配置的原型对象，无法for...in
import { Component, Prop, Ref, Vue } from 'vue-property-decorator';
@Component({
  provide() {
    return {
      ddd: 'abc',
    };
  },
})
export default class App extends Vue {
  @Provide() abc = 'abc';
}
```

## .vue 模板文件中类型推断

```ts
// test.vue
const test = <any>window.test; // 报错
const test = window.test as any; // 确定
```

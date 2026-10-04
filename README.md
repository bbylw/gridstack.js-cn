# gridstack.js

[![NPM version](https://img.shields.io/npm/v/gridstack.svg)](https://www.npmjs.com/package/gridstack)
[![Coverage Status](https://coveralls.io/repos/github/gridstack/gridstack.js/badge.svg?branch=master)](https://coveralls.io/github/gridstack/gridstack.js?branch=master)
[![downloads](https://img.shields.io/npm/dm/gridstack.svg)](https://www.npmjs.com/package/gridstack)

移动端友好的现代纯 TypeScript 库（无外部依赖），用于仪表盘布局与创建。制作拖拽式、多列、响应式仪表盘从未如此简单。提供多种绑定，与 [Angular](https://github.com/gridstack/gridstack.js/tree/master/angular/README.md)（已内置）、[React](https://github.com/gridstack/gridstack.js/tree/master/react/README.md)（已内置）、[Vue](https://github.com/gridstack/gridstack.js/tree/master/vue/README.md)（已内置）、[Knockout.js](http://knockoutjs.com)、[Ember](https://www.emberjs.com/) 等配合出色（见 [框架](#specific-frameworks) 小节）。

灵感来自已停止维护的 gridster，倾注热爱打造。

请访问 http://gridstackjs.com 以及 [这些演示](http://gridstackjs.com/demo/)。

如果你觉得这个库有用，请通过 [PayPal](https://www.paypal.me/alaind831)（请使用 **“send to a friend”** 以避免 3% 手续费）或 [Venmo](https://www.venmo.com/adumesny)（adumesny）捐款支持！

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/alaind831)
[![Donate](https://img.shields.io/badge/Donate-Venmo-g.svg)](https://www.venmo.com/adumesny)

加入我们的 Slack：[https://gridstackjs.slack.com](https://join.slack.com/t/gridstackjs/shared_invite/zt-3978nsff6-HDNE_N45DydP36NBSV9JFQ)

<!-- [![Slack Status](https://gridstackjs.com/badge.svg)](https://gridstackjs.slack.com) -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**目录**  *由 [DocToc](http://doctoc.herokuapp.com/) 生成*

- [演示与 API 文档](#demo-and-api-documentation)
- [用法](#usage)
  - [安装](#install)
  - [引入](#include)
  - [基本用法](#basic-usage)
  - [环境要求](#requirements)
  - [特定框架](#specific-frameworks)
  - [扩展库](#extend-library)
  - [扩展引擎](#extend-engine)
  - [修改网格列数](#change-grid-columns)
  - [自定义列 CSS（已废弃，v12+ 不再需要）](#custom-columns-css-old-not-needed-with-v12)
  - [覆盖 resizable/draggable 选项](#override-resizabledraggable-options)
  - [触摸设备支持](#touch-devices-support)
  - [打印支持](#printing-support)
- [迁移指南](#migrating)
  - [迁移到 v0.6](#migrating-to-v06)
  - [迁移到 v1](#migrating-to-v1)
  - [迁移到 v2](#migrating-to-v2)
  - [迁移到 v3](#migrating-to-v3)
  - [迁移到 v4](#migrating-to-v4)
  - [迁移到 v5](#migrating-to-v5)
  - [迁移到 v6](#migrating-to-v6)
  - [迁移到 v7](#migrating-to-v7)
  - [迁移到 v8](#migrating-to-v8)
  - [迁移到 v9](#migrating-to-v9)
  - [迁移到 v10](#migrating-to-v10)
  - [迁移到 v11](#migrating-to-v11)
  - [迁移到 v12](#migrating-to-v12)
  - [迁移到 v13](#migrating-to-v13)
  - [迁移到 v14](#migrating-to-v14)
- [jQuery 应用](#jquery-application)
- [更新日志](#changes)
- [使用趋势](#usage-trend)
- [开发团队](#the-team)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


<h1 id="demo-and-api-documentation">演示与 API 文档</h1>

请访问 http://gridstackjs.com 以及 [这些演示](http://gridstackjs.com/demo/)。完整的 API 文档：[最新发布的 HTML 文档](https://gridstackjs.com/doc/html/)，或 [本分支的 markdown 文档](https://github.com/gridstack/gridstack.js/tree/master/doc/API.md)（随代码重新生成，因此也涵盖尚未发布的改动）。

<h1 id="usage">用法</h1>

<h2 id="install">安装</h2>

[![NPM version](https://img.shields.io/npm/v/gridstack.svg)](https://www.npmjs.com/package/gridstack)

```js
yarn add gridstack
// 或
npm install --save gridstack
```

<h2 id="include">引入</h2>

ES6 或 Typescript

```js
import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';
```

或者（单个合并文件，注意 `-all.js`）写在 html 中

```html
<link href="node_modules/gridstack/dist/gridstack.min.css" rel="stylesheet"/>
<script src="node_modules/gridstack/dist/gridstack-all.js"></script>
```

**注意**：IE 支持在 v2 中被移除，但在 v4.4 由一位外部贡献者恢复（我对测试和支持这款过时浏览器没有兴趣，因此未来很可能再次失效），并在 v12 中再次移除（需要 CSS 变量）。
你可以改用 es5 文件与 polyfill（体积更大）来兼容旧浏览器。例如：

```html
<link href="node_modules/gridstack/dist/gridstack.min.css" rel="stylesheet"/>
<script src="node_modules/gridstack/dist/es5/gridstack-poly.js"></script>
<script src="node_modules/gridstack/dist/es5/gridstack-all.js"></script>
```

<h2 id="basic-usage">基本用法</h2>

动态创建条目……

```js
// ...在你的 HTML 中
<div class="grid-stack"></div>

// ...在你的脚本中
var grid = GridStack.init();
grid.addWidget({w: 2, content: 'item 1'});
```

……或从列表创建

```js
// 使用序列化数据，而不是 .addWidget()
const serializedData = [
  {x: 0, y: 0, w: 2, h: 2},
  {x: 2, y: 3, w: 3, content: 'item 2'},
  {x: 1, y: 3}
];

grid.load(serializedData);
```

……或 DOM 创建的条目

```js
// ...在你的 HTML 中
<div class="grid-stack">
  <div class="grid-stack-item">
    <div class="grid-stack-item-content">Item 1</div>
  </div>
  <div class="grid-stack-item" gs-w="2">
    <div class="grid-stack-item-content">Item 2 wider</div>
  </div>
</div>

// ...在你的脚本中
GridStack.init();
```

……或查看所有可用的 [API 与选项](https://github.com/gridstack/gridstack.js/tree/master/doc)。

也可参考 [stackblitz 示例](https://stackblitz.com/edit/gridstack-demo) 作为可运行的例子。

<h2 id="requirements">环境要求</h2>

自 v1 起，GridStack 不再需要外部依赖（lodash 在 v0.5 中被移除，jquery API 在 v1 中被移除）。v3 是一次完整的 HTML5 重写，不再需要 jquery。v6 使用原生的鼠标与触摸事件来支持移动端，且不再提供 jquery-ui 版本。现在你只需要引入 `gridstack-all.js` 和 `gridstack.min.css`（布局使用基于 CSS 列宽的百分比实现）。

<h2 id="specific-frameworks">特定框架</h2>

在 NPM 上搜索 ['gridstack'](https://www.npmjs.com/search?q=gridstack&ranking=popularity) 获取最新列表，更多框架持续加入中……

- **Angular**：我们开箱即用地提供了 Angular 封装——见 <a href="https://github.com/gridstack/gridstack.js/tree/master/angular" target="_blank">Angular 组件</a>。
- **Angular9**：[lb-gridstack](https://github.com/pfms84/lb-gridstack) 注意：这是非常老的 v0.3 gridstack 实例，仅建议在你希望改用指令（directive）而不是组件的**概念验证**场景下使用。代码尚未经过测试，因为我使用的是组件方式。
- **AngularJS**：[gridstack-angular](https://github.com/kdietrich/gridstack-angular)
- **Ember**：[ember-gridstack](https://github.com/yahoo/ember-gridstack)
- **knockout**：见使用组件的 [演示](https://gridstackjs.com/demo/knockout.html)，但也建议查看 [自定义绑定 issue](https://github.com/gridstack/gridstack.js/issues/465)，那可能是更好的做法。
- **Rails**：[gridstack-js-rails](https://github.com/randoum/gridstack-js-rails)
- **React**：我们开箱即用地提供了 React 封装——见 <a href="https://github.com/gridstack/gridstack.js/tree/master/react" target="_blank">React 组件</a>。
- **Vue**：我们开箱即用地提供了 Vue 3 封装——见 <a href="https://github.com/gridstack/gridstack.js/tree/master/vue" target="_blank">Vue 组件</a>。
- **Aurelia**：[aurelia-gridstack](https://github.com/aurelia-ui-toolkits/aurelia-gridstack)，见 [演示](https://aurelia-ui-toolkits.github.io/aurelia-gridstack/)

<h2 id="extend-library">扩展库</h2>

你可以很轻松地用如下代码扩展或修补 gridstack：

```js
// 用我们自己的自定义方法扩展 gridstack
GridStack.prototype.printCount = function() {
  console.log('grid has ' + this.engine.nodes.length + ' items');
};

let grid = GridStack.init();

// 现在可以调用
grid.printCount();
```

<h2 id="extend-engine">扩展引擎</h2>

你现在（5.1+）可以轻松创建自己的布局引擎来进一步定制用法。下面是一个 TypeScript 示例

```ts
import { GridStack, GridStackEngine, GridStackNode, GridStackMoveOpts } from 'gridstack';

class CustomEngine extends GridStackEngine {

  /** 改写此方法，将节点移动到指定的新位置 */
  public override moveNode(node: GridStackNode, o: GridStackMoveOpts): boolean {
    // 保持原始的 X 和 Width 不变，其余交给基类处理……
    o.x = node.x;
    o.w = node.w;
    return super.moveNode(node, o);
  }
}

GridStack.registerEngine(CustomEngine); // 全局设置我们的自定义类
```

<h2 id="change-grid-columns">修改网格列数</h2>

如果需要 [1-12] 列，GridStack 开箱即用（默认为 12），但如果你需要自定义列数，则始终需要 **2 件事**：

1) 在创建网格时将 `column` 网格选项改为你的数字 N
```js
GridStack.init( {column: N} );
```

注意：第 2 步已废弃，v12+ 使用 CSS 变量而非 class，因此不再需要

2) 如果 **N < 12**，还需引入 `gridstack-extra.css`（否则需要自定义 CSS——见下）。缺少这些，内容将无法正确渲染/工作。
```html
<link href="node_modules/gridstack/dist/gridstack.min.css" rel="stylesheet"/>
<link href="node_modules/gridstack/dist/gridstack-extra.min.css" rel="stylesheet"/>

<div class="grid-stack">...</div>
```

注意：class `.grid-stack-N` 会自动添加，我们提供的 `gridstack-extra.min.css` 定义了 [2-11] 列自定义网格的 CSS。如果需要更多列，则需要自己生成 SASS/CSS（见下）。

参见示例：[双网格演示](http://gridstack.github.io/gridstack.js/demo/two.html)（6 列）

<h2 id="custom-columns-css-old-not-needed-with-v12">自定义列 CSS（已废弃，v12+ 不再需要）</h2>

注意：此步骤已废弃，v12+ 使用 CSS 变量而非 class

如果你需要 > 12 列，或希望手动生成 CSS，则需要为 `.grid-stack-item[gs-w="X"]` 和 `.grid-stack-item[gs-x="X"]` 生成 CSS 规则。

例如 4 列网格需要如下 CSS：

```css
.gs-4 > .grid-stack-item[gs-x="1"]  { left: 25% }
.gs-4 > .grid-stack-item[gs-x="2"]  { left: 50% }
.gs-4 > .grid-stack-item[gs-x="3"]  { left: 75% }

.gs-4 > .grid-stack-item { width: 25% }
.gs-4 > .grid-stack-item[gs-w="2"]  { width: 50% }
.gs-4 > .grid-stack-item[gs-w="3"]  { width: 75% }
.gs-4 > .grid-stack-item[gs-w="4"]  { width: 100% }
```

更好的做法是使用如下 SCSS 代码片段，你可以用 [sassmeister.com](https://www.sassmeister.com/) 这类网站帮你生成 CSS：

```scss
$columns: 20;
@function fixed($float) {
  @return round($float * 1000) / 1000; // 合计 2+3 位数字即为 %
}
.gs-#{$columns} > .grid-stack-item {

  width: fixed(100% / $columns);

  @for $i from 1 through $columns - 1 {
    &[gs-x='#{$i}'] { left: fixed((100% / $columns) * $i); }
    &[gs-w='#{$i+1}'] { width: fixed((100% / $columns) * ($i+1)); }
  }
}
```

你也可以使用 NPM 包中自带的 SCSS [src/gridstack-extra.scss](https://github.com/gridstack/gridstack.js/tree/master/src/gridstack-extra.scss) 并修改它来增加更多列。

30 列的 gulp 命令示例：
```js
gulp.src('node_modules/gridstack/dist/src/gridstack-extra.scss')
        .pipe(replace('$start: 2 !default;','$start: 30;'))
        .pipe(replace('$end: 11 !default;','$end: 30;'))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('dist/css'))
```

<h2 id="override-resizabledraggable-options">覆盖 resizable/draggable 选项</h2>

你可以覆盖默认的 `resizable`/`draggable` 选项。例如要启用除右下角以外的缩放手柄，可以这样初始化 gridstack：

```js
GridStack.init({
  resizable: {
    handles: 'e,se,s,sw,w'
  }
});
```

<h2 id="touch-devices-support">触摸设备支持</h2>

gridstack v6+ 现已开箱即用地支持移动端，通过新增的原生触摸事件（连同鼠标事件）来实现拖拽与缩放。
旧版本（3.2+）需要带 touch punch 的 jq 版本，但在嵌套网格上表现不佳。

现在该选项为默认：

```js
let options = {
  alwaysShowResizeHandle: 'mobile' // 在移动设备上为 true
};
GridStack.init(options);
```

参见 [示例](http://gridstack.github.io/gridstack.js/demo/mobile.html)。

<h2 id="printing-support">打印支持</h2>

GridStack v13.1+ 引入了原生打印支持。部件（widget）会按内容自动调整尺寸，并自然地跨页流动，而不会被从中间截断；隐藏的部件（`print.hide`）也不会留下空隙。每个部件的 `PrintOptions` 允许你强制分页、将部件所在页切换为横向/纵向，或让高于一页的部件（如长表格）跨页拆分，而不是留下空白空隙。

参见 [print_README.md](https://github.com/gridstack/gridstack.js/tree/master/print_README.md) 获取完整细节、示例，以及如何为部件使用 `PrintOptions`（如 `pageBreak`、`orientation`、`breakInside`）。

<h1 id="migrating">迁移指南</h1>

<h2 id="migrating-to-v06">迁移到 v0.6</h2>

从 0.6.x 开始，当一个条目仅被添加/删除、且没有改变其他节点时，不再发送 `change` 事件（之前对绝大多数节点都发送，这是不正确的且造成低效）。如果你之前依赖这种旧的错误行为，可能需要改为监听 `added|removed` [事件](https://github.com/gridstack/gridstack.js/tree/master/doc#events)。

<h2 id="migrating-to-v1">迁移到 v1</h2>

v1.0.0 从 API 和外部依赖中移除了 Jquery，这需要进行一些代码改动。以下是改动列表：

0. 如果尚未在 v0.6，请先参见上一步

1. 你的代码只需 `import GridStack from 'gridstack'`，或引入 `gridstack.all.js` 和 `gristack.css`（不要引入其他 JS），建议这样做，因为内部依赖会随时间改变。如果你基于 jquery，请参见 [jquery 应用](#jquery-application) 小节。

2. 代码改动：

**旧** 初始化代码 + 添加部件 + 添加事件：
```js
// 初始化返回 Jquery 元素，需要第二次调用才能拿到 GridStack 变量
var grid = $('.grid-stack').gridstack(opts?).data('gridstack');

// 返回 Jquery 元素
grid.addWidget($('<div><div class="grid-stack-item-content"> test </div></div>'), undefined, undefined, 2, undefined, true);

// jquery 事件处理器
$('.grid-stack').on('added', function(e, items) {/* items 包含信息 */});

// 初始化后获取 grid
var grid = $('.grid-stack').data('gridstack');
```
**新**
```js
// 元素标识默认为 '.grid-stack'，返回 grid
// 注意：在 Typescript 中请使用 window.GridStack.init()，直到下一个原生的 2.x TS 版本
var grid = GridStack.init(opts?, element?);

// 返回 DOM 元素
grid.addWidget('<div><div class="grid-stack-item-content"> test </div></div>', {width: 2});
// 注意：在 3.x 中更简单
// grid.addWidget({w:2, content: 'test'})

// 事件处理器
grid.on('added', function(e, items) {/* items 包含信息 */});

// 初始化后获取 grid
var grid = el.gridstack; // 其中 el = document.querySelector('.grid-stack') 或其他方式……
```
其他重命名改动

```js
`GridStackUI` --> `GridStack`
`GridStackUI.GridStackEngine` --> `GridStack.Engine`
`grid.container`（jquery 网格包装） --> `grid.el` // （网格 DOM 元素）
`grid.grid`（GridStackEngine） --> `grid.engine`
`grid.setColumn(N)` --> `grid.column(N)` 和 `grid.column()` // 获取值，旧 API 仍受支持
```

建议查看 [大量示例](https://github.com/gridstack/gridstack.js/tree/master/demo) 获取更多代码范例。

<h2 id="migrating-to-v2">迁移到 v2</h2>

请务必先阅读 v1 的迁移说明！

v2 是 1.x 的 Typescript 重写，移除了所有 jquery 事件，使用类并对整体代码做了清理以支持 ES6 模块。你的代码可能需要从 1.x 做改动

1. 一般而言，当参数不同时，TS 中无法同时使用无参（getter）与有参（setter）的方法（set/get 也不是函数调用，因此 API 会改变）。因此我们选择让 <b>所有 set 方法都返回</b> `GridStack`，以便链式调用（例如：`grid.float(true).cellHeight(10).column(6)`）。此外，原先接收多个参数的旧方法现在改为接收单个对象（通常是 `GridStackOptions` 或 `GridStackWidget`）。

```js
`addWidget(el, x, y, width, height)` --> `addWidget(el, {with: 2})`
// 注意：在 2.1.x 中你现在只需 addWidget({with: 2, content: "text"})
`float()` --> `getFloat()` // 获取值
`cellHeight()` --> `getCellHeight()` // 获取值
`verticalMargin` --> `margin` // 应用于全部 4 边的网格选项与 API
`verticalMargin()` --> `getMargin()` // 获取值
```

2. 事件签名现在是通用的，不再依赖 jquery-ui。`gsresizestop` 已被移除，因为 `resizestop|dragstop` 现在在 DOM 属性更新**之后**才被调用。

3. `oneColumnMode` 默认在 `window.width` < 768px 时触发。现在我们改为检查网格宽度（更准确且支持嵌套）。你可能需要调整网格的 `oneColumnSize` 或 `disableOneColumnMode`。

**注意：** 由于采用了更紧凑的 ES6 输出与原生 typescript 代码，2.x 不再支持旧的 IE11 及更早版本。你需要停留在 1.x。

<h2 id="migrating-to-v3">迁移到 v3</h2>

请务必先阅读 v2 的迁移说明！

v3 新增了 HTML5 拖拽插件（共 63k，全为原生代码），同时仍允许你改用旧的 jquery-ui 版本（188k），或新的静态网格版本（34k，无用户拖拽但提供完整 API 支持）。由于 `gridstack.all.js` 不再存在（现在对应的是 `gridstack-jq.js`），你需要决定使用哪个版本——见 [引入说明](#include)。

**注意**：HTML5 版本几乎与旧的 jquery-ui 拖拽持平。`containment`（防止子元素被拖出父元素）和 `revert`（尚不清楚用途）在 v3.0.0 的初始发布中尚未实现。<br>
此外，移动设备不支持 h5 的 `drag` 事件（需要处理 `touch`），而 v3.2 的 jq 版本现已开箱即用地支持（见 [v3.2 发布](https://github.com/gridstack/gridstack.js/releases/tag/v3.2.0)）

破坏性改动：

1. 引入（如前所述）需要改动

2. `GridStack.update(el, opt)` 现在接收单个 `GridStackWidget` 选项，而不只是支持 (x,y,w,h)，但 JS 中的旧调用目前仍可继续使用。该方法已完全重写，现在能对所有可用参数做正确的约束与更新。

3. `locked()`、`move()`、`resize()`、`minWidth()`、`minHeight()`、`maxWidth()`、`maxHeight()` 方法对 Typescript 隐藏（JS 目前仍可调用），因为它们只是围绕 `update(el, opt)` 的一行包装，很快会被移除。（例如：`move(el, x, y)` => `update(el, {x, y})`）

4. 条目属性如 `data-gs-min-width` 现在改为 `gs-min-w`。我们从所有属性中移除了 'data-'，并将 'width|height' 缩写为 'w|h'，以减少输入并提升效率（仅 .js 就节省了 2k！）。

5. 大多数 API 中使用的 `GridStackWidget` 的 `width|height|minWidth|minHeight|maxWidth|maxHeight` 也相应缩写为 `w|h|minW|minH|maxW|maxH`

<h2 id="migrating-to-v4">迁移到 v4</h2>

请务必先阅读 v3 的迁移说明！

v4 是对碰撞（collision）与拖入/拖出（drag in/out）启发式算法的一次完整重写，修复了一些长期存在的请求与 bug，并大幅提升了可用性。详情请阅读发布说明。

**不太可能**的破坏性改动（内部使用）：

1. `removeTimeout` 被移除（拖到垃圾桶上的反馈会立即生效——实际移除仍在鼠标松开时进行）

2. 以下 `GridStackEngine` 方法发生变化（内部使用，不影响 `GridStack` 公共 API）

```js
// 拆分为 3 个方法，并带新的选项参数以支持新代码与像素覆盖率检查
`collision()` -> `collide(), collideAll(), collideCoverage()`
`moveNodeCheck(node, x, y, w, h)` -> `moveNodeCheck(node, opt: GridStackMoveOpts)`
`isNodeChangedPosition(node, x, y, w, h)` -> `changedPosConstrain(node, opt: GridStackMoveOpts)`
`moveNode(node, x, y, w, h, noPack)` -> `moveNode(node, opt: GridStackMoveOpts)`
```

3. 移除了旧的过时方法/属性（v0.6-v1）：`getGridHeight()`、`verticalMargin`、`data-gs-current-height`、
`locked()`、`maxWidth()`、`minWidth()`、`maxHeight()`、`minHeight()`、`move()`、`resize()`

<h2 id="migrating-to-v5">迁移到 v5</h2>

请务必先阅读 v4 的迁移说明！

v5 相比 v4 没有破坏性改动，但重点放在 h5 模式下的嵌套网格：
你现在可以将父网格中的条目拖入/拖出到嵌套子网格，并新增了对应的 API 参数值。详见发布说明。

<h2 id="migrating-to-v6">迁移到 v6</h2>

API 相比 v5 没有真正改变，但对拖拽（Drag&Drop）做了完整重写，改用原生的 `mouseevent`（而不是 HTML 的 draggable=true，后者在 Mac Safari 上有 bug，且在移动设备上不可用）和 `touchevent`（移动端），我们也不再提供 jquery ui 选项（在嵌套网格上表现不佳，也不想再维护这个旧库）。

主要区别是：你只需引入 gridstack.js，就能开箱即用地获得与 h5 版本同等体积的桌面与移动端拖拽（D&D）。

<h2 id="migrating-to-v7">迁移到 v7</h2>

新增功能，无 API 层面的破坏性改动。详见关于即时创建子网格（sub-grids）的发布说明。

<h2 id="migrating-to-v8">迁移到 v8</h2>

如果你使用了嵌套网格的 JSON 格式、原始的 Angular 封装，或依赖特定的 CSS 路径，则可能会有破坏性改动。此外目标现在为 ES2020（见发布说明）。
* `GridStackOptions.subGrid` -> `GridStackOptions.subGridOpts` 重命名。现在我们有 `GridStackWidget.subGridOpts` 与 `GridStackNode.subGrid`（之前两者类型混淆，容易出错）
* `GridStackOptions.addRemoveCB` -> `GridStack.addRemoveCB` 现在是全局的，不再是网格选项
* 移除了 `GridStackOptions.dragInOptions`，因为自 4.0 起已由 `GridStack.setupDragIn()` 取代
* 移除了自 5.1 起已过时的 `GridStackOptions.minWidth`，请改用 `oneColumnSize`
* 移除了所有已基于 gs 的、带 `.grid-stack` 前缀的 CSS 规则；12 列（默认）现在使用 `.gs-12`，extra.css 体积不到原来的 1/4！`gs-min|max_w|h` 属性不再写入（但仍会读取）

<h2 id="migrating-to-v9">迁移到 v9</h2>

新增功能——详见关于 `sizeToContent` 特性的发布说明。
可能的破坏：
* `GridStack.onParentResize()` 现改名为 `onResize()`，因为网格现在直接跟踪尺寸变化，不再需要父级来告知我们。不确定当初为什么它是公开的。

<h2 id="migrating-to-v10">迁移到 v10</h2>

我们现在通过 `GridStackOptions.columnOpts` 支持更丰富的响应式行为，包括任意断点的宽度:列数配对，或自动列数 sizing。

破坏性改动：
* `disableOneColumnMode`、`oneColumnSize` 已被移除（如果你有设置，我们会临时转换）。使用 `columnOpts: { breakpoints: [{w:768, c:1}] }` 获得相同行为。
* 单列模式切换不再默认开启（`columnOpts` 未定义），因为太多新用户遇到相关问题。请改为显式设置（见上）。
* `oneColumnModeDomSort` 已被移除。计划在未来某个时间支持每列布局。待定。

<h2 id="migrating-to-v11">迁移到 v11</h2>

* 出于安全原因，所有 `el.innerHTML = 'some content'` 的实例已被移除，因为它们可能带来意外的 XSS 风险。

* 侧边面板拖拽的完整重写。

* 新增懒加载选项。

**破坏性改动：**

* V11 新增 `GridStack.renderCB`，由你来实现以创建部件内容（会传入完整的 GridStackWidget，因此你可以用 id 或其他字段作为逻辑判断），而 GS 会创建所需的 2 个父 div + class，这与 `GridStack.addRemoveCB` 不同（后者不为你创建任何内容）。两者在 Angular/React/Vue 框架中都很有用。
* `addWidget(w: GridStackWidget)` 现在是唯一支持的格式，不再支持字符串内容传递。你需要自行创建内容（如下方所示），或使用 `GridStack.createWidgetDivs()` 创建父 div、写入 innerHtml，然后调用 `makeWidget(el)`。
* 如果你的代码依赖带真实 HTML 的 `GridStackWidget.content`（如部分演示），需由你自己处理：
```ts
// 注意：真实应用应在盲目设置 innerHTML 之前用 sanitize-html 或 DOMPurify 做净化处理。见 #2736
GridStack.renderCB = function(el: HTMLElement, w: GridStackNode) {
  el.innerHTML = w.content;
};

// 现在你可以再次像这样创建部件
let gridWidget = grid.addWidget({x, y, w, h, content: '<div>My html content</div>'});
```

**潜在的破坏性改动：**

* 侧边面板辅助拖拽的做法有重大整体改动：
1. `clone()` 辅助函数现在传入被拖动的完整 HTML 元素，而不是 `grid-stack-item-content` 上的事件，因此你可以在顶层克隆或设置属性。
2. 侧边面板条目可以使用任意你想要的 class/结构（见 two.html）
3. `GridStack.setupDragIn()` 现在支持为每个侧边面板关联一个 `GridStackWidget`，用于定义拖放时创建的内容！
4. 如果未定义 `GridStackWidget`，辅助函数现在会原样插入，而不是原始的侧边面板条目。
5. 支持 DOM 的 gs- 属性，也支持 gridstacknode 的 JSON（见 two.html）作为替代方案。

<h2 id="migrating-to-v12">迁移到 v12</h2>

* 列与单元格高度的代码已重写为使用浏览器 CSS 变量，我们不再需要大量自定义 CSS class！
这修复了一个长期存在的问题：人们常常忘记为非 12 列的布局引入正确的 CSS，并在许多情况下（多列，或小 cellHeight 值）带来大幅提速。

**潜在的破坏性改动：**
* `gridstack-extra.min.css` 已不再存在，也不再需要自定义列的 CSS class。API/选项未改变。
* (v12.1) `ES5` 文件夹内容已移除——它是用于 IE 支持的，而 IE 已被放弃。
* (v12.1) 嵌套网格事件现在会发送到主网格。你可能需要调整针对这一缺失特性所做的 workaround。nested.html 演示已相应调整。

<h2 id="migrating-to-v13">迁移到 v13</h2>

基础库没有破坏性改动，但新增了开箱即用的 React 和 Vue 封装！

**仅 Angular 封装的破坏性改动**（`gridstack/dist/angular`）

部件 JSON 字段被重命名以匹配 React/Vue 的约定，使布局可在三个框架间移植：

```diff
- { selector: 'app-chart', input: { title: 'Revenue' } }
+ { component: 'app-chart', props: { title: 'Revenue' } }
```

注册调用也重命名了：

```diff
- GridstackComponent.addComponentToSelectorType([ChartComponent, TableComponent]);
+ GridstackComponent.registerComponents([ChartComponent, TableComponent]);
```

静态映射及其类型也相应重命名（`selectorToType` → `componentMap`，`SelectorToType` → `ComponentMap`）。如果你子类化了 `BaseWidget` 并重写了 `deserialize()`，请将所有直接读取 `w.input` 的地方替换为 `w.props`。

<h2 id="migrating-to-v14">迁移到 v14</h2>

**破坏性改动**

* 破坏性：[#754](https://github.com/gridstack/gridstack.js/issues/754) `float` 网格选项被 `mode?: 'top' | 'float' | 'list' | 'compact'`（默认 `'top'`）取代，新增了 2 种布局行为。代码中或已保存 JSON 里传入的旧 `float: true|false` 值仍会在运行时**自动迁移**（到 `'float'`|`'top'`），但该字段已从 `GridStackOptions` 中移除，因此 TS 用户需要更新。`save()` 现在写入 `mode` 而不是 `float`。
```ts
GridStack.init({float: true});   // 13.x
GridStack.init({mode: 'float'}); // 14.0
```
* 破坏性：[#754](https://github.com/gridstack/gridstack.js/issues/754) 移除了 `grid.float(val)` 和 `grid.getFloat()`——请改用 `grid.mode(val)` 和 `grid.getMode()`。引擎的 `engine.float` getter/setter 同理，现在为 `engine.mode`。
```ts
grid.float(true); grid.getFloat();      // 13.x
grid.mode('float'); grid.getMode();     // 14.0
```

<h1 id="jquery-application">jQuery 应用</h1>

这部分 **已过时，不再适用于 v6+**。你需要使用 v5.1.1 及更早版本

```js
import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';
import 'gridstack/dist/jq/gridstack-dd-jqueryui';
```
**注意**：`jquery` 与 `jquery-ui` 是按名称导入的，因此你需要在 webpack（或等效的）配置文件中指定它们的位置，
这意味着你或许可以自带自己的版本
```js
  alias: {
    'jquery': 'gridstack/dist/jq/jquery.js',
    'jquery-ui': 'gridstack/dist/jq/jquery-ui.js',
    'jquery.ui': 'gridstack/dist/jq/jquery-ui.js',
    'jquery.ui.touch-punch': 'gridstack/dist/jq/jquery.ui.touch-punch.js',
  },
```
或者（单个合并文件）写在 html 中

```html
<link href="node_modules/gridstack/dist/gridstack.min.css" rel="stylesheet"/>
<!-- HTML5 拖拽 (70k) -->
<script src="node_modules/gridstack/dist/gridstack-h5.js"></script>
<!-- 或 jquery-ui 拖拽 (195k) -->
<script src="node_modules/gridstack/dist/gridstack-jq.js"></script>
<!-- 或静态网格 (40k) -->
<script src="node_modules/gridstack/dist/gridstack-static.js"></script>
```

我们通过插件系统提供原生的 HTML5 拖拽（默认），但也可以改用 jquery-ui 版本。它会在 `gridstack-jq.js` 中打包 `jquery` (3.5.1) + `jquery-ui` (1.13.1 最小化的 drag|drop|resize) + `jquery-ui-touch-punch` (1.0.8，用于移动端支持)。

**注意：在 v4、v3**：我们通过 ES6 模块按名称导入 jquery 与 jquery-ui，因此你需要指定这些 .js 文件的位置，这意味着你也可能自带自己的版本。见引入说明。

**注意：在 v1.x** 如果你希望改用 gridstack-jq，且你的应用需要自带自己的 JQ 版本，你应当**改为**在导入你的 JQ 库之后引入 `gridstack-poly.min.js`（可选 IE 支持）+ `gridstack.min.js` + `gridstack.jQueryUI.min.js`。但请注意 jQuery 与 ES6 导入存在问题（见 [1306](https://github.com/gridstack/gridstack.js/issues/1306)）。

至于事件，对于使用 jquery-ui 的版本，你仍可以使用 `$(".grid-stack").on(...)` 来处理我们不支持的事情。

<h1 id="changes">更新日志</h1>

在此查看我们的更新日志 [here](https://github.com/gridstack/gridstack.js/tree/master/doc/CHANGES.md)。

<h1 id="usage-trend">使用趋势</h1>

[gridstack 的使用趋势](https://npm-compare.com/gridstack#timeRange=THREE_YEARS)
  
<a href="https://npm-compare.com/gridstack#timeRange=THREE_YEARS" target="_blank">
  <img src="https://npm-compare.com/img/npm-trend/THREE_YEARS/gridstack.png" width="70%" alt="gridstack 的 NPM 使用趋势" />
</a>

<h1 id="the-team">开发团队</h1>

gridstack.js 目前由 [Alain Dumesny](https://github.com/adumesny) 维护，此前由 [Dylan Weiss](https://github.com/radiolips) 维护，最初由 [Pavel Reznikov](https://github.com/troolee) 创建。我们感谢 [所有贡献者](https://github.com/gridstack/gridstack.js/graphs/contributors) 的帮助。

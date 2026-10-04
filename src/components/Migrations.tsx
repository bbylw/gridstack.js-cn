import type { ReactNode } from 'react'
import { Accordion, type AccordionItem } from './Accordion'
import { CodeBlock } from './CodeBlock'
import { Reveal } from './Reveal'
import { Section, SectionHeading } from './Section'

function C({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-ink/6 px-1.5 py-0.5 text-[13px] text-accent-deep">
      {children}
    </code>
  )
}

function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

const ITEMS: AccordionItem[] = [
  {
    id: 'v06',
    tag: 'v0.6',
    title: '迁移到 v0.6',
    summary: '仅增删条目时不再发送 change 事件。',
    content: (
      <p>
        从 0.6.x 开始，当一个条目仅被添加 / 删除、且没有改变其他节点时，不再发送
        <C>change</C> 事件（此前对绝大多数节点都发送，既不正确也造成低效）。如果你之前依赖这种旧的错误行为，请改为监听
        <C>added</C> / <C>removed</C> 事件。
      </p>
    ),
  },
  {
    id: 'v1',
    tag: 'v1',
    title: '迁移到 v1',
    summary: '从 API 与外部依赖中移除 jQuery。',
    breaking: true,
    content: (
      <>
        <p>
          v1.0.0 从 API 和外部依赖中移除了 jQuery，这需要进行一些代码改动。若尚未升级到
          v0.6，请先阅读上一步。
        </p>
        <List
          items={[
            <>
              代码只需 <C>import GridStack from 'gridstack'</C>，或引入{' '}
              <C>gridstack.all.js</C> 与 CSS（不要引入其他 JS）。
            </>,
            <>
              基于 jQuery 的项目请参考下方的「jQuery 应用」小节。
            </>,
          ]}
        />
        <p className="pt-1 font-mono text-xs tracking-wide text-mid-dark">
          旧写法（jQuery）
        </p>
        <CodeBlock
          lang="js"
          filename="旧 API"
          code={`var grid = $('.grid-stack').gridstack(opts?).data('gridstack');
$('.grid-stack').on('added', function(e, items) { /* ... */ });
var grid = $('.grid-stack').data('gridstack');`}
        />
        <p className="pt-1 font-mono text-xs tracking-wide text-mid-dark">
          新写法
        </p>
        <CodeBlock
          lang="js"
          filename="新 API"
          code={`var grid = GridStack.init(opts?, element?);
grid.addWidget('<div>…</div>', { width: 2 });
grid.on('added', function(e, items) { /* ... */ });
var grid = el.gridstack;`}
        />
        <p className="pt-1 font-semibold text-ink">其他重命名</p>
        <List
          items={[
            <><C>GridStackUI</C> → <C>GridStack</C></>,
            <><C>GridStackUI.GridStackEngine</C> → <C>GridStack.Engine</C></>,
            <><C>grid.container</C> → <C>grid.el</C>（网格 DOM 元素）</>,
            <><C>grid.grid</C>（GridStackEngine）→ <C>grid.engine</C></>,
            <><C>grid.setColumn(N)</C> → <C>grid.column(N)</C> 与 <C>grid.column()</C></>,
          ]}
        />
      </>
    ),
  },
  {
    id: 'v2',
    tag: 'v2',
    title: '迁移到 v2',
    summary: '1.x 的 TypeScript 重写，移除全部 jQuery 事件。',
    breaking: true,
    content: (
      <>
        <p>
          v2 是 1.x 的 TypeScript 重写：移除所有 jQuery 事件、改用类结构并清理代码以支持
          ES6 模块。
        </p>
        <List
          items={[
            <>
              所有 set 方法返回 <C>GridStack</C> 以支持链式调用，例如
              <C>grid.float(true).cellHeight(10).column(6)</C>。原接收多个参数的方法改为接收单个对象。
            </>,
            <>
              事件签名统一，<C>gsresizestop</C> 被移除（<C>resizestop</C> /
              <C>dragstop</C> 现在在 DOM 属性更新之后才触发）。
            </>,
            <>
              <C>oneColumnMode</C> 改为检查网格宽度（更准确且支持嵌套），可能需要调整相关尺寸。
            </>,
          ]}
        />
        <CodeBlock
          lang="js"
          filename="API 重命名"
          code={`addWidget(el, x, y, width, height)  ->  addWidget(el, { w: 2 })
float()        -> getFloat()      // 获取值
cellHeight()   -> getCellHeight() // 获取值
verticalMargin -> margin          // 应用于全部 4 边
verticalMargin() -> getMargin()   // 获取值`}
        />
        <p className="rounded-lg border border-accent/30 bg-accent/8 p-3 text-sm">
          由于更紧凑的 ES6 输出与原生 TypeScript 代码，2.x 不再支持 IE11
          及更早版本；此类项目需停留在 1.x。
        </p>
      </>
    ),
  },
  {
    id: 'v3',
    tag: 'v3',
    title: '迁移到 v3',
    summary: '新增 HTML5 拖拽插件，引入方式需做选择。',
    breaking: true,
    content: (
      <>
        <p>
          v3 新增 HTML5 拖拽插件（约 63k，全部原生代码），同时仍可选用旧的 jquery-ui
          版本（188k）或静态网格版本（34k，无用户拖拽但提供完整 API）。
          <C>gridstack.all.js</C> 不再存在，现在对应的是 <C>gridstack-jq.js</C>。
        </p>
        <List
          items={[
            <><C>GridStack.update(el, opt)</C> 现在接收单个 <C>GridStackWidget</C> 选项，并对所有参数做正确约束与更新。</>,
            <><C>locked()</C>、<C>move()</C>、<C>resize()</C>、<C>min/maxWidth|Height()</C> 对 TypeScript 隐藏，改用 <C>update(el, opt)</C>。</>,
            <>条目属性 <C>data-gs-min-width</C> 改为 <C>gs-min-w</C>（移除 <C>data-</C> 前缀，宽高缩写为 <C>w|h</C>）。</>,
            <><C>GridStackWidget</C> 的 <C>width|height|minWidth…</C> 缩写为 <C>w|h|minW…</C>。</>,
          ]}
        />
      </>
    ),
  },
  {
    id: 'v4',
    tag: 'v4',
    title: '迁移到 v4',
    summary: '碰撞与拖入/拖出启发式算法完整重写。',
    content: (
      <>
        <p>
          v4 对碰撞（collision）与拖入 / 拖出（drag in/out）启发式算法做了完整重写，修复长期存在的请求与
          bug，并大幅提升可用性。以下为内部使用的改动：
        </p>
        <CodeBlock
          lang="js"
          filename="GridStackEngine"
          code={`collision()                       -> collide(), collideAll(), collideCoverage()
moveNodeCheck(node, x, y, w, h)   -> moveNodeCheck(node, opt: GridStackMoveOpts)
isNodeChangedPosition(node, …)    -> changedPosConstrain(node, opt)
moveNode(node, x, y, w, h, noPack)-> moveNode(node, opt: GridStackMoveOpts)`}
        />
        <p>
          同时移除了过时方法 / 属性：<C>getGridHeight()</C>、<C>verticalMargin</C>、
          <C>data-gs-current-height</C>、<C>locked()</C>、<C>maxWidth()</C>、
          <C>minWidth()</C>、<C>maxHeight()</C>、<C>minHeight()</C>、<C>move()</C>、
          <C>resize()</C>。
        </p>
      </>
    ),
  },
  {
    id: 'v5',
    tag: 'v5',
    title: '迁移到 v5',
    summary: '无破坏性改动，聚焦 h5 模式下的嵌套网格。',
    content: (
      <p>
        v5 相比 v4 没有破坏性改动，重点放在 h5 模式下的嵌套网格：你现在可以将父网格中的条目拖入 /
        拖出到嵌套子网格，并新增了对应的 API 参数值。
      </p>
    ),
  },
  {
    id: 'v6',
    tag: 'v6',
    title: '迁移到 v6',
    summary: 'API 不变，拖拽改用原生鼠标与触摸事件。',
    content: (
      <p>
        API 相比 v5 没有真正改变，但对拖拽做了完整重写：改用原生
        <C>mouseevent</C>（替代 HTML 的 <C>draggable=true</C>，后者在 Mac Safari
        上有 bug 且移动端不可用）与 <C>touchevent</C>（移动端）。也不再提供 jquery-ui
        选项。主要区别是：只引入 gridstack.js，即可开箱获得桌面与移动端拖拽。
      </p>
    ),
  },
  {
    id: 'v7',
    tag: 'v7',
    title: '迁移到 v7',
    summary: '新增功能，无 API 破坏性改动。',
    content: <p>新增功能，无 API 层面的破坏性改动。详见关于即时创建子网格（sub-grids）的发布说明。</p>,
  },
  {
    id: 'v8',
    tag: 'v8',
    title: '迁移到 v8',
    summary: '嵌套网格 JSON、Angular 封装与 CSS 路径有改动。',
    breaking: true,
    content: (
      <List
        items={[
          <><C>GridStackOptions.subGrid</C> 重命名为 <C>subGridOpts</C>；现在有 <C>GridStackWidget.subGridOpts</C> 与 <C>GridStackNode.subGrid</C>。</>,
          <><C>GridStackOptions.addRemoveCB</C> 改为全局的 <C>GridStack.addRemoveCB</C>。</>,
          <>移除 <C>dragInOptions</C>（自 4.0 起由 <C>setupDragIn()</C> 取代）。</>,
          <>移除 <C>minWidth</C>，改用 <C>oneColumnSize</C>。</>,
          <>移除带 <C>.grid-stack</C> 前缀的 gs CSS 规则；12 列使用 <C>.gs-12</C>，extra.css 体积不到原来的 1/4。</>,
        ]}
      />
    ),
  },
  {
    id: 'v9',
    tag: 'v9',
    title: '迁移到 v9',
    summary: '新增 sizeToContent；onParentResize 更名。',
    content: (
      <List
        items={[
          <>新增功能，详见关于 <C>sizeToContent</C> 特性的发布说明。</>,
          <><C>GridStack.onParentResize()</C> 改名为 <C>onResize()</C>，因为网格现在直接跟踪尺寸变化。</>,
        ]}
      />
    ),
  },
  {
    id: 'v10',
    tag: 'v10',
    title: '迁移到 v10',
    summary: 'columnOpts 带来更丰富的响应式行为。',
    breaking: true,
    content: (
      <>
        <p>
          通过 <C>GridStackOptions.columnOpts</C> 支持更丰富的响应式行为，包括任意断点的「宽度 : 列数」配对，或自动列数。
        </p>
        <List
          items={[
            <><C>disableOneColumnMode</C>、<C>oneColumnSize</C> 已移除，改用 <C>columnOpts: {'{ breakpoints: [{ w: 768, c: 1 }] }'}</C>。</>,
            <>单列模式切换不再默认开启（<C>columnOpts</C> 未定义），需显式设置。</>,
            <><C>oneColumnModeDomSort</C> 已移除。</>,
          ]}
        />
      </>
    ),
  },
  {
    id: 'v11',
    tag: 'v11',
    title: '迁移到 v11',
    summary: '移除 innerHTML 直写，新增 renderCB 与懒加载。',
    breaking: true,
    content: (
      <>
        <List
          items={[
            <>出于安全原因，移除所有 <C>el.innerHTML = '…'</C> 实例，避免意外的 XSS 风险。</>,
            <>侧边面板拖拽完整重写，新增懒加载选项。</>,
            <><C>addWidget(w)</C> 成为唯一支持格式，不再支持字符串内容；可自行创建内容或使用 <C>createWidgetDivs()</C>。</>,
          ]}
        />
        <p className="pt-1">
          若需还原带真实 HTML 的 <C>content</C>，请自行处理（真实应用应先做净化）：
        </p>
        <CodeBlock
          lang="ts"
          filename="renderCB"
          code={`// 真实应用应在设置 innerHTML 前用 sanitize-html 或 DOMPurify 净化
GridStack.renderCB = function(el, w) {
  el.innerHTML = w.content;
};

let gridWidget = grid.addWidget({ x, y, w, h, content: '<div>My html content</div>' });`}
        />
      </>
    ),
  },
  {
    id: 'v12',
    tag: 'v12',
    title: '迁移到 v12',
    summary: '列与单元格高度改用 CSS 变量。',
    breaking: true,
    content: (
      <>
        <p>
          列与单元格高度的代码重写为使用浏览器 CSS 变量，不再需要大量自定义 CSS class。这修复了「忘记为非
          12 列布局引入正确 CSS」这一长期问题，并在多列或小 cellHeight 场景下带来大幅提速。
        </p>
        <List
          items={[
            <><C>gridstack-extra.min.css</C> 已不再存在，也不再需要自定义列的 CSS class。API / 选项未变。</>,
            <>(v12.1) 移除 <C>ES5</C> 文件夹内容（IE 已放弃）。</>,
            <>(v12.1) 嵌套网格事件现在会发送到主网格，可能需要调整此前的 workaround。</>,
          ]}
        />
      </>
    ),
  },
  {
    id: 'v13',
    tag: 'v13',
    title: '迁移到 v13',
    summary: '新增 React、Vue 封装；Angular 字段重命名。',
    breaking: true,
    content: (
      <>
        <p>
          基础库没有破坏性改动，但新增了开箱即用的 React 和 Vue 封装。仅 Angular
          封装的部件 JSON 字段被重命名，以使布局可在三个框架间移植：
        </p>
        <CodeBlock
          lang="diff"
          filename="Angular 封装"
          code={`- { selector: 'app-chart', input: { title: 'Revenue' } }
+ { component: 'app-chart', props: { title: 'Revenue' } }

- GridstackComponent.addComponentToSelectorType([ChartComponent, TableComponent]);
+ GridstackComponent.registerComponents([ChartComponent, TableComponent]);`}
        />
        <p>
          静态映射及类型也相应重命名（<C>selectorToType</C> → <C>componentMap</C>，
          <C>SelectorToType</C> → <C>ComponentMap</C>）。若子类化了 <C>BaseWidget</C> 并重写
          <C>deserialize()</C>，请把读取 <C>w.input</C> 的地方替换为 <C>w.props</C>。
        </p>
      </>
    ),
  },
  {
    id: 'v14',
    tag: 'v14',
    title: '迁移到 v14',
    summary: 'float 选项被 mode 取代，新增两种布局行为。',
    breaking: true,
    content: (
      <>
        <p>
          <C>float</C> 网格选项被 <C>mode?: 'top' | 'float' | 'list' | 'compact'</C>
          （默认 <C>'top'</C>）取代，新增了 2 种布局行为。旧值仍会在运行时自动迁移，但该字段已从
          <C>GridStackOptions</C> 移除，TS 用户需要更新；<C>save()</C> 现在写入 <C>mode</C>。
        </p>
        <CodeBlock
          lang="ts"
          filename="配置与 API"
          code={`GridStack.init({ float: true });    // 13.x
GridStack.init({ mode: 'float' });  // 14.0

grid.float(true); grid.getFloat();  // 13.x
grid.mode('float'); grid.getMode(); // 14.0`}
        />
      </>
    ),
  },
]

export function Migrations() {
  return (
    <Section id="migrating" className="bg-paper-dim">
      <SectionHeading
        eyebrow="Migrating"
        title="升级路径一目了然"
        lead="从 v0.6 到 v14，每一次破坏性改动都记录在案。展开对应版本查看需要修改的内容——记得从旧到新依次阅读。"
      />
      <Reveal>
        <Accordion items={ITEMS} defaultOpenId="v14" />
      </Reveal>
    </Section>
  )
}

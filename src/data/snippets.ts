import type { CodeLang } from '../lib/shiki'

export interface Snippet {
  lang: CodeLang
  code: string
  filename?: string
}

export const snippets = {
  importEsm: {
    lang: 'ts',
    code: `import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';`,
  },

  importHtml: {
    lang: 'html',
    code: `<link href="node_modules/gridstack/dist/gridstack.min.css" rel="stylesheet"/>
<script src="node_modules/gridstack/dist/gridstack-all.js"></script>`,
  },

  importLegacy: {
    lang: 'html',
    code: `<!-- 旧浏览器：es5 + polyfill（体积更大） -->
<link href="node_modules/gridstack/dist/gridstack.min.css" rel="stylesheet"/>
<script src="node_modules/gridstack/dist/es5/gridstack-poly.js"></script>
<script src="node_modules/gridstack/dist/es5/gridstack-all.js"></script>`,
  },

  usageDynamic: {
    lang: 'js',
    code: `// ...在你的 HTML 中
<div class="grid-stack"></div>

// ...在你的脚本中
var grid = GridStack.init();
grid.addWidget({w: 2, content: 'item 1'});`,
  },

  usageList: {
    lang: 'js',
    code: `// 使用序列化数据，而不是 .addWidget()
const serializedData = [
  {x: 0, y: 0, w: 2, h: 2},
  {x: 2, y: 3, w: 3, content: 'item 2'},
  {x: 1, y: 3}
];

grid.load(serializedData);`,
  },

  usageDom: {
    lang: 'html',
    code: `<div class="grid-stack">
  <div class="grid-stack-item">
    <div class="grid-stack-item-content">Item 1</div>
  </div>
  <div class="grid-stack-item" gs-w="2">
    <div class="grid-stack-item-content">Item 2 wider</div>
  </div>
</div>

<script>
  GridStack.init();
</script>`,
  },

  extendLibrary: {
    lang: 'js',
    code: `// 用我们自己的自定义方法扩展 gridstack
GridStack.prototype.printCount = function() {
  console.log('grid has ' + this.engine.nodes.length + ' items');
};

let grid = GridStack.init();

// 现在可以调用
grid.printCount();`,
  },

  extendEngine: {
    lang: 'ts',
    code: `import { GridStack, GridStackEngine, GridStackNode, GridStackMoveOpts } from 'gridstack';

class CustomEngine extends GridStackEngine {

  /** 改写此方法，将节点移动到指定的新位置 */
  public override moveNode(node: GridStackNode, o: GridStackMoveOpts): boolean {
    // 保持原始的 X 和 Width 不变，其余交给基类处理……
    o.x = node.x;
    o.w = node.w;
    return super.moveNode(node, o);
  }
}

GridStack.registerEngine(CustomEngine); // 全局设置我们的自定义类`,
  },

  columnsInit: {
    lang: 'js',
    code: `GridStack.init({ column: N });`,
  },

  columnsCss: {
    lang: 'css',
    code: `.gs-4 > .grid-stack-item[gs-x="1"]  { left: 25% }
.gs-4 > .grid-stack-item[gs-x="2"]  { left: 50% }
.gs-4 > .grid-stack-item[gs-x="3"]  { left: 75% }

.gs-4 > .grid-stack-item { width: 25% }
.gs-4 > .grid-stack-item[gs-w="2"]  { width: 50% }
.gs-4 > .grid-stack-item[gs-w="3"]  { width: 75% }
.gs-4 > .grid-stack-item[gs-w="4"]  { width: 100% }`,
  },

  columnsScss: {
    lang: 'scss',
    code: `$columns: 20;
@function fixed($float) {
  @return round($float * 1000) / 1000; // 合计 2+3 位数字即为 %
}
.gs-#{$columns} > .grid-stack-item {

  width: fixed(100% / $columns);

  @for $i from 1 through $columns - 1 {
    &[gs-x='#{$i}'] { left: fixed((100% / $columns) * $i); }
    &[gs-w='#{$i+1}'] { width: fixed((100% / $columns) * ($i + 1)); }
  }
}`,
  },

  columnsGulp: {
    lang: 'js',
    code: `gulp.src('node_modules/gridstack/dist/src/gridstack-extra.scss')
        .pipe(replace('$start: 2 !default;','$start: 30;'))
        .pipe(replace('$end: 11 !default;','$end: 30;'))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('dist/css'))`,
  },

  overrideOptions: {
    lang: 'js',
    code: `GridStack.init({
  resizable: {
    handles: 'e,se,s,sw,w'
  }
});`,
  },

  touch: {
    lang: 'js',
    code: `let options = {
  alwaysShowResizeHandle: 'mobile' // 在移动设备上为 true
};
GridStack.init(options);`,
  },

  jqueryImport: {
    lang: 'js',
    code: `import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';
import 'gridstack/dist/jq/gridstack-dd-jqueryui';`,
  },

  jqueryAlias: {
    lang: 'js',
    code: `// webpack 或等效配置
alias: {
  'jquery': 'gridstack/dist/jq/jquery.js',
  'jquery-ui': 'gridstack/dist/jq/jquery-ui.js',
  'jquery.ui': 'gridstack/dist/jq/jquery-ui.js',
  'jquery.ui.touch-punch': 'gridstack/dist/jq/jquery.ui.touch-punch.js',
},`,
  },
} satisfies Record<string, Snippet>

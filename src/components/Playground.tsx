import { GridStack } from 'gridstack'
import 'gridstack/dist/gridstack.min.css'
import type { GridStackMode, GridStackWidget } from 'gridstack'
import {
  useEffect,
  useRef,
  useState,
  type DragEvent as ReactDragEvent,
  type ReactNode,
} from 'react'
import { Reveal } from './Reveal'
import { Section, SectionHeading } from './Section'

/* -------------------------------------------------------------------------- */
/* widget content                                                             */
/* -------------------------------------------------------------------------- */

type Kind =
  | 'kpi'
  | 'chart'
  | 'clock'
  | 'status'
  | 'term'
  | 'prog'
  | 'spark'
  | 'note'
  | 'mini'
  | 'bars'

/** deterministic pseudo-random so resets don't flicker */
function seeded(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

function closeBtn() {
  return '<button type="button" class="pg-card__close" data-pg-close aria-label="移除该部件">×</button>'
}

function head(label: string, color = 'var(--color-accent)') {
  return (
    '<div class="pg-card__head">' +
    `<span class="pg-card__dot" style="background:${color}"></span>` +
    `<span class="pg-card__label">${label}</span>` +
    closeBtn() +
    '</div>'
  )
}

function barRow(count: number, seed: number) {
  const r = seeded(seed)
  const bars = Array.from({ length: count }, () => {
    const h = 22 + Math.round(r() * 78)
    return `<i style="height:${h}%"></i>`
  }).join('')
  return `<div class="pg-bars">${bars}</div>`
}

function rowList(rows: [string, string][], live = false) {
  return (
    '<div class="pg-rows">' +
    rows
      .map(
        ([k, v]) =>
          `<div><span>${k}</span><span style="display:flex;align-items:center;gap:6px">${
            live ? '<span class="pg-live"></span>' : ''
          }<b>${v}</b></span></div>`,
      )
      .join('') +
    '</div>'
  )
}

function widgetBody(kind: Kind): string {
  switch (kind) {
    case 'kpi':
      return (
        head('Revenue') +
        '<div class="pg-card__value">¥48.2k</div>' +
        '<div class="pg-card__delta">▲ 12.4% 环比</div>'
      )
    case 'mini':
      return (
        head('Active Users', 'var(--color-blue)') +
        '<div class="pg-card__value">1,204</div>' +
        '<div class="pg-card__delta">▲ 3.1%</div>'
      )
    case 'chart':
      return head('Traffic') + barRow(14, 7)
    case 'bars':
      return head('Events', 'var(--color-green)') + barRow(9, 23)
    case 'clock':
      return (
        head('Local Time', 'var(--color-blue)') +
        '<div class="pg-clock">--:--:--</div>'
      )
    case 'status':
      return (
        head('Live Nodes') +
        rowList(
          [
            ['api-gateway', '12ms'],
            ['worker-01', '8ms'],
            ['cache', '3ms'],
          ],
          true,
        )
      )
    case 'term':
      return (
        head('Console', 'var(--color-green)') +
        '<pre class="pg-pre">$ grid.save()\n✓ 7 widgets persisted\n$ grid.column(6)\n✓ relayout · 0 errors</pre>'
      )
    case 'prog':
      return (
        head('Deploy') +
        '<div class="pg-prog">' +
        '<div class="pg-card__delta" style="color:var(--color-mid-dark)">构建中 · 68%</div>' +
        '<div class="pg-prog__track"><div class="pg-prog__fill" style="width:68%"></div></div>' +
        '</div>'
      )
    case 'spark':
      return (
        head('Latency', 'var(--color-blue)') +
        '<svg class="pg-spark" viewBox="0 0 120 32" preserveAspectRatio="none" aria-hidden="true">' +
        '<polyline points="0,28 14,20 28,24 42,12 56,17 70,7 84,11 98,4 120,8" fill="none" stroke="var(--color-blue)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>' +
        '</svg>'
      )
    case 'note':
      return (
        head('Note', 'var(--color-green)') +
        '<p class="pg-note">从左侧面板把部件拖进来，或拖动卡片标题栏以外的任意位置来移动它。</p>' +
        '<span class="pg-tag">auto-position</span>'
      )
  }
}

function widgetHTML(kind: Kind) {
  return `<div class="pg-card">${widgetBody(kind)}</div>`
}

/* -------------------------------------------------------------------------- */
/* layout + palette                                                           */
/* -------------------------------------------------------------------------- */

const DEFAULT_SIZE: Record<Kind, { w: number; h: number }> = {
  kpi: { w: 3, h: 2 },
  mini: { w: 3, h: 2 },
  chart: { w: 6, h: 3 },
  bars: { w: 4, h: 3 },
  clock: { w: 3, h: 2 },
  status: { w: 3, h: 3 },
  term: { w: 3, h: 3 },
  prog: { w: 3, h: 2 },
  spark: { w: 6, h: 2 },
  note: { w: 3, h: 2 },
}

interface WidgetPos {
  x?: number
  y?: number
  w?: number
  h?: number
  id?: string
  autoPosition?: boolean
}

function widget(kind: Kind, pos: WidgetPos = {}): GridStackWidget {
  const size = DEFAULT_SIZE[kind]
  const { x, y, w = size.w, h = size.h, id, autoPosition } = pos
  return { id, x, y, w, h, autoPosition, content: widgetHTML(kind) }
}

const INITIAL: GridStackWidget[] = [
  widget('kpi', { id: 'kpi', x: 0, y: 0, w: 3, h: 2 }),
  widget('chart', { id: 'chart', x: 3, y: 0, w: 6, h: 3 }),
  widget('clock', { id: 'clock', x: 9, y: 0, w: 3, h: 2 }),
  widget('status', { id: 'status', x: 0, y: 2, w: 3, h: 2 }),
  widget('term', { id: 'term', x: 9, y: 2, w: 3, h: 3 }),
  widget('spark', { id: 'spark', x: 3, y: 3, w: 6, h: 2 }),
  widget('prog', { id: 'prog', x: 0, y: 4, w: 3, h: 2 }),
]

const PALETTE: { kind: Kind; name: string; size: string }[] = [
  { kind: 'mini', name: '指标卡', size: 'w3 · h2' },
  { kind: 'bars', name: '事件图', size: 'w4 · h3' },
  { kind: 'note', name: '便签', size: 'w3 · h2' },
  { kind: 'status', name: '节点状态', size: 'w3 · h3' },
  { kind: 'spark', name: '折线图', size: 'w6 · h2' },
  { kind: 'clock', name: '时钟', size: 'w3 · h2' },
]

const COLUMNS = [1, 3, 6, 12]
const MODES: { value: GridStackMode; label: string }[] = [
  { value: 'top', label: '顶部堆叠' },
  { value: 'float', label: '自由漂浮' },
  { value: 'compact', label: '紧凑' },
  { value: 'list', label: '列表流' },
]

function uid() {
  return `w-${Math.random().toString(36).slice(2, 7)}`
}

type LayoutItem = { id?: string; x?: number; y?: number; w?: number; h?: number }

interface LogEntry {
  key: number
  name: string
  detail: string
}

/* -------------------------------------------------------------------------- */
/* component                                                                  */
/* -------------------------------------------------------------------------- */

export function Playground() {
  const hostRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<GridStack | null>(null)
  const logKey = useRef(0)

  const [column, setColumn] = useState(12)
  const [mode, setMode] = useState<GridStackMode>('top')
  const [locked, setLocked] = useState(false)
  const [layout, setLayout] = useState<LayoutItem[]>([])
  const [log, setLog] = useState<LogEntry[]>([])
  const [dragging, setDragging] = useState<Kind | null>(null)
  const [hot, setHot] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    // Our HTML is authored here, never user input — this mirrors the
    // GridStack.renderCB pattern from the v11 migration notes.
    GridStack.renderCB = (contentEl, w) => {
      if (w.content) contentEl.innerHTML = w.content
    }

    const grid = GridStack.init(
      {
        column: 12,
        cellHeight: 68,
        margin: 6,
        animate: true,
        mode: 'top',
        removable: '#pg-trash',
        // keep the resize grips visible so the affordance is discoverable
        alwaysShowResizeHandle: true,
      },
      host,
    )
    if (!grid) return
    gridRef.current = grid

    const refresh = () => {
      const items = grid.save(false, false) as GridStackWidget[]
      setLayout(
        items.map(({ id, x, y, w, h }) => ({ id, x, y, w, h })),
      )
    }
    const push = (name: string, detail: string) => {
      logKey.current += 1
      const entry: LogEntry = { key: logKey.current, name, detail }
      setLog((prev) => [entry, ...prev].slice(0, 5))
    }

    // clone: gridstack attaches runtime fields to the objects it receives
    INITIAL.forEach((w) => grid.addWidget({ ...w }))

    grid.on('change', refresh)
    grid.on('added', () => {
      refresh()
      push('added', '新增部件')
    })
    grid.on('removed', () => {
      refresh()
      push('removed', '移除部件')
    })
    grid.on('dragstop', () => {
      refresh()
      push('dragstop', '拖拽结束')
    })
    grid.on('resizestop', () => {
      refresh()
      push('resizestop', '缩放结束')
    })
    grid.on('dropped', () => {
      refresh()
      push('dropped', '从面板拖入')
    })

    // per-widget close button (gridstack's default drag `cancel` keeps the
    // button clickable instead of starting a drag)
    const onClick = (e: Event) => {
      const target = e.target as HTMLElement | null
      if (!target?.closest('[data-pg-close]')) return
      const item = target.closest('.grid-stack-item')
      if (item) grid.removeWidget(item as HTMLElement)
    }
    host.addEventListener('click', onClick)

    const clock = window.setInterval(() => {
      const now = new Date().toLocaleTimeString('zh-CN', { hour12: false })
      host.querySelectorAll<HTMLElement>('.pg-clock').forEach((el) => {
        el.textContent = now
      })
    }, 1000)

    refresh()

    return () => {
      window.clearInterval(clock)
      host.removeEventListener('click', onClick)
      // grid.destroy(true) would remove the host element itself, which React
      // still owns (React 19 StrictMode mounts effects twice). Release
      // gridstack's state instead, then clear its children by hand.
      grid.destroy(false)
      host.replaceChildren()
      gridRef.current = null
    }
  }, [])

  /* ---- controls ---- */

  const setCols = (n: number) => {
    gridRef.current?.column(n)
    setColumn(n)
  }

  const setLayoutMode = (m: GridStackMode) => {
    gridRef.current?.mode(m)
    setMode(m)
  }

  const toggleLock = () => {
    const next = !locked
    gridRef.current?.setStatic(next)
    setLocked(next)
  }

  const addWidget = () => {
    const pick = PALETTE[Math.floor(Math.random() * PALETTE.length)]
    gridRef.current?.addWidget(widget(pick.kind, { autoPosition: true, id: uid() }))
  }

  /** Native HTML5 drop: place the new widget at the cell under the cursor. */
  const dropAt = (e: ReactDragEvent) => {
    e.preventDefault()
    setHot(false)
    setDragging(null)
    const grid = gridRef.current
    const host = hostRef.current
    const kind = e.dataTransfer.getData('text/plain') as Kind
    if (!grid || !host || !kind || !(kind in DEFAULT_SIZE)) return
    const rect = host.getBoundingClientRect()
    const cell = grid.getCellFromPixel({
      left: e.clientX - rect.left,
      top: e.clientY - rect.top,
    })
    grid.addWidget(widget(kind, { x: cell.x, y: cell.y, id: uid() }))
  }

  /** Full reset: widgets *and* every toolbar control back to their defaults. */
  const reset = () => {
    const grid = gridRef.current
    if (!grid) return
    grid.setStatic(false)
    grid.removeAll(true)
    grid.mode('top')
    grid.column(12)
    INITIAL.forEach((w) => grid.addWidget({ ...w }))
    setColumn(12)
    setMode('top')
    setLocked(false)
  }

  return (
    <Section id="playground" dark>
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="relative">
        <SectionHeading
          dark
          eyebrow="Playground"
          title="别只看代码，直接上手玩"
          lead="下面是一个真实的 gridstack.js 实例——不是录屏，也不是静态图。拖动卡片移动位置、拉右下角缩放、从左侧面板拖入新部件、把卡片拖到垃圾桶删除，右侧 JSON 会实时跟着变。"
        />

        {/* capability chips */}
        <Reveal className="mb-6 flex flex-wrap gap-2">
          {[
            '拖拽移动',
            '拖拽缩放',
            '侧边拖入',
            '拖出删除',
            '响应式列数',
            'v14 布局模式',
            'save() 序列化',
            '事件监听',
          ].map((c) => (
            <span
              key={c}
              className="rounded-full border border-white/12 px-3 py-1 font-mono text-[11px] text-mid"
            >
              {c}
            </span>
          ))}
        </Reveal>

        {/* toolbar */}
        <Reveal>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4 rounded-2xl border border-white/10 bg-white/5 p-4">
            <ControlRow label="列数">
              {COLUMNS.map((c) => (
                <Chip
                  key={c}
                  active={column === c}
                  onClick={() => setCols(c)}
                  label={String(c)}
                />
              ))}
            </ControlRow>

            <ControlRow label="布局模式">
              {MODES.map((m) => (
                <Chip
                  key={m.value}
                  active={mode === m.value}
                  onClick={() => setLayoutMode(m.value)}
                  label={m.label}
                />
              ))}
            </ControlRow>

            <div className="ml-auto flex flex-wrap items-center gap-2">
              <Action onClick={addWidget}>＋ 添加部件</Action>
              <Action onClick={() => gridRef.current?.compact()}>紧凑排列</Action>
              <Action onClick={toggleLock} active={locked}>
                {locked ? '已锁定' : '锁定布局'}
              </Action>
              <Action onClick={reset}>重置</Action>
            </div>
          </div>
        </Reveal>

        {/* workbench */}
        <Reveal className="mt-4">
          <div className="grid gap-4 lg:grid-cols-[248px_1fr]">
            <aside className="flex flex-col gap-4">
              <div>
                <p className="mb-2.5 font-mono text-[10px] tracking-[0.2em] text-accent">
                  部件面板 · 拖我到网格
                </p>
                <ul className="flex flex-col gap-2">
                  {PALETTE.map((p) => (
                    <li
                      key={p.name}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', p.kind)
                        e.dataTransfer.effectAllowed = 'copy'
                        setDragging(p.kind)
                      }}
                      onDragEnd={() => {
                        setDragging(null)
                        setHot(false)
                      }}
                      className={`pg-palette-item flex items-center gap-3 ${
                        dragging === p.kind ? 'is-dragging' : ''
                      }`}
                    >
                      <span aria-hidden="true" className="size-2 shrink-0 rounded-sm bg-accent" />
                      <span className="text-sm text-paper">{p.name}</span>
                      <span className="ml-auto font-mono text-[10px] text-mid">
                        {p.size}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div id="pg-trash" className="pg-trash">
                拖到这里删除
              </div>

              <div className="rounded-xl border border-white/10 bg-ink-soft/60 p-3.5">
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-green" />
                  <p className="font-mono text-[10px] tracking-[0.2em] text-accent">
                    事件日志
                  </p>
                </div>
                <ul className="mt-2.5 space-y-1.5" aria-live="polite">
                  {log.length === 0 && (
                    <li className="font-mono text-[10.5px] text-mid/70">
                      等待交互…
                    </li>
                  )}
                  {log.map((e) => (
                    <li
                      key={e.key}
                      className="flex items-baseline gap-2 font-mono text-[10.5px]"
                    >
                      <span className="text-blue">{e.name}</span>
                      <span className="truncate text-mid">{e.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div
              className={`pg-canvas ${hot ? 'is-hot' : ''}`}
              onDragOver={(e) => {
                e.preventDefault()
                e.dataTransfer.dropEffect = 'copy'
                if (dragging) setHot(true)
              }}
              onDragLeave={(e) => {
                const next = e.relatedTarget as Node | null
                if (next && e.currentTarget.contains(next)) return
                setHot(false)
              }}
              onDrop={dropAt}
            >
              <div ref={hostRef} className="grid-stack" />
              <p
                aria-hidden="true"
                className={`pg-canvas__hint ${hot ? 'is-on' : ''}`}
              >
                松开鼠标，放在这里
              </p>
            </div>
          </div>
        </Reveal>

        {/* live serialized layout */}
        <Reveal className="mt-4">
          <div className="overflow-hidden rounded-2xl border border-ink-line bg-ink-soft">
            <div className="flex flex-wrap items-center gap-3 border-b border-ink-line px-4 py-2.5">
              <span className="font-mono text-[11px] text-mid">
                grid.save() · 实时布局
              </span>
              <span className="rounded-full border border-white/12 px-2 py-0.5 font-mono text-[10px] text-green">
                {layout.length} 个部件 · {column} 列
              </span>
            </div>
            <pre className="scroll-slim max-h-64 overflow-auto p-4 font-mono text-[12px] leading-relaxed text-blue">
              {JSON.stringify(layout, null, 2)}
            </pre>
          </div>
        </Reveal>

        <Reveal className="mt-4">
          <p className="text-sm leading-relaxed text-mid">
            提示：卡片右上角的
            <code className="mx-1 text-paper">×</code>
            调用
            <code className="mx-1 text-paper">removeWidget()</code>
            ；「锁定布局」对应
            <code className="mx-1 text-paper">setStatic(true)</code>
            ；切换列数会触发
            <code className="mx-1 text-paper">column(n)</code>
            的响应式重排。
          </p>
        </Reveal>
      </div>
    </Section>
  )
}

function ControlRow({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[10px] tracking-[0.2em] text-mid">
        {label}
      </span>
      <div className="flex gap-1.5">{children}</div>
    </div>
  )
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-colors duration-200 ${
        active
          ? 'bg-accent text-ink'
          : 'border border-white/15 text-mid hover:border-accent hover:text-paper'
      }`}
    >
      {label}
    </button>
  )
}

function Action({
  children,
  onClick,
  active,
}: {
  children: ReactNode
  onClick: () => void
  active?: boolean
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-lg border px-3.5 py-2 text-xs transition-colors duration-200 active:scale-[0.97] ${
        active
          ? 'border-accent bg-accent/15 text-accent'
          : 'border-white/15 text-paper hover:border-accent hover:text-accent'
      }`}
    >
      {children}
    </button>
  )
}

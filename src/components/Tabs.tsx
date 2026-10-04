import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'

export interface TabItem {
  id: string
  label: string
  content: ReactNode
}

interface TabsProps {
  items: TabItem[]
  ariaLabel: string
  dark?: boolean
}

export function Tabs({ items, ariaLabel, dark = false }: TabsProps) {
  const [active, setActive] = useState(items[0]?.id)
  const baseId = useId()
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  if (items.length === 0) return null

  /** ARIA tabs pattern: arrow keys move both selection and focus. */
  const focusTab = (id: string) => {
    setActive(id)
    tabRefs.current[id]?.focus()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1
    let next: number
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        next = index === last ? 0 : index + 1
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        next = index === 0 ? last : index - 1
        break
      case 'Home':
        next = 0
        break
      case 'End':
        next = last
        break
      default:
        return
    }
    e.preventDefault()
    focusTab(items[next].id)
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className={`flex flex-wrap gap-1.5 border-b pb-px ${
          dark ? 'border-white/12' : 'border-subtle'
        }`}
      >
        {items.map((item, i) => {
          const selected = item.id === active
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[item.id] = el
              }}
              id={`${baseId}-tab-${item.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(item.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`relative rounded-t-md px-3.5 py-2 font-mono text-xs transition-colors duration-200 ${
                selected
                  ? dark
                    ? 'text-paper'
                    : 'text-ink'
                  : dark
                    ? 'text-mid hover:text-paper'
                    : 'text-mid-dark hover:text-ink'
              }`}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={`absolute inset-x-2 -bottom-px h-0.5 rounded-full transition-transform duration-300 ease-out-expo ${
                  selected ? 'scale-x-100 bg-accent' : 'scale-x-0 bg-transparent'
                }`}
              />
            </button>
          )
        })}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          id={`${baseId}-panel-${item.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${item.id}`}
          hidden={item.id !== active}
          className="pt-4"
        >
          {item.content}
        </div>
      ))}
    </div>
  )
}

import { useId, useState, type ReactNode } from 'react'

export interface TabItem {
  id: string
  label: string
  content: ReactNode
}

interface TabsProps {
  items: TabItem[]
  ariaLabel: string
}

export function Tabs({ items, ariaLabel }: TabsProps) {
  const [active, setActive] = useState(items[0]?.id)
  const baseId = useId()

  if (items.length === 0) return null

  return (
    <div>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="flex flex-wrap gap-1.5 border-b border-subtle pb-px"
      >
        {items.map((item) => {
          const selected = item.id === active
          return (
            <button
              key={item.id}
              id={`${baseId}-tab-${item.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              onClick={() => setActive(item.id)}
              className={`relative rounded-t-md px-3.5 py-2 font-mono text-xs transition-colors duration-200 ${
                selected
                  ? 'text-ink'
                  : 'text-mid-dark hover:text-ink'
              }`}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={`absolute inset-x-2 -bottom-px h-0.5 rounded-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
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

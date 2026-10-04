import { useEffect, useRef, useState } from 'react'
import { highlight, type CodeLang } from '../lib/shiki'

const LANG_LABEL: Record<CodeLang, string> = {
  js: 'JavaScript',
  ts: 'TypeScript',
  tsx: 'TSX',
  jsx: 'JSX',
  html: 'HTML',
  css: 'CSS',
  scss: 'SCSS',
  bash: 'Shell',
  json: 'JSON',
  diff: 'Diff',
}

interface CodeBlockProps {
  code: string
  lang: CodeLang
  filename?: string
}

export function CodeBlock({ code, lang, filename }: CodeBlockProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [html, setHtml] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  // Fetch the (heavy) highlighter only once this block is near the viewport.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let cancelled = false
    let started = false

    const run = async () => {
      started = true
      const result = await highlight(code.trimEnd(), lang)
      if (!cancelled && result) setHtml(result)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !started) {
          void run()
          observer.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    observer.observe(el)
    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [code, lang])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code.trimEnd())
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  return (
    <figure
      ref={ref}
      className="group relative my-0 overflow-hidden rounded-xl border border-ink-line bg-ink text-paper"
    >
      <figcaption className="flex items-center gap-3 border-b border-ink-line/80 bg-ink-soft px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-accent/70" />
          <span className="size-2.5 rounded-full bg-green/60" />
          <span className="size-2.5 rounded-full bg-blue/60" />
        </span>
        <span className="font-mono text-[11px] tracking-wide text-mid">
          {filename ?? LANG_LABEL[lang]}
        </span>
        <button
          type="button"
          onClick={copy}
          className="ml-auto rounded-md border border-ink-line px-2.5 py-1 font-mono text-[11px] text-mid transition-colors duration-200 hover:border-mid hover:text-paper active:scale-[0.96]"
        >
          {copied ? '已复制 ✓' : '复制'}
        </button>
      </figcaption>

      <div className="scroll-slim overflow-x-auto text-[13px] leading-[1.7]">
        {html ? (
          <div
            className="shiki-host [&_pre]:!bg-transparent [&_pre]:m-0 [&_pre]:p-4 [&_code]:font-mono"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <pre className="m-0 p-4 font-mono text-mid">
            <code>{code.trimEnd()}</code>
          </pre>
        )}
      </div>
    </figure>
  )
}

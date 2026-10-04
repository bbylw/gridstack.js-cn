import { createHighlighterCore, type HighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

export type CodeLang =
  | 'js'
  | 'ts'
  | 'tsx'
  | 'jsx'
  | 'html'
  | 'css'
  | 'scss'
  | 'bash'
  | 'json'
  | 'diff'

const THEME = 'github-dark-default'

// Shiki (with its grammars) is heavy, so it is code-split and only fetched the
// first time a code block scrolls into view.
let highlighterPromise: Promise<HighlighterCore> | null = null

function loadHighlighter(): Promise<HighlighterCore> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      themes: [import('shiki/themes/github-dark-default.mjs')],
      langs: [
        import('shiki/langs/javascript.mjs'),
        import('shiki/langs/typescript.mjs'),
        import('shiki/langs/tsx.mjs'),
        import('shiki/langs/jsx.mjs'),
        import('shiki/langs/html.mjs'),
        import('shiki/langs/css.mjs'),
        import('shiki/langs/scss.mjs'),
        import('shiki/langs/bash.mjs'),
        import('shiki/langs/json.mjs'),
        import('shiki/langs/diff.mjs'),
      ],
      // Pure-JS regex engine — no WASM fetch, works everywhere.
      engine: createJavaScriptRegexEngine({ forgiving: true }),
    })
  }
  return highlighterPromise
}

/** Returns highlighted HTML, or null while shiki is still loading. */
export async function highlight(
  code: string,
  lang: CodeLang,
): Promise<string | null> {
  try {
    const hl = await loadHighlighter()
    return hl.codeToHtml(code, { lang, theme: THEME })
  } catch {
    return null
  }
}

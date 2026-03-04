import { createHighlighter, type ThemedToken } from 'shiki'

const THEME = {
  name: 'kasumi-warm',
  type: 'dark' as const,
  settings: [
    { settings: { foreground: '#c4b8a4' } },
    { scope: ['string', 'string.quoted'], settings: { foreground: '#a3be8c' } },
    { scope: ['constant.numeric'], settings: { foreground: '#d08770' } },
    {
      scope: ['entity.name.function', 'support.function'],
      settings: { foreground: '#c4956a' },
    },
    {
      scope: [
        'keyword',
        'storage.type',
        'storage.modifier',
        'keyword.control',
        'keyword.operator.new',
      ],
      settings: { foreground: '#d4a276' },
    },
    {
      scope: ['punctuation', 'keyword.operator', 'keyword.operator.assignment'],
      settings: { foreground: '#a89882' },
    },
    {
      scope: [
        'entity.name.tag',
        'support.class.component',
        'punctuation.definition.tag',
      ],
      settings: { foreground: '#d4a276' },
    },
    {
      scope: ['entity.other.attribute-name'],
      settings: { foreground: '#c4b8a4' },
    },
    {
      scope: ['variable', 'variable.other'],
      settings: { foreground: '#c4b8a4' },
    },
    {
      scope: ['constant.language.boolean'],
      settings: { foreground: '#d08770' },
    },
    {
      scope: ['entity.name.type', 'support.type'],
      settings: { foreground: '#c4956a' },
    },
  ],
  colors: {
    'editor.background': '#1e1b16',
    'editor.foreground': '#c4b8a4',
  },
}

let highlighterPromise: ReturnType<typeof createHighlighter> | null = null

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [THEME],
      langs: ['tsx'],
    })
  }
  return highlighterPromise
}

export async function highlightCode(
  code: string
): Promise<Array<Array<ThemedToken>>> {
  const highlighter = await getHighlighter()
  const { tokens } = highlighter.codeToTokens(code, {
    lang: 'tsx',
    theme: 'kasumi-warm',
  })
  return tokens
}

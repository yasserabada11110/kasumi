export type Segment = {
  char: string
  status: 'hidden' | 'blurring' | 'visible'
}

export type BlurOptions = {
  /** Whether blur animation is enabled. Default: true */
  enabled?: boolean
  /** Max blur radius in px. Default: 8 */
  maxBlur?: number
  /** Duration of blur-to-clear animation in ms. Default: 600 */
  duration?: number
}

export type FeelPreset = 'cinematic' | 'snappy' | 'playful'

export type FeelConfig = {
  /** Base delay between characters in ms */
  baseDelay: number
  /** Deceleration curve — multiplier applied over progress (0→1) */
  curve: (progress: number) => number
}

export type UseTypewriterOptions = {
  /** Single string or array of strings to cycle through */
  strings: string | Array<string>
  /** Typing feel: preset name or custom config */
  feel?: FeelPreset | FeelConfig
  /** Blur trail configuration */
  blur?: BlurOptions | false
  /** Whether to loop through strings (only for arrays). Default: false */
  loop?: boolean
  /** Pause between finishing one string and deleting it in ms. Default: 2000 */
  pauseBetween?: number
  /** Delete speed multiplier relative to typing speed. Default: 0.5 */
  deleteSpeed?: number
  /** Whether to start automatically. Default: true */
  autoStart?: boolean
}

export type TypewriterPhase = 'typing' | 'pausing' | 'deleting' | 'done'

export type UseTypewriterResult = {
  /** Current segments to render */
  segments: Array<Segment>
  /** Ref callback to attach to each character span */
  refCallback: (index: number) => (el: HTMLElement | null) => void
  /** Current phase of the typewriter */
  phase: TypewriterPhase
  /** Index of the current string being typed (for arrays) */
  currentStringIndex: number
  /** Restart the animation from the beginning */
  restart: () => void
}

export type TypewriterProps = Omit<UseTypewriterOptions, 'strings'> & {
  /** Single string or array of strings to cycle through */
  strings: string | Array<string>
  /** Wrapper element type. Default: "span" */
  as?: keyof HTMLElementTagNameMap
  /** Class name for the wrapper */
  className?: string
  /** Inline styles for the wrapper */
  style?: React.CSSProperties
  /** Class name for each character span */
  charClassName?: string
  /** Render prop for custom rendering */
  children?: (result: UseTypewriterResult) => React.ReactNode
}

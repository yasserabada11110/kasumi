import type { FeelConfig, FeelPreset } from './types'

const PRESETS: Record<FeelPreset, FeelConfig> = {
  cinematic: {
    baseDelay: 80,
    curve: (p) => 1 + p * 1.8,
  },
  snappy: {
    baseDelay: 40,
    curve: (p) => 1 + p * 0.6,
  },
  playful: {
    baseDelay: 60,
    curve: (p) => 1 + Math.sin(p * Math.PI) * 0.8,
  },
}

export function resolveFeelConfig(
  feel: FeelPreset | FeelConfig | undefined
): FeelConfig {
  if (!feel) return PRESETS.cinematic
  if (typeof feel === 'string') return PRESETS[feel]
  return feel
}

/**
 * Returns the delay for a character at a given index within a string of total length.
 * Applies the deceleration curve so later characters are typed slower.
 * Adds slight natural jitter (±15%) for organic feel.
 */
export function getCharDelay(
  index: number,
  totalLength: number,
  config: FeelConfig
): number {
  const progress = totalLength <= 1 ? 0 : index / (totalLength - 1)
  const multiplier = config.curve(progress)
  const jitter = 0.85 + Math.random() * 0.3 // 0.85–1.15
  return Math.round(config.baseDelay * multiplier * jitter)
}

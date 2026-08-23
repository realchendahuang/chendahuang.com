import { describe, it, expect } from 'vitest'
import {
  formatCount,
  formatMonthLabel,
  getHighlightCategory,
  HIGHLIGHT_CATEGORIES
} from './highlights'

describe('formatCount', () => {
  it('renders small numbers as-is', () => {
    expect(formatCount(0)).toBe('0')
    expect(formatCount(42)).toBe('42')
    expect(formatCount(999)).toBe('999')
  })

  it('renders thousands with k suffix', () => {
    expect(formatCount(1000)).toBe('1k')
    expect(formatCount(1500)).toBe('1.5k')
    expect(formatCount(37000)).toBe('3.7w')
  })

  it('renders ten-thousands with w suffix', () => {
    expect(formatCount(10000)).toBe('1w')
    expect(formatCount(12500)).toBe('1.3w')
    expect(formatCount(100000)).toBe('10w')
  })

  it('treats undefined as 0', () => {
    expect(formatCount(undefined)).toBe('0')
  })
})

describe('formatMonthLabel', () => {
  it('renders year and month in Chinese', () => {
    expect(formatMonthLabel('2026-08-20')).toBe('2026 年 8 月')
    expect(formatMonthLabel(new Date('2025-01-01'))).toBe('2025 年 1 月')
  })

  it('returns empty string for invalid input', () => {
    expect(formatMonthLabel('not-a-date')).toBe('')
  })
})

describe('getHighlightCategory', () => {
  it('finds known categories', () => {
    expect(getHighlightCategory('cloudflare')?.label).toBe('Cloudflare')
    expect(getHighlightCategory('ai')?.color).toBe('#00dc82')
  })

  it('returns undefined for unknown id', () => {
    expect(getHighlightCategory('nope')).toBeUndefined()
    expect(getHighlightCategory(undefined)).toBeUndefined()
  })
})

describe('HIGHLIGHT_CATEGORIES', () => {
  it('contains the seven core categories', () => {
    const ids = HIGHLIGHT_CATEGORIES.map(c => c.id)
    expect(ids).toContain('cloudflare')
    expect(ids).toContain('tools')
    expect(ids).toContain('ai')
    expect(ids).toContain('product')
    expect(ids).toContain('opc')
    expect(ids).toContain('growth')
    expect(ids).toContain('essay')
  })

  it('every category has label, description, and color', () => {
    for (const c of HIGHLIGHT_CATEGORIES) {
      expect(c.label.length).toBeGreaterThan(0)
      expect(c.description.length).toBeGreaterThan(0)
      expect(c.color).toMatch(/^#[0-9a-f]{6}$/i)
    }
  })
})

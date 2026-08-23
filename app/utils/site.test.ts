import { describe, it, expect } from 'vitest'
import {
  SITE_NAME,
  SITE_URL,
  toAbsoluteUrl,
  toCanonicalUrl,
  toIsoDate,
  formatDisplayDate,
  formatShortDate,
  escapeXml
} from './site'

describe('toCanonicalUrl', () => {
  it('root path normalizes to trailing slash', () => {
    expect(toCanonicalUrl('/')).toBe('https://chendahuang.com/')
  })

  it('trailing slash is added for non-file paths', () => {
    expect(toCanonicalUrl('/blog')).toBe('https://chendahuang.com/blog/')
    expect(toCanonicalUrl('/projects/')).toBe('https://chendahuang.com/projects/')
  })

  it('preserves existing trailing slash', () => {
    expect(toCanonicalUrl('/about/')).toBe('https://chendahuang.com/about/')
  })

  it('does not add slash to file extensions', () => {
    expect(toCanonicalUrl('/sitemap.xml')).toBe('https://chendahuang.com/sitemap.xml')
    expect(toCanonicalUrl('/rss.xml')).toBe('https://chendahuang.com/rss.xml')
    expect(toCanonicalUrl('/avatar.jpg')).toBe('https://chendahuang.com/avatar.jpg')
  })

  it('strips query string and hash', () => {
    expect(toCanonicalUrl('/blog?tag=AI')).toBe('https://chendahuang.com/blog/')
    expect(toCanonicalUrl('/blog#section')).toBe('https://chendahuang.com/blog/')
  })
})

describe('toAbsoluteUrl', () => {
  it('joins relative path against SITE_URL', () => {
    expect(toAbsoluteUrl('/avatar.jpg')).toBe('https://chendahuang.com/avatar.jpg')
  })

  it('passes through absolute URL', () => {
    expect(toAbsoluteUrl('https://example.com/x')).toBe('https://example.com/x')
  })
})

describe('toIsoDate', () => {
  it('converts Date object to ISO string', () => {
    expect(toIsoDate(new Date('2026-01-15T10:00:00Z'))).toBe('2026-01-15T10:00:00.000Z')
  })

  it('parses string input', () => {
    expect(toIsoDate('2026-08-20')).toBe('2026-08-20T00:00:00.000Z')
  })
})

describe('formatDisplayDate', () => {
  it('renders Chinese long form', () => {
    expect(formatDisplayDate('2026-08-20')).toContain('2026')
    expect(formatDisplayDate('2026-08-20')).toContain('8')
  })
})

describe('formatShortDate', () => {
  it('uses dotted form with zero-padding', () => {
    const out = formatShortDate('2026-01-05')
    expect(out).toBe('2026.01.05')
  })
})

describe('escapeXml', () => {
  it('escapes the five XML special characters', () => {
    expect(escapeXml('a & b < c > d "e" \'f\''))
      .toBe('a &amp; b &lt; c &gt; d &quot;e&quot; &apos;f&apos;')
  })

  it('is a no-op on plain text', () => {
    expect(escapeXml('hello world')).toBe('hello world')
  })
})

describe('constants', () => {
  it('SITE_URL is the canonical production domain', () => {
    expect(SITE_URL).toBe('https://chendahuang.com')
  })

  it('SITE_NAME is non-empty', () => {
    expect(SITE_NAME.length).toBeGreaterThan(0)
  })
})

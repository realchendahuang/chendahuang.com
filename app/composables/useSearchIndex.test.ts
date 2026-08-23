import { describe, it, expect } from 'vitest'
import { matchKeyword, buildHaystack, filterHits, type SearchHit } from './useSearchIndex'

const sample: SearchHit[] = [
  { title: 'Cloudflare 穷鬼全家桶', description: '独立开发者的零成本技术栈', to: '/blog/cf', section: '博客' },
  { title: 'AI Chronicle', description: 'AI 行业编年史', to: '/projects/ai-chronicle', section: '项目' },
  { title: 'DeepSeek V4 Flash', description: '便宜好用', to: '/blog/deepseek', section: '博客' }
]

describe('matchKeyword', () => {
  it('returns true for empty keyword', () => {
    expect(matchKeyword('anything', '')).toBe(true)
    expect(matchKeyword('anything', '   ')).toBe(true)
  })

  it('matches case-insensitive single keyword', () => {
    expect(matchKeyword('Cloudflare 全家桶', 'cloudflare')).toBe(true)
    expect(matchKeyword('Cloudflare 全家桶', 'CLOUDFLARE')).toBe(true)
  })

  it('requires every part to appear as a substring', () => {
    expect(matchKeyword('Cloudflare 穷鬼 全家桶', 'cloudflare')).toBe(true)
    expect(matchKeyword('Cloudflare 穷鬼 全家桶', '穷鬼 全家桶')).toBe(true)
    expect(matchKeyword('Cloudflare 穷鬼 全家桶', 'cloudflare 别的')).toBe(false)
  })
})

describe('buildHaystack', () => {
  it('combines title, description, category and section lowercased', () => {
    const haystack = buildHaystack({
      title: 'A',
      description: 'B',
      section: '博客',
      category: 'AI'
    })
    expect(haystack).toBe('a b ai 博客')
  })
})

describe('filterHits', () => {
  it('returns all items when keyword is empty', () => {
    expect(filterHits(sample, '')).toHaveLength(3)
  })

  it('filters by keyword', () => {
    expect(filterHits(sample, 'cloudflare')).toHaveLength(1)
    expect(filterHits(sample, 'AI')).toHaveLength(1)
  })

  it('honors limit', () => {
    expect(filterHits(sample, '', 2)).toHaveLength(2)
  })

  it('limit applied after filter', () => {
    expect(filterHits(sample, '博客', 1)).toHaveLength(1)
  })
})

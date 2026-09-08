import { describe, expect, it } from 'vitest'
import { toCanonicalPath, isTrackablePath } from './analytics'

describe('toCanonicalPath', () => {
  it('默认语言(zh)无前缀,原样返回', () => {
    expect(toCanonicalPath('/blog/hello')).toBe('/blog/hello')
    expect(toCanonicalPath('/')).toBe('/')
    expect(toCanonicalPath('/projects')).toBe('/projects')
  })

  it('剥掉语言前缀,多语言聚合到同一路径', () => {
    expect(toCanonicalPath('/en/blog/hello')).toBe('/blog/hello')
    expect(toCanonicalPath('/en')).toBe('/')
    expect(toCanonicalPath('/ja/projects')).toBe('/projects')
  })

  it('zh-Hant 先于 zh 匹配,不会误剥', () => {
    expect(toCanonicalPath('/zh-Hant/blog/hello')).toBe('/blog/hello')
    expect(toCanonicalPath('/zh/blog/hello')).toBe('/zh/blog/hello')
  })

  it('去掉尾斜杠(保留根路径)', () => {
    expect(toCanonicalPath('/blog/hello/')).toBe('/blog/hello')
    expect(toCanonicalPath('/en/blog/hello/')).toBe('/blog/hello')
  })

  it('非法输入返回 null', () => {
    expect(toCanonicalPath('blog/hello')).toBeNull()
    expect(toCanonicalPath('')).toBeNull()
    expect(toCanonicalPath(undefined as unknown as string)).toBeNull()
  })
})

describe('isTrackablePath', () => {
  it('排除系统/API/私密路径', () => {
    expect(isTrackablePath('/_payload.json')).toBe(false)
    expect(isTrackablePath('/api/track')).toBe(false)
    expect(isTrackablePath('/stats')).toBe(false)
    expect(isTrackablePath('/rss.xml')).toBe(false)
    expect(isTrackablePath('/sitemap.xml')).toBe(false)
    expect(isTrackablePath('/llms.txt')).toBe(false)
    expect(isTrackablePath('/dump.blog.sql')).toBe(false)
  })

  it('保留内容路径', () => {
    expect(isTrackablePath('/')).toBe(true)
    expect(isTrackablePath('/blog/hello')).toBe(true)
    expect(isTrackablePath('/projects')).toBe(true)
  })
})

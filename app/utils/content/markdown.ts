/**
 * 将 @nuxt/content 的 minimark 树（数据库 body 字段）转换为 HTML 字符串。
 * 仅用于服务端（RSS 全文输出），避免引入额外依赖。
 */

type MinimarkNode = string | [string, Record<string, unknown>, ...MinimarkNode[]]

const VOID_TAGS = new Set(['img', 'br', 'hr', 'input', 'meta', 'link'])

const escapeHtml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')

const serializeAttributes = (props: Record<string, unknown>) => {
  return Object.entries(props)
    .filter(([key, value]) => key !== 'code' && value !== undefined && value !== null && value !== false)
    .map(([key, value]) => {
      if (key === 'className') {
        return `class="${escapeHtml(Array.isArray(value) ? value.join(' ') : String(value))}"`
      }
      if (Array.isArray(value)) {
        return `${key}="${escapeHtml(value.join(' '))}"`
      }
      return `${key}="${escapeHtml(String(value))}"`
    })
    .join(' ')
}

const serializeNode = (node: MinimarkNode): string => {
  if (typeof node === 'string') {
    return escapeHtml(node)
  }
  const [tag, props, ...children] = node
  const attrs = serializeAttributes(props)
  const attrString = attrs ? ` ${attrs}` : ''

  if (VOID_TAGS.has(tag)) {
    return `<${tag}${attrString}>`
  }

  // 代码块：pre 节点带 code 属性（已高亮的 HTML），直接输出
  if (tag === 'pre' && typeof props.code === 'string') {
    return `<pre${attrString}>${props.code}</pre>`
  }

  const inner = children.map(serializeNode).join('')
  return `<${tag}${attrString}>${inner}</${tag}>`
}

export const minimarkToHtml = (body: unknown): string => {
  if (!body || typeof body !== 'object') {
    return ''
  }
  const value = (body as { value?: MinimarkNode[] }).value
  if (!Array.isArray(value)) {
    return ''
  }
  return value.map(serializeNode).join('')
}

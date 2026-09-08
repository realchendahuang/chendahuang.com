import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const createButtonSchema = () => z.object({
  label: z.string(),
  icon: z.string().optional(),
  to: z.string().optional(),
  color: z.enum(['primary', 'neutral', 'success', 'warning', 'error', 'info']).optional(),
  size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
  variant: z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional(),
  target: z.enum(['_blank', '_self']).optional()
})

const createImageSchema = () => z.object({
  src: z.string().editor({ input: 'media' }),
  alt: z.string()
})

const createAuthorSchema = () => z.object({
  name: z.string(),
  description: z.string().optional(),
  username: z.string().optional(),
  twitter: z.string().optional(),
  to: z.string().optional(),
  avatar: createImageSchema().optional()
})

export default defineContentConfig({
  collections: {
    index: defineCollection({
      type: 'page',
      source: [
        { include: 'index.yml' },
        { include: 'index.en.yml' },
        { include: 'index.ja.yml' },
        { include: 'index.es.yml' },
        { include: 'index.pt.yml' },
        { include: 'index.fr.yml' },
        { include: 'index.de.yml' },
        { include: 'index.ar.yml' },
        { include: 'index.ru.yml' },
        { include: 'index.ko.yml' },
        { include: 'index.zh-Hant.yml' },
        { include: 'index.vi.yml' },
        { include: 'index.id.yml' },
        { include: 'index.tr.yml' },
        { include: 'index.hi.yml' },
        { include: 'index.pl.yml' },
        { include: 'index.fa.yml' }
      ],
      schema: z.object({
        locale: z.string().default('zh'),
        hero: z.object({
          links: z.array(createButtonSchema()).default([]),
          images: z.array(createImageSchema()).default([])
        }),
        blog: z.object({ title: z.string() }),
        highlights: z.object({
          title: z.string(),
          links: z.array(createButtonSchema()).default([])
        })
      })
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        locale: z.string().default('zh'),
        minRead: z.number(),
        date: z.date(),
        updated: z.date().optional(),
        image: z.string().editor({ input: 'media' }).optional(),
        author: createAuthorSchema(),
        source: z.string().optional(),
        sourceUrl: z.string().url().optional(),
        tags: z.array(z.string()).default([]),
        original: z.boolean().default(false),
        pinned: z.boolean().default(false)
      })
    }),
    pages: defineCollection({
      type: 'page',
      source: [
        { include: 'blog.yml' },
        { include: 'blog.en.yml' },
        { include: 'blog.ja.yml' },
        { include: 'blog.es.yml' },
        { include: 'blog.pt.yml' },
        { include: 'blog.fr.yml' },
        { include: 'blog.de.yml' },
        { include: 'blog.ar.yml' },
        { include: 'blog.ru.yml' },
        { include: 'blog.ko.yml' },
        { include: 'blog.zh-Hant.yml' },
        { include: 'blog.vi.yml' },
        { include: 'blog.id.yml' },
        { include: 'blog.tr.yml' },
        { include: 'blog.hi.yml' },
        { include: 'blog.pl.yml' },
        { include: 'blog.fa.yml' },
        { include: 'projects.yml' },
        { include: 'projects.en.yml' },
        { include: 'projects.ja.yml' },
        { include: 'projects.es.yml' },
        { include: 'projects.pt.yml' },
        { include: 'projects.fr.yml' },
        { include: 'projects.de.yml' },
        { include: 'projects.ar.yml' },
        { include: 'projects.ru.yml' },
        { include: 'projects.ko.yml' },
        { include: 'projects.zh-Hant.yml' },
        { include: 'projects.vi.yml' },
        { include: 'projects.id.yml' },
        { include: 'projects.tr.yml' },
        { include: 'projects.hi.yml' },
        { include: 'projects.pl.yml' },
        { include: 'projects.fa.yml' },
        { include: 'playbooks.yml' },
        { include: 'playbooks.en.yml' },
        { include: 'playbooks.ja.yml' },
        { include: 'playbooks.es.yml' },
        { include: 'playbooks.pt.yml' },
        { include: 'playbooks.fr.yml' },
        { include: 'playbooks.de.yml' },
        { include: 'playbooks.ar.yml' },
        { include: 'playbooks.ru.yml' },
        { include: 'playbooks.ko.yml' },
        { include: 'playbooks.zh-Hant.yml' },
        { include: 'playbooks.vi.yml' },
        { include: 'playbooks.id.yml' },
        { include: 'playbooks.tr.yml' },
        { include: 'playbooks.hi.yml' },
        { include: 'playbooks.pl.yml' },
        { include: 'playbooks.fa.yml' },
        { include: 'skills.yml' },
        { include: 'skills.en.yml' },
        { include: 'skills.ja.yml' },
        { include: 'skills.es.yml' },
        { include: 'skills.pt.yml' },
        { include: 'skills.fr.yml' },
        { include: 'skills.de.yml' },
        { include: 'skills.ar.yml' },
        { include: 'skills.ru.yml' },
        { include: 'skills.ko.yml' },
        { include: 'skills.zh-Hant.yml' },
        { include: 'skills.vi.yml' },
        { include: 'skills.id.yml' },
        { include: 'skills.tr.yml' },
        { include: 'skills.hi.yml' },
        { include: 'skills.pl.yml' },
        { include: 'skills.fa.yml' },
        { include: 'highlights.yml' },
        { include: 'highlights.en.yml' },
        { include: 'highlights.ja.yml' },
        { include: 'highlights.es.yml' },
        { include: 'highlights.pt.yml' },
        { include: 'highlights.fr.yml' },
        { include: 'highlights.de.yml' },
        { include: 'highlights.ar.yml' },
        { include: 'highlights.ru.yml' },
        { include: 'highlights.ko.yml' },
        { include: 'highlights.zh-Hant.yml' },
        { include: 'highlights.vi.yml' },
        { include: 'highlights.id.yml' },
        { include: 'highlights.tr.yml' },
        { include: 'highlights.hi.yml' },
        { include: 'highlights.pl.yml' },
        { include: 'highlights.fa.yml' },
        { include: 'friends.yml' },
        { include: 'friends.en.yml' },
        { include: 'friends.ja.yml' },
        { include: 'friends.es.yml' },
        { include: 'friends.pt.yml' },
        { include: 'friends.fr.yml' },
        { include: 'friends.de.yml' },
        { include: 'friends.ar.yml' },
        { include: 'friends.ru.yml' },
        { include: 'friends.ko.yml' },
        { include: 'friends.zh-Hant.yml' },
        { include: 'friends.vi.yml' },
        { include: 'friends.id.yml' },
        { include: 'friends.tr.yml' },
        { include: 'friends.hi.yml' },
        { include: 'friends.pl.yml' },
        { include: 'friends.fa.yml' }
      ],
      schema: z.object({
        locale: z.string().default('zh'),
        links: z.array(createButtonSchema()).default([])
      })
    }),
    projects: defineCollection({
      type: 'data',
      source: 'projects/*.yml',
      schema: z.object({
        locale: z.string().default('zh'),
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        type: z.string().nonempty(),
        url: z.string().nonempty(),
        onlineUrl: z.string().optional(),
        image: z.string().nonempty().optional(),
        imageAlt: z.string().nonempty().optional(),
        icon: z.string().editor({ input: 'icon' }).optional(),
        color: z.string().optional(),
        tags: z.array(z.string()).default([]),
        date: z.date(),
        status: z.enum(['ongoing', 'stable', 'archived']).default('ongoing'),
        stars: z.number().optional()
      })
    }),
    playbooks: defineCollection({
      type: 'data',
      source: 'playbooks/*.yml',
      schema: z.object({
        locale: z.string().default('zh'),
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        url: z.string().nonempty(),
        onlineUrl: z.string().nonempty(),
        icon: z.string().editor({ input: 'icon' }).optional(),
        color: z.string().optional(),
        tags: z.array(z.string()).default([]),
        date: z.date(),
        status: z.enum(['ongoing', 'stable', 'archived']).default('ongoing'),
        stars: z.number().optional()
      })
    }),
    skills: defineCollection({
      type: 'data',
      source: 'skills/*.yml',
      schema: z.object({
        locale: z.string().default('zh'),
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        url: z.string().nonempty(),
        onlineUrl: z.string().optional(),
        install: z.string().optional(),
        icon: z.string().editor({ input: 'icon' }).optional(),
        color: z.string().optional(),
        tags: z.array(z.string()).default([]),
        date: z.date(),
        stars: z.number().optional()
      })
    }),
    highlights: defineCollection({
      type: 'data',
      source: 'highlights/*.yml',
      schema: z.object({
        locale: z.string().default('zh'),
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        category: z.enum([
          'cloudflare',
          'tools',
          'ai',
          'product',
          'opc',
          'growth',
          'essay'
        ]),
        date: z.date(),
        likes: z.number().default(0),
        bookmarks: z.number().default(0),
        reposts: z.number().default(0),
        views: z.number().default(0),
        url: z.string().url(),
        content: z.string().nonempty()
      })
    }),
    friends: defineCollection({
      type: 'data',
      source: 'friends/*.yml',
      schema: z.object({
        locale: z.string().default('zh'),
        name: z.string().nonempty(),
        description: z.string().nonempty(),
        url: z.string().url(),
        avatar: z.string().optional()
      })
    })
  }
})

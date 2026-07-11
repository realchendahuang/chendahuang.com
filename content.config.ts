import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const createBaseSchema = () => z.object({
  title: z.string(),
  description: z.string()
})

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
      source: 'index.yml',
      schema: z.object({
        hero: z.object({
          links: z.array(createButtonSchema()).default([]),
          images: z.array(createImageSchema()).default([])
        }),
        about: createBaseSchema(),
        blog: createBaseSchema(),
        highlights: createBaseSchema().extend({
          links: z.array(createButtonSchema()).default([])
        })
      })
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        minRead: z.number(),
        date: z.date(),
        image: z.string().editor({ input: 'media' }).optional(),
        author: createAuthorSchema(),
        source: z.string().optional(),
        sourceUrl: z.string().url().optional()
      })
    }),
    pages: defineCollection({
      type: 'page',
      source: [
        { include: 'blog.yml' },
        { include: 'projects.yml' },
        { include: 'playbooks.yml' },
        { include: 'skills.yml' },
        { include: 'highlights.yml' }
      ],
      schema: z.object({
        links: z.array(createButtonSchema()).default([])
      })
    }),
    about: defineCollection({
      type: 'page',
      source: 'about.yml',
      schema: z.object({
        content: z.object({}),
        images: z.array(createImageSchema()).default([])
      })
    }),
    projects: defineCollection({
      type: 'data',
      source: 'projects/*.yml',
      schema: z.object({
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
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        date: z.date(),
        likes: z.number().default(0),
        bookmarks: z.number().default(0),
        reposts: z.number().default(0),
        views: z.number().default(0),
        url: z.string().url(),
        content: z.string().nonempty()
      })
    })
  }
})

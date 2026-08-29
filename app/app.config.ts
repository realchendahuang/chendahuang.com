export default defineAppConfig({
  global: {
    picture: {
      dark: '/avatar.jpg',
      light: '/avatar.jpg',
      alt: '陈大黄的头像'
    },
    email: 'chendanhuang31016@gmail.com',
    sponsorLink: 'https://afdian.com/'
  },
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral'
    },
    pageHero: {
      slots: {
        container: 'py-14 sm:py-20 lg:py-24',
        title: 'mx-auto max-w-xl text-pretty text-2xl sm:text-3xl lg:text-4xl',
        description: 'mt-2 text-base mx-auto max-w-2xl text-pretty text-muted'
      }
    }
  }
})

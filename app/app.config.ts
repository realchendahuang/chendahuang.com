export default defineAppConfig({
  global: {
    picture: {
      dark: '/avatar.jpg',
      light: '/avatar.jpg',
      alt: '陈大黄的头像'
    },
    meetingLink: 'https://x.com/realchendahuang',
    email: 'chendanhuang31016@gmail.com',
    available: true
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
  },
  footer: {
    credits: `© ${new Date().getFullYear()} 陈大黄`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-x',
      'to': 'https://x.com/realchendahuang',
      'target': '_blank',
      'aria-label': '陈大黄 on X'
    }, {
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/realchendahuang',
      'target': '_blank',
      'aria-label': '陈大黄 on GitHub'
    }]
  }
})

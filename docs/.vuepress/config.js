module.exports = {
  title: 'Vue Taiwan ID',
  description: 'Validator for Taiwan ID System',
  lastUpdated: 'Last Updated',
  themeConfig: {
    repo: 'PhantasWeng/vue-taiwan-id',
    displayAllHeaders: true,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' }
    ]
  },
  plugins: [
    ['@vuepress/last-updated'],
    ['@vuepress/active-header-links', {
      sidebarLinkSelector: '.sidebar-link',
      headerAnchorSelector: '.header-anchor'
    }]
  ]
}

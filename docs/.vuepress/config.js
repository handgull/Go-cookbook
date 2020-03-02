module.exports = {
  title: 'Go',
  description: 'Golang: Semplice ed efficente',
  themeConfig: {
    logo: '/assets/img/logo.png',
    repo: 'handgull/Golang-cookbook/',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Help us improve this page!',
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'Go', link: '/go/' }
    ],
    sidebar: {
      '/go/': getGoSidebar('Go')
    },
    smoothScroll: true
  },
  plugins: [
    '@vuepress/back-to-top',
    '@vuepress/medium-zoom',
    ['@vuepress/pwa', {
      serviceWorker: true,
      popupComponent: 'MySWUpdatePopup',
      updatePopup: true
    }],
    ['vuepress-plugin-code-copy', true]
  ]
}

function getGoSidebar (groupA) {
  return [
    {
      title: groupA,
      collapsable: false,
      sidebarDepth: 2,
      children: [
        '',
        './structs-pointers-maps/',
        './interfaces/'
      ]
    }
  ]
}

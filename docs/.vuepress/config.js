module.exports = {
    title: 'js 文档',  // 设置网站标题
    description : 'js',
    base : '/',
    host:'localhost',
    cache:true,
    themeConfig : {
      nav : [
          { text: '接口定义', link: '/apiword' },
          { text: '接口字段定义', link: '/api' },
          { text: '附录：错误码', link: '/error' }
      ],
      sidebar: {
          '/' : [
              "/", //指的是根目录的md文件 也就是 README.md 里面的内容
              "apiword",  
              "api",
              "error"
          ]
      },
      sidebarDepth : 2
    }
  }
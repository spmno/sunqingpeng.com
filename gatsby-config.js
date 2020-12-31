module.exports = {
  siteMetadata: {
    title: `孙庆鹏的Blog`,
    author: `孙庆鹏`,
    description: `技术文章随笔，前沿技术，Android、Flutter、React、Gatsby、C++、JavaScript、嵌入式、汽车电子`,
    keywords: `前沿技术，Android，Flutter，React，Gatsby，C++，JavaScript，嵌入式，汽车电子`,
    siteUrl: `http://www.sunqingpeng.com`,
    social: {
      weixin: `zhongyichengxuyuan`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          `gatsby-remark-emoji`,  
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `孙庆鹏的Blog`,
        short_name: `sunqp`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/webwxgeticon.jpeg`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: 'gatsby-plugin-baidu-tongji',
      options: {
        siteid: 'fba288428f358adcc1cf7c844597109a',
        head: false
      },
    },  
    {
      resolve: 'gatsby-plugin-antd',
      options: {
        style: true
      }
  },
  {
    resolve: `gatsby-plugin-sitemap`,
    options: {
      
    }
  },
  {
    resolve: 'gatsby-plugin-robots-txt',
    options: {
      host: 'http://www.sunmou.cn',
      sitemap: 'http://www.sunmou.cn/sitemap.xml',
      policy: [{ userAgent: '*', allow: '/' }]
    }
  }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

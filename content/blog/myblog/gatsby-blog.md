---
title: 用gatsby建立自己的博客
date: "2020-02-23T12:42:03.284Z"
description: "根据gatsby官网指导来建立自己的博客"
tags: ["gatsby", "blog"]
---

本文不是从零开始建立，是根据官方提供的Blog模板建立

1. 根据模板建立基础工程：

`gatsby new my-blog https://github.com/gatsbyjs/gatsby-starter-blog-theme`

根据自己的信息，修改`gatsby-config`文件。

title: 博客标题，显示在首页的最上面。  
author, description: 作者及博客相关描述。  
siteUrl: 博客地址。  
social: 原来是作者的twitter，可以改成我们的微信ID。  

增加[百度统计](tongji.baidu.com)：
`yarn add gatsby-plugin-baidu-tongji`

      resolve: 'gatsby-plugin-baidu-tongji',
      options: {
        siteid: 在百度申请的ID // 在百度统计获取代码变量hm.src 后面的32位的ID
        head: false
      }

加到文件的plugins的子项里面。

基本配置后，`gatsby develop` 就可以在 <http://localhost:8000>  看到博客的基本效果了。
在content的blog目录下，写markdown文件，就可以显示到自己的博客里了。

2. 分页

完成了第1部分，基本上一个最简单的博客就完成了。但是写的多了，没有分页，体验不好。接下来介绍一下如何加分页功能。

在原来的模板中，index.js 负责主页的显示。如果分页的话，应该需要自己写代码建立主页了。

从[gastby的文档](https://www.gatsbyjs.org/docs/creating-and-modifying-pages/)里可以知道，建立页面的方法一共3种：
  - 在pages的目录下建立React Component。
  - 在gatsby-node.js文件中，实现createPages函数中，用createPage函数。
  - 在插件中实现createPages方法。

之前我们用的是第一种方面，接下来我们需要用第二种方法。  
我们先删除pages/index.js，这个已经没有用了。
在templates/目录下，建立分页式主页的模板，./templates/blog-list.js，内容如下：
```
import React from 'react'
import { Link, graphql } from 'gatsby'

import SEO from '../components/seo'
import Bio from '../components/bio'
import Layout from '../components/layout'
import { rhythm } from '../utils/typography'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={siteTitle}
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          )
        })}
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            listStyle: 'none',
            padding: 0,
          }}
        >
          {!isFirst && (
            <Link to={prevPage} rel="prev">
              ← Previous Page
            </Link>
          )}
          {Array.from({ length: numPages }, (_, i) => (
            <li
              key={`pagination-number${i + 1}`}
              style={{
                margin: 0,
              }}
            >
              <Link
                to={`/${i === 0 ? '' : i + 1}`}
                style={{
                  padding: rhythm(1 / 4),
                  textDecoration: 'none',
                  color: i + 1 === currentPage ? '#ffffff' : '',
                  background: i + 1 === currentPage ? '#007acc' : '',
                }}
              >
                {i + 1}
              </Link>
            </li>
          ))}
          {!isLast && (
            <Link to={nextPage} rel="next">
              Next Page →
            </Link>
          )}
        </ul>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
  }
`
```

在`gatsby-node.js`文件中的`createPages`下面，创建完每个子页的后面，加入创建分页代码如下：
```
  // Create blog post list pages
    const postsPerPage = 5;
    const numPages = Math.ceil(posts.length / postsPerPage);

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `/${i + 1}`,
        component: path.resolve('./src/templates/blog-list.js'),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1
        },
      });
    });
```
  上面的代码根据每页要显示的数量去计算需要创建的页面。  
到目前为止，一个有分页功能博客就建立完成。

参考链接：

通过模板建立最简单博客：<https://www.gatsbyjs.org/tutorial/using-a-theme/>  
建立分页：<https://www.gatsbyjs.org/docs/adding-pagination/>




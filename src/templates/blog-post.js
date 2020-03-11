import React, { useState, useEffect } from "react";
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import  { Comment, Button, Input, List, Form, message } from 'antd'
import moment from 'moment'
import axios from 'axios'

const { TextArea } = Input;

const Editor = ({ onChange, onSubmit,  author, value }) => {
  return (
    <div>
      <Form.Item>
          留名：<Input name="author" onChange={onChange}  value = {author} />
      </Form.Item>
      <Form.Item>
        <TextArea rows={4} name="comment" onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" onClick={onSubmit} type="primary">
          增加评论
        </Button>
      </Form.Item>
  </div>
  )

}





const BlogPostTemplate = ({ data, pageContext, location }) => {

  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;
  const [dataComment, setDataComment] = useState([]);
  const [currentAuthor, setCurrentAuthor] = useState("");
  const [currentComment, setCurrentComment] = useState("");
  const functionContainer = {author: setCurrentAuthor, comment: setCurrentComment};
  const commentUrl = 'http://127.0.0.1:1337/comments';
  const currentDate = new Date();

  useEffect(() => {
    axios.get(commentUrl)
      .then((response) => {
        console.log(response.data);
        setDataComment(response.data);
      }).catch((error) => {
        setDataComment([]);
        console.log(error);
      });
  }, []);

  let handleSubmit = () => {
    console.log(currentAuthor, currentComment);
    axios.post(commentUrl,  {
        blog_title: post.frontmatter.title,
        author:currentAuthor,
        content: currentComment,
        datetime: currentDate
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        dataComment.push(response.data);
        console.log("datacomment", dataComment);
        setDataComment(dataComment);
        message.info("感谢您的评论");
        setCurrentComment("");
      }
    }).catch((error) => {
      console.log(error);
      message.error("评论系统出问题了");
    })
  }

  let handleChange = (event) => {
    functionContainer[event.target.name] (event.target.value);
  }
  
  return (
    
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description + ',' + post.frontmatter.tags || post.excerpt}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {post.frontmatter.date}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <List
          className="comment-list"
          header={`${dataComment.length} 回复`}
          itemLayout="horizontal"
          dataSource={dataComment}
          renderItem={item => (
            <li>
              <Comment
                author={item.author}
                content={item.content}
                datetime={item.datetime}
              />
            </li>
          )}
      />
       <Editor
              onChange={handleChange}
              onSubmit={handleSubmit}
              value={currentComment}
            />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        tags
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`

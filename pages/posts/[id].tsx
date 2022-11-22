import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }: { postData: { title: string; id: string; date: string; contentHtml: string } }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
{/* 
      {postData.title}
      <br />
      {postData.id}
      <br />
      <Date dateString={postData.date}/>
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} /> */}

      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>)
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData
    }
  }
}
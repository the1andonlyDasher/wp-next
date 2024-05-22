import Head from "next/head";
import { GetStaticProps } from "next";
import HeroPost from "../components/hero-post";
import { getAllPostsForHome } from "../lib/api";
import { CMS_NAME } from "../lib/constants";
import MoreStories from "@/components/more-stories";

export default function Index({ allPosts: { edges }, preview }: any) {
  const heroPost = edges[0]?.node;
  const morePosts = edges.slice(1);
  console.log(heroPost)
  return (<>
    <Head>
      <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
    </Head>
    {heroPost && (
      <HeroPost
        title={heroPost.title}
        coverImage={heroPost.featuredImage}
        date={heroPost.date}
        author={heroPost.author}
        slug={heroPost.slug}
        excerpt={heroPost.excerpt}
      />
    )}
    {morePosts.length > 0 && <MoreStories posts={morePosts} />}
  </>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview);
  return {
    props: { allPosts, preview },
    revalidate: 10,
  };
};

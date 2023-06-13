import { Handlers, PageProps } from "$fresh/server.ts";
import Layout from "../components/Layout.tsx";
import Markdown from "../components/Markdown.tsx";
import Date from "../islands/Date.tsx";
import { Post, getNewPosts, getPost } from "../posts.ts";

interface Data {
  post: Post;
  posts: Post[];
}

export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    const post = await getPost(ctx.params.post);

    const posts = await getNewPosts();

    if (!post) {
      return ctx.renderNotFound();
    }

    return ctx.render({ post, posts });
  }
};

export default function Post({ data: { post, posts } }: PageProps<Data>) {
  return (
    <Layout pageTitle={post.title} posts={posts}>
      <div class="flex flex-col justify-center items-center mb-6">

        <h1 class="text-5xl font-bold text-neutral-900 mb-2 text-center">
          {post.title}
        </h1>

        <span class="flex gap-2 text-gray-700">
          <Date date={post.date} />
          •
          <span><span class="font-thin font-italic mr-1.5">By</span>{post.author}</span>
          •
          <span>{post.views.toLocaleString()} Views</span>
        </span>

        {post.cover && (
          <img
            src={post.cover}
            alt={post.title}
            class="w-full rounded-xl mt-8"
            width="1024"
            height="512"
          />
        )}
      </div>

      <Markdown body={post.body} class="my-6" />
    </Layout>
  );
}

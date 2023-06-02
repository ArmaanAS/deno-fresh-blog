import { Handlers, PageProps } from "$fresh/server.ts";
import Layout from "../components/Layout.tsx";
import Markdown from "../components/Markdown.tsx";
import Date from "../islands/Date.tsx";
import { Post, getPost } from "../posts.ts";

export const handler: Handlers<Post> = {
  GET(_req, ctx) {
    const post = getPost(ctx.params.post);

    if (!post) {
      return ctx.renderNotFound();
    }

    return ctx.render(post);
  }
};

export default function Post({ data }: PageProps<Post>) {
  return (
    <Layout pageTitle={data.title}>
      <div class="flex flex-col justify-center items-center mb-6">

        <h1 class="text-5xl font-bold text-neutral-900 mb-2 text-center">
          {data.title}
        </h1>

        <span class="flex gap-2 text-gray-700">
          <Date date={data.date} />
          •
          <span><span class="font-thin font-italic mr-1.5">By</span>{data.author}</span>
        </span>

        {data.cover && (
          <img
            src={data.cover}
            alt={data.title}
            class="w-full rounded-xl mt-8"
            width="1024"
            height="512"
          />
        )}
      </div>

      <Markdown body={data.body} class="my-6" />
    </Layout>
  );
}

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

export default function Post(props: PageProps<Post>) {
  return (
    <Layout pageTitle={props.data.title}>
      <div class="flex flex-col justify-center items-center mb-6">
        <h1 class="text-5xl font-bold text-neutral-900 mb-2 text-center">
          {props.data.title}
        </h1>

        <span class="flex gap-2 text-gray-700">
          <Date date={props.data.date} />
          •
          <span><span class="font-thin font-italic mr-1.5">By</span>{props.data.author}</span>
        </span>
      </div>

      <Markdown body={props.data.body} class="my-6" />
    </Layout>
  );
}

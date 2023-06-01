import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Footer from "../components/Footer.tsx";
import Markdown from "../components/Markdown.tsx";
import Posts from "../components/Posts.tsx";
import Title from "../components/Title.tsx";
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
    <>
      <Head>
        <title>{props.data.title} — this.blog</title>
      </Head>

      <header class="flex flex-col justify-center items-center mb-6">
        <Title />

        <h1 class="text-5xl font-bold text-neutral-900 mb-2 text-center">{props.data.title}</h1>

        <span class="flex gap-2 text-gray-700">
          <Date date={props.data.date} />
          •
          <span class="">{props.data.author}</span>
        </span>
      </header>

      <main class="p-4 mx-auto max-w-screen-md">
        <Markdown body={props.data.body} class="my-6" />

        <Posts />
      </main>


      <Footer />
    </>
  );
}

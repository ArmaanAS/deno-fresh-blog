import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Footer from "../components/Footer.tsx";
import Markdown from "../components/Markdown.tsx";
import Title from "../components/Title.tsx";
import Date from "../islands/Date.tsx";
import { Post, getPost } from "../posts.ts";

export const handler: Handlers<Post> = {
  GET(_req, ctx) {
    const post = getPost(ctx.params.slug);

    if (!post) {
      return new Response("Not found", { status: 404 });
    }

    return ctx.render(post);
  }
};

export default function Post(props: PageProps<Post>) {
  return (
    <>
      <Head>
        <title>{props.data.title} — Blog</title>
      </Head>

      <header class="flex flex-col justify-center items-center">
        <Title />

        <h1 class="text-5xl font-bold text-neutral-900 mb-2">{props.data.title}</h1>

        <span class="flex gap-2 text-gray-700">
          <pre><Date date={props.data.date} /></pre>
          •
          <span class="">{props.data.author}</span>
        </span>
      </header>

      <main class="p-4 mx-auto max-w-screen-md">
        <Markdown html={props.data.html} class="my-6" />
      </main>
      <Footer />
    </>
  );
}

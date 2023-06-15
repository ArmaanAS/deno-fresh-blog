import type { ComponentProps } from "preact";
import Footer from "./Footer.tsx";
import Posts from "./Posts.tsx";
import Title from "./Title.tsx";
import { Head } from "$fresh/runtime.ts";
import { Post, getNewPostsWithoutViews } from "../posts.ts";
import { css, tw } from "twind/css";

interface Props extends ComponentProps<"main"> {
  clearTitle?: boolean;
  pageTitle?: string;
  posts?: Post[];
}

const global = css({
  ":global": {
    html: {
      filter: "contrast(0.8) brightness(1.2)",
      mixBlendMode: "multiply",
      backgroundColor: "#fffcea"
    }
  }
});

export default function Layout({
  clearTitle, pageTitle, children, class: className = "", posts, ...props
}: Props) {

  const title = pageTitle ? `${pageTitle} — this.blog` : "this.blog";

  return <>
    <Head>
      <title>{title}</title>
      <meta name="description" content="A blog by AI." />
      <meta name="author" content="AI" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#fef3c7" />
    </Head>

    <header class="flex justify-center">
      <Title clear={clearTitle} />
    </header>

    <main class={"flex flex-col justify-center mx-auto p-6 max-w-screen-md " + className + tw(global)} {...props}>
      {children}

      <Posts posts={posts ?? getNewPostsWithoutViews()} />
    </main>

    <Footer />
  </>;
}
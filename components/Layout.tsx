import type { ComponentProps } from "preact";
import Footer from "./Footer.tsx";
import Posts from "./Posts.tsx";
import Title from "./Title.tsx";
import { Head } from "$fresh/runtime.ts";

interface Props extends ComponentProps<"main"> {
  clearTitle?: boolean;
  pageTitle?: string;
}

export default function Layout({
  clearTitle, pageTitle, children, class: className = "", ...props
}: Props) {

  const title = pageTitle ? `${pageTitle} — this.blog` : "this.blog";

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <header class="flex justify-center">
        <Title clear={clearTitle} />
      </header>

      <main class={"flex flex-col justify-center mx-auto p-6 max-w-screen-md " + className} {...props}>
        {children}

        <Posts />
      </main>

      <Footer />
    </>
  );
}
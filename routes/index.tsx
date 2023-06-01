import { Head } from "$fresh/runtime.ts";
import Footer from "../components/Footer.tsx";
import Posts from "../components/Posts.tsx";
import Title from "../components/Title.tsx";
import Introduction from "../islands/Introduction.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>this.blog</title>
      </Head>
      <header class="flex justify-center">
        <Title clear />
      </header>
      <main class="flex flex-col justify-center mx-auto p-4 max-w-screen-md">
        <Introduction />

        <Posts />
      </main>
      <Footer />
    </>
  );
}

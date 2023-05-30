import { Head } from "$fresh/runtime.ts";
import Footer from "../components/Footer.tsx";
import Title from "../components/Title.tsx";
import Counter from "../islands/Counter.tsx";
import Date from "../islands/Date.tsx";
import Introduction from "../islands/Introduction.tsx";
import { getNewPosts } from "../posts.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>this.blog</title>
      </Head>
      <header class="flex justify-center">
        <Title />
      </header>
      <main class="flex flex-col justify-center mx-auto p-4 max-w-screen-md">
        <Introduction />

        <section>
          <h2 class="text-4xl font-bold mt-8 mb-6">Posts</h2>

          <div class="flex flex-col gap-4">
            {
              getNewPosts().map((post) => (
                <a
                  href={`/${post.id}`}
                  class="flex flex-col gap-2 p-3 rounded-lg 
                  border border-gray-300
                  hover:border-yellow-400 hover:bg-yellow-50">
                  <span class="text-xl font-semibold">{post.title}</span>

                  <div class="flex justify-between text-gray-700">
                    <span>
                      <span class="text-gray-500 font-thin">By</span> {post.author}
                    </span>
                    <span><Date date={post.date} /></span>
                  </div>
                </a>
              ))
            }
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

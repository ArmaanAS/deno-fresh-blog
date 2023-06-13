import Date from "../islands/Date.tsx";
import { Post } from "../posts.ts";

export default function Posts({ posts }: { posts: Post[]; }) {
  return (
    <section class="text-left">
      <h2 class="text-4xl font-bold mt-8 mb-6">Posts</h2>

      <div class="flex flex-col gap-4">
        {
          posts.map((post) => (
            <a
              href={`/${post.id}`}
              class="flex flex-col gap-2 p-3 rounded-lg 
            border border-gray-300 hover:border-yellow-400 hover:bg-yellow-50 border-l-4 border-l-yellow-500">
              <span class="text-xl font-bold text-gray-800">
                {post.title}
              </span>

              <div class="flex justify-between text-gray-700">
                <span class="flex gap-1 font-semibold text-gray-600">
                  <span class="text-gray-500 font-normal font-italic">By</span>
                  {post.author}
                </span>

                <div class="flex gap-1 text-gray-800 font-thin">
                  <Date date={post.date} />
                  •
                  <span>{post.views.toLocaleString()} views</span>
                </div>
              </div>
            </a>
          ))
        }
      </div>
    </section>
  );
}
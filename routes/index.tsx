import { Handlers } from "$fresh/server.ts";
import Layout from "../components/Layout.tsx";
import Introduction from "../islands/Introduction.tsx";
import { Post, getNewPosts } from "../posts.ts";

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    return ctx.render(await getNewPosts());
  }
};

export default function Home({ data }: { data: Post[]; }) {
  return (
    <Layout clearTitle posts={data}>
      <Introduction />
    </Layout>
  );
}

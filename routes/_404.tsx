import { UnknownPageProps } from "$fresh/server.ts";
import Layout from "../components/Layout.tsx";

export default function NotFoundPage({ url }: UnknownPageProps) {
  return (
    <Layout pageTitle="404" class="justify-center text-center" clearTitle>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Error 404</h1>
      <p className="text-lg text-gray-600 mb-8">
        The page you are looking for could not be found.
      </p>
      <p className="text-lg text-gray-700 font-semibold">{url.pathname}</p>
    </Layout>
  );
}


import Layout from "../components/Layout.tsx";
import Introduction from "../islands/Introduction.tsx";

export default function Home() {
  return (
    <Layout clearTitle>
      <Introduction />
    </Layout>
  );
}

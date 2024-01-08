import Nav from "@/components/Nav";
import TextArea from "@/components/TextArea";
import Layout from "@/components/Layout";
import PostFeed from "@/components/posts/PostFeed";

export default function Home() {
  return (
    <Layout>
      <Nav label="CATOGORIZE" />
      <TextArea placeholder="What's Happening" />
      <PostFeed />
    </Layout>
  );
}

import Nav from "@/components/Nav";
import TextArea from "@/components/TextArea";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <>
      <Layout>
        <Nav label="Home" />
        <TextArea placeholder="What's Happening" />
      </Layout>
    </>
  );
}

import Nav from "@/components/Nav";
import TextArea from "@/components/TextArea";
import Layout from "@/components/Layout";
import PostFeed from "@/components/posts/PostFeed";

import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Session } from "next-auth";

interface Props {
  session: Session | null;
}

export default function Home() {
  return (
    <Layout>
      <Nav label="CATOGORIZE" />
      <TextArea placeholder="What's Happening" />
      <PostFeed />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

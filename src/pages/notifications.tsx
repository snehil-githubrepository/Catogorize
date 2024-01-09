import React from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Nav from "@/components/Nav";
import NotificationsFeed from "@/components/NotificationsFeed";
import Layout from "@/components/Layout";

const Notifications = () => {
  return (
    <Layout>
      <Nav label="Notifications" showBackArrow />
      <NotificationsFeed />
    </Layout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
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
}

export default Notifications;

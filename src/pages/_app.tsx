import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
import Edit from "@/components/Edit";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <RecoilRoot>
        <Toaster />
        <Edit />
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}

import { voidApi } from "@/store/apis/void";
import "@/styles/globals.css";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { Layout } from "../components/layout/layout";

export default function App({ Component, pageProps }: AppProps) {
  const pathname = useRouter().pathname.replace('/', '');
  const title = getTitle(pathname);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ApiProvider api={voidApi}>
        <Layout>
          <Component {...pageProps}></Component>
        </Layout>
      </ApiProvider>
    </>
  );
}

function getTitle(pathname: string): string {
  return `VOID - ${pathname.charAt(0).toUpperCase()}${pathname.substring(1)}`;
}

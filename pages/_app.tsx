import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider>
      <Notifications/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  );
}

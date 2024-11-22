// pages/_app.tsx
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '@/styles/globals.css';  
import { GoogleOAuthProvider } from '@react-oauth/google';
import Layout from '@/components/layout/layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>QuickUpdate</title>
        <meta name="description" content="Mise à jour et gestion des contacts avec QuickUpdate" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GoogleOAuthProvider clientId={"1081148467028-h8p6o9urd1rh8g0kf8h76mjba86rdajp.apps.googleusercontent.com"}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GoogleOAuthProvider>
    </>
  );
}

export default MyApp;

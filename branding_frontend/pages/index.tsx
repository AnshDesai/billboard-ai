export {}
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Brand_comp from "../components/branding";
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bill Board AI</title>
        <meta name="description" content="Get your branding snippet for your product!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Brand_comp />
    </div>
  );
};

export default Home;

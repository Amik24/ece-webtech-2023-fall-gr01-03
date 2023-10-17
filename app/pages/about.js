import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout.js'

export default function Page() {
  return (
    <Layout>
      <Head>
        <title>WebTech - About us</title>
        <meta name="description" content="Don't be shy, drop us an email" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="wt-title">
        About us
      </h1>
      <p>
        Test p about for webtech Class lab5 tailwind css
      </p>
    </Layout>
  )
}

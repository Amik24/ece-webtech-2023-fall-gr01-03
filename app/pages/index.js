import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout.js'

export default function Page() {
  return (
    <Layout>
      <Head>
        <title>Lab6</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="wt-title">
        Welcome to <a href="https://www.adaltas.com">web technologies!</a>
      </h1>

      <ul>
        <li>
          <Link href="/articles">
            View our articles
          </Link>
        </li>
        <li>
          <Link href="/about">
            About us
          </Link>
        </li>
        <li>
          <Link href="/contacts">
            Contact us
          </Link>
        </li>
      </ul>
    </Layout>
  )
}

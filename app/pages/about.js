import Head from 'next/head';
import Layout from '../components/Layout.js';

export default function Page() {
  return (
    <Layout>
      <Head>
        <title>WebTech - About Us</title>
        <meta name="description" content="Learn more about our team and mission" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-grey-700 text-white py-8 text-center">
        <h1 className="wt-title text-4xl font-semibold">About Us</h1>
      </div>

      <div className="container mx-auto p-4">
        <p className="text-lg mt-4">
          Welcome to WebTech! We are a team of passionate individuals dedicated to bringing you
          the latest in web technologies and trends.
        </p>

        <p className="text-lg mt-4">
          Our mission is to provide you with valuable insights, tutorials, and resources to help
          you succeed in the ever-evolving world of web development. Whether you're a beginner or
          an experienced developer, you'll find something here to enhance your skills.
        </p>

        <p className="text-lg mt-4">
          We believe that knowledge should be accessible to everyone, so we strive to create
          content that is easy to understand and follow. Feel free to explore our website,
          and don't hesitate to reach out if you have any questions or suggestions.
        </p>

        <p className="text-lg mt-4">
          Thank you for visiting WebTech. We look forward to being a part of your web development journey!
        </p>
      </div>
    </Layout>
  );
}

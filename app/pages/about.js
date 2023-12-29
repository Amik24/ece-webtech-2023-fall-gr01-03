import Head from 'next/head';
import Layout from '../components/Layout.js';
import Image from 'next/image';

const TeamMembers = [
  {
    name: 'Alexandre Bensarsa',
    role: 'Web Developer',
    imageUrl: 'alex.jpeg', // Replace with your image URLs
    linkedinUrl: 'https://www.linkedin.com/in/alexandre-bensarsa-aba267267/',
  },
  {
    name: 'Clement Gasnet',
    role: 'Front-end Developer',
    imageUrl: 'clem.jpeg', // Replace with your image URLs
    linkedinUrl: 'https://www.linkedin.com/in/cl%C3%A9ment-gasnet-6b11b7297/',
  },
  {
    name: 'Ikram Amine',
    role: 'Back-end Developer',
    imageUrl: 'ikram.jpg', // Replace with your image URLs
    linkedinUrl: 'https://fr.linkedin.com/in/ikram-amine-48244921a',
  },
];

export default function Page() {
  return (
    <Layout>
      <Head>
        <title>WebTech - About Us</title>
        <meta name="description" content="Learn more about our team and mission" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 text-white py-12 text-center">
        <h1 className="text-4xl font-semibold">About Us</h1>
      </div>

      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {TeamMembers.map((member, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 text-center">
            <img src={member.imageUrl} alt={member.name} className="w-32 h-32 rounded-full mx-auto" />
            <h2 className="text-xl font-semibold mt-4">{member.name}</h2>
            <p className="text-gray-600 mt-2">{member.role}</p>
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-blue-500 text-white py-2 px-4 mt-4 mx-auto rounded hover:bg-blue-600 hover:text-gray-900 transition duration-300"
            >
              LinkedIn
            </a>
          </div>
        ))}
      </div>
    </Layout>
  );
}

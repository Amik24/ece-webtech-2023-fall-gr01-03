// pages/contact.js
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';//Supabase
import Head from 'next/head';
import Layout from '../components/Layout.js';
//We use environnement variables with process to not hard code variables in the code 
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ContactPage() {
  const [submissionStatus, setSubmissionStatus] = useState('');// We get the state of completing the form to add data in the db
  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = {//Using data inputed by the user
      firstname: form.firstname.value,
      lastname: form.lastname.value,
      email: form.email.value,
      message: form.message.value,
    };
    const { data, error } = await supabase
      .from('contacts')//Link to contacts table
      .insert([formData]);//Inserting data from the user input to the db
    if (error) {
      setSubmissionStatus('Error: ' + error.message);
    } else {
      setSubmissionStatus('Thank you for your feedback ! We will try to come back to you as soon as we can !');
      form.reset(); //Form is cleared
    }
  }

  return (
    <Layout>
      <Head>
        <title>Contact Us - WebTech</title>
        <meta name="description" content="Contact us via our form." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="wt-title">Contact Us</h1>
      {submissionStatus && <p>{submissionStatus}</p>}
      <form onSubmit={handleSubmit} className="block">
        <label htmlFor="firstname">
          First name
          <input id="firstname" type="text" name="firstname" required />
        </label>
        <label htmlFor="lastname">
          Last name
          <input id="lastname" type="text" name="lastname" required />
        </label>
        <label htmlFor="email">
          Email
          <input id="email" type="email" name="email" required />
        </label>
        <label htmlFor="message">
          Message
          <textarea id="message" name="message" required />
        </label>
        <button type="submit" className="rounded-full bg-blue-200 text-blue-800 font-bold py-2 px-4">
          Submit
        </button>
      </form>
    </Layout>
  );
}

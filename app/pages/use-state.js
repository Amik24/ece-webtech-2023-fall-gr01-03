import React, { useState } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout.js'

function Example() {
  const [count, setCount] = useState(0);
  return (
    <div style={{ textAlign: 'center' }}>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}




export default Example;
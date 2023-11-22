'use client';
import Image from 'next/image';
import Link from 'next/link';
import backgroundImage from './stck.jpg';
import React from 'react';
import {fetchData} from './api'
/*
const Page = () => {
const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetchData().then((data) => setData(data));
  }, []);
  return ('../app/login')
} */
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-800" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-800">
        <div className="grid text-center lg:grid-cols-1">
            <a className="group rounded-lg border border-transparent px-5 py-4 mb-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 block"
            
            href="/stocks">
              <h2 className="mb-3 text-2xl font-semibold">
                Stock Prices{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className="m-0 max-w-[30ch] text-sm opacity-50">
                View real-time stock prices.
              </p>
            </a>
          

            <Link legacyBehavior href='/login'>
            <a className="group rounded-lg border border-transparent px-5 py-4 mb-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 block">
              <h2 className="mb-3 text-2xl font-semibold">
                Login{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className="m-0 max-w-[30ch] text-sm opacity-50">
                Log in to your account.
              </p>
            </a>
            </Link>
          

            
            <a className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 block"
            href="/signup">
              <h2 className="mb-3 text-2xl font-semibold">
                Signup{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className="m-0 max-w-[30ch] text-sm opacity-50">
                Create a new account.
              </p>
            </a>
          
        </div>
      </div>
    </div>
  );
}

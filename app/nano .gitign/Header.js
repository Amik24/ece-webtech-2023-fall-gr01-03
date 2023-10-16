

import Link from 'next/link'
import Image from 'next/image'

export default function Header(){
  return (
    <header className="bg-white text-black p-8 flex"
    >
      <div className="flex-grow">
        <Link href={`/`}>
          <Image src="/Users/clement/Desktop/cours2a/Webtech/ece-webtech-2023-fall-gr01-03/app/components/ECE_LOGO_2021_web.png" alt="ECE Logo" width={75} height={25} />
          <span>
            Web technologies
          </span>
        </Link>
      </div>
      <ul className="list-none m-0 p-0 inline-flex space-x-8"
>
        <li>
          <Link href="/articles">
            Articles
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
    </header>
  )
}

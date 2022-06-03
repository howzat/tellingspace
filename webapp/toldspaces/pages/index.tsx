// @ts-ignore
import Link from 'next/link';

export default function Home() {
  return (
      <div className="container flex items-center p-4 mx-auto min-h-screen justify-center h-14 m-0 p-0 bg-gradient-to-r from-purple-500 to-pink-500 border-0 padding-0 margin-0">
        <main>
          <h1 className="font-mono text-xl code">
              <Link href="/characters/sprite">
                <a className="text-indigo-700">Take a peek at the sprite!</a>
              </Link>
          </h1>
        </main>
      </div>
  )
}
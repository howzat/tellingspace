// @ts-ignore
import Link from "next/link";

export default function FirstPost() {
  return (
      <div className="container flex items-center p-4 mx-auto min-h-screen justify-center font-mono text-xl text-indigo-700 code bg-gradient-to-r from-cyan-500 to-blue-500">
        <main>
          <Link href="/"><h1>&lt;&lt;&lt; The Sprite Page! <a>Back to home &lt;&lt;&lt;</a></h1></Link>
        </main>
      </div>
  );
}
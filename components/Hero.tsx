import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-600 py-20 text-white">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Grow Together, Learn Together</h1>
          <h2 className="text-xl md:text-2xl mb-8 opacity-80">Transform your academic journey with collaborative learning</h2>
          <Link href="/dashboard" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-blue-100 transition duration-300 inline-block">
            Get Started
          </Link>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0">
          <Image src="/hero-image.jpg" alt="Collaborative Learning" width={600} height={400} className="rounded-lg shadow-lg" />
        </div>
      </div>
    </section>
  );
}
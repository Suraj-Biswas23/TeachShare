import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-600 py-20 text-white min-h-screen flex items-center">
      <div className="container mx-auto px-6">
        <div className="md:flex items-center">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Grow Together, Learn Together</h1>
            <h2 className="text-xl md:text-2xl mb-8 opacity-80 leading-relaxed">Transform your academic journey with collaborative learning</h2>
            <Link href="/dashboard" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-blue-100 transition duration-300 inline-block text-lg">
              Get Started
            </Link>
          </div>
          <div className="md:w-1/2">
            <Image src="/hero-image.jpg" alt="Collaborative Learning" width={600} height={400} className="rounded-lg shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
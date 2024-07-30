import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="bg-blue-600 py-20 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Learning Experience?</h2>
        <p className="text-xl mb-8">Join TeachShare today and start collaborating with learners worldwide.</p>
        <Link href="/sign-up" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-blue-100 transition duration-300 inline-block">
          Sign Up Now
        </Link>
      </div>
    </section>
  );
}
import Head from 'next/head';
import Header from '../components/Header';
import Hero from '../components/Hero';
import KeyFeatures from '../components/KeyFeatures';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>TeachShare: Grow Together, Learn Together</title>
        <meta name="description" content="TeachShare is a pioneering web application for academic collaboration and resource sharing at university and college levels." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col">
        <Header />
        <main>
          <Hero />
          <KeyFeatures />
          <Testimonials />
          <CallToAction />
        </main>
        <Footer />
      </div>
    </>
  );
}
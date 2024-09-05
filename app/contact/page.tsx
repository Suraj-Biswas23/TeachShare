"use client";

import Head from "next/head";
import dynamic from 'next/dynamic';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import 'leaflet/dist/leaflet.css';

const MapWithNoSSR = dynamic(() => import("@/components/Map"), {
  ssr: false
});

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFormSubmit = (): void => {
    setFormSubmitted(true);
  };

  return (
    <>
      <Head>
        <title>Contact Us - TeachShare</title>
        <meta name="description" content="Get in touch with TeachShare for any queries or support." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col bg-gradient-to-r from-blue-50 to-gray-100">
        <Header />
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">Contact Us</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Form Section */}
              <div className="bg-white rounded-lg shadow-lg p-8 transition-transform transform hover:scale-105">
                <h2 className="text-2xl font-semibold mb-6 text-gray-700">Send us a message</h2>
                {formSubmitted ? (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Thank you for your message!</strong>
                    <span className="block sm:inline"> We&apos;ll get back to you soon.</span>
                  </div>
                ) : (
                  <ContactForm onSubmit={handleFormSubmit} />
                )}
              </div>

              {/* Contact Information Section */}
              <div className="space-y-8">
                <div className="bg-white rounded-lg shadow-lg p-8 transition-transform transform hover:scale-105">
                  <h2 className="text-2xl font-semibold mb-6 text-gray-700">Contact Information</h2>
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <FaMapMarkerAlt className="text-blue-500 mr-3" />
                      <span>S.G. Palya, Bengaluru, 560029</span>
                    </li>
                    <li className="flex items-center">
                      <FaEnvelope className="text-blue-500 mr-3" />
                      <a href="mailto:contact@teachshare.com" className="text-blue-600 hover:underline">contact@teachshare.com</a>
                    </li>
                    <li className="flex items-center">
                      <FaPhone className="text-blue-500 mr-3" />
                      <span>(123) 456-7890</span>
                    </li>
                  </ul>
                </div>

                {/* Map Section */}
                <div className="bg-white rounded-lg shadow-lg p-8 transition-transform transform hover:scale-105">
                  <h2 className="text-2xl font-semibold mb-6 text-gray-700">Our Location</h2>
                  <div className="h-64 rounded-lg overflow-hidden">
                    {isClient && <MapWithNoSSR />}
                  </div>
                  <div className="mt-4 text-center">
                    <a 
                      href="https://www.openstreetmap.org/node/8976438665#map=19/12.934425/77.605890" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View larger map
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
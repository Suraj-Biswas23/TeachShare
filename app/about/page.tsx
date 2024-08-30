"use client";

import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { FaLinkedin, FaTwitter } from 'react-icons/fa';

const teamMembers = [
  { name: "Hrishabh Gautam", role: "CEO & Co-Founder", image: "/guydp.jpeg", linkedin: "https://www.linkedin.com/in/hrishabh-gautam1625/", twitter: "https://x.com/hrishabhxgautam" },
  { name: "Suraj Biswas", role: "COO & Co-Founder", image: "/aboutavatar2.jpg", linkedin: "#", twitter: "#" },
  // Add more team members as needed
];

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us - TeachShare</title>
        <meta name="description" content="Learn about TeachShare's mission, team, and history." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col bg-gray-50">
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-blue-600 text-white py-20">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About TeachShare</h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                Empowering educators and students through collaborative learning and resource sharing.
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">Our Mission</h2>
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-lg text-gray-700 mb-6">
                  At TeachShare, we&apos;re on a mission to revolutionize education by creating a platform where educators and students can collaborate, share resources, and grow together. We believe in the power of shared knowledge and the impact it can have on learning outcomes worldwide.
                </p>
                <p className="text-lg text-gray-700">
                  Our goal is to break down barriers in education, making high-quality resources accessible to all, and fostering a community of lifelong learners.
                </p>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
              <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
                      <Image src={member.image} alt={member.name} width={400} height={400} className="w-full h-96 object-cover" />
                      <div className="p-6 text-center">
                        <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                        <p className="text-gray-600 mb-4">{member.role}</p>
                        <div className="flex justify-center space-x-4">
                          <a href={member.linkedin} className="text-blue-600 hover:text-blue-800">
                            <FaLinkedin size={24} />
                          </a>
                          <a href={member.twitter} className="text-blue-400 hover:text-blue-600">
                            <FaTwitter size={24} />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* History Section */}
          <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">Our Journey</h2>
              <div className="max-w-3xl mx-auto">
                <div className="relative pl-8 py-6 border-l-2 border-blue-500">
                  <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-2 top-8"></div>
                  <h3 className="text-xl font-semibold mb-2">2020: The Beginning</h3>
                  <p className="text-gray-700">TeachShare was founded with a vision to transform educational resource sharing.</p>
                </div>
                <div className="relative pl-8 py-6 border-l-2 border-blue-500">
                  <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-2 top-8"></div>
                  <h3 className="text-xl font-semibold mb-2">2021: Rapid Growth</h3>
                  <p className="text-gray-700">We expanded our team and user base, reaching educators worldwide.</p>
                </div>
                <div className="relative pl-8 py-6 border-l-2 border-blue-500">
                  <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-2 top-8"></div>
                  <h3 className="text-xl font-semibold mb-2">2022: New Features</h3>
                  <p className="text-gray-700">Launched collaborative tools and personalized learning paths.</p>
                </div>
                <div className="relative pl-8 py-6">
                  <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-2 top-8"></div>
                  <h3 className="text-xl font-semibold mb-2">2023: Going Global</h3>
                  <p className="text-gray-700">Expanded to support multiple languages and partnered with international educational institutions.</p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
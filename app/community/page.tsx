"use client";

import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { FaComments, FaCalendarAlt, FaUserFriends, FaStar } from 'react-icons/fa';

// Mock data - replace with actual data from your backend
const featuredDiscussions = [
  { id: 1, title: "Best practices for online teaching", author: "Jane Doe", replies: 23, likes: 45 },
  { id: 2, title: "Innovative ways to engage students remotely", author: "John Smith", replies: 18, likes: 37 },
  { id: 3, title: "Incorporating technology in traditional classrooms", author: "Alice Johnson", replies: 31, likes: 52 },
];

const upcomingEvents = [
  { id: 1, title: "Virtual Teaching Conference 2024", date: "March 15, 2024", attendees: 500 },
  { id: 2, title: "EdTech Innovation Workshop", date: "April 22, 2024", attendees: 200 },
  { id: 3, title: "Global Educators Meetup", date: "May 10, 2024", attendees: 1000 },
];

const topContributors = [
  { id: 1, name: "Emily Brown", contributions: 156, avatar: "/comavatar1.jpg" },
  { id: 2, name: "Michael Chen", contributions: 132, avatar: "/comavatar2.jpg" },
  { id: 3, name: "Sarah Parker", contributions: 118, avatar: "/comavatar3.jpg" },
];

export default function CommunityPage() {
  return (
    <>
      <Head>
        <title>Community - TeachShare</title>
        <meta name="description" content="Join the TeachShare community to connect, share, and learn with educators worldwide." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col bg-gray-50">
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Our Community</h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                Connect, share, and grow with educators from around the world.
              </p>
            </div>
          </section>

          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Featured Discussions */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold mb-6 flex items-center">
                  <FaComments className="mr-2 text-blue-600" />
                  Featured Discussions
                </h2>
                <div className="space-y-4">
                  {featuredDiscussions.map((discussion) => (
                    <div key={discussion.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
                      <h3 className="text-xl font-semibold mb-2">{discussion.title}</h3>
                      <p className="text-gray-600 mb-4">Started by {discussion.author}</p>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{discussion.replies} replies</span>
                        <span>{discussion.likes} likes</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                  View All Discussions
                </button>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Upcoming Events */}
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <FaCalendarAlt className="mr-2 text-blue-600" />
                    Upcoming Events
                  </h2>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm text-gray-600">{event.date}</p>
                        <p className="text-sm text-gray-500">{event.attendees} attendees</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Contributors */}
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <FaUserFriends className="mr-2 text-blue-600" />
                    Top Contributors
                  </h2>
                  <div className="space-y-4">
                    {topContributors.map((contributor) => (
                      <div key={contributor.id} className="flex items-center bg-white rounded-lg shadow-md p-4">
                        <Image src={contributor.avatar} alt={contributor.name} width={50} height={50} className="rounded-full mr-4" />
                        <div>
                          <h3 className="font-semibold">{contributor.name}</h3>
                          <p className="text-sm text-gray-600">{contributor.contributions} contributions</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <section className="bg-gray-100 py-16">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
              <p className="text-xl text-gray-700 mb-8">Start sharing your knowledge and connecting with educators today!</p>
              <button className="bg-blue-600 text-white py-3 px-8 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300">
                Get Started
              </button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
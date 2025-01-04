import React from "react";
import PageTitle from "../components/PageTitle";

export default function About() {
  return (
    <div className="bg-gray-100 min-h-screen px-4 py-8">
      <PageTitle title="About Us" />

      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Our Library
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Our library is a hub of knowledge, a place where stories come alive,
            and learning never stops. Whether you’re a curious reader, a
            dedicated student, or a lifelong learner, we are here to inspire,
            educate, and empower.
          </p>
        </div>

        {/* History and Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
              Our History
            </h2>
            <p className="text-gray-600">
              Established in 1985, our library has served as a cornerstone for
              the community. Over the years, we’ve grown to include thousands of
              books, digital resources, and educational programs, catering to
              all age groups.
            </p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600">
              To provide access to a world of knowledge, foster creativity, and
              create a welcoming space for readers, learners, and innovators.
            </p>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-green-50 p-6 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold text-green-600 mb-2">
                Book Lending
              </h3>
              <p className="text-gray-600">
                A vast collection of fiction, non-fiction, and academic books
                available for lending.
              </p>
            </div>
            <div className="bg-green-50 p-6 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold text-green-600 mb-2">
                Digital Resources
              </h3>
              <p className="text-gray-600">
                Access eBooks, audiobooks, research papers, and other digital
                content.
              </p>
            </div>
            <div className="bg-green-50 p-6 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold text-green-600 mb-2">
                Community Events
              </h3>
              <p className="text-gray-600">
                Join workshops, book clubs, storytelling sessions, and more.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Example Team Member */}
            <div className="bg-white p-6 shadow-md rounded-lg text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Librarian"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-medium text-gray-800">John Doe</h3>
              <p className="text-gray-500">Head Librarian</p>
              <p className="text-gray-600 mt-2">
                With over 15 years of experience, John ensures the library
                operates seamlessly and continues to serve the community.
              </p>
            </div>
            {/* Add more team members as needed */}
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="text-center bg-white py-8 shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Become a Member Today
          </h2>
          <p className="text-gray-600 mb-6">
            Unlock a world of books, knowledge, and community by joining us.
          </p>
          <button className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-all">
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
}

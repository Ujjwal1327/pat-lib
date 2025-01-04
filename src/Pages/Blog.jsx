import React, { useState } from "react";
import PageTitle from "../components/PageTitle";

export default function Blog() {
  const blogs = [
    {
      id: 1,
      title: "5 Tips to Boost Your Web Development Skills",
      description:
        "Learn how to improve your web development skills with these 5 simple tips. Perfect for beginners and pros alike.",
      author: "John Doe",
      date: "January 2, 2025",
      image: "https://via.placeholder.com/800x400",
      content:
        "This is the full content of the blog post. It includes detailed tips, examples, and explanations.",
    },
    {
      id: 2,
      title: "Why Design Matters in Website Development",
      description:
        "Explore the importance of design and how it impacts user experience in web development.",
      author: "Jane Smith",
      date: "December 28, 2024",
      image: "https://via.placeholder.com/300x200",
      content:
        "This blog post dives deep into the significance of design in building modern websites.",
    },
    {
      id: 3,
      title: "10 Tools Every Web Developer Should Know",
      description:
        "Discover the top 10 tools that can make web development faster and easier.",
      author: "Alice Johnson",
      date: "December 20, 2024",
      image: "https://via.placeholder.com/300x200",
      content: "A list of essential tools that every developer should consider.",
    },
    // Add more blog posts as needed
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(1).slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil((blogs.length - 1) / blogsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-gray-100 min-h-screen px-4 py-8">
      <PageTitle title="Blog" />

      <div className="max-w-6xl mx-auto">
        {/* Latest Blog */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {blogs[0].title}
          </h1>
          <img
            src={blogs[0].image}
            alt={blogs[0].title}
            className="w-full h-auto rounded-md"
          />
          <p className="text-gray-600 mt-4">{blogs[0].content}</p>
          <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
            <span>By {blogs[0].author}</span>
            <span>{blogs[0].date}</span>
          </div>
        </div>

        {/* Remaining Blogs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  {blog.description.slice(0, 80)}...
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-600">
                    By {blog.author}
                  </span>
                  <span className="text-sm text-gray-400">{blog.date}</span>
                </div>
              </div>
              <div className="px-4 py-2">
                <button className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-all">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-4 py-2 rounded-md ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              } hover:bg-blue-600 hover:text-white transition-all`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

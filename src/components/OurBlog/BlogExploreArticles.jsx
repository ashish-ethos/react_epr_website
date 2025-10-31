import React, { useState } from "react";
import {
  Search,
  Calendar,
  Clock,
  Eye,
  User,
  Tag,
  ChevronRight,
  Filter,
  Grid,
  List,
  ArrowLeft,
} from "lucide-react";
import { Input, Select, Button, Empty } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import CustomSelect from "../ui/Select";

const BlogExploreArticles = ({ blogPosts, contentMap }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [hoveredPost, setHoveredPost] = useState(null);
  const [viewMode, setViewMode] = useState("list");
  const [filterCategory, setFilterCategory] = useState("all");
  const { Search } = Input;
  const { Option } = Select;

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setSelectedPost(null);
    }
  };

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      filterCategory === "all" ||
      post.category.toLowerCase() === filterCategory;

    return matchesSearch && matchesCategory;
  });


  const renderContent = (content) => {
    const lines = content.split("\n");
    return lines.map((line, index) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        const text = line.replace(/\*\*/g, "");
        if (text.startsWith("Introduction") || text.startsWith("Conclusion")) {
          return (
            <h2
              key={index}
              className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4 text-[#c2c6cb]"
            >
              {text}
            </h2>
          );
        } else if (text.includes(":")) {
          return (
            <h3
              key={index}
              className="text-lg sm:text-xl font-semibold mt-4 sm:mt-6 mb-2 sm:mb-3 text-[#c2c6cb]"
            >
              {text}
            </h3>
          );
        } else {
          return (
            <h3
              key={index}
              className="text-lg sm:text-xl font-semibold mt-4 sm:mt-6 mb-2 sm:mb-3 text-[#c2c6cb]"
            >
              {text}
            </h3>
          );
        }
      }
      if (line.startsWith("- ")) {
        return (
          <li
            key={index}
            className="ml-4 sm:ml-6 list-disc text-[#c2c6cb] leading-relaxed text-sm sm:text-base"
          >
            {line.replace("- ", "")}
          </li>
        );
      }
      if (line.match(/^\d+\.\s/)) {
        return (
          <li
            key={index}
            className="ml-4 sm:ml-6 list-decimal text-[#c2c6cb] leading-relaxed text-sm sm:text-base"
          >
            {line.replace(/^\d+\.\s/, "")}
          </li>
        );
      }
      if (line.trim() === "") {
        return null;
      }
      return (
        <p
          key={index}
          className="mb-3 sm:mb-4 text-[#c2c6cb] leading-relaxed text-sm sm:text-base"
        >
          {line}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#555]">
      {/* Header */}
      <div className="bg-[#555]/80 backdrop-blur-md border-b border-[#ffffff38] sticky top-0 z-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col gap-4">
            {/* Controls */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex gap-2">
                <CustomSelect
                  value={filterCategory}
                  onChange={(value) => setFilterCategory(value)}
                  size="middle"
                  className="!rounded-xl !h-10 shadow-sm p-1 bg-[#555] text-[#c2c6cb] border-[#ffffff38] hover:border-[#c08830]"
                  dropdownStyle={{ borderRadius: "10px", backgroundColor: "#555", color: "#c2c6cb" }}
                >
                  <Option value="all">All Categories</Option>
                  <Option value="investment">Investment</Option>
                  <Option value="market trends">Market Trends</Option>
                </CustomSelect>
                <Input
                  placeholder="Search articles, topics, or categories..."
                  value={searchTerm}
                  onChange={handleInputChange}
                  allowClear
                  prefix={<SearchOutlined className="text-[#c2c6cb]" />}
                  size="middle"
                  className="!rounded-xl items-center shadow-sm w-full bg-[#555] text-[#c2c6cb] border-[#ffffff38] placeholder-[#c2c6cb] hover:border-[#c08830]"
                />
              </div>

              {/* View Toggle */}
              <div className="flex bg-[#555] border border-[#ffffff38] rounded-xl shadow-sm p-1">
                <Button
                  type={viewMode === "grid" ? "primary" : "text"}
                  icon={<Grid className="w-4 h-4 text-[#c2c6cb]" />}
                  onClick={() => {
                    setViewMode("grid");
                    setSelectedPost(null);
                  }}
                  size="middle"
                  className="!rounded-lg !h-8 w-8 flex items-center justify-center bg-[#555] text-[#c2c6cb] hover:border-[#c08830]"
                />
                <Button
                  type={viewMode === "list" ? "primary" : "text"}
                  icon={<List className="w-4 h-4 text-[#c2c6cb]" />}
                  onClick={() => {
                    setViewMode("list");
                    setSelectedPost(null);
                  }}
                  size="middle"
                  className="!rounded-lg !h-8 w-8 flex items-center justify-center bg-[#555] text-[#c2c6cb] hover:border-[#c08830]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 py-6 sm:py-8 blog-article-list">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 tablet-screen-column">
          {/* Article List */}
          {viewMode === "list" && (
            <div className={`w-full md:w-1/3 ${selectedPost ? 'hidden md:block' : 'block'}`}>
              <div className="bg-[#555]/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl tablet-article shadow-xl border border-[#ffffff38] p-2 sm:p-4 sticky top-20 md:top-24">
                <div className="flex items-center gap-3 mb-2 sm:mb-3">
                  <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Filter className="w-4 sm:w-5 h-4 sm:h-5 text-[#c2c6cb]" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#c2c6cb]">
                    Featured Articles
                  </h3>
                </div>

                <div className="custom-scrollbar space-y-3 sm:space-y-4 px-2 max-h-[calc(100vh-200px)] sm:max-h-[calc(100vh-250px)] overflow-y-auto scrollbar-thin scrollbar-thumb-[#c2c6cb] scrollbar-track-[#555]">
                  {filteredPosts.length === 0 ? (
                    <Empty
                      description={
                        <div className="p-4 text-center text-[#c2c6cb] text-base">
                          No results found
                        </div>

                      }
                    />
                  ) : (
                    (searchTerm.trim() || filterCategory !== "all"
                      ? filteredPosts
                      : blogPosts
                    ).map((post) => (
                      <div
                        key={post.id}
                        className={`group relative p-3 sm:p-4 rounded-xl sm:rounded-2xl border cursor-pointer border transition-all duration-300 hover:shadow-lg hover:scale-[1.01] hover:border-[#c08830] ${selectedPost?.id === post.id
                          ? "bg-transparent text-[#c2c6cb] border-[#c08830] shadow-lg"
                          : "bg-[#555]/80 text-[#c2c6cb] border-[#ffffff38]"
                          }`}
                        onClick={() => setSelectedPost(post)}
                      >
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 tablet-image-blog " >
                          {/* Image */}
                          <div className="w-full sm:w-24 flex-shrink-0">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-32 sm:h-24 object-cover rounded-lg sm:rounded-xl"
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h4
                              className={`font-semibold text-sm sm:text-base leading-snug mb-2 line-clamp-2 ${selectedPost?.id === post.id
                                ? "text-[#c2c6cb]"
                                : "text-[#c2c6cb]"
                                }`}
                            >
                              {post.title}
                            </h4>

                            <div className="flex flex-col items-center gap-3 text-xs text-[#c2c6cb]">
                              <div className="flex items-start text-start gap-1">
                                <Calendar className="w-4 h-4 m-0 p-0 text-[#c2c6cb]" />
                                <span>{post.date}</span>
                              </div>
                              <div className="flex items-start text-start gap-1">
                                <Clock className="w-4 h-4 m-0 p-0 text-[#c2c6cb]" />
                                <span>{post.readTime}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {selectedPost?.id === post.id && (
                          <ChevronRight className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-[#c08830]" />
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
          {viewMode === "grid" && !selectedPost && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
              {filteredPosts.length === 0 ? (
                <Empty description={
                  <div className="p-4 text-center text-[#c2c6cb] text-base col-span-full">
                    No results found
                  </div>
                } />
              ) : (
                (searchTerm.trim() || filterCategory !== "all"
                  ? filteredPosts
                  : blogPosts
                ).map((post) => (
                  <div
                    key={post.id}
                    className={`group relative p-3 sm:p-4 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg border hover:scale-[1.01] hover:border-[#c08830] ${hoveredPost === post.id
                      ? "bg-transparent text-[#c2c6cb] shadow-lg border-[#c08830]"
                      : "bg-[#555] text-[#c2c6cb] border-[#ffffff38]"
                      }`}
                    onClick={() => setSelectedPost(post)}
                    onMouseEnter={() => setHoveredPost(post.id)}
                    onMouseLeave={() => setHoveredPost(null)}
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-32 sm:h-40 object-cover rounded-lg sm:rounded-xl mb-3 sm:mb-4"
                    />
                    <h4
                      className={`font-semibold text-xs sm:text-sm leading-tight mb-1 sm:mb-2 line-clamp-2 ${hoveredPost === post.id ? "text-[#c2c6cb]" : "text-[#c2c6cb]"
                        }`}
                    >
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-1 sm:gap-2 text-xs mb-2 text-[#c2c6cb]">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                      <Clock className="w-3 h-3 ml-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Selected Article Content */}
          {selectedPost && (
            <div className="w-full relative">
              {viewMode === "grid" && (
                <button
                  className="absolute left-2 sm:left-4 z-20 p-2 bg-[#555] rounded-full shadow-lg mb-4 border-[#ffffff38] hover:border-[#c08830] cursor-pointer"
                  onClick={() => setSelectedPost(null)}
                >
                  <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#c2c6cb]" />
                </button>
              )}
              {viewMode === "list" && (
                <button
                  className="md:hidden absolute left-2 sm:left-4 z-20 p-2 bg-[#555] rounded-full shadow-lg mb-4 border-[#ffffff38] hover:border-[#c08830] cursor-pointer"
                  onClick={() => setSelectedPost(null)}
                >
                  <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#c2c6cb]" />
                </button>
              )}
              <div className="bg-[#555]/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-[#ffffff38] overflow-hidden">
                {/* Article Header */}
                <div className="relative h-60 sm:h-80 overflow-hidden">
                  <img
                    src={contentMap[selectedPost.id].image}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#555]/60 via-[#555]/20 to-transparent" />
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                    <div className="flex flex-wrap gap-2 mb-2 sm:mb-4">
                      {selectedPost.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 sm:px-3 py-0.5 sm:py-1 bg-[#555]/20 backdrop-blur-sm text-[#c2c6cb] text-xs font-medium rounded-full border border-[#ffffff38] hover:border-[#c08830]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h1 className="text-md sm:text-2xl md:text-3xl font-bold text-[#fff] leading-tight mb-2 sm:mb-4">
                      {selectedPost.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[#c2c6cb] text-xs sm:text-sm">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <User className="w-3 sm:w-4 h-3 sm:h-4 text-[#c2c6cb]" />
                        <span>{selectedPost.author}</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Calendar className="w-3 sm:w-4 h-3 sm:h-4 text-[#c2c6cb]" />
                        <span>{selectedPost.date}</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Clock className="w-3 sm:w-4 h-3 sm:h-4 text-[#c2c6cb]" />
                        <span>{selectedPost.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Eye className="w-3 sm:w-4 h-3 sm:h-4 text-[#c2c6cb]" />
                        <span>{selectedPost.views}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-4 sm:p-6 md:p-8">
                  <div className="prose prose-sm sm:prose-lg max-w-none">
                    {renderContent(contentMap[selectedPost.id].content)}
                  </div>

                  {/* Article Footer */}
                  <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#ffffff38]">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 sm:w-5 h-4 sm:h-5 text-[#c2c6cb]" />
                        <div className="flex flex-wrap gap-2">
                          {selectedPost.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 sm:px-3 py-0.5 sm:py-1 bg-[#555]/20 text-[#c2c6cb] text-xs sm:text-sm font-medium rounded-full border-[#ffffff38] hover:border-[#c08830]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm text-[#c2c6cb]">
                        Published by {selectedPost.author}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogExploreArticles;
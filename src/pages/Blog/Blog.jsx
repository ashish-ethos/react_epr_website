import React from 'react';
import OurBlog from '../../components/OurBlog/OurBlog';
import { Helmet } from "react-helmet-async";

const Blog = () => {
  return (
    <div>
      {/* SEO START */}
      <Helmet>
        <title>Real Estate Blogs & Property News | Ethos Pro Realtors</title>

        <meta
          name="description"
          content="Read expert real estate blogs, property investment tips, market trends and latest real estate news by Ethos Pro Realtors."
        />

        <meta
          name="keywords"
          content="real estate blog, property blogs India, real estate news Gurgaon, property investment tips, Ethos Pro Realtors blog"
        />

        <meta name="robots" content="index, follow" />

        {/* Canonical */}
        <link
          rel="canonical"
          href="https://www.ethosprorealtors.com/blog"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Real Estate Blogs & Market Insights | Ethos Pro Realtors" />
        <meta
          property="og:description"
          content="Stay updated with real estate trends, expert insights, and property investment advice from Ethos Pro Realtors."
        />
        <meta
          property="og:image"
          content="https://www.ethosprorealtors.com/assets/blog-og.jpg"
        />
        <meta property="og:url" content="https://www.ethosprorealtors.com/blog" />
        <meta property="og:site_name" content="Ethos Pro Realtors" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Real Estate Blogs & Property News" />
        <meta
          name="twitter:description"
          content="Explore property blogs, market insights, and expert real estate advice by Ethos Pro Realtors."
        />
        <meta
          name="twitter:image"
          content="https://www.ethosprorealtors.com/assets/blog-og.jpg"
        />

        {/* Blog Schema */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "Ethos Pro Realtors Blog",
              "url": "https://www.ethosprorealtors.com/blog",
              "description": "Expert real estate blogs, property market insights and investment guidance by Ethos Pro Realtors."
            }
          `}
        </script>
      </Helmet>
      {/* SEO END */}

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">
        Real Estate Blogs & Property Market Insights by Ethos Pro Realtors
      </h1>

      <OurBlog />
    </div>
  );
};

export default Blog;

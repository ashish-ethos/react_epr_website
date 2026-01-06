import React from "react";
import { Helmet } from "react-helmet-async";
import Residentials from "./Residentials";
import Commercial from "./Commercial";

const Project = () => {
  return (
    <div className="bg-[#444]">
      
      {/* SEO META */}
      <Helmet>
        <title>
          Residential & Commercial Projects in Gurugram | Ethos Pro Realtors
        </title>

        <meta
          name="description"
          content="Explore premium residential and commercial real estate projects in Gurugram and NCR. Ethos Pro Realtors offers verified properties, investment-ready projects, and expert guidance."
        />

        <meta
          name="keywords"
          content="residential projects Gurugram, commercial projects Gurugram, real estate projects NCR, Ethos Pro Realtors projects"
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href="https://www.ethosprorealtors.com/properties-type"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Residential & Commercial Projects | Ethos Pro Realtors"
        />
        <meta
          property="og:description"
          content="Discover top residential apartments, villas, office spaces, and commercial projects in Gurugram with Ethos Pro Realtors."
        />
        <meta
          property="og:image"
          content="https://www.ethosprorealtors.com/assets/properties-type-og.jpg"
        />
        <meta
          property="og:url"
          content="https://www.ethosprorealtors.com/properties-type"
        />
        <meta property="og:site_name" content="Ethos Pro Realtors" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Real Estate Projects in Gurugram" />
        <meta
          name="twitter:description"
          content="View residential and commercial real estate projects curated by Ethos Pro Realtors."
        />
        <meta
          name="twitter:image"
          content="https://www.ethosprorealtors.com/assets/properties-type-og.jpg"
        />

        {/* Collection Page Schema */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Real Estate Projects by Ethos Pro Realtors",
            "url": "https://www.ethosprorealtors.com/properties-type",
            "description": "Collection of residential and commercial real estate projects in Gurugram and NCR.",
            "publisher": {
              "@type": "Organization",
              "name": "Ethos Pro Realtors",
              "url": "https://www.ethosprorealtors.com"
            }
          }
          `}
        </script>
      </Helmet>

      {/* SEO H1 (hidden for UI, visible to Google) */}
      <h1 className="sr-only">
        Residential and Commercial Real Estate Projects in Gurugram
      </h1>

      {/* Residential Section */}
      <section
        id="residential"
        className="scroll-mt-24 py-10 border-t border-gray-400 mobile-project-commerical"
      >
        <Residentials />
      </section>

      {/* Commercial Section */}
      <section
        id="commercial"
        className="scroll-mt-24 py-16 border-t border-gray-400 mobile-project-commerical"
      >
        <Commercial />
      </section>
    </div>
  );
};

export default Project;

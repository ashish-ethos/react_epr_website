import { useState } from "react";
import PremiumProperties from '../../components/PremiumProperties/PremiumProperties';
import DifferentCities from '../../components/DifferentCities/DifferentCities';
import ExploreProperties from '../../components/ExploreProperities/ExploreProperities';
import SetsApart from '../../components/SetsApart/SetsApart';
import WhyChooseUs from '../../components/WhyChooseus/WhyChooseus';
import OurTeam from '../../components/OurTeam/OurTeam';
import Testimonial from '../../components/Testimonials/Testimonials';
import OurBlog from '../../components/OurBlog/OurBlog';
import AssociatedDevelopers from '../../components/AssociatedDevelopers/AssociatedDevelopers';
import Hero from '../../components/Hero/Hero';
import PopularLocation from "../../components/PopularLocation/PopularLocation";
import { Helmet } from "react-helmet-async";


const Home = () => {
  const [filters, setFilters] = useState({ search: "", type: "", city: "" });

  const handleSearchChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (

    <>
      <Helmet>
        <title>Ethos Pro Realtors | Buy Luxury Property in Gurgaon</title>
        <meta
          name="description"
          content="Buy luxury residential & commercial properties in Gurgaon with Ethos Pro Realtors. Trusted channel partners for top builders."
        />
        <link rel="canonical" href="https://www.ethosprorealtors.com/" />

        <meta property="og:title" content="Ethos Pro Realtors – Luxury Property Experts" />
        <meta property="og:description" content="Premium residential & commercial real estate solutions in Gurgaon & NCR." />
        <meta property="og:url" content="https://www.ethosprorealtors.com/" />
      </Helmet>

      {/* Pass search change function to Hero */}
      <Hero onSearchChange={handleSearchChange} />

      {/* Pass filters to ExploreProperties */}
      <ExploreProperties filters={filters} />

      <PremiumProperties />
      <DifferentCities />
      <PopularLocation />
      <SetsApart />
      <WhyChooseUs />
      <OurTeam />
      <Testimonial />
      <OurBlog />
      <AssociatedDevelopers />
    </>
  );
};

export default Home;

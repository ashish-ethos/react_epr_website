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

const Home = () => {
  const [filters, setFilters] = useState({ search: "", type: "", city: "" });

  const handleSearchChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <>
      {/* Pass search change function to Hero */}
      <Hero onSearchChange={handleSearchChange} />

      {/* Pass filters to ExploreProperties */}
      <ExploreProperties filters={filters} />

      <PremiumProperties />
      <DifferentCities />
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

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Pages
import Home from "./pages/Home/Home";
import Project from "./pages/Projects/Project";

import About from "./pages/About/About";
import Blog from "./pages/Blog/Blog";
import Contact from "./pages/Contact/Contact";
// Layout
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Residentials from "./pages/Projects/Residentials";
import Commercial from "./pages/Projects/Commercial";
import PremiumProperties from "./components/PremiumProperties/PremiumProperties";
import Privacy from "./pages/Privacy/Privacy";
import Terms from "./pages/Terms/Terms";
import FAQPage from "./pages/F&Q/F&Qs";
import Disclaimer from "./pages/Disclaimer/Disclaimer";
import ScrollToTop from "./utils/ScrollToTopComponent";
import NotFound from "./pages/NotFound/NotFound";
import ExploreProperties from "./components/ExploreProperities/ExploreProperities";
import PopularLocation from "./components/PopularLocation/PopularLocation";

function App() {
  return (
    <Router>
      <Header />
      <ScrollToTop />
      <main className="pt-20 main-app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/location" element={<Home />} />
          <Route path="/blog/all-articles" element={<Home />} />


          {/* Projects */}
          <Route path="/projects" element={<Project />} />
          <Route path="/projects/residential" element={<Residentials />} />
          <Route path="/projects/residential/:propertyName" element={<Residentials />} />
          
          <Route path="/projects/commercial" element={<Commercial />} />
          <Route path="/projects/commercial/:propertyName" element={<Commercial />} />

          <Route
            path="/premiumproperties/:propertyName"
            element={<PremiumProperties />}
          />

          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/terms&conditions" element={<Terms />} />
          <Route path="/f&qs" element={<FAQPage />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/team/:name" element={<Home />} />
          <Route path="/about/:name" element={<About />} />
          <Route path="/explore-properties" element={<ExploreProperties />} />
          <Route path="/property/:propertyName" element={<ExploreProperties/>}/>
          <Route path="/blog/:id/:title" element={<Blog />} />
          <Route path="/popular-location/:locationName?" element={<PopularLocation/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
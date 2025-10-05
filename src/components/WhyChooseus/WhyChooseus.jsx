import React, { useState } from 'react';
import { BarChart3, Users, GitBranch, Clock, Calculator, FileText } from 'lucide-react';

const WhyChooseUs = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      id: 1,
      icon: BarChart3,
      title: "Trusted Channel Partner of Leading Builders",
      description: "We partner with top developers, giving you exclusive access to premier properties, competitive prices, and unique investment opportunities. Trust our expertise for secure, high-quality real estate solutions.",
      delay: "0ms"
    },
    {
      id: 2,
      icon: Users,
      title: "Transparent & Personalized Service",
      description: "Our commitment to transparency ensures honest guidance tailored to your needs. We take a personalized approach to every client, providing clear information and customized property options to match your goals.",
      delay: "100ms"
    },
    {
      id: 3,
      icon: GitBranch,
      title: "Dedicated Support Team For You After Sale's",
      description: "Our support doesn't end at the transaction. Count on us for reliable after-sales service, from property management advice to assistance with documentation, ensuring a seamless ownership experience for you.",
      delay: "200ms"
    },
    {
      id: 4,
      icon: Clock,
      title: "Exclusive Deals & Offers With Early Access",
      description: "As partners with top developers, we offer early access to new projects and exclusive offers. Benefit from priority bookings and insider information, giving you a competitive edge in the real estate market.",
      delay: "300ms"
    },
    {
      id: 5,
      icon: Calculator,
      title: "Expert Market Analysis & Investment Guidance",
      description: "Our experienced analysts provide comprehensive market research and investment insights. We analyze trends, property values, and future growth potential to help you make informed decisions and maximize your returns.",
      delay: "400ms"
    },
    {
      id: 6,
      icon: FileText,
      title: "Complete Legal & Documentation Support",
      description: "Navigate complex property laws with confidence. Our legal experts handle documentation, registration processes, and compliance requirements, ensuring your transactions are legally sound and hassle-free from start to finish.",
      delay: "500ms"
    }
  ];

  return (
    <div className="premium-properties-main min-h-screen bg-gradient-to-br from-gray-900 via-[#333] to-gray-800 py-10 px-4 laptop-mode-screen " id="why-choose-us">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10 animate-fade-in why-choose-header">
          <h2 className="text-3xl mobile-title-text font-[Montserrat] sm:text-xl md:text-5xl font-black mb-3 sm:mb-4 bg-gradient-to-r from-[#c2c6cb] via-[#c99913] to-[#c2c6cb] bg-clip-text text-transparent animate-pulse">
            Why Choose Us?
          </h2>
          <div className="h-1 bg-gradient-to-r from-transparent via-[#c99913] to-transparent rounded-full animate-pulse"></div>
          <p className="text-xl mobile-subtitle-text font-bebas md:text-2xl text-[#c2c6cb] font-light max-w-4xl mx-auto leading-relaxed whychoose-subtitle">
            "Your Pathway To Premium Properties And Investments"
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className="group relative overflow-hidden rounded-3xl bg-[#333] shadow-lg hover:shadow-2xl hover:shadow-black/50 transition-all duration-700 ease-out transform hover:-translate-y-2 cursor-pointer animate-slide-up"
                style={{ animationDelay: feature.delay }}
                onMouseEnter={() => setHoveredCard(feature.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Simple Border */}
                <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-r from-transparent via-[#ffffff38] to-transparent group-hover:from-[#c99913] group-hover:via-[#c99913] group-hover:to-[#c99913] transition-all duration-500">
                  <div className="h-full w-full rounded-3xl bg-[#333]"></div>
                </div>

                <div className="relative p-8 h-full flex flex-col z-10 mobile-chose-card">
                  {/* Icon Container */}
                  <div className="w-20 h-20 border border-[#ffffff38] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 relative overflow-hidden group-hover:border-[#c99913]">
                    {/* Icon Border Shine */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-[#c99913]/40 to-transparent opacity-0 group-hover:opacity-40 transform -translate-x-full group-hover:translate-x-full transition-transform duration-800"></div>

                    <IconComponent
                      className={`w-10 h-10 text-[#c2c6cb] group-hover:text-[#c99913] transition-colors duration-500 relative z-10 ${hoveredCard === feature.id ? 'animate-bounce' : ''} drop-shadow-lg`}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-[#c2c6cb] mb-4 group-hover:text-white transition-colors duration-300 leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-[#c2c6cb]/80 group-hover:text-[#c2c6cb] transition-colors duration-300 leading-relaxed text-md font-[Calibri]">
                      {feature.description}
                    </p>
                  </div>

                  {/* Bottom accent line only */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c99913] to-[#c99913] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                  {/* Corner dot */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-[#ffffff38] rounded-full group-hover:bg-[#c99913] transition-all duration-500"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-20 animate-fade-in-up bottom-cta" style={{ animationDelay: '600ms' }}>
          <div className="bottom-whychoose-content inline-flex items-center space-x-4 bg-[#333] border-2 border-[#ffffff38] px-8 py-3 shadow-lg hover:shadow-xl hover:border-[#c99913] transition-all duration-300">
            <div className="w-3 h-3 bg-[#c99913] animate-pulse"></div>
            <span className="font-medium text-[#c2c6cb] font-[Calibri]">
              Ready to get started? Let's make it happen.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
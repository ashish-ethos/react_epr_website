import React from 'react';
import M3M from "../../assets/images/premiumproperties/M3M.png";
import Elan from "../../assets/images/premiumproperties/Elan.png";
import DLF from "../../assets/images/premiumproperties/DLF.png";
import Godrej from "../../assets/images/premiumproperties/Godrej.jpg";
import Max from "../../assets/images/premiumproperties/Max-Estates.png";
import Omaxe from "../../assets/images/premiumproperties/Omaxe.png";
import TrumpTower from "../../assets/images/premiumproperties/Trump-Towers.png";
import Trinity from "../../assets/images/premiumproperties/Trinity-Infratech.png";
import Smartworld from "../../assets/images/premiumproperties/Smartworld.png";
import Signature from "../../assets/images/premiumproperties/Signature-Global.png";
import Unitech from "../../assets/images/premiumproperties/unitech.jpeg";
import Adani from "../../assets/images/premiumproperties/adani.png";
import Shapoorji from "../../assets/images/premiumproperties/shapoorji_pallonji.jpeg";
import IndiaBull from "../../assets/images/premiumproperties/indiabull.png";
import Bptp from "../../assets/images/premiumproperties/bptp.jpeg";
import Emaar from "../../assets/images/premiumproperties/emaar.png";
import Sobha from "../../assets/images/premiumproperties/sobha.png";
import AtsEstate from "../../assets/images/premiumproperties/ats_estate.jpeg";

const AssociatedDevelopers = () => {
  const developerLogos = [
    { id: 1, name: 'M3M', src: M3M, shadow: 'shadow-md' },
    { id: 2, name: 'Elan', src: Elan, shadow: 'shadow-md' },
    { id: 3, name: 'Omaxe', src: Omaxe, shadow: 'shadow-md' },
    { id: 4, name: 'DLF', src: DLF, shadow: 'shadow-md' },
    { id: 5, name: 'Godrej', src: Godrej, shadow: 'shadow-md' },
    { id: 6, name: 'Trinity', src: Trinity, shadow: 'shadow-md' },
    { id: 7, name: 'Signature Global', src: Signature, shadow: 'shadow-md' },
    { id: 8, name: 'Max Estates', src: Max, shadow: 'shadow-md' },
    { id: 9, name: 'Smartworld', src: Smartworld, shadow: 'shadow-md' },
    { id: 10, name: 'Trump Towers', src: TrumpTower, shadow: 'shadow-md' },
    { id: 11, name: 'Unitech', src: Unitech, shadow: 'shadow-md' },
    { id: 12, name: 'Adani', src: Adani, shadow: 'shadow-md' },
    { id: 13, name: 'Shapoorji', src: Shapoorji, shadow: 'shadow-md' },
    { id: 14, name: 'IndiaBull', src: IndiaBull, shadow: 'shadow-md' },
    { id: 15, name: 'Bptp', src: Bptp, shadow: 'shadow-md' },
    { id: 16, name: 'Emaar', src: Emaar, shadow: 'shadow-md' },
    { id: 17, name: 'Sobha', src: Sobha, shadow: 'shadow-md' },
    { id: 18, name: 'AtsEstate', src: AtsEstate, shadow: 'shadow-md' },
  ];

  return (
    <div className="relative py-4 sm:py-10 bg-gradient-to-br from-gray-900 via-[#333] to-gray-800 overflow-hidden" id='associated-developers'>
      {/* Inline marquee animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: 200%;
          animation: marquee 30s linear infinite;
        }
      `}</style>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 mobile-associate-section">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-block relative mb-4 sm:mb-6">
            <h2 className="text-2xl mobile-title-text sm:text-4xl md:text-6xl font-black font-[Montserrat] text-transparent bg-clip-text bg-gradient-to-r from-[#c2c6cb] via-[#c99913] to-[#c2c6cb] tracking-tight">
              Associated Developers
            </h2>
            <div className="absolute -bottom-2 left-0 right-0 h-1 mt-1 bg-gradient-to-r from-transparent via-[#c99913] to-transparent rounded-full"></div>
          </div>
          {/* <div className="mt-1 flex justify-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-[#c99913] animate-bounce"></div>
            <div className="w-2 h-2 rounded-full bg-[#c99913]/70 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 rounded-full bg-[#c99913]/50 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div> */}
        </div>

        {/* Continuous Marquee Logos */}
        <div className="relative  sm:h-50 overflow-hidden continuous-marquee">
          <div className="absolute inset-0 flex items-center">
            <div className="marquee-track space-x-8 sm:space-x-12">
              {/* First set */}
              {developerLogos.map((logo) => (
                <div key={`set1-${logo.id}`} className="flex-shrink-0 group relative">
                  <div className={`relative w-32 sm:w-40 h-20 sm:h-24 bg-[#333] rounded-xl border border-[#ffffff38] hover:border-[#c99913] transition-all duration-300 group-hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-black/30 flex items-center justify-center overflow-hidden`}>
                    <img 
                      src={logo.src} 
                      alt={logo.name} 
                      className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-105 filter brightness-90 group-hover:brightness-100" 
                    />
                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c99913]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                  </div>
                </div>
              ))}
              {/* Duplicate set */}
              {developerLogos.map((logo) => (
                <div key={`set2-${logo.id}`} className="flex-shrink-0 group relative">
                  <div className={`relative w-32 sm:w-40 h-20 sm:h-24 bg-[#333] rounded-xl border border-[#ffffff38] hover:border-[#c99913] transition-all duration-300 group-hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-black/30 flex items-center justify-center overflow-hidden`}>
                    <img 
                      src={logo.src} 
                      alt={logo.name} 
                      className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-105 filter brightness-90 group-hover:brightness-100" 
                    />
                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c99913]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Edge Gradients - Dark Theme */}
          <div className="absolute left-0 top-0 w-16 sm:w-32 h-full bg-gradient-to-r from-gray-900 to-transparent z-20"></div>
          <div className="absolute right-0 top-0 w-16 sm:w-32 h-full bg-gradient-to-l from-gray-800 to-transparent z-20"></div>
        </div>

        {/* Bottom Stats */}
        <div className="bottom-stats ">
          <div className="text-center ">
            <div className="inline-flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 bg-[#333]/80 backdrop-blur-sm rounded-lg sm:rounded-full px-6 sm:px-8 py-4 border border-[#ffffff38] shadow-lg hover:border-[#c99913] transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:space-x-8 text-[#c2c6cb] bottom-stats-content">
                <div className="text-center group cursor-pointer">
                  <div className="text-lg sm:text-xl font-bold text-[#c2c6cb] group-hover:text-[#c99913] transition-colors duration-300">15+</div>
                  <div className="text-xs sm:text-sm uppercase tracking-wider font-medium font-[Inter] text-[#c2c6cb]/70">Partners</div>
                </div>
                <div className="w-full sm:w-px h-px sm:h-12 bg-[#ffffff38] my-4 sm:my-0"></div>
                <div className="text-center group cursor-pointer">
                  <div className="text-lg sm:text-xl font-bold text-[#c2c6cb] group-hover:text-[#c99913] transition-colors duration-300">500+</div>
                  <div className="text-xs sm:text-sm uppercase tracking-wider font-medium font-[Inter] text-[#c2c6cb]/70">Projects</div>
                </div>
                <div className="w-full sm:w-px h-px sm:h-12 bg-[#ffffff38] my-4 sm:my-0"></div>
                <div className="text-center group cursor-pointer">
                  <div className="text-lg sm:text-xl font-bold text-[#c2c6cb] group-hover:text-[#c99913] transition-colors duration-300">25+</div>
                  <div className="text-xs sm:text-sm uppercase tracking-wider font-medium font-[Inter] text-[#c2c6cb]/70">Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AssociatedDevelopers;
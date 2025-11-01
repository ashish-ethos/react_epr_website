import React, { useState, useEffect } from 'react';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import Yuzvendra from "../../assets/images/home/yuzvendra-chahal.jpg";
import Rishi from "../../assets/images/home/rishi-dhawan.png";
import Rahul from "../../assets/images/home/rahul-dewan.webp";
import Paras from "../../assets/images/home/Paras-Dogra.jpg";
import Kabir from "../../assets/images/home/kabir-duhan-singh.jpg";
import '../WhyChooseus/WhyChooseus.css';
import CustomButton from '../ui/Button';

const Testimonial = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [pause, setPause] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [offset, setOffset] = useState(320);

  const testimonials = [
    {
      id: 1,
      name: "Yuzvendra Chahal",
      role: "Indian Cricketer",
      image: Yuzvendra,
      content: "I truly appreciate the honesty and professionalism of this team. They didn't just sell me a property; they guided me to make the right decision based on my needs. Their transparency and ethical approach set them apart. The entire experience was smooth, hassle-free, and absolutely worth it. Thank you for your amazing support!",
      rating: 5
    },
    {
      id: 2,
      name: "Rishi Dhawan",
      role: "Indian Cricketer",
      image: Rishi,
      content: "This company justifies its name, 'Ethos.' Unlike others, they did not make false claims just to sell me a property. Instead, they were honest, professional, and transparent. The team even refused things that were not possible, which I later appreciated. Thanks for your ethical approach—it helped me make a safe and smart investment!",
      rating: 5
    },
    {
      id: 3,
      name: "Rahul Dewan",
      role: "Indian Cricketer",
      image: Rahul,
      content: "I can confidently say that this group is destined for great success. Their polite, professional, and knowledgeable approach to real estate is commendable. From start to finish, I received an outstanding experience, with clear guidance and honest advice. Wishing the entire team all the best for the future—keep up the excellent work!",
      rating: 5
    },
    {
      id: 4,
      name: "Paras Dogra",
      role: "Indian Cricketer",
      image: Paras,
      content: "First time I came across a Real Estate group that truly focused on my needs rather than just making a sale. They understood my requirements and budget clearly and provided me with the best options. The experience was unreal—smooth, transparent, and absolutely amazing. Thanks, guys, for your great support and professionalism!",
      rating: 5
    },
    {
      id: 5,
      name: "Kabir Duhan Singh",
      role: "Indian Actor",
      image: Kabir,
      content: "Finding trustworthy real estate professionals is rare, but this team truly exceeded my expectations. They were honest, clear, and genuinely focused on helping me. Their dedication and knowledge made the entire process effortless. I'm grateful for their support and highly recommend them to anyone seeking real estate guidance!",
      rating: 5
    }
  ];

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    if (pause) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [pause]);

  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
        setOffset(0);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
        setOffset(120);
      } else {
        setVisibleCount(3);
        setOffset(320);
      }
    };

    updateVisible();
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, []);

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentSlide + i) % testimonials.length;
      visible.push({ ...testimonials[index], position: i });
    }
    return visible;
  };

  const centerPos = (visibleCount - 1) / 2;

  return (
    <div className=" bg-[#333] py-10 px-4 relative overflow-hidden laptop-mode-screen" id='testimonials'>
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 mobile-testimonial-section">
          <div className="inline-flex flex-col items-center justify-center space-x-2 mb-6">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-[Montserrat] font-black mb-3 sm:mb-4 bg-gradient-to-r from-[#c2c6cb] via-[#c99913] to-[#c2c6cb] bg-clip-text text-transparent animate-pulse mobile-title-text">
              Testimonials
            </p>
            
            <div className="h-1 w-full bg-gradient-to-r from-[#c2c6cb] via-[#c99913] to-[#c2c6cb] rounded-full animate-pulse"></div>
          </div>

          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-[#c2c6cb] fill-current mx-0.5" />
            ))}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[Montserrat] font-bold bg-gradient-to-r from-[#c2c6cb] via-[#444] to-[#c2c6cb] bg-clip-text text-transparent mb-6 testimonial-text-content">
            What Our Clients Have To Say About Us?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#c2c6cb] max-w-3xl font-bebas mx-auto leading-relaxed testimonial-subtitle">
            Discover why our clients trust us for their real estate needs. Their success is our greatest achievement.
            Read their stories to see how we've helped them find their perfect property.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setPause(true)}
          onMouseLeave={() => setPause(false)}
        >
          <div className="flex justify-center items-start space-x-2 md:space-x-2 lg:space-x-8 mb-12 mobile-testimonial-section">
            {getVisibleTestimonials().map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-all duration-700 ease-in-out w-full max-w-xs ${
                  visibleCount === 3 && index !== 1
                    ? 'scale-90 opacity-70 z-10'
                    : 'scale-100 opacity-100 z-20'
                }`}
                style={{
                  transform: `translateX(${(testimonial.position - centerPos) * offset}px)`
                }}
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-[#444]/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#ffffff38] group-hover:bg-[#444]/50 transition-all duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#333]/20 to-transparent rounded-3xl" />
                  <div className="relative z-10 p-4 md:p-6 lg:p-8 h-full flex flex-col">
                    <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-[#c2c6cb] opacity-60 mb-4" />
                    <p className="text-xs sm:text-sm leading-relaxed mb-4 fontFamily-bebas text-[#c2c6cb] flex-grow testimonial-content">
                      {testimonial.content}
                    </p>
                    <div className="flex space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-[#c2c6cb] fill-current" />
                      ))}
                    </div>
                    <div className="flex items-center space-x-4 mt-auto">
                      <div className="relative">
                        <img src={testimonial.image} alt={testimonial.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-3 ring-[#ffffff38]" />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#c2c6cb]/20 to-[#444]/20"></div>
                      </div>
                      <div>
                        <h4 className="font-bold bg-gradient-to-r from-[#c2c6cb] via-[#c99913] to-[#c2c6cb] bg-clip-text text-transparent text-sm sm:text-base">{testimonial.name}</h4>
                        <p className="text-xs sm:text-sm text-[#c2c6cb]">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center space-x-4">
            <CustomButton
              onClick={prevSlide}
              disabled={isAnimating}
              className="group relative cursor-pointer p-3 sm:p-4 bg-[#333]/80 backdrop-blur-sm rounded-full "
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#c2c6cb] group-hover:text-[#c2c6cb] transition-colors" />
            </CustomButton>
            <CustomButton
              onClick={nextSlide}
              disabled={isAnimating}
              className="group relative cursor-pointer p-3 sm:p-4 bg-[#333]/80 backdrop-blur-sm rounded-full "
            >
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#c2c6cb] group-hover:text-[#c2c6cb] transition-colors" />
            </CustomButton>
          </div>

          {/* Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => !isAnimating && setCurrentSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-[#c2c6cb] w-6 sm:w-8'
                    : 'bg-[#444] hover:bg-[#c2c6cb]/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
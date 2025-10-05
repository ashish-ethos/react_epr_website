import React, { useState, useEffect } from 'react';
import { Home,  ArrowLeft, MapPin, Compass, Star, Sparkles, RefreshCw,  } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [particles, setParticles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const newParticles = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            duration: Math.random() * 20 + 10,
            delay: Math.random() * 5,
        }));
        setParticles(newParticles);
    }, []);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
    };

    const FloatingParticle = ({ particle }) => (
        <div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-[#c08830] to-[#444] opacity-20 animate-pulse"
            style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDuration: `${particle.duration}s`,
                animationDelay: `${particle.delay}s`,
            }}
        />
    );

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-[#333] via-[#444] to-[#333] flex items-center justify-center p-4 overflow-hidden relative"
            onMouseMove={handleMouseMove}
        >
            {/* Animated Background Particles */}
            {particles.map((particle) => (
                <FloatingParticle key={particle.id} particle={particle} />
            ))}

            {/* Floating Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-[#c08830]/30 to-[#444]/30 blur-3xl transition-transform duration-1000 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
                        left: '10%',
                        top: '20%',
                    }}
                />
                <div
                    className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-[#c08830]/20 to-[#333]/20 blur-3xl transition-transform duration-1000 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * -0.05}px, ${mousePosition.y * -0.05}px)`,
                        right: '10%',
                        bottom: '20%',
                    }}
                />
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
                {/* Main 404 Display */}
                <div className="mb-8 relative">
                    <div
                        className="text-9xl md:text-[12rem] font-black bg-gradient-to-r from-[#c08830] via-[#ffffff38] to-[#c08830] bg-clip-text text-transparent leading-none relative"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        4
                        <span className="relative inline-block">
                            0
                            <div className={`absolute inset-0 transition-all duration-500 ${isHovering ? 'scale-110' : 'scale-100'}`}>
                                <Compass className="absolute -top-4 -left-4 w-8 h-8 text-[#c08830] animate-spin" style={{ animationDuration: '8s' }} />
                                <Star className="absolute -top-6 -right-2 w-6 h-6 text-[#c08830] animate-bounce" />
                                <MapPin className="absolute -bottom-2 -left-6 w-7 h-7 text-[#c08830] animate-pulse" />
                                <Sparkles className="absolute -bottom-4 -right-4 w-6 h-6 text-[#c08830] animate-ping" />
                            </div>
                        </span>
                        4
                    </div>
                    <div className="absolute inset-0 text-9xl md:text-[12rem] font-black text-[#c08830]/20 blur-sm -z-10 animate-pulse">
                        404
                    </div>
                </div>

                {/* PAGE NOT FOUND TEXT */}
                <div className="mb-4">
                    <h4 className="text-2xl md:text-3xl font-extrabold text-[#c2c6cb] animate-fade-in tracking-widest">
                        PAGE NOT FOUND
                    </h4>
                </div>

                {/* Title and Description */}
                <div className="mb-12 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-[#c2c6cb] mb-4 animate-fade-in">
                        Lost in the
                        <span className="bg-gradient-to-r from-[#c08830] to-[#ffffff38] bg-clip-text text-transparent"> Property Search</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-[#c2c6cb]/80 max-w-2xl mx-auto leading-relaxed">
                        <span className="text-[#c2c6cb]">Let's help you find your dream home with Ethos Pro Realtors.</span>
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                    <button
                        className="group cursor-pointer relative px-8 py-4 bg-gradient-to-r from-[#c08830] to-[#444] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-[#c08830] overflow-hidden border border-[#ffffff38]"
                        onClick={() => navigate('/')}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#c08830] to-[#333] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative flex items-center gap-2">
                            <Home className="w-5 h-5 text-white" />
                            Take Me Home
                        </div>
                    </button>
                    <button
                        className="group cursor-pointer px-8 py-4 bg-[#444]/80 backdrop-blur-sm text-[#c08830] font-semibold rounded-xl border border-[#ffffff38] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#333]/90 hover:border-[#c08830]"
                        onClick={() => navigate(-1)}
                    >
                        <div className="flex items-center gap-2">
                            <ArrowLeft className="w-5 h-5 text-[#c2c6cb] group-hover:-translate-x-1 transition-transform duration-300" />
                            Go Back
                        </div>
                    </button>
                    <button
                        className="group cursor-pointer px-8 py-4 bg-[#444]/80 backdrop-blur-sm text-[#c08830] font-semibold rounded-xl border border-[#ffffff38] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#333]/90 hover:border-[#c08830]"
                        onClick={() => window.location.reload()}
                    >
                        <div className="flex items-center gap-2">
                            <RefreshCw className="w-5 h-5 text-[#c2c6cb] group-hover:rotate-180 transition-transform duration-500" />
                            Refresh
                        </div>
                    </button>
                </div>

                {/* Fun Interactive Element */}
                <div className="relative">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#c08830] to-[#444] text-white rounded-full border border-[#ffffff38] shadow-sm hover:border-[#c08830]">
                        <Sparkles className="w-5 h-5 text-white animate-pulse" />
                        <span className="text-sm font-medium text-white">
                            Looking for your dream property? Let Ethos Pro Realtors guide you home!
                        </span>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-10 left-10 opacity-20">
                    <div className="w-20 h-20 border-4 border-[#c08830] rounded-full animate-spin" style={{ animationDuration: '15s' }} />
                </div>
                <div className="absolute bottom-10 right-10 opacity-20">
                    <div className="w-16 h-16 border-4 border-[#c08830] rounded-square rotate-45 animate-bounce" />
                </div>
                <div className="absolute top-1/2 left-4 opacity-10">
                    <Star className="w-12 h-12 text-[#c08830] animate-pulse" />
                </div>
                <div className="absolute top-1/4 right-8 opacity-15">
                    <Compass className="w-10 h-10 text-[#c08830] animate-spin" style={{ animationDuration: '12s' }} />
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 1s ease-out;
                }
            `}</style>
        </div>
    );
}
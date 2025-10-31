import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    ChevronLeft,
    ChevronRight,
    Calendar,
    User,
    ArrowRight,
    TrendingUp,
    Building,
    Home,
    Clock,
    Eye,
    X
} from 'lucide-react';
import { Drawer, Grid } from 'antd';
import BlogExploreArticles from './BlogExploreArticles';
import BuyProperties from "../../assets/images/premiumproperties/buying-properties.jpg";
import CalculateROI from "../../assets/images/premiumproperties/Calculate-ROI.jpg";
import GoodBadInvest from "../../assets/images/premiumproperties/good-vs-bad-investment.jpg";
import KeyThings from "../../assets/images/premiumproperties/Key-Things.jpg";
import "../OurTeam/OurTeam.css";
import CustomButton from '../ui/Button';
import { Tooltip } from 'antd';


const roiContent = `
Introduction
Understanding the Return on Investment (ROI) is crucial when it comes to real estate investing. Whether you're buying a rental property, a commercial space, or a residential apartment for appreciation, knowing how to calculate ROI can help you evaluate the profitability of your investment. This guide will break down the concept of ROI, its formulas, and practical examples so you can make informed real estate decisions.

What is ROI in Real Estate?
ROI (Return on Investment) measures the profitability of a property investment. It's the percentage return you earn on the money invested in a property, factoring in income and costs. A higher ROI indicates a better investment.

Basic ROI Formula
ROI = (Net Profit / Total Investment) x 100

Where:

Net Profit = Total Income - Total Expenses
Total Investment = Purchase Price + Renovation + Other Costs

Example:

Total rental income per year = ₹6,00,000
Total expenses = ₹1,50,000
Total investment = ₹40,00,000
Net Profit = ₹6,00,000 - ₹1,50,000 = ₹4,50,000
ROI = (₹4,50,000 / ₹40,00,000) x 100 = 11.25%

Key Components That Affect ROI
Rental Income - Monthly or yearly earnings from tenants
Property Price - Initial cost of buying the asset
Maintenance & Taxes - Ongoing costs like society fees, repairs, property tax
Loan EMI & Interest - If financed, consider EMI and interest paid
Vacancy Periods - Times when the property remains unoccupied

Types of ROI Calculations
1. Cash-on-Cash Return
Useful for investors using financing (loans): CoC ROI = (Annual Cash Flow / Cash Invested) x 100

2. Cap Rate (Capitalization Rate)
Ideal for evaluating rental properties: Cap Rate = (Net Operating Income / Property Value) x 100

3. Total ROI (Including Appreciation)
Total ROI = ((Rental Income + Property Appreciation - Expenses) / Total Investment) x 100

Tips to Improve ROI on Property Investments
Choose high-demand locations with rental yield potential
Negotiate better purchase prices
Renovate smartly to boost rent/resale value
Reduce vacancy periods with effective marketing
Use tax benefits & deductions to lower costs

Tools & Resources
Online ROI calculators
Rental yield estimators
Real estate investment software
Consultation with authorized channel partners

Conclusion
Calculating ROI is essential to assess the success of any real estate investment. Whether you're buying for rental income, appreciation, or a mix of both, having clarity on your expected returns helps reduce risk and optimize profit. Consult with a trusted authorized channel partner like Ethos Pro Realtors to guide you through high-ROI opportunities across Delhi NCR.

Start smart, invest smarter!
`;

const channelPartnerContent = `
Introduction
Buying property is a significant financial decision, and having the right guidance can make all the difference. While many buyers directly approach developers or real estate agents, an increasingly popular and reliable option is purchasing property through an authorized channel partner. But what exactly does this mean, and why is it beneficial? In this blog, we will explore the role of an authorized channel partner and why choosing one can lead to a smarter, safer, and more rewarding real estate investment.

What is an Authorized Channel Partner?
An authorized channel partner is a certified and trusted intermediary between real estate developers and buyers. These professionals work directly with developers to market and sell properties, ensuring a transparent and efficient process for buyers. Unlike traditional brokers, they have official authorization and exclusive deals, making them a valuable resource for property seekers.

The Role of a Channel Partner in Real Estate
Bridging the Gap - Channel partners act as a link between developers and buyers, ensuring smooth transactions and clear communication.
Providing Verified Information - They offer accurate and up-to-date details about projects, including pricing, amenities, and legal clearances.
Guiding Buyers - From property selection to documentation, channel partners assist buyers at every step.
Offering Exclusive Deals - Since they work closely with developers, they often provide special discounts, payment plans, and incentives unavailable elsewhere.

Key Benefits of Buying Through an Authorized Channel Partner
1. Access to Exclusive Offers
Moreover, authorized channel partners often have access to pre-launch offers, discounts, and special payment plans that are not available to the general public. This means you can secure a better deal than if you approached the developer directly.

2. Transparency and Trust
In addition, since channel partners are officially recognized by developers, they adhere to ethical business practices, ensuring a fair and transparent transaction process. This minimizes the risk of fraud and hidden costs.

3. Expert Guidance and Market Knowledge
A good channel partner provides in-depth market insights, helping buyers choose the right property based on their budget, preferences, and investment goals. Their expertise can help you make an informed decision.

4. End-to-End Assistance
Furthermore, from site visits and price negotiations to documentation and loan assistance, authorized channel partners provide comprehensive support throughout the buying process, making it seamless and hassle-free.

5. No Additional Cost for Buyers
Contrary to popular belief, buyers do not have to pay extra fees when purchasing through a channel partner. Their commission is generally paid by the developer, making it a win-win for buyers seeking expert guidance at no additional cost.

Additional Advantages of Working with a Channel Partner
6. Wide Range of Options
Authorized channel partners provide access to multiple projects from different developers, giving buyers a variety of choices in terms of location, budget, and amenities.

7. Market Analysis & Insights
With deep market knowledge, channel partners offer valuable insights into property trends, investment potential, and price appreciation, helping buyers make data-driven decisions.

8. Legal & Documentation Support
Real estate transactions involve a lot of paperwork. Channel partners ensure that all legal formalities and documentation are in place, reducing the risk of errors and delays.

9. Assistance with Financials
Many channel partners collaborate with financial institutions to help buyers secure home loans and manage their finances effectively.

10. Priority Allotment
Channel partners often have early access to new launches, which means they can offer buyers a head start in securing units in prime locations—even before these become available to the general public. As a result, this early advantage can significantly improve your chances of getting the best inventory at the best price.

11. Post-Sale Support
Even after the purchase is complete, channel partners assist buyers with property registration, interior design consultations, and other post-sale services.

Common Myths and Misconceptions About Channel Partners
Myth 1: Properties are More Expensive When Bought Through a Channel Partner
Reality: In fact, prices are often the same—or even lower—thanks to exclusive deals, early-bird offers, and special discounts negotiated by channel partners. Additionally, many developers provide these incentives exclusively through trusted partners to attract serious buyers early in the sales cycle. Therefore, you can enjoy added value, priority allotments, and better choices without paying anything extra.

Myth 2: Channel Partners Work Like Brokers
Reality: Unlike independent brokers, channel partners are officially authorized and have direct ties with developers. As a result, they offer a higher level of authenticity, transparency, and credibility—giving buyers peace of mind throughout the transaction process.

Myth 3: Buying Directly from a Developer is Always Better
Reality: While developers offer properties, channel partners, on the other hand, go a step further by providing comparative insights, personalized advice, and additional benefits that developers may not offer directly. Consequently, buyers receive a more comprehensive and tailored experience that enhances their investment journey.

Why Choose Ethos Pro Realtors?
As an authorized channel partner, Ethos Pro Realtors collaborates with top developers to offer buyers the best property deals. Our team provides:

Verified property listings to ensure secure investments
Expert consultation to help you find the perfect property
Access to exclusive offers for competitive pricing
Complete support from inquiry to possession
Legal & financial assistance for a smooth transaction
Post-sale services to assist with your needs even after purchase

Conclusion
To sum it up, buying property through an authorized channel partner is a smart, safe, and strategic choice for homebuyers and investors alike. With access to exclusive deals, expert guidance, and a transparent buying process, you can make a confident real estate investment.

Looking for your dream home or perfect investment opportunity? Contact Ethos Pro Realtors today and let our experts guide you!
`;

const goodBadInvestmentContent = `
Introduction
In the world of real estate, not all investments are created equal. While some properties generate long-term wealth and stable rental income, others can lead to legal troubles, financial losses, or stagnant growth. Knowing the difference between a good and bad property investment is critical for both first-time buyers and seasoned investors.

This guide will help you evaluate the key factors that separate profitable investments from risky ones, so you can make confident, informed decisions.

Location: The Game-Changer
Good Investment:
Well-connected to roads, metro, and public transport
Near business hubs, schools, hospitals, and retail centers
Future-ready with infrastructure plans (expressways, SEZs, etc.)

Bad Investment:
Remote or underdeveloped areas with poor connectivity
Low demand and high vacancy rates
Unclear zoning or land use plans

Developer Reputation & Project Credentials
Good Investment:
Trusted, RERA-registered developers
Timely project delivery record
Transparent pricing, legal clearances, and customer service

Bad Investment:
Unknown or blacklisted builders
Frequent delays and construction issues
Hidden charges, unclear documentation

Rental & Resale Potential
Good Investment:
High rental demand in the area
Steady appreciation over 5-10 years
Tenant-friendly amenities and layouts

Bad Investment:
Low occupancy or oversupply
No market appreciation
Outdated layouts or poor amenities

Legal Clearances & Title Verification
Good Investment:
Clear land title, RERA compliance
Verified approvals from authorities
No encumbrances or litigation

Bad Investment:
Disputed ownership or unverified sellers
Missing or forged documents
No occupancy or completion certificate

Affordability & Financial Planning
Good Investment:
Fits your budget with scope for future ROI
Transparent cost structure (price, GST, stamp duty)
Easy loan eligibility and flexible payment plans

Bad Investment:
Overpriced or misleading deals
Hidden costs and high maintenance
Difficult loan approvals

Market Trends & Timing
Good Investment:
Bought during pre-launch or buyer's market phase
Backed by market data and expert consultation
Low risk, high return potential

Bad Investment:
Bought at peak pricing with no growth
Lacks data-backed decision-making
High risk with low liquidity

Support from Authorized Channel Partners
Good Investment:
Guided by certified professionals
Access to exclusive inventory and deals
End-to-end support including legal, financial, and post-sale services

Bad Investment:
Reliance on unknown brokers
No post-sale support or accountability
Risk of fraud or misinformation

Conclusion
Distinguishing between a good and bad property investment boils down to research, timing, and choosing the right partners. Look for growth potential, legal safety, financial viability, and builder trustworthiness. Working with an authorized channel partner like Ethos Pro Realtors ensures that your investment is secure, rewarding, and future-ready.

Make your next property move a smart one—because in real estate, informed choices pay the best returns.
`;

const keyThingsContent = `
Introduction
Investing in real estate—whether commercial or residential—is a major financial decision that requires careful thought and strategic planning. With property prices constantly evolving and regulatory norms frequently changing, making the right choice can be daunting. This blog outlines the key factors to consider before buying a commercial or residential property, helping you make a smart, secure, and profitable investment.

Define Your Purpose & Investment Goals
Start by identifying your objective:

Are you buying for personal use, rental income, or long-term appreciation?
Is your focus on a stable income stream (commercial) or future resale value (residential)?
Clarifying your goal will help determine the right property type and location.

Choose the Right Location
Location plays a pivotal role in property valuation and rental potential. Evaluate:

Proximity to business hubs, schools, transport, and healthcare
Future infrastructure developments (metro, highways, SEZs)
Neighborhood safety and livability for residential; footfall and connectivity for commercial

Check Legal Clearances & Documentation
Ensure the property has:

Title deed and ownership documents
RERA registration
Land use and zoning approvals
No legal disputes or encumbrances
Engage a real estate lawyer or an authorized channel partner to verify legal documentation.

Understand Market Trends & Price Appreciation
Study current market trends:

Is the location appreciating?
Are rental yields favorable?
What are the ongoing and future developments nearby?
Use property portals and consult local experts to assess ROI.

Evaluate Builder Reputation & Track Record
Whether commercial or residential, the developer's credibility is crucial:

Delivery timelines
Past project performance
Construction quality
Customer reviews
Stick with reputed developers and authorized channel partners.

Plan Your Budget & Financing Options
Factor in all costs:

Property price
Registration, stamp duty, GST
Maintenance charges, parking, brokerage
Loan eligibility & EMI structure
Compare home loan offers from banks/NBFCs and get pre-approved if possible.

Inspect the Property & Amenities
Visit the site personally:

Check construction quality, layout, and amenities
Inquire about water, electricity, and security
Ensure compliance with fire, safety, and accessibility norms

Resale & Rental Potential
Think long-term:

Is the property easy to rent out?
Is there demand in that area?
What's the resale potential in 5-10 years?

Conclusion
Whether you're investing in a commercial property for rental returns or a residential home for your family, careful research and expert guidance are essential. Consider partnering with an authorized channel partner to simplify the process, verify documentation, and get access to exclusive deals.

A wise property decision today can build long-term wealth tomorrow.
`;

const contentMap = {
    1: { content: roiContent, image: CalculateROI },
    2: { content: channelPartnerContent, image: BuyProperties },
    3: { content: goodBadInvestmentContent, image: GoodBadInvest },
    4: { content: keyThingsContent, image: KeyThings },
    5: {
        content: 'Explore the latest market trends and expert predictions that will shape the real estate landscape in 2025...',
        image: KeyThings
    }
};

const blogPosts = [
    {
        id: 1,
        image: CalculateROI,
        date: 'July 2, 2025',
        category: 'Investment',
        tags: ['Investment', 'Real Estate'],
        title: 'How To Calculate ROI On Real Estate Investments - A Complete Guide',
        excerpt: 'Understanding the Return on Investment (ROI) is crucial when it comes to real estate investing decisions. Learn the complete methodology...',
        author: 'Ethos Team',
        readTime: '8 min read',
        views: '2.4k',
        icon: <TrendingUp className="w-5 h-5" />
    },
    {
        id: 2,
        image: BuyProperties,
        date: 'Feb 28, 2025',
        category: 'Investment',
        tags: ['Investment', 'Real Estate'],
        title: 'Why Buying Property Through An Authorized Channel Partner Is A Smart Choice?',
        excerpt: 'Buying property is a significant financial decision, and having the right guidance throughout the process can make all the difference...',
        author: 'Ethos Team',
        readTime: '6 min read',
        views: '1.8k',
        icon: <Home className="w-5 h-5" />
    },
    {
        id: 3,
        image: GoodBadInvest,
        date: 'July 2, 2025',
        category: 'Investment',
        tags: ['Investment', 'Real Estate'],
        title: 'Good vs. Bad Real Estate Investments: What To Watch Out For',
        excerpt: 'There are clear signs that differentiate a good investment from a poor one in real estate. Learn the key indicators and red flags...',
        author: 'Ethos Team',
        readTime: '10 min read',
        views: '3.2k',
        icon: <TrendingUp className="w-5 h-5" />
    },
    {
        id: 4,
        image: KeyThings,
        date: 'July 2, 2025',
        category: 'Investment',
        tags: ['Investment', 'Real Estate'],
        title: 'Key Things To Consider Before Buying Commercial Or Residential Property',
        excerpt: 'Investing in real estate—whether commercial or residential—is a major financial commitment that requires careful consideration...',
        author: 'Ethos Team',
        readTime: '12 min read',
        views: '2.9k',
        icon: <Building className="w-5 h-5" />
    },
    {
        id: 5,
        image: KeyThings,
        date: 'May 15, 2025',
        category: 'Market Trends',
        tags: ['Market', 'Analysis'],
        title: 'Real Estate Market Predictions for 2025: What Investors Should Know',
        excerpt: 'Explore the latest market trends and expert predictions that will shape the real estate landscape in 2025...',
        author: 'Market Analyst',
        readTime: '7 min read',
        views: '4.1k',
        icon: <TrendingUp className="w-5 h-5" />
    }
];

const OurBlog = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isExploreDrawerOpen, setIsExploreDrawerOpen] = useState(false);
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);
    const carouselRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();


    const getVisibleCards = () => {
        if (window.innerWidth < 640) return 1; 
        if (window.innerWidth < 1024) return 2; 
        return 4; 
    };

    const [visibleCards, setVisibleCards] = useState(getVisibleCards());

    useEffect(() => {
        const handleResize = () => {
            setVisibleCards(getVisibleCards());
            setCurrentSlide(0); 
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) =>
            prev >= blogPosts.length - visibleCards ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev <= 0 ? blogPosts.length - visibleCards : prev - 1));
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const handleTouchStart = (e) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        const diff = touchStartX.current - touchEndX.current;
        if (Math.abs(diff) > 50) { 
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide(); 
            }
        }
        touchStartX.current = null;
        touchEndX.current = null;
    };

    const openDrawer = (post) => {
        setSelectedPost(post);
        setIsDrawerOpen(true);
        navigate(`/blog/${post.id}/${post.title.toLowerCase().replace(/ /g, '-')}`, { replace: false });
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
        setSelectedPost(null);
        navigate(-1, { replace: false });
    };

    useEffect(() => {
        if (location.pathname === "/blog/all-articles") {
            setIsDrawerOpen(false);
            setSelectedPost(null);
            setIsExploreDrawerOpen(true);
        } else if (location.pathname.startsWith('/blog/')) {
            const postId = parseInt(location.pathname.split('/')[2], 10);
            const post = blogPosts.find(p => p.id === postId);
            if (post) {
                setSelectedPost(post);
                setIsDrawerOpen(true);
            }
        }
    }, [location.pathname]);

    const openExploreDrawer = () => {
        setIsDrawerOpen(false);
        setSelectedPost(null);
        setIsExploreDrawerOpen(true);
        navigate("/blog/all-articles", { replace: false });
    };

    const closeExploreDrawer = () => {
        setIsExploreDrawerOpen(false);
        navigate(-1);
    };

    const renderContent = (content) => {
        const lines = content.split('\n');
        let currentSection = '';

        return lines.map((line, index) => {
            if (line.startsWith('**') && line.endsWith('**')) {
                const text = line.replace(/\*\*/g, '');
                if (text.startsWith('Introduction') || text.startsWith('Conclusion')) {
                    return <h2 key={index} className="text-2xl font-bold mt-6 mb-4 text-[#c2c6cb]">{text}</h2>;
                } else if (text.includes(':')) {
                    return <h3 key={index} className="text-xl font-semibold mt-4 mb-2 text-[#c2c6cb]">{text}</h3>;
                } else {
                    currentSection = text;
                    return <h3 key={index} className="text-xl font-semibold mt-4 mb-2 text-[#c2c6cb]">{text}</h3>;
                }
            }
            if (line.startsWith('- ')) {
                return <li key={index} className="ml-6 list-disc text-[#c2c6cb]">{line.replace('- ', '')}</li>;
            }
            if (line.match(/^\d+\.\s/)) {
                return <li key={index} className="ml-6 list-decimal text-[#c2c6cb]">{line.replace(/^\d+\.\s/, '')}</li>;
            }
            if (line.trim() === '') {
                return null;
            }
            return <p key={index} className="mb-4 text-[#c2c6cb]">{line}</p>;
        });
    };

    return (
        <div className="min-h-screen bg-[#00000047] py-10 px-4 relative overflow-hidden premium-properties-main laptop-mode-screen" id='our-blog'>
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="w-full flex flex-col gap-12 header-ourblog">
                    {/* Row 1 */}
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                        <div className="inline-flex items-center gap-3 p-3 bg-[#444]/80 backdrop-blur-sm rounded-2xl shadow-lg border border-[#ffffff38]">
                            <div className="w-3 h-3 bg-[#c2c6cb] rounded-full animate-pulse"></div>
                            <span className="mobile-subtitle-text text-[#c2c6cb] font-semibold text-lg">
                                Latest Real Estate Insights
                            </span>
                            <div className="w-12 h-6 bg-gradient-to-r from-[#c2c6cb] to-[#444] rounded-full flex items-center justify-center text-xs font-bold text-[#333]">
                                NEW
                            </div>
                        </div>

                        <CustomButton
                            onClick={openExploreDrawer}
                            className="group explore-all-article relative overflow-hidden px-6 py-2 text-[#c2c6cb] font-bold rounded-2xl shadow-2xl transition-all duration-500 hover:scale-110 hover:shadow-2xl transform border border-[#ffffff38]"
                        >
                            <div className="relative flex items-center gap-3">
                                <span className="text-lg">Explore All Articles</span>
                                <ArrowRight className="w-5 h-5 text-[#c2c6cb] group-hover:translate-x-2 transition-transform duration-300" />
                            </div>
                        </CustomButton>
                    </div>

                    {/* Row 2 */}
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-10 header-ourblog">
                        {/* Left Section - Blog Heading + Content */}
                        <div className="flex-1 text-center lg:text-left">
                            <h1 className="text-5xl lg:text-7xl font-black mb-4 leading-none">
                                <span className="block mobile-title-text mobile-title-text font-[Montserrat] sm:text-xl md:text-5xl font-black mb-3 sm:mb-4 bg-gradient-to-r from-[#c2c6cb] via-[#c99913] to-[#c2c6cb] bg-clip-text text-transparent">
                                    Our Blog
                                </span>
                            </h1>
                            <p className="text-lg mobile-subtitle-text lg:text-xl font-bebas text-[#c2c6cb] max-w-2xl leading-relaxed mx-auto lg:mx-0">
                                Dive deep into the world of real estate with our expert insights,
                                market analysis, and investment strategies that drive success.
                            </p>
                        </div>

                        {/* Right Section - Stats */}
                        <div className="flex justify-center lg:justify-end gap-6 w-full lg:w-auto">
                            <div className="bg-[#444]/90 backdrop-blur-sm rounded-xl p-3 px-4 shadow-lg border border-[#ffffff38] text-center stats-section">
                                <div className="text-2xl font-bold text-[#c2c6cb]">50+</div>
                                <div className="text-[#c2c6cb] text-sm">Articles</div>
                            </div>
                            <div className="bg-[#444]/90 backdrop-blur-sm rounded-xl p-3 px-4 shadow-lg border border-[#ffffff38] text-center stats-section">
                                <div className="text-2xl font-bold text-[#c2c6cb]">10k+</div>
                                <div className="text-[#c2c6cb] text-sm">Readers</div>
                            </div>
                            <div className="bg-[#444]/90 backdrop-blur-sm rounded-xl p-3 px-4 shadow-lg border border-[#ffffff38] text-center stats-section">
                                <div className="text-2xl font-bold text-[#c2c6cb]">5★</div>
                                <div className="text-[#c2c6cb] text-sm">Rating</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Blog Carousel */}
                <div className="relative">
                    <div className="absolute -top-16 right-0 flex gap-4 z-20">
                        <CustomButton
                            onClick={prevSlide}
                            disabled={currentSlide === 0}
                            className="group w-14 h-14 bg-[#333]/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#444]/90 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-110 transform shadow-lg border border-[#ffffff38]"
                        >
                            <ChevronLeft className="w-6 h-6 text-[#c2c6cb] group-hover:text-[#c2c6cb] transition-colors" />
                        </CustomButton>
                        <CustomButton
                            onClick={nextSlide}
                            disabled={currentSlide >= blogPosts.length - visibleCards}
                            className="group w-14 h-14 bg-[#333]/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#444]/90 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-110 transform shadow-lg border border-[#ffffff38]"
                        >
                            <ChevronRight className="w-6 h-6 text-[#c2c6cb] group-hover:text-[#c2c6cb] transition-colors" />
                        </CustomButton>
                    </div>

                    <div
                        className="overflow-hidden py-4 ourblog-card-section"
                        ref={carouselRef}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div
                            className="flex transition-transform duration-700 ease-out main-ourblogcard"
                            style={{ transform: `translateX(-${(currentSlide * 100) / visibleCards}%)` }}
                        >
                            {blogPosts.map((post) => (
                                <div
                                    key={post.id}
                                    className={`flex-shrink-0 px-4  all-ourblog-card cursor-pointer w-full sm:w-1/2 lg:w-1/4 ${visibleCards}`}
                                    onMouseEnter={() => setHoveredCard(post.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    onClick={() => openDrawer(post)}
                                    
                                >
                                    <div className={`relative bg-[#444] rounded-3xl overflow-hidden group transition-all duration-700 hover:scale-105 shadow-xl border border-[#ffffff38] ${hoveredCard === post.id
                                        ? 'shadow-2xl shadow-[#c2c6cb]/20'
                                        : 'hover:shadow-[#c2c6cb]/20'
                                        }`}
                                    >
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className={`w-full h-full object-cover transition-all duration-700 ${hoveredCard === post.id ? 'scale-110 brightness-110' : 'group-hover:scale-105'
                                                    }`}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#333]/60 via-[#333]/10 to-transparent"></div>
                                            <div className="absolute top-6 left-6">
                                                <div className="px-4 category-label py-2 text-[#c2c6cb] font-[Inter] font-bold text-sm shadow-lg transform hover:scale-105 transition-transform border border-[#ffffff38] bg-[#333]/40 backdrop-blur-sm">
                                                    {post.category}
                                                </div>
                                            </div>

                                            <div className="absolute bottom-6 left-6 flex gap-4">
                                                <div className="flex items-center gap-2 px-3 py-1 bg-[#333]/90 backdrop-blur-sm rounded-full shadow-lg">
                                                    <Eye className="w-4 h-4 text-[#c2c6cb]" />
                                                    <span className="text-[#c2c6cb] text-sm font-medium">{post.views}</span>
                                                </div>
                                                <div className="flex items-center gap-2 px-3 py-1 bg-[#333]/90 backdrop-blur-sm rounded-full shadow-lg">
                                                    <Clock className="w-4 h-4 text-[#c2c6cb]" />
                                                    <span className="text-[#c2c6cb] text-sm font-medium">{post.readTime}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-8 sm:p-4 relative bg-[#444] ourblog-card-mobile">
                                            <div className="flex gap-2 mb-4">
                                                {post.tags.map((tag, idx) => (
                                                    <span key={idx} className="px-3 py-1 bg-gradient-to-r from-[#c2c6cb]/20 to-[#444]/20 text-[#c2c6cb] rounded-lg text-xs border border-[#ffffff38] hover:border-[#c2c6cb] hover:bg-[#c2c6cb]/10 transition-all cursor-pointer font-medium">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-2 text-[#c2c6cb] text-sm mb-4">
                                                <Calendar className="w-4 h-4 text-[#c2c6cb]" />
                                                <span>{post.date}</span>
                                            </div>

                                            <Tooltip placement="topLeft" title={post.title} arrow={{ pointAtCenter: true }}>
                                                <p
                                                    className="text-2xl font-bold text-[#c2c6cb] mb-4 leading-tight group-hover:text-[#c2c6cb] transition-colors duration-300 line-clamp-2"
                                                >
                                                    {post.title}
                                                </p>
                                            </Tooltip>
                                            <p className="text-[#c2c6cb] mb-6 leading-relaxed line-clamp-3">{post.excerpt}</p>
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gradient-to-r from-[#c2c6cb] to-[#444] rounded-full flex items-center justify-center shadow-lg">
                                                    <User className="w-6 h-6 text-[#333]" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-[#c2c6cb]">{post.author}</p>
                                                    <p className="text-[#c2c6cb] text-sm">Author</p>
                                                </div>
                                            </div>
                                            <div 
                                             className={`absolute cursor-pointer bottom-4 right-8 w-12 h-12 bg-gradient-to-r from-[#c2c6cb] to-[#444] rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${hoveredCard === post.id ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                                                }`}>
                                                <ArrowRight className="w-6 h-6 text-[#333]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Article Content Drawer */}
                <Drawer
                    title={
                        <p className="text-xs md:text-xl font-bold text-[#c2c6cb]">
                            {selectedPost?.title}
                        </p>
                    }
                    className="custom-scrollbar bg-[#444]"
                    placement="right"
                    closable={true}
                    onClose={closeDrawer}
                    open={isDrawerOpen}
                    width={screens.xs ? "100%" : "50%"}
                  
                    closeIcon={<X className="w-6 h-6 text-[#c2c6cb]" />}
                >
                    {selectedPost && (
                        <div className='bg-[#444]'>
                            <img
                                src={contentMap[selectedPost.id].image}
                                alt={selectedPost.title}
                                className="w-full p-4 h-48 md:h-64 object-cover rounded-xl mb-2"
                            />
                            <div className="prose p-4 prose-lg text-[#c2c6cb] max-w-none">
                                {renderContent(contentMap[selectedPost.id].content)}
                            </div>
                        </div>
                    )}
                </Drawer>

                {/* Explore Articles Drawer */}
                <Drawer
                    title={<h2 className="text-lg font-bold text-[#c2c6cb]">Explore All Articles</h2>}
                    placement="right"
                    closable={true}
                    onClose={closeExploreDrawer}
                    open={isExploreDrawerOpen}
                    width={screens.xs ? "100%" : "80%"}
                   className='custom-scrollbar '
                    closeIcon={<X className="w-6 h-6 text-[#c2c6cb]" />}
                >
                    <BlogExploreArticles blogPosts={blogPosts} contentMap={contentMap} />
                </Drawer>
            </div>
        </div>
    );
};

export default OurBlog;
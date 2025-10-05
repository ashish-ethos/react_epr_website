import React from 'react';
import {
    Shield,
    Eye,
    Lock,
    Users,
    FileText,
    ExternalLink,
    CheckCircle,
    AlertCircle,
    Info,
    Calendar,
} from 'lucide-react';

const Privacy = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#333]">
            {/* Header */}
            <header className="bg-white dark:bg-[#444] border-b border-t border-[#ffffff38]">
                <div className="max-w-5xl mx-auto px-4 py-4">
                    <div className="text-center flex justify-between items-center mobile-termcondition">
                        <h1 className="mobile-faq-header text-3xl font-bold text-gray-900 dark:text-[#c2c6cb] font-bebas">
                            Privacy Policy
                        </h1>

                        <div className="inline-flex items-center px-4 py-2 bg-black text-gray-700 dark:text-[#c2c6cb] rounded-lg border border-[#ffffff38] hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                            <Calendar className="w-5 h-5 mr-2" />
                            <span className="text-base font-medium fontFamily-Content">
                                Last updated: August, 2025
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-5xl mx-auto px-4 py-8">
                {/* Introduction */}
                <section className="mobile-footer-card bg-white dark:bg-[#444] rounded-xl p-8 mb-6 shadow-md border border-[#ffffff38] hover:border-[#c08830] hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center mb-5">
                        <div className="p-2 bg-black rounded-lg mr-3">
                            <Info className="w-5 h-5 text-gray-600 dark:text-[#c2c6cb]" />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-[#c2c6cb] fontFamily-bebas  mobile-faq-title ">
                            Introduction
                        </h2>
                    </div>
                    <p className="text-gray-600 dark:text-[#c2c6cb] leading-relaxed text-lg fontFamily-Content  mobile-faq-question ">
                        At Ethos Pro Realtors, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, 
                        use, and safeguard your personal information when you use our website, services, or interact with us. 
                        By accessing our website or providing your information, you agree to the terms of this policy.
                    </p>
                </section>
                {/* Grid layout for sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Information We Collect */}
                    <section className="bg-white dark:bg-[#444] rounded-xl p-8 shadow-md border border-[#ffffff38] hover:border-[#c08830] hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300  mobile-footer-card">
                        <div className="flex items-center mb-5">
                            <div className="p-2 bg-black rounded-lg mr-3">
                                <Eye className="w-5 h-5 text-gray-600 dark:text-[#c2c6cb]" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-[#c2c6cb] fontFamily-bebas  mobile-faq-title ">
                                1. Information We Collect
                            </h2>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="p-4 bg-black rounded-lg border-l-4 border-gray-300 dark:border-gray-600">
                                <h3 className="font-semibold text-gray-900 dark:text-[#c2c6cb] mb-2 text-lg fontFamily-bebas">
                                    Personal Information
                                </h3>
                                <p className="text-gray-600 dark:text-[#c2c6cb] text-base fontFamily-Content mobile-faq-question ">
                                    Name, email address, phone number, and details you provide.
                                </p>
                            </div>
                            <div className="p-4 bg-black rounded-lg border-l-4 border-gray-300 dark:border-gray-600">
                                <h3 className="font-semibold text-gray-900 dark:text-[#c2c6cb] mb-2 text-lg fontFamily-bebas">Usage Data</h3>
                                <p className="text-gray-600 dark:text-[#c2c6cb] text-base fontFamily-Content mobile-faq-question ">
                                    IP address, browser type, and pages visited.
                                </p>
                            </div>
                            <div className="p-4 bg-black rounded-lg border-l-4 border-gray-300 dark:border-gray-600">
                                <h3 className="font-semibold text-gray-900 dark:text-[#c2c6cb] mb-2 text-lg fontFamily-bebas">Cookies</h3>
                                <p className="text-gray-600 dark:text-[#c2c6cb] text-base fontFamily-Content mobile-faq-question ">
                                    Data collected through cookies to personalize your experience.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* How We Use Your Information */}
                    <section className="bg-white dark:bg-[#444] rounded-xl p-6 shadow-md border border-[#ffffff38] hover:border-[#c08830] hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 mobile-footer-card ">
                        <div className="flex items-center mb-5">
                            <div className="p-2 bg-black rounded-lg mr-3">
                                <FileText className="w-5 h-5 text-gray-600 dark:text-[#c2c6cb]" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-[#c2c6cb] fontFamily-bebas  mobile-faq-title ">
                                2. How We Use Your Information
                            </h2>
                        </div>
                        <div className="space-y-3">
                            {[
                                'Respond to your inquiries and provide support',
                                'Offer tailored recommendations',
                                'Process transactions and send updates',
                                'Improve our website functionality',
                                'Comply with legal requirements',
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-start space-x-3 p-3 bg-black rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                                >
                                    <CheckCircle className="w-5 h-5 text-gray-500 dark:text-[#c2c6cb] mt-0.5" />
                                    <span className="text-gray-700 dark:text-[#c2c6cb] text-base fontFamily-Content  mobile-faq-question">{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Sharing Your Information */}
                    <section className="bg-white dark:bg-[#444] rounded-xl p-6 shadow-md border border-[#ffffff38] hover:border-[#c08830] hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 mobile-footer-card ">
                        <div className="flex items-center mb-5">
                            <div className="p-2 bg-black rounded-lg mr-3">
                                <Users className="w-5 h-5 text-gray-600 dark:text-[#c2c6cb]" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-[#c2c6cb] fontFamily-bebas  mobile-faq-title ">
                                3. Sharing Your Information
                            </h2>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 bg-black rounded-lg border-l-4 border-gray-300 dark:border-gray-600">
                                <h3 className="font-semibold text-gray-900 dark:text-[#c2c6cb] mb-2 text-lg fontFamily-bebas">
                                    Service Providers
                                </h3>
                                <p className="text-gray-600 dark:text-[#c2c6cb] text-base fontFamily-Content mobile-faq-question ">
                                    Third-party vendors assisting in our services.
                                </p>
                            </div>
                            <div className="p-4 bg-black rounded-lg border-l-4 border-gray-300 dark:border-gray-600">
                                <h3 className="font-semibold text-gray-900 dark:text-[#c2c6cb] mb-2 text-lg fontFamily-bebas">
                                    Legal Compliance
                                </h3>
                                <p className="text-gray-600 dark:text-[#c2c6cb] text-base fontFamily-Content mobile-faq-question ">
                                    Authorities, if required by law or to protect rights.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Your Privacy Rights */}
                    <section className="bg-white dark:bg-[#444] rounded-xl p-8 shadow-md border border-[#ffffff38] hover:border-[#c08830] hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300  mobile-footer-card">
                        <div className="flex items-center mb-5">
                            <div className="p-2 bg-black rounded-lg mr-3">
                                <CheckCircle className="w-5 h-5 text-gray-600 dark:text-[#c2c6cb]" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-[#c2c6cb] fontFamily-bebas  mobile-faq-title ">
                                4. Your Privacy Rights
                            </h2>
                        </div>
                        <div className="space-y-3">
                            {[
                                'Access, correct, or update your personal info',
                                'Opt-out of marketing communications',
                                'Request deletion of personal data',
                            ].map((right, i) => (
                                <div
                                    key={i}
                                    className="flex items-start space-x-3 p-3 bg-black rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                                >
                                    <CheckCircle className="w-5 h-5 text-gray-500 dark:text-[#c2c6cb] mt-0.5" />
                                    <span className="text-gray-700 dark:text-[#c2c6cb] text-base fontFamily-Content  mobile-faq-question">{right}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Data Security */}
                    <section className="bg-white dark:bg-[#444] rounded-xl p-6 shadow-md border border-[#ffffff38] hover:border-[#c08830] hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 mobile-footer-card ">
                        <div className="flex items-center mb-5">
                            <div className="p-2 bg-black rounded-lg mr-3">
                                <Lock className="w-5 h-5 text-gray-600 dark:text-[#c2c6cb]" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-[#c2c6cb] fontFamily-bebas  mobile-faq-title ">
                                5. Data Security
                            </h2>
                        </div>
                        <div className="p-4 bg-black rounded-lg border-l-4 border-gray-300 dark:border-gray-600">
                            <div className="flex items-start space-x-3">
                                <AlertCircle className="w-5 h-5 text-gray-600 dark:text-[#c2c6cb] mt-0.5" />
                                <p className="text-gray-700 dark:text-[#c2c6cb] leading-relaxed text-base fontFamily-Content  mobile-faq-question">
                                    We implement robust measures to protect your personal data.
                                    However, no system is 100% secure.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Cookies Policy */}
                    <section className="bg-white dark:bg-[#444] rounded-xl p-6 shadow-md border border-[#ffffff38] hover:border-[#c08830] hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 mobile-footer-card ">
                        <div className="flex items-center mb-5">
                            <div className="p-2 bg-black rounded-lg mr-3">
                                <Shield className="w-5 h-5 text-gray-600 dark:text-[#c2c6cb]" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-[#c2c6cb] fontFamily-bebas  mobile-faq-title ">
                                6. Cookies Policy
                            </h2>
                        </div>
                        <p className="text-gray-600 dark:text-[#c2c6cb] text-base fontFamily-Content mobile-faq-question ">
                            Our website uses cookies to enhance your experience. You can
                            manage cookies in browser settings.
                        </p>
                    </section>

                    {/* Third-Party Links */}
                    <section className="bg-white dark:bg-[#444] rounded-xl p-8 shadow-md border border-[#ffffff38] hover:border-[#c08830] hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300  mobile-footer-card">
                        <div className="flex items-center mb-5">
                            <div className="p-2 bg-black rounded-lg mr-3">
                                <ExternalLink className="w-5 h-5 text-gray-600 dark:text-[#c2c6cb]" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-[#c2c6cb] fontFamily-bebas  mobile-faq-title ">
                                7. Third-Party Links
                            </h2>
                        </div>
                        <p className="text-gray-600 dark:text-[#c2c6cb] text-base fontFamily-Content mobile-faq-question ">
                            Our site may link to external sites. We are not responsible for
                            their privacy practices.
                        </p>
                    </section>

                    {/* Updates to Policy */}
                    <section className="bg-white dark:bg-[#444] rounded-xl p-8 shadow-md border border-[#ffffff38] hover:border-[#c08830] hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300  mobile-footer-card">
                        <div className="flex items-center mb-5">
                            <div className="p-2 bg-black rounded-lg mr-3">
                                <Calendar className="w-5 h-5 text-gray-600 dark:text-[#c2c6cb]" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-[#c2c6cb] fontFamily-bebas  mobile-faq-title ">
                                8. Updates to This Policy
                            </h2>
                        </div>
                        <p className="text-gray-600 dark:text-[#c2c6cb] text-base fontFamily-Content mobile-faq-question ">
                            We may update this Privacy Policy from time to time. Changes will
                            be posted here with updated date.
                        </p>
                    </section>

                    {/* Footer Note - full width */}
                    <div className="md:col-span-2 bg-white dark:bg-[#444] rounded-xl p-6 text-center border border-[#ffffff38] hover:border-[#c08830] hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300">
                        <p className="text-gray-600 dark:text-[#c2c6cb] leading-relaxed text-base fontFamily-Content">
                            By using our website or services, you acknowledge that you have
                            read and understood this Privacy Policy.
                        </p>
                        <p className="mt-3 font-medium text-gray-800 dark:text-[#c2c6cb] text-lg fontFamily-Content">
                            Thank you for trusting us with your information!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
import React from "react";
import {
  FileText,
  CheckCircle,
  Shield,
  User,
  AlertTriangle,
  Link,
  Calendar,
  Scale,
} from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-[#333]">
      {/* Header */}
      <header className="bg-[#444] border-b border-t border-[#676869]">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="text-center flex justify-between items-center mobile-termcondition">
            <h1 className="mobile-faq-header text-2xl font-bold text-[#c2c6cb] font-bebas">
              Terms & Conditions
            </h1>
            <div className="inline-flex items-center px-4 py-2 bg-[#444] text-[#c2c6cb] rounded-lg border border-[#676869]">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium fontFamily-Content">
                Last updated: August, 2024
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Acceptance of Terms */}
          <section className="bg-[#444] rounded-lg p-4 shadow-sm border border-[#676869] hover:border-[#c08830] transition-colors duration-200">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-[#444] rounded-lg mr-3 border border-[#676869] hover:border-[#c08830] transition-colors duration-200 ">
                <CheckCircle className="w-4 h-4 text-[#c2c6cb]" />
              </div>
              <h2 className="text-xl font-semibold text-[#c2c6cb] fontFamily-bebas mobile-faq-title ">
                1. Acceptance of Terms
              </h2>
            </div>
            <p className="text-[#c2c6cb] leading-relaxed fontFamily-Content mobile-faq-question ">
              By using our website or services, you acknowledge that you have
              read, understood, and agree to these Terms and Conditions. If you
              do not agree, please discontinue use of our website and services.
            </p>
          </section>

          {/* Use of Services */}
          <section className="bg-[#444] rounded-lg p-4 shadow-sm border border-[#676869] hover:border-[#c08830] transition-colors duration-200">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-[#444] rounded-lg mr-3 border border-[#676869] hover:border-[#c08830] transition-colors duration-20">
                <User className="w-4 h-4 text-[#c2c6cb]" />
              </div>
              <h2 className="text-xl font-semibold text-[#c2c6cb] fontFamily-bebas mobile-faq-title ">
                2. Use of Services
              </h2>
            </div>
            <ul className="list-disc pl-6 text-[#c2c6cb] space-y-2 fontFamily-Content mobile-faq-question">
              <li>You must be at least 18 years old or have guardian consent.</li>
              <li>
                You agree to use our services only for lawful purposes and in
                compliance with all laws.
              </li>
              <li>
                You are responsible for maintaining the confidentiality of your
                account information.
              </li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section className="bg-[#444] rounded-lg p-4 shadow-sm border border-[#676869] hover:border-[#c08830] transition-colors duration-200">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-[#444] rounded-lg mr-3 border border-[#676869] hover:border-[#c08830] transition-colors duration-20">
                <FileText className="w-4 h-4 text-[#c2c6cb]" />
              </div>
              <h2 className="text-xl font-semibold text-[#c2c6cb] fontFamily-bebas mobile-faq-title ">
                3. Intellectual Property
              </h2>
            </div>
            <p className="text-[#c2c6cb] leading-relaxed fontFamily-Content mobile-faq-question ">
              All content on this website, including text, images, logos, and
              design, is the property of Ethos Pro Realtors or its licensors and
              is protected by copyright laws. You may not reproduce, distribute,
              or modify any content without written permission.
            </p>
          </section>

          {/* User Conduct */}
          <section className="bg-[#444] rounded-lg p-4 shadow-sm border border-[#676869] hover:border-[#c08830] transition-colors duration-200">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-[#444] rounded-lg mr-3 border border-[#676869] hover:border-[#c08830] transition-colors duration-20">
                <AlertTriangle className="w-4 h-4 text-[#c2c6cb]" />
              </div>
              <h2 className="text-xl font-semibold text-[#c2c6cb] fontFamily-bebas mobile-faq-title ">
                4. User Conduct
              </h2>
            </div>
            <ul className="list-disc pl-6 text-[#c2c6cb] space-y-2 fontFamily-Content mobile-faq-question">
              <li>Do not engage in activity that disrupts website functionality.</li>
              <li>Do not post harmful, misleading, or offensive content.</li>
              <li>
                Do not attempt to gain unauthorized access to any part of the
                website or systems.
              </li>
            </ul>
          </section>

          {/* Product & Service Availability */}
          <section className="bg-[#444] rounded-lg p-4 shadow-sm border border-[#676869] hover:border-[#c08830] transition-colors duration-200">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-[#444] rounded-lg mr-3 border border-[#676869] hover:border-[#c08830] transition-colors duration-20">
                <Shield className="w-4 h-4 text-[#c2c6cb]" />
              </div>
              <h2 className="text-xl font-semibold text-[#c2c6cb] fontFamily-bebas mobile-faq-title ">
                5. Product & Service Availability
              </h2>
            </div>
            <p className="text-[#c2c6cb] fontFamily-Content  mobile-faq-question">
              All products and services are subject to availability and may be
              changed or discontinued without notice. We reserve the right to
              refuse service at our discretion.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="bg-[#444] rounded-lg p-4 shadow-sm border border-[#676869] hover:border-[#c08830] transition-colors duration-200">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-[#444] rounded-lg mr-3 border border-[#676869] hover:border-[#c08830] transition-colors duration-20">
                <Shield className="w-4 h-4 text-[#c2c6cb]" />
              </div>
              <h2 className="text-xl font-semibold text-[#c2c6cb] fontFamily-bebas mobile-faq-title ">
                6. Limitation of Liability
              </h2>
            </div>
            <p className="text-[#c2c6cb] fontFamily-Content  mobile-faq-question">
              Ethos Pro Realtors is not responsible for any direct, indirect, or
              incidental damages arising from use of our website or services. We
              do not guarantee uninterrupted or error-free operation.
            </p>
          </section>

          {/* Third-Party Links */}
          <section className="bg-[#444] rounded-lg p-4 shadow-sm border border-[#676869] hover:border-[#c08830] transition-colors duration-200">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-[#444] rounded-lg mr-3 border border-[#676869] hover:border-[#c08830] transition-colors duration-20">
                <Link className="w-4 h-4 text-[#c2c6cb]" />
              </div>
              <h2 className="text-xl font-semibold text-[#c2c6cb] fontFamily-bebas mobile-faq-title ">
                7. Third-Party Links
              </h2>
            </div>
            <p className="text-[#c2c6cb] fontFamily-Content  mobile-faq-question">
              Our website may contain links to third-party sites. We are not
              responsible for their content, policies, or practices. Access them
              at your own risk.
            </p>
          </section>

          {/* Modifications to Terms */}
          <section className="bg-[#444] rounded-lg p-4 shadow-sm border border-[#676869] hover:border-[#c08830] transition-colors duration-200">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-[#444] rounded-lg mr-3 border border-[#676869] hover:border-[#c08830] transition-colors duration-20">
                <Calendar className="w-4 h-4 text-[#c2c6cb]" />
              </div>
              <h2 className="text-xl font-semibold text-[#c2c6cb] fontFamily-bebas mobile-faq-title ">
                8. Modifications to Terms
              </h2>
            </div>
            <p className="text-[#c2c6cb] fontFamily-Content  mobile-faq-question">
              We may update or modify these Terms anytime without prior notice.
              Continued use of our website after changes means acceptance of the
              updated terms.
            </p>
          </section>

          {/* Governing Law */}
          <section className="bg-[#444] rounded-lg p-4 shadow-sm border border-[#676869] hover:border-[#c08830] transition-colors duration-200">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-[#444] rounded-lg mr-3 border border-[#676869] hover:border-[#c08830] transition-colors duration-20">
                <Scale className="w-4 h-4 text-[#c2c6cb]" />
              </div>
              <h2 className="text-xl font-semibold text-[#c2c6cb] fontFamily-bebas mobile-faq-title ">
                9. Governing Law
              </h2>
            </div>
            <p className="text-[#c2c6cb] fontFamily-Content  mobile-faq-question">
              These Terms are governed by the laws of India. Any disputes will
              be subject to the jurisdiction of Haryana courts.
            </p>
          </section>

          {/* Footer Note */}
          <div className="md:col-span-2 bg-[#444] rounded-lg p-4 text-center border border-[#676869] hover:border-[#c08830] transition-colors duration-200">
            <p className="text-[#c2c6cb] leading-relaxed fontFamily-Content mobile-faq-question ">
              By using our website or services, you acknowledge that you have
              read and understood these Terms and Conditions.
            </p>
            <p className="mt-2 font-medium text-[#c2c6cb] fontFamily-Content">
              Thank you for choosing Ethos Pro Realtors!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
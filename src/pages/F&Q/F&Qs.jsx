import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = {
  buying: [
    {
      question: "What should I consider before buying a property?",
      answer:
        "You should consider your budget, location preferences, property type, amenities, financing options, and future resale value before making a purchase. Conduct thorough market research and get legal verification of the property.",
    },
    {
      question: "How do I know if a property is legally clear?",
      answer:
        "Ensure the property has proper documentation like title deeds, encumbrance certificates, and approvals from local authorities.",
    },
    {
      question: "What are the additional costs involved in buying a property?",
      answer:
        "Additional costs may include stamp duty, registration fees, legal charges, home loan processing charges, property taxes and maintenance deposits.",
    },
    {
      question: "Can I get a home loan for my purchase?",
      answer:
        "Yes, most banks and financial institutions offer home loans. Eligibility depends on your income, credit score, and property value.",
    },
    {
      question:
        "What is the difference between a ready-to-move-in property and an under-construction property?",
      answer:
        "A ready-to-move-in property is complete and available for immediate possession, while an under-construction property requires waiting until the project is completed.",
    },
    {
      question: "Is it better to buy property through an authorized channel partner?",
      answer:
        "Yes, authorized channel partners provide expert guidance, exclusive offers, and seamless assistance, ensuring a trustworthy buying process.",
    },
    {
      question: "How much down payment is typically required for buying a property?",
      answer:
        "Usually, 10-20% of the property value is required as a down payment. The rest can be financed through a home loan.",
    },
    {
      question: "What documents are required to buy a property?",
      answer:
        "Documents typically include proof of identity, income proof, loan sanction letter (if applicable), sale agreement, and property registration papers.",
    },
    {
      question: "How do I verify the builder’s credibility?",
      answer:
        "Check the builder's past projects, customer reviews, RERA registration, and financial stability before proceeding.",
    },
  ],
  renting: [
    {
      question: "What factors should I consider when renting a property?",
      answer:
        "Consider the location, rent amount, lease terms, proximity to amenities, and the condition of the property before finalizing.",
    },
    {
      question: "What is a security deposit, and is it refundable?",
      answer:
        "A security deposit is an advance payment to cover potential damages. It is refundable upon vacating if no major damages occur.",
    },
    {
      question: "How much security deposit is usually required?",
      answer:
        "Security deposits vary by location and property but are generally 1-3 months' rent. Always confirm the amount with the landlord.",
    },
    {
      question: "What is included in a rental agreement?",
      answer:
        "A rental agreement includes details such as the rent amount, lease duration, security deposit, maintenance responsibilities, and other terms agreed upon by both parties.",
    },
    {
      question: "What is the process to terminate a rental agreement early?",
      answer:
        "Early termination terms are specified in the agreement. Usually, a notice period of 1-3 months is required, or a penalty may apply.",
    },
    {
      question: "What should I check before signing a rental agreement?",
      answer:
        "Review the terms, rent amount, payment schedule, maintenance responsibilities, and notice period carefully.",
    },
    {
      question: "Who is responsible for maintenance and repairs in a rental property?",
      answer:
        "Typically, minor repairs are handled by the tenant, while major maintenance is the landlord's responsibility, as outlined in the rental agreement.",
    },
    {
      question: "What documents do I need to rent a property?",
      answer:
        "Typically, you need a valid ID, address proof, rental agreement, and possibly references or income proof.",
    },
    {
      question: "Can the landlord increase the rent during the lease term?",
      answer:
        "No, the rent cannot be increased during the lease term unless specified in the rental agreement. Renewal terms may allow for a rent hike.",
    },
    {
      question: "How is the rent amount determined?",
      answer:
        "Rent depends on factors like property location, size, amenities, and market demand.",
    },
  ],
  selling: [
    {
      question: "What is the best time to sell a property?",
      answer:
        "The ideal time depends on market trends, demand, and seasonality. A real estate expert can provide insights on when to maximize profits.",
    },
    {
      question: "How can I determine the right price for my property?",
      answer:
        "Property value depends on market trends, location, size, property condition, amenities and consult a real estate expert to set a competitive price. A market analysis or valuation by a real estate professional can help.",
    },
    {
      question: "What documents are required to sell a property?",
      answer:
        "Essential documents include the sale deed, title deed, property tax receipts, encumbrance certificate, property valuation report and any loan clearance papers.",
    },
    {
      question: "How long does it usually take to sell a property?",
      answer:
        "The time to sell varies based on market conditions, property location, demand, pricing and how effectively the property is marketed. Properties in high-demand areas sell faster with the right strategy.",
    },
    {
      question: "What are the taxes involved in selling a property?",
      answer:
        "Sellers may be liable for capital gains tax, which varies depending on the holding period of the property. Tax exemptions may apply if reinvesting in another property.",
    },
    {
      question: "Should I sell my property through an agent or independently?",
      answer:
        "Selling through an agent provides access to a larger buyer pool, expert negotiation skills, and assistance with legal processes, ensuring a smoother transaction.",
    },
    {
      question: "How can I make my property more appealing to buyers?",
      answer:
        "Maintain cleanliness, complete minor repairs, stage the property well, and highlight unique features to attract potential buyers.",
    },
  ],
};

const FAQPage = () => {
  const [active, setActive] = useState(null);

  const toggleFAQ = (key) => {
    setActive(active === key ? null : key);
  };

  return (
    <div className="mobile-faq-screen max-w-4xl mt-4 mb-4 mx-auto py-8 px-4 border-1 border-gray-200 dark:border-gray-400 rounded-lg shadow-lg bg-white dark:bg-[#333] hover:border-[#c08830] transition-colors duration-200">
      <h1 className="mobile-faq-header text-4xl font-bold font-bebas text-center mb-6 text-gray-900 dark:text-[#c2c6cb]">
        Frequently Asked Questions
      </h1>

      {Object.entries(faqs).map(([category, items]) => (
        <div key={category} className="mb-10">
          <h2 className="mobile-faq-title text-2xl text-center font-bebas font-semibold mb-6 capitalize text-gray-800 dark:text-[#c2c6cb] border-b pb-2 border-gray-300 dark:border-gray-600">
            FAQs About {category}
          </h2>

          <div className="space-y-4">
            {items.map((faq, idx) => {
              const key = `${category}-${idx}`;
              const isOpen = active === key;

              return (
                <div
                  key={key}
                  className="border-gray-400 dark:border-gray-400 border-1 fontFamily-bebas rounded-xl shadow-sm overflow-hidden bg-white dark:bg-[#444] hover:border-[#c08830] transition-colors duration-200"
                >
                  <button
                    onClick={() => toggleFAQ(key)}
                    className="flex justify-between items-center w-full px-6 py-2 text-left focus:outline-none"
                  >
                    <span className="mobile-faq-question font-medium text-gray-900 dark:text-[#c2c6cb] fontFamily-bebas ">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 fontFamily-Content  dark:text-[#c2c6cb] cursor-pointer transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-4 text-gray-600 dark:text-[#c2c6cb] fontFamily-Content mobile-faq-answer"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQPage;
import React, { useState } from "react";

const faqs = [
  {
    q: "How can I track my order?",
    a: "You can track your order from your account dashboard under the 'Orders' section. You will also receive email updates once your order is shipped.",
  },
  {
    q: "What is your return policy?",
    a: "You can return items within 14 days of delivery as long as they are unused and in the original packaging. Some products may not be eligible for return.",
  },
  {
    q: "Do you offer cash on delivery?",
    a: "Yes, we offer Cash on Delivery for most locations. Additional service fees may apply depending on your area.",
  },
  {
    q: "How long does shipping take?",
    a: "Delivery usually takes 2–5 business days depending on your location. You can view estimated delivery time at checkout.",
  },
  {
    q: "Can I change or cancel my order?",
    a: "Orders can be changed or cancelled before they are processed. Once shipped, the order cannot be modified.",
  },
  {
    q: "Is my payment information secure?",
    a: "Absolutely. All payments are processed through Stripe, a PCI-DSS compliant payment processor. We never store your card details.",
  },
];

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState(null);

  function toggle(i) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <div className="py-12 max-w-3xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-base-content mb-3">
          Frequently Asked Questions
        </h1>
        <p className="text-base-content/60 text-sm">
          Can't find what you're looking for?{" "}
          <a href="#" className="text-green-600 hover:underline font-medium">
            Contact us
          </a>
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-3">
        {faqs.map((item, i) => (
          <div
            key={i}
            className={`bg-base-100 border rounded-2xl overflow-hidden transition-all duration-200 ${
              openIndex === i
                ? "border-green-400 shadow-sm"
                : "border-base-300 hover:border-base-400"
            }`}
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between px-6 py-4 text-left"
              aria-expanded={openIndex === i}
            >
              <span className="font-semibold text-sm text-base-content pr-4">
                {item.q}
              </span>
              <span
                className={`shrink-0 h-6 w-6 rounded-full flex items-center justify-center transition-colors ${
                  openIndex === i
                    ? "bg-green-600 text-white"
                    : "bg-base-200 text-base-content/60"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </button>

            {openIndex === i && (
              <div className="px-6 pb-5">
                <p className="text-sm text-base-content/70 leading-relaxed">
                  {item.a}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

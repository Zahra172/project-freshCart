import React from "react";

export default function Faqs() {
  const faqs = [
    {
      q: "How can I track my order?",
      a: "You can track your order from your account dashboard under the 'Orders' section. You will also receive email updates once your order is shipped."
    },
    {
      q: "What is your return policy?",
      a: "You can return items within 14 days of delivery as long as they are unused and in the original packaging. Some products may not be eligible for return."
    },
    {
      q: "Do you offer cash on delivery?",
      a: "Yes, we offer Cash on Delivery for most locations. Additional service fees may apply depending on your area."
    },
    {
      q: "How long does shipping take?",
      a: "Delivery usually takes 2–5 business days depending on your location. You can view estimated delivery time at checkout."
    },
    {
      q: "Can I change or cancel my order?",
      a: "Orders can be changed or cancelled before they are processed. Once shipped, the order cannot be modified."
    },
  ];

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h1>

      <div className="space-y-3">
        {faqs.map((item, i) => (
          <div key={i} className="collapse collapse-arrow bg-base-200 shadow-md rounded-lg">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-semibold">
              {item.q}
            </div>
            <div className="collapse-content text-base text-gray-600">
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

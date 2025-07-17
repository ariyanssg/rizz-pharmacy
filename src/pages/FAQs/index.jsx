import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const FAQs = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "What products do you offer?",
      answer: "We offer a wide range of pharmaceutical products including prescription medications, over-the-counter drugs, supplements, and health products."
    },
    {
      id: 2,
      question: "How do I place an order?",
      answer: "You can place an order by browsing our products, adding items to your cart, and proceeding to checkout. Make sure to have your prescription ready if required."
    },
    {
      id: 3,
      question: "What are your shipping options?",
      answer: "We offer standard shipping (3-5 business days) and express shipping (1-2 business days). Free shipping is available for orders over $50."
    },
    {
      id: 4,
      question: "Do you accept insurance?",
      answer: "Yes, we accept most major insurance plans. Please contact our customer service team to verify your coverage."
    },
    {
      id: 5,
      question: "What is your return policy?",
      answer: "We have a 30-day return policy for unopened products. Prescription medications cannot be returned for safety reasons."
    }
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-global-2">
      <Header />
      <main className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-global-1 mb-8">Frequently Asked Questions</h1>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <motion.div
                  key={faq.id}
                  className="bg-global-5 rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: faq.id * 0.1 }}
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-global-4 transition-colors duration-200"
                  >
                    <span className="text-lg font-semibold text-global-1">{faq.question}</span>
                    <motion.span
                      className="text-button-2 text-xl"
                      animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      ▼
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openFAQ === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4 text-global-1">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQs;

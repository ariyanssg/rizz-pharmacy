import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen bg-global-2">
      <Header />
      <main className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-global-1 mb-8">Contact Us</h1>
            <div className="bg-global-5 rounded-lg p-8">
              <p className="text-global-1 text-lg mb-4">
                We'd love to hear from you! Get in touch with us for any questions or support.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-global-1 mb-2">Email</h3>
                  <p className="text-global-1">support@rizzpharmacy.com</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-global-1 mb-2">Phone</h3>
                  <p className="text-global-1">+1 (555) 123-4567</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-global-1 mb-2">Address</h3>
                  <p className="text-global-1">123 Pharmacy Street, Health City, HC 12345</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

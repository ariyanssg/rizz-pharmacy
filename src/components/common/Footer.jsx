import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(''); // 'success', 'error', or ''

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 3000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('');

    // Simulate API call
    setTimeout(() => {
      console.log('Email submitted:', email);
      setSubmitStatus('success');
      setIsSubmitting(false);
      setEmail('');
      setTimeout(() => setSubmitStatus(''), 5000);
    }, 1000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.footer
      className="w-full bg-[linear-gradient(180deg,#3d55ccb2_0%,_#1e1e1e19_100%)]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Main Footer Content */}
        <motion.div
          className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12 mb-12"
          variants={itemVariants}
        >
          {/* Newsletter Section */}
          <motion.div
            className="w-full lg:w-2/5 relative"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-gradient-to-b from-[rgba(193,132,45,0)] to-[rgba(236,201,116,0)] border-2 border-[rgba(255,255,255,0.1)] rounded-[20px] h-[336px] flex items-center justify-center"
              whileHover={{
                borderColor: "rgba(255,255,255,0.2)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-[413px] flex flex-col items-center justify-start">
                <div className="w-[280px] flex flex-col items-center justify-start gap-5 mb-7">
                  <motion.div
                    className="self-stretch text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <motion.h2
                      className="text-[43px] font-neue-montreal text-global-1 leading-[120%] mb-2"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      Let's Stay In
                    </motion.h2>
                    <motion.h2
                      className="text-[43px] font-neue-montreal text-global-1 leading-[120%] m-0"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      Touch
                    </motion.h2>
                  </motion.div>
                  <motion.div
                    className="self-stretch text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <p className="text-base font-neue-montreal text-global-1 leading-[120%] mb-2">
                      Keep up to date with our latest news &
                    </p>
                    <p className="text-base font-neue-montreal text-global-1 leading-[120%] m-0">
                      special offers.
                    </p>
                  </motion.div>
                </div>

                {/* Gradient separator */}
                <div className="self-stretch h-7 bg-gradient-to-b from-[rgba(193,132,45,0)] to-[rgba(236,201,116,0)] mb-0"></div>

                <motion.form
                  onSubmit={handleEmailSubmit}
                  className="w-[333px] relative h-[60px] border border-global-1 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  whileFocus={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="enter your email"
                    className="w-full h-full pl-6 pr-14 text-base font-neue-montreal text-global-1 bg-transparent border-none rounded-lg focus:outline-none placeholder:text-global-1"
                    required
                  />
                  <motion.button
                    type="submit"
                    className="absolute right-[5.21%] top-[30%] bottom-[30%] w-[6.97%] h-[40%] cursor-pointer"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSubmitting ? (
                      <motion.div
                        className="w-full h-full flex items-center justify-center"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <div className="w-4 h-4 border-2 border-global-1 border-t-transparent rounded-full" />
                      </motion.div>
                    ) : (
                      <img src="/images/img_sent.svg" alt="send" className="w-full h-full object-contain" />
                    )}
                  </motion.button>

                  {/* Status Messages */}
                  {submitStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`absolute top-full mt-2 left-0 right-0 text-sm text-center ${
                        submitStatus === 'success' ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {submitStatus === 'success'
                        ? 'Thank you for subscribing!'
                        : 'Please enter a valid email address.'
                      }
                    </motion.div>
                  )}
                </motion.form>
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="w-full lg:w-auto"
            variants={itemVariants}
          >
            <motion.h3
              className="text-xs font-neue-montreal text-global-1 mb-6 sm:mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Quick Links
            </motion.h3>
            <div className="space-y-4 sm:space-y-6">
              {['Erectile Dysfunction', 'Weight Loss', "Men's Hair Loss"].map((link, index) => (
                <motion.div
                  key={link}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                  className="group cursor-pointer"
                >
                  <p className="text-sm sm:text-base font-neue-montreal text-global-1 hover:text-button-2 transition-colors duration-300 cursor-pointer relative">
                    {link}
                    <motion.span
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-button-2 group-hover:w-full transition-all duration-300"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                    />
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.h3
              className="text-xs font-neue-montreal text-global-1 mb-6 mt-12 sm:mt-16"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Contact Info
            </motion.h3>
            <motion.div
              className="flex gap-3 items-start group cursor-pointer"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src="/images/img_mail_01.svg"
                alt="email"
                className="w-4 h-4 mt-1"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ duration: 0.3 }}
              />
              <motion.p
                className="text-sm sm:text-base font-neue-montreal text-global-1 group-hover:text-button-2 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
              >
                hello@rizzpharma.com
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            className="w-full lg:w-auto"
            variants={itemVariants}
          >
            <motion.h3
              className="text-xs font-neue-montreal text-global-1 mb-6 sm:mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Our Company
            </motion.h3>
            <div className="space-y-3 sm:space-y-4">
              {[
                'HIPAA Notice',
                'Privacy Policy',
                'Return & Refund Policy',
                'Terms Of Use',
                'CCPA Opt-Out',
                'Opt-Out Preferences'
              ].map((link, index) => (
                <motion.div
                  key={link}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                  className="group cursor-pointer"
                >
                  <p className="text-sm sm:text-base font-neue-montreal text-global-1 hover:text-button-2 transition-colors duration-300 cursor-pointer relative">
                    {link}
                    <motion.span
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-button-2 group-hover:w-full transition-all duration-300"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                    />
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          className="pt-8 sm:pt-12"
          variants={itemVariants}
        >
          <motion.div
            className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8 mb-8"
            variants={itemVariants}
          >
            <motion.div
              className="w-full lg:w-2/5 flex justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src="/images/img_mask_group.png"
                alt="Rizz Pharma"
                className="w-32 sm:w-40 lg:w-[186px] h-auto"
                whileHover={{
                  filter: "brightness(1.1) drop-shadow(0 5px 15px rgba(255,255,255,0.2))"
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <motion.div
              className="flex flex-col gap-6 items-center sm:items-end"
              variants={itemVariants}
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
                <motion.div
                  className="flex flex-col gap-3 items-center"
                  variants={itemVariants}
                >
                  <div className="flex gap-3">
                    {[
                      { src: "/images/img_facebook.svg", alt: "Facebook" },
                      { src: "/images/img_instagram.svg", alt: "Instagram" }
                    ].map((social, index) => (
                      <motion.img
                        key={social.alt}
                        src={social.src}
                        alt={social.alt}
                        className="w-9 h-9 cursor-pointer hover:scale-110 transition-transform duration-300"
                        whileHover={{
                          scale: 1.2,
                          rotate: 10,
                          filter: "drop-shadow(0 5px 15px rgba(255,255,255,0.3))"
                        }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                      />
                    ))}
                  </div>
                  <motion.img
                    src="/images/img_11008607_1.png"
                    alt="certification"
                    className="w-16 sm:w-20 lg:w-[84px] h-auto"
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                <motion.p
                  className="text-xs sm:text-sm lg:text-base font-neue-montreal text-global-1 text-center sm:text-left max-w-md mt-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                >
                  Copyright © 2024 Rizz Pharma All Right Reserved - Built by Business Web Social
                </motion.p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.img
              src="/images/img_branding.png"
              alt="branding"
              className="w-full max-w-4xl h-auto mx-auto"
              whileHover={{
                scale: 1.02,
                filter: "brightness(1.1)"
              }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
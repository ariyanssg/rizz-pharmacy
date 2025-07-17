import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const TestimonialsSection = () => {
  const swiperRef = useRef(null);
  const sectionRef = useRef(null);

  // Parallax effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const floatingY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const testimonials = [
    {
      id: 1,
      text: "I have tried every home remedy and hair care treatment but ended up with long waits and no results. Since I have started using Rizz Pharma my hair has grown, thickened, and darkened tremendously. The results speak for themselves!",
      name: "John Williams",
      role: "Lead Designer",
      avatar: "/images/img_ellipse_3586.png",
      rating: 5,
      location: "New York, NY"
    },
    {
      id: 2,
      text: "The weight loss program exceeded my expectations. Professional guidance, quality medications, and incredible support throughout my journey. I've lost 35 pounds and feel more confident than ever.",
      name: "Sarah Johnson",
      role: "Marketing Manager",
      avatar: "/images/img_ellipse_3586_60x60.png",
      rating: 5,
      location: "Los Angeles, CA"
    },
    {
      id: 3,
      text: "Rizz Pharma's testosterone therapy has been life-changing. My energy levels are through the roof, and I feel like I'm in my twenties again. The convenience of online consultations is unmatched.",
      name: "Michael Chen",
      role: "Software Engineer",
      avatar: "/images/img_ellipse_3586_60x60.png",
      rating: 5,
      location: "Austin, TX"
    },
    {
      id: 4,
      text: "Outstanding service and results! The ED treatment has restored my confidence and improved my relationship. Discreet, professional, and effective - everything you could ask for.",
      name: "David Rodriguez",
      role: "Business Owner",
      avatar: "/images/img_ellipse_3586_60x60.png",
      rating: 5,
      location: "Miami, FL"
    },
    {
      id: 5,
      text: "The brain health supplements have significantly improved my focus and mental clarity. As a busy executive, this has been a game-changer for my productivity and overall well-being.",
      name: "Emily Davis",
      role: "Executive Director",
      avatar: "/images/img_ellipse_3586.png",
      rating: 5,
      location: "Chicago, IL"
    },
    {
      id: 6,
      text: "Athletic performance enhancement that actually works! My recovery time has improved dramatically, and my endurance is at an all-time high. Highly recommend to any serious athlete.",
      name: "Alex Thompson",
      role: "Professional Athlete",
      avatar: "/images/img_ellipse_3586_60x60.png",
      rating: 5,
      location: "Denver, CO"
    }
  ];

  const TestimonialCard = ({ testimonial, isActive }) => (
    <div className={`relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-3xl p-8 h-full min-h-[450px] flex flex-col transition-all duration-700 transform ${
      isActive ? 'scale-105 shadow-2xl shadow-blue-500/20' : 'scale-95 opacity-80'
    } hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 group`}>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/images/img_1k_dissolve_noise_texture.png')] bg-cover bg-center rounded-3xl opacity-30"></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-pink-600/10 rounded-3xl"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Centered Content */}
        <div className="flex flex-col justify-center flex-1">
          {/* Quote Icon */}
        <div className="flex justify-between items-start mb-6">
          <img 
            src="/images/img_inverted_comma.svg" 
            alt="quote" 
            className="w-10 h-10 opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
          />
          <div className="flex gap-1">
            {Array.from({ length: testimonial.rating }, (_, i) => (
              <div key={i} className="w-5 h-5 relative">
                <img 
                  src="/images/img_star_stroke_rizz.png" 
                  alt="star" 
                  className="w-full h-full filter drop-shadow-lg animate-pulse" 
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Testimonial Text */}
        <p className="text-lg font-neue-montreal font-normal text-global-1 leading-relaxed mb-8 group-hover:text-white transition-colors duration-300">
          "{testimonial.text}"
        </p>
        
        </div>
        {/* User Info */}
        <div className="flex gap-4 items-center mt-auto">
          <div className="relative">
            <img 
              src={testimonial.avatar} 
              alt={testimonial.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-gradient-to-r from-purple-400 to-blue-400 group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 to-blue-400/20 group-hover:animate-pulse"></div>
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-neue-montreal font-bold text-global-1 group-hover:text-white transition-colors duration-300">
              {testimonial.name}
            </h4>
            <p className="text-base font-neue-montreal font-medium text-slider-1 group-hover:text-blue-300 transition-colors duration-300">
              {testimonial.role}
            </p>
            <p className="text-sm font-neue-montreal text-gray-400 group-hover:text-purple-300 transition-colors duration-300">
              {testimonial.location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      ref={sectionRef}
      className="w-full relative overflow-hidden py-16 sm:py-20 lg:py-24"
      style={{ position: 'relative' }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1 }}
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 w-full h-[120%] bg-[url('/images/img_bgartwork_gray_900.svg')] bg-cover bg-center"
        style={{ y: backgroundY }}
      />

      {/* Enhanced Animated Background Elements with Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"
          style={{ y: floatingY }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"
          style={{ y: floatingY }}
          animate={{
            scale: [1, 0.8, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-500/5 rounded-full blur-2xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Additional floating elements */}
        <motion.div
          className="absolute top-10 right-1/4 w-20 h-20 bg-yellow-500/10 rounded-full blur-lg"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute bottom-10 left-1/4 w-24 h-24 bg-green-500/10 rounded-full blur-lg"
          animate={{
            y: [0, 25, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-[48px] font-impact font-normal mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.span
              className="text-global-1"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Hear What{" "}
            </motion.span>
            <motion.span
              className="bg-[linear-gradient(180deg,#c1842d_0%,_#ecc974_100%)] bg-clip-text text-transparent"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{
                background: "linear-gradient(180deg,#ecc974_0%,_#c1842d_100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
              }}
            >
              Rizz Patients Have To Say
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-lg text-global-1 max-w-2xl mx-auto opacity-80"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ opacity: 1, scale: 1.02 }}
          >
            Real stories from real patients who transformed their lives with our treatments
          </motion.p>
        </motion.div>

        {/* Enhanced Testimonials Carousel */}
        <motion.div
          className="relative"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 200,
              modifier: 1,
              slideShadows: true,
            }}
pagination={{
              clickable: true,
              dynamicBullets: false
            }}
            navigation={{
              nextEl: '.testimonials-button-next',
              prevEl: '.testimonials-button-prev',
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 1.5,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 2.2,
                spaceBetween: 40,
              },
              1280: {
                slidesPerView: 2.5,
                spaceBetween: 50,
              },
            }}
            className="testimonials-swiper !pb-20"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={testimonial.id} className="!h-auto">
                {({ isActive }) => (
                  <TestimonialCard testimonial={testimonial} isActive={isActive} />
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Enhanced Custom Navigation Buttons */}
          <motion.button
            className="testimonials-button-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
            whileHover={{
              scale: 1.15,
              boxShadow: "0 10px 30px rgba(139, 92, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            className="testimonials-button-next absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
            whileHover={{
              scale: 1.15,
              boxShadow: "0 10px 30px rgba(139, 92, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>

        {/* Enhanced Stats Section */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            { number: "10K+", label: "Happy Patients" },
            { number: "98%", label: "Success Rate" },
            { number: "24/7", label: "Support" },
            { number: "5★", label: "Average Rating" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.8 + (index * 0.1),
                type: "spring",
                stiffness: 100
              }}
              whileHover={{
                scale: 1.1,
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div
                className="text-3xl font-bold text-global-1 mb-2 group-hover:text-yellow-400 transition-colors duration-300"
                whileHover={{
                  scale: 1.2,
                  textShadow: "0 0 20px rgba(255, 255, 0, 0.5)"
                }}
              >
                {stat.number}
              </motion.div>
              <motion.div
                className="text-sm text-gray-400 group-hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>


    </motion.div>
  );
};

export default TestimonialsSection;

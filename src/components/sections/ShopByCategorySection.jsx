import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ShopByCategorySection = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'weight-loss',
      title: 'Weight\nLoss',
      gradient: 'linear-gradient(120.29deg, #f27070 0%, #97b5fb 82%)',
      image: '/images/img_portrait_fitness_people.png',
      decorativeVector: '/images/img_vector_white_a700.png',
      className: 'c-1',
      height: 'h-[450px]',
      imageStyle: 'right-[-234px] bottom-0 w-[533px] h-[450px]'
    },
    {
      id: 'sexual-health',
      title: 'Sexual Health',
      gradient: 'linear-gradient(180deg, #f29b70 0%, #fbd197 100%)',
      image: '/images/img_2149165281_1.png',
      decorativeVector: '/images/img_vector_white_a700_364x370.png',
      className: 'c-2',
      height: 'h-[376px]',
      imageStyle: 'top-[-142px] left-[68px] w-[414px] h-[518px]'
    },
    {
      id: 'brain-health',
      title: 'Brain\nHealth',
      gradient: 'linear-gradient(120.29deg, #97b5fb 0%, #f27070 83.5%)',
      image: '/images/img_handsome_young.png',
      decorativeVector: '/images/img_vector_white_a700_304x288.png',
      className: 'c-3',
      height: 'h-[450px]',
      imageStyle: 'right-[-205px] bottom-[-59px] w-[481px] h-[661px]'
    },
    {
      id: 'testosterone-hrt',
      title: 'Testosterone\nHRT',
      gradient: 'linear-gradient(180deg, #ad70f2 0%, #9d37a2 100%)',
      image: '/images/bodybuilder-showing-his-muscles-isolated-grey%201.png',
      decorativeVector: '/images/img_vector_white_a700_376x370.png',
      className: 'c-4',
      height: 'h-[376px]',
      imageStyle: 'top-[-240px] left-[99px] w-[427px] h-[616px]'
    },
    {
      id: 'athletic-performance',
      title: 'Athletic\nPerfomance',
      gradient: 'linear-gradient(120.29deg, #f27070 0%, #97b5fb 82%)',
      image: '/images/img_2149552437_1.png',
      decorativeVector: '/images/img_vector_white_a700_304x288.png',
      className: 'c-5',
      height: 'h-[450px]',
      imageStyle: 'right-[-103px] bottom-[-47px] w-[429px] h-[463px]'
    },
    {
      id: 'beauty-hair',
      title: 'Beauty and Hair Loss',
      gradient: 'linear-gradient(180deg, #70cbf2 0%, #97b0fb 100%)',
      image: '/images/img_ayo_ogunseinde.png',
      decorativeVector: '/images/img_vector_white_a700_376x370.png',
      className: 'c-6',
      height: 'h-[376px]',
      imageStyle: 'top-[-11px] left-[-20px] w-[584px] h-[543px]'
    }
  ];

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="relative w-full max-w-[1225px] mx-auto px-4 sm:px-6 lg:px-8 z-20 mt-8 sm:mt-16 lg:-mt-[200px]">
      {/* Title */}
      <div className="text-center mb-8 sm:mb-12 lg:mb-16 relative z-30">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[48px] font-impact font-normal leading-[120%] capitalize">
          <span className="text-white">Shop by </span>
          <span className="bg-[linear-gradient(180deg,#c1842d_0%,_#ecc974_100%)] bg-clip-text text-transparent">Category</span>
        </h2>
      </div>

      {/* Categories Grid - Desktop Layout */}
      <div className="hidden lg:block relative w-full h-[953px]">
        {/* Weight Loss - c-1 */}
        <motion.div
          className="absolute top-[97px] left-0 w-[370px] h-[450px] rounded-[24px] overflow-hidden cursor-pointer"
          style={{ background: 'linear-gradient(120.29deg, #f27070 0%, #97b5fb 82%)' }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          onClick={() => handleCategoryClick('weight-loss')}
        >
          <img 
            src="/images/img_vector_white_a700.png" 
            alt="decorative" 
            className="absolute right-[-11px] bottom-[-16px] w-[321px] h-[321px] object-contain"
          />
          <img
            src="/images/img_portrait_fitness_people.png"
            alt="Weight Loss"
            className="absolute right-0 bottom-0 w-full h-full object-contain transform translate-x-9"
          />
          <div className="absolute top-[24px] left-[24px] w-[154px]">
            <h3 className="text-[36px] font-neue-montreal font-medium text-white leading-[120%]">
              Weight<br />Loss
            </h3>
          </div>
        </motion.div>

        {/* Sexual Health - c-2 */}
        <motion.div
          className="absolute top-[97px] left-[calc(50%-185px)] w-[370px] h-[376px] rounded-[24px] overflow-hidden cursor-pointer"
          style={{ background: 'linear-gradient(180deg, #f29b70 0%, #fbd197 100%)' }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          onClick={() => handleCategoryClick('sexual-health')}
        >
          <img 
            src="/images/img_vector_white_a700_364x370.png" 
            alt="decorative" 
            className="absolute right-[-65.4px] bottom-[-70.4px] w-[435.4px] h-[435.4px] object-contain"
          />
          <img
            src="/images/img_2149165281_1.png"
            alt="Sexual Health"
            className="absolute right-0 bottom-0 w-full h-full object-contain transform translate-x-9"
          />
          <div className="absolute top-[24px] left-[24px] w-[154px]">
            <h3 className="text-[36px] font-neue-montreal font-medium text-white leading-[120%]">
              Sexual Health
            </h3>
          </div>
        </motion.div>

        {/* Brain Health - c-3 */}
        <motion.div
          className="absolute top-[97px] right-0 w-[370px] h-[450px] rounded-[24px] overflow-hidden cursor-pointer"
          style={{ background: 'linear-gradient(120.29deg, #97b5fb 0%, #f27070 83.5%)' }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          onClick={() => handleCategoryClick('brain-health')}
        >
          <img 
            src="/images/img_vector_white_a700_304x288.png" 
            alt="decorative" 
            className="absolute right-[-33px] bottom-[-16px] w-[321px] h-[321px] object-contain"
          />
          <img
            src="/images/img_handsome_young.png"
            alt="Brain Health"
            className="absolute right-0 bottom-0 w-full h-full object-contain transform translate-x-12"
          />
          <div className="absolute top-[24px] left-[24px] w-[154px]">
            <h3 className="text-[36px] font-neue-montreal font-medium text-white leading-[120%]">
              Brain<br />Health
            </h3>
          </div>
        </motion.div>

        {/* Testosterone HRT - c-4 */}
        <motion.div
          className="absolute top-[577px] left-0 w-[370px] h-[376px] rounded-[24px] overflow-hidden cursor-pointer"
          style={{ background: 'linear-gradient(180deg, #ad70f2 0%, #9d37a2 100%)' }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          onClick={() => handleCategoryClick('testosterone-hrt')}
        >
          <img 
            src="/images/img_vector_white_a700_376x370.png" 
            alt="decorative" 
            className="absolute right-[-188.6px] bottom-[-163.6px] w-[585.6px] h-[585.6px] object-contain"
          />
          <img
            src="/images/bodybuilder-showing-his-muscles-isolated-grey%201.png"
            alt="Testosterone HRT"
            className="absolute right-0 bottom-0 w-full h-full object-contain transform translate-x-32"
          />
          <div className="absolute top-[24px] left-[24px] w-[217px]">
            <h3 className="text-[36px] font-neue-montreal font-medium text-white leading-[120%]">
              Testosterone<br />HRT
            </h3>
          </div>
        </motion.div>

        {/* Athletic Performance - c-5 */}
        <motion.div
          className="absolute top-[503px] left-[calc(50%-185px)] w-[370px] h-[450px] rounded-[24px] overflow-hidden cursor-pointer"
          style={{ background: 'linear-gradient(120.29deg, #f27070 0%, #97b5fb 82%)' }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          onClick={() => handleCategoryClick('athletic-performance')}
        >
          <img 
            src="/images/img_vector_white_a700_304x288.png" 
            alt="decorative" 
            className="absolute right-[-33px] bottom-[-16px] w-[321px] h-[321px] object-contain"
          />
          <img
            src="/images/img_2149552437_1.png"
            alt="Athletic Performance"
            className="absolute right-0 bottom-0 w-full h-full object-contain transform translate-x-9"
          />
          <div className="absolute top-[24px] left-[24px] w-[206px]">
            <h3 className="text-[36px] font-neue-montreal font-medium text-white leading-[120%]">
              Athletic<br />Perfomance
            </h3>
          </div>
        </motion.div>

        {/* Beauty and Hair Loss - c-6 */}
        <motion.div
          className="absolute top-[577px] right-0 w-[370px] h-[376px] rounded-[24px] overflow-hidden cursor-pointer"
          style={{ background: 'linear-gradient(180deg, #70cbf2 0%, #97b0fb 100%)' }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          onClick={() => handleCategoryClick('beauty-hair')}
        >
          <img 
            src="/images/img_vector_white_a700_376x370.png" 
            alt="decorative" 
            className="absolute right-[-188.6px] bottom-[-163.6px] w-[585.6px] h-[585.6px] object-contain"
          />
          <img
            src="/images/img_ayo_ogunseinde.png"
            alt="Beauty and Hair Loss"
            className="absolute right-0 bottom-0 w-full h-full object-contain"
          />
          <div className="absolute top-[24px] left-[24px] w-[183px]">
            <h3 className="text-[36px] font-neue-montreal font-medium text-white leading-[120%]">
              Beauty and Hair Loss
            </h3>
          </div>
        </motion.div>
      </div>

      {/* Mobile/Tablet Responsive Grid */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            className="rounded-[24px] overflow-hidden cursor-pointer relative min-h-[220px] h-[260px] sm:h-[300px] md:h-[340px] touch-manipulation"
            style={{ background: category.gradient }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCategoryClick(category.id)}
          >
            {/* Decorative Vector - Positioned behind full-coverage images */}
            <img
              src={category.decorativeVector}
              alt=""
              className="absolute bottom-0 right-0 w-full h-full object-contain opacity-8 sm:opacity-12 transform translate-x-6 translate-y-6 scale-110"
              loading="lazy"
            />

            {/* Category Image - Full coverage positioning to reach card edges */}
            <img
              src={category.image}
              alt={category.title.replace('\n', ' ')}
              className={`absolute object-cover ${
                // Category-specific mobile positioning - scaled down further
                category.id === 'weight-loss' ? 'right-0 top-0 bottom-0 w-4/5 sm:w-5/6 h-full transform translate-x-1 sm:translate-x-2' :
                category.id === 'sexual-health' ? 'right-0 top-0 bottom-0 w-4/5 sm:w-5/6 h-full transform translate-x-0 sm:translate-x-0' :
                category.id === 'brain-health' ? 'right-0 top-0 bottom-0 w-5/6 sm:w-full h-full transform translate-x-2 sm:translate-x-3' :
                category.id === 'testosterone-hrt' ? 'right-0 top-0 bottom-0 w-4/5 sm:w-5/6 h-full transform translate-x-0 sm:translate-x-1' :
                category.id === 'athletic-performance' ? 'right-0 top-0 bottom-0 w-4/5 sm:w-5/6 h-full transform translate-x-1 sm:translate-x-2' :
                category.id === 'beauty-hair' ? 'right-0 top-0 bottom-0 w-5/6 sm:w-full h-full transform translate-x-2 sm:translate-x-3' :
                'right-0 top-0 bottom-0 w-4/5 sm:w-5/6 h-full transform translate-x-1 sm:translate-x-2'
              }`}
              loading="lazy"
            />

            {/* Title - Better positioning */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 max-w-[55%] sm:max-w-[50%]">
              <h3 className="text-lg sm:text-xl md:text-2xl font-neue-montreal font-medium text-white leading-[120%] drop-shadow-lg">
                {category.title.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < category.title.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </h3>
            </div>

            {/* Gradient overlay for better text readability with full-coverage images */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/10 to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 w-3/5 h-2/5 bg-gradient-to-br from-black/40 to-transparent pointer-events-none" />

            {/* Touch indicator for mobile */}
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-5 transition-all duration-200 sm:hidden" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ShopByCategorySection;

import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import UniversalBackground from '../../components/common/UniversalBackground';
import Button from '../../components/ui/Button';

const ExamplePage = () => {
  return (
    <div className="w-full bg-global-2 min-h-screen">
      {/* Example Section with Universal Background */}
      <UniversalBackground 
        minHeight="min-h-screen"
        overlay={true}
        overlayOpacity="bg-black/30"
      >
        <Header />
        
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-impact font-normal leading-tight text-global-1 mb-8">
              <span className="text-global-1">Example Page with </span>
              <span className="bg-[linear-gradient(180deg,#c1842d_0%,_#ecc974_100%)] bg-clip-text text-transparent">Universal Background</span>
            </h1>
            
            <p className="text-xl text-global-1 mb-8 max-w-2xl mx-auto">
              This page demonstrates how to use the universal Hero.png background across different pages in your application.
            </p>
            
            <Button 
              variant="primary" 
              size="large"
              className="px-8 py-4 text-xl font-bold hover:scale-105 transition-transform duration-300"
            >
              Get Started
            </Button>
          </div>
        </div>
      </UniversalBackground>

      {/* Regular Content Section */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-impact font-normal text-center mb-12">
          <span className="text-global-1">Regular Content </span>
          <span className="bg-[linear-gradient(180deg,#c1842d_0%,_#ecc974_100%)] bg-clip-text text-transparent">Section</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-global-5 rounded-3xl p-8">
            <h3 className="text-xl font-neue-montreal font-bold text-global-1 mb-4">Feature 1</h3>
            <p className="text-global-1">This is regular content without the universal background.</p>
          </div>
          <div className="bg-global-5 rounded-3xl p-8">
            <h3 className="text-xl font-neue-montreal font-bold text-global-1 mb-4">Feature 2</h3>
            <p className="text-global-1">You can mix sections with and without the background.</p>
          </div>
          <div className="bg-global-5 rounded-3xl p-8">
            <h3 className="text-xl font-neue-montreal font-bold text-global-1 mb-4">Feature 3</h3>
            <p className="text-global-1">The universal background is completely reusable.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ExamplePage;

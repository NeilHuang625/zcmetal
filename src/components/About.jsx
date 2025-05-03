import React from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";
import logoWithName from "../assets/logo_with_name.svg";
import design from "../assets/design.png";
import nz from "../assets/nz.png";
import smart from "../assets/smart.png";
import team from "../assets/team.png";

export default function AboutUs() {
  const [sectionRef, isSectionVisible] = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '-50px'
  });

  const [featuresRef, areFeaturesVisible] = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px'
  });

  return (
    <section id="about-us" ref={sectionRef} className="text-gray-800 py-16 px-4 sm:px-6 md:px-20 font-poppins font-extralight overflow-hidden">
      {/* 标题和副标题 */}
      <div className={`text-center mb-12 transition-all duration-1000 ${
        isSectionVisible ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-10'
      }`}>
        <h1 className="text-2xl sm:text-3xl font-semibold mb-4">
        We Bring Your Vision to Life
        </h1>
        <p className="text-base sm:text-lg text-gray-600">
          Z&C METAL delivers premium gates, fences, balustrades and custom metal solutions built to enhance and protect New Zealand properties.
        </p>
      </div>

      {/* 公司概述 - 图片+文字 */}
      <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
        <div className={`w-full md:w-1/2 transition-all duration-1000 delay-300 ${
          isSectionVisible ? 'opacity-100 transform-none' : 'opacity-0 -translate-x-20'
        }`}>
          <img
            src={logoWithName}
            alt="Z&C METAL team working"
            className="rounded-xl shadow-lg object-contain w-full max-h-[350px]"
          />
        </div>
        <div className={`w-full md:w-1/2 space-y-5 text-base sm:text-lg leading-relaxed transition-all duration-1000 delay-500 ${
          isSectionVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-x-20'
        }`}>
          <p>
            At <span className="font-semibold">Z&C METAL</span>, we specialize in crafting premium metal solutions across four key areas: custom gates, stylish fences, elegant balustrades, and bespoke metal works.
          </p>
          <p>
            From automated driveway gates that blend security with convenience, to modern balustrades that transform staircases and balconies, our skilled craftsmen create solutions that are both functional and visually striking.
          </p>
          <p>
            Every product is designed with New Zealand's unique conditions in mind, using quality materials that withstand the test of time while enhancing the aesthetic appeal of your property.
          </p>
        </div>
      </div>

      {/* 核心优势 */}
      <div ref={featuresRef}>
        <h2 className={`text-3xl font-semibold text-center mb-10 transition-all duration-1000 ${
          areFeaturesVisible ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-10'
        }`}>
          Our Commitment to Excellence
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className={`bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition-all duration-700 ${
            areFeaturesVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: areFeaturesVisible ? '100ms' : '0ms' }}>
            <img src={nz} alt="NZ Material" className="mx-auto w-18 h-18 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Premium Materials</h3>
            <p className="text-gray-600 text-sm">
              We select only the highest quality aluminum and metal components, designed to withstand New Zealand's diverse climate conditions.
            </p>
          </div>

          <div className={`bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition-all duration-700 ${
            areFeaturesVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: areFeaturesVisible ? '300ms' : '0ms' }}>
            <img
              src={design}
              alt="Custom Design"
              className="mx-auto w-18 h-18 mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Custom Solutions</h3>
            <p className="text-gray-600 text-sm">
              From gates and fences to balustrades and specialized metal works, we tailor every project to perfectly match your property's style and requirements.
            </p>
          </div>

          <div className={`bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition-all duration-700 ${
            areFeaturesVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: areFeaturesVisible ? '500ms' : '0ms' }}>
            <img
              src={smart}
              alt="Smart Automation"
              className="mx-auto w-18 h-18 mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Advanced Features</h3>
            <p className="text-gray-600 text-sm">
              We integrate modern technology into traditional craftsmanship, offering automation options for gates and innovative solutions for all metal works.
            </p>
          </div>

          <div className={`bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition-all duration-700 ${
            areFeaturesVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: areFeaturesVisible ? '700ms' : '0ms' }}>
            <img
              src={team}
              alt="Experienced Team"
              className="mx-auto w-18 h-18 mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Expert Craftsmanship</h3>
            <p className="text-gray-600 text-sm">
              Our skilled team brings years of specialized experience in metal fabrication, ensuring precision, quality and attention to detail in every project.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

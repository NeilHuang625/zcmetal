import React from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";

export default function GetQuote() {
  // 使用自定义Hook进行滚动动画
  const [sectionRef, isSectionVisible] = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px'
  });

  return (
    <section 
      id="get-quote"
      ref={sectionRef} 
      className="bg-gray-100 py-24 px-6 md:px-12 font-poppins overflow-hidden"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        {/* 左侧说明文字 */}
        <div className={`transition-all duration-1000 delay-100 ${
          isSectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
        }`}>
          <h3 className="text-xl font-semibold tracking-widest text-gray-900 uppercase mb-8">
            Request a Quote
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            To discuss your ideas and learn more about the solutions we provide,
            get in touch and we'll schedule a discovery call.
          </p>
        </div>

        {/* 表单区 */}
        <form
          action="https://formspree.io/f/xnqkvpyl"
          method="POST"
          className={`space-y-6 w-full transition-all duration-1000 delay-300 ${
            isSectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}
        >
          {/* First + Last Name */}
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-full">
              <label className="block text-sm text-gray-500">First Name</label>
              <input
                type="text"
                name="firstName"
                required
                className="w-full px-0 py-2 border-0 border-b-2 border-gray-300 bg-transparent placeholder-gray-400 text-base focus:outline-none focus:border-black focus:ring-0 transition-all duration-300"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm text-gray-500 ">Last Name</label>
              <input
                type="text"
                name="lastName"
                required
                className="w-full px-0 py-2 border-0 border-b-2 border-gray-300 bg-transparent placeholder-gray-400 text-base focus:outline-none focus:border-black focus:ring-0 transition-all duration-300"
              />
            </div>
          </div>

          {/* Email + Phone */}
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-full">
              <label className="block text-sm text-gray-500 ">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-0 py-2 border-0 border-b-2 border-gray-300 bg-transparent placeholder-gray-400 text-base focus:outline-none focus:border-black focus:ring-0 transition-all duration-300"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm text-gray-500 ">Phone</label>
              <input
                type="tel"
                name="phone"
                className="w-full px-0 py-2 border-0 border-b-2 border-gray-300 bg-transparent placeholder-gray-400 text-base focus:outline-none focus:border-black focus:ring-0 transition-all duration-300"
              />
            </div>
          </div>

          {/* Service Dropdown */}
          <div>
            <label className="block text-sm text-gray-500 ">
              Select a service
            </label>
            <select
              name="service"
              className="w-full appearance-none px-0 py-2 border-0 border-b-2 border-gray-300 bg-transparent text-base focus:outline-none focus:border-black focus:ring-0 transition-all"
            >
              <option value="">Select a service</option>
              <option value="Gates">Gates</option>
              <option value="Fencing">Fencing</option>
              <option value="Balustrades">Balustrades</option>
              <option value="Metal Works">Metal Works</option>
            </select>
          </div>

          {/* Budget Dropdown */}
          <div>
            <label className="block text-sm text-gray-500 ">
              Anticipated spend
            </label>
            <select
              name="budget"
              className="w-full appearance-none px-0 py-2 border-0 border-b-2 border-gray-300 bg-transparent text-base focus:outline-none focus:border-black focus:ring-0 transition-all"
            >
              <option value="">Select range</option>
              <option value="$1,000–$5,000">$1,000–$5,000</option>
              <option value="$5,000–$10,000">$5,000–$10,000</option>
              <option value="$10,000+">$10,000+</option>
            </select>
          </div>

          {/* 来源 Dropdown */}
          <div>
            <label className="block text-sm text-gray-500 ">
              Where did you hear about us?
            </label>
            <select
              name="referral"
              className="w-full appearance-none px-0 py-2 border-0 border-b-2 border-gray-300 bg-transparent text-base focus:outline-none focus:border-black focus:ring-0 transition-all"
            >
              <option value="">Choose one</option>
              <option value="Website">Website</option>
              <option value="Facebook">Facebook</option>
              <option value="Rednote">Rednote</option>
              <option value="Friend/Referral">Friend / Referral</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm text-gray-500 ">Message</label>
            <textarea
              name="message"
              placeholder="Describe your project..."
              rows={4}
              required
              className="w-full px-0 py-2 border-0 border-b-2 border-gray-300 bg-transparent placeholder-gray-400 text-base focus:outline-none focus:border-black focus:ring-0 transition-all"
            />
          </div>

          {/* Submit */}
          <div className="pt-3">
            <button
              type="submit"
              className="mt-4 bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition group flex items-center hover:cursor-pointer transform hover:scale-105 duration-300"
            >
              <span>Send Request</span>
              <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

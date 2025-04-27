import React from "react";
import wechatQR from "../assets/qrcode/wechat.jpeg";
import xiaohongshuQR from "../assets/qrcode/xiaohongshu.jpeg";
import useScrollAnimation from "../hooks/useScrollAnimation";

export default function ContactUs() {
  // 使用自定义Hook进行滚动动画
  const [sectionRef, isSectionVisible] = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px'
  });

  return (
    <section 
      id="contact"
      ref={sectionRef} 
      className="bg-gray-100 py-18 px-6 md:px-12 font-poppins overflow-hidden"
    >
      <div className={`max-w-6xl mx-auto transition-all duration-1000 ${
        isSectionVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
      }`}>
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 grid md:grid-cols-2 gap-16 items-start">
          {/* 左侧联系信息 */}
          <div className={`space-y-8 transition-all duration-1000 delay-200 ${
            isSectionVisible ? 'opacity-100 transform-none' : 'opacity-0 -translate-x-10'
          }`}>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Contact Us
              </h2>
              <p className="text-gray-600 text-lg">
                We'd love to hear from you. Whether you have a question about our
                work, need a quote, or just want to say hi — we're here.
              </p>
            </div>

            <div className="space-y-5 text-base text-gray-800">
              <div className={`transition-all duration-500 delay-300 ${
                isSectionVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-3'
              }`}>
                <h4 className="text-sm text-gray-500 uppercase mb-1">Phone</h4>
                <a
                  href="tel:0211071751"
                  className="text-lg font-medium text-blue-700 hover:underline"
                >
                  021-107-1751
                </a>
                <span className="ml-2 text-xs text-gray-500">
                  (Daniel, English)
                </span>
              </div>

              <div className={`transition-all duration-500 delay-400 ${
                isSectionVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-3'
              }`}>
                <h4 className="text-sm text-gray-500 uppercase mb-1">Email</h4>
                <a
                  href="mailto:zcmetal.daniel@gmail.com"
                  className="text-base text-blue-700 hover:underline"
                >
                  zcmetal.daniel@gmail.com
                </a>
              </div>

              <div className={`transition-all duration-500 delay-500 ${
                isSectionVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-3'
              }`}>
                <h4 className="text-sm text-gray-500 uppercase mb-1">Address</h4>
                <p className="text-base leading-relaxed">
                  65e Kerwyn Avenue,
                  <br />
                  East Tāmaki, Auckland 2013
                  <br />
                  New Zealand
                </p>
              </div>

              {/* QR Codes Row */}
              <div className={`pt-4 grid grid-cols-2 gap-6 transition-all duration-500 delay-600 ${
                isSectionVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-3'
              }`}>
                {/* WeChat QR */}
                <div className="transform transition-transform hover:scale-105 duration-300">
                  <h4 className="text-sm text-gray-500 uppercase mb-1">WeChat</h4>
                  <p className="text-base">zcmetalnz</p>
                  <img
                    src={wechatQR}
                    alt="WeChat QR Code"
                    className="w-32 mt-2 rounded shadow"
                  />
                </div>

                {/* Xiaohongshu QR */}
                <div className="transform transition-transform hover:scale-105 duration-300">
                  <h4 className="text-sm text-gray-500 uppercase mb-1">
                    Xiaohongshu
                  </h4>
                  <p className="text-base">Z&C METAL NZ</p>
                  <img
                    src={xiaohongshuQR}
                    alt="Xiaohongshu QR Code"
                    className="w-32 mt-2 rounded shadow"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 右侧地图 */}
          <div className={`rounded-xl overflow-hidden shadow-md h-[400px] md:h-full transition-all duration-1000 delay-300 ${
            isSectionVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-x-10'
          }`}>
            <iframe
              title="Z&C METAL Location"
              src="https://www.google.com/maps?q=65e+Kerwyn+Ave,+East+Tamaki,+Auckland+2013,+New+Zealand&output=embed"
              width="100%"
              height="100%"
              className="border-0 w-full h-full"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

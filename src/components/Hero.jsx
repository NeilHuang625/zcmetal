import logo from "../assets/logo_with_name.svg"; // Import as a URL
import heroImage from "../assets/bg2.jpg"; // Import as a URL

export default function Hero() {
  return (
    <div className="relative bg-gray-900 text-white min-h-screen flex items-center justify-center w-full font-poppins">
      {/* 背景图层 */}
      <img
        src={heroImage}
        alt="Metal Fence Background"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />

      {/* 内容区 */}
      <div className="relative z-10 text-center w-full px-6">
        <img
          src={logo}
          alt="ZC Metal Logo"
          className="w-48 h-48 mx-auto mb-4 filter brightness-0 invert"
        />
        <h1 className="text-4xl md:text-7xl tracking-normal leading-tight mb-6">
          Modern. Durable. Reliable.
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 tracking-normal mb-8 max-w-2xl mx-auto leading-relaxed">
          Premium Aluminum Fences & Electronic Gates Custom-Built for Every Home
          and Business
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition">
            View Products
          </button>
          <button className="border border-white hover:bg-white hover:text-black text-white font-semibold px-6 py-3 rounded-full transition">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import teamImage from "../assets/team-work.jpg";
import design from "../assets/design.png";
import nz from "../assets/nz.png";
import smart from "../assets/smart.png";
import team from "../assets/team.png";

export default function AboutUs() {
  return (
    <section className="bg-white text-gray-800 py-16 px-4 sm:px-6 md:px-20 font-poppins font-extralight">
      {/* 标题和副标题 */}
      <div className="text-center mb-12">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-4">
          We Bring Your Vision to Life
        </h1>
        <p className="text-base sm:text-lg text-gray-600">
          Z&C METAL offers comprehensive gate and fencing solutions, built to
          last in New Zealand.
        </p>
      </div>

      {/* 公司概述 - 图片+文字 */}
      <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
        <div className="w-full md:w-1/2">
          <img
            src={teamImage}
            alt="Z&C METAL team working"
            className="rounded-xl shadow-md object-cover w-full h-auto"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-5 text-base sm:text-lg leading-relaxed">
          <p>
            At <span className="font-semibold">Z&C METAL</span>, we specialise
            in crafting high-quality aluminum gates and fences tailored to
            residential, commercial, and industrial sites.
          </p>
          <p>
            All our materials are locally sourced in New Zealand and installed
            by our dedicated, experienced team.
          </p>
          <p>
            Whether you're looking for a sliding gate for your driveway or a
            custom fence for your commercial project, we build it right — and
            build it to last.
          </p>
        </div>
      </div>

      {/* 核心优势 */}
      <h2 className="text-3xl font-semibold text-center mb-10">
        Built Different
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
          <img src={nz} alt="NZ Material" className="mx-auto w-18 h-18 mb-4" />
          <h3 className="text-xl font-semibold mb-2">NZ-Made Materials</h3>
          <p className="text-gray-600 text-sm">
            We proudly use materials sourced locally — because quality starts at
            the source.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
          <img
            src={design}
            alt="Custom Design"
            className="mx-auto w-18 h-18 mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Tailored Design</h3>
          <p className="text-gray-600 text-sm">
            Every property is unique — so is every gate and fence we create.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
          <img
            src={smart}
            alt="Smart Automation"
            className="mx-auto w-18 h-18 mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Smart Gate Systems</h3>
          <p className="text-gray-600 text-sm">
            Optional motorised and remote control solutions for seamless
            everyday access.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
          <img
            src={team}
            alt="Experienced Team"
            className="mx-auto w-18 h-18 mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Experienced Team</h3>
          <p className="text-gray-600 text-sm">
            Real people. Real results. We bring decades of hands-on knowledge to
            every job.
          </p>
        </div>
      </div>
    </section>
  );
}

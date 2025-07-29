import React from "react";
import { Link } from "react-router-dom";
import featured from "../../assets/featured.webp"

const FeaturedCollection = () => {
  return (
    <section className="px-16 py-4 lg:px:0">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-200 rounded-3xl">
        {/* Left content */}
        <div className="lg:w-1/2 p-8 text-center lg:text-left">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Comfort And Stylish
          </h2>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Apparel Made for your everyday life
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Step into a world of style with our latest clothing collections
            Designed for every mood, every moment, and every you Fashion that
            fits just right.
          </p>
          <Link
            to="/collections/all"
            className="bg-black text-lg text-white px-6 py-3 rounded-lg
            hover:bg-gray-800"
          >
            Shop Now
          </Link>
        </div>
        {/* Right Image */}
        <div className="lg:w-1/2">
        <img src={featured} alt="Featured collections"
         className="w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl"
        />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;

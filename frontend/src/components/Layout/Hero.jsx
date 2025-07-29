import React, { useEffect, useRef } from 'react'
import heroImg from "../../assets/rabbit-hero.webp"
// import heroImg from "../../assets/hero.jpg"
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const Hero = () => {
 const headinRef = useRef();

 useEffect(()=>{
    const t1=gsap.timeline();
    t1.fromTo(headinRef.current,{
      opacity:0,
      scale:0,
    },{
      rotate:360,
      opacity:1,
      scale:1.1,
      duration:1,
      delay:1
    })
 },[])


  return (
    <section className="relative">
      <img
        src={heroImg}
        alt="Glamix"
        className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover"
        
      />
      <div className="absolute inset-0 bg-black bg-opacity-5 flex items-center justify-center">
        <div className="text-center text-white p-6">
          <h1
            ref={headinRef}
            className="text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4"
          >
            Vacation <br /> Ready
          </h1>
          <p className="text-sm tracking-tighter md:text-lg mb-6">
            Explore our vacation-ready outfits with fast worldwide shipping
          </p>
          <Link
            to="#"
            className="text-lg bg-white px-6 py-2 text-gray-950 rounded-sm"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero
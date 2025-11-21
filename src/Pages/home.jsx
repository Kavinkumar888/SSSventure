import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const home = () => {
  const heroRef = useRef(null);
  const sectionRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerImages = [
    {
      url: "./hero.jpg",
      title: "Design, Develop and Source",
      highlight: "Customized Fabrics",
      subtitle: "for your brand.",
    },
    {
      url: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=2070&q=80",
      title: "Premium Quality",
      highlight: "Textile Solutions",
      subtitle: "for modern fashion brands.",
    },
    {
      url: "./hero2.png",
      title: "Sustainable &",
      highlight: "Eco-Friendly Fabrics",
      subtitle: "for a better tomorrow.",
    },
    {
      url: "https://images.unsplash.com/photo-1566206091558-7f218b696731?auto=format&fit=crop&w=2064&q=80",
      title: "Global Delivery",
      highlight: "Worldwide Service",
      subtitle: "right to your doorstep.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* HERO SECTION - Fixed height and spacing */}
      <section
        ref={heroRef}
        className="relative h-screen w-full overflow-hidden bg-black m-0 p-0"
      >
        {bannerImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${image.url}')` }}
            />
            <div className="absolute inset-0 bg-black/60"></div>

            {index === currentSlide && (
              <div className="relative z-20 flex flex-col justify-center items-center h-full text-center px-6">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight text-white mb-3">
                  {image.title}
                  <span className="block text-gray-300">{image.highlight}</span>
                </h1>
                <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-6">
                  {image.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/products"
                    className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 shadow-md"
                  >
                    Explore Fabrics
                  </Link>
                  <Link
                    to="/products"
                    className="border-2 border-white text-white hover:bg-white hover:text-black px-6 py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300"
                  >
                    View Collection
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {bannerImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentSlide
                  ? "bg-gray-300 w-6 h-2"
                  : "bg-white/40 hover:bg-white w-2 h-2"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ABOUT SECTION - Reduced padding */}
      <section
        ref={sectionRef}
        className="py-12 sm:py-16 bg-gradient-to-b from-white to-gray-100 m-0"
      >
        <div className="container mx-auto px-5 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              We help brands turn
              <span className="block text-gray-500">
                ideas into beautiful textiles
              </span>
            </h2>
            <p className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed">
              With a wide network of mills and artisans, we offer customized
              fabrics, prints, textures, and finishes — all produced in small or
              bulk quantities and delivered globally.
            </p>
            <ul className="space-y-3 text-gray-800 text-sm sm:text-base">
              <li className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 bg-gray-800 rounded-full"></span>
                Custom fabric manufacturing
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 bg-gray-800 rounded-full"></span>
                Global delivery network
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 bg-gray-800 rounded-full"></span>
                Small & bulk production
              </li>
            </ul>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=2070&q=80"
              alt="Textile Manufacturing"
              className="w-full rounded-xl shadow-lg object-cover h-60 sm:h-72 md:h-80"
            />
            <div className="absolute -bottom-4 -left-4 bg-white shadow-md rounded-lg px-4 py-2">
              <p className="text-gray-900 font-bold text-lg">500+</p>
              <p className="text-gray-500 text-xs">Happy Brands</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION - Reduced padding */}
      <section className="py-12 sm:py-16 bg-white m-0">
        <div className="text-center max-w-3xl mx-auto mb-8 px-5">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
            What We Do
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Comprehensive textile solutions for fashion brands.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto px-5">
          {[
            {
              title: "Custom Fabric Manufacturing",
              desc: "Create unique fabrics tailored to your brand's vision.",
            },
            {
              title: "Digital & Screen Printing",
              desc: "High-quality printing with vibrant, lasting colors.",
            },
            {
              title: "Natural & Sustainable Fabrics",
              desc: "Eco-friendly fabrics that care for the planet.",
            },
            {
              title: "Small & Bulk Production",
              desc: "Flexible quantities for any scale of business.",
            },
            {
              title: "Global Sourcing Network",
              desc: "Worldwide access to premium mills and artisans.",
            },
            {
              title: "Doorstep Delivery Worldwide",
              desc: "Reliable and fast global delivery network.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default home;
// src/pages/AboutUs.jsx
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Factory, Users, Target, Award } from 'lucide-react';
import gsap from 'gsap';

const about = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const missionRef = useRef(null);

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Premium Textile Manufacturing",
      subtitle: "Crafting Excellence in Every Thread"
    },
    {
      image: "./hero3.png",
      title: "Innovative Fabric Solutions",
      subtitle: "Blending Tradition with Technology"
    },
    {
      image: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
      title: "Quality Assurance",
      subtitle: "Meeting Global Standards"
    },
    {
      image: "./hero4.png",
      title: "Sustainable Practices",
      subtitle: "Eco-friendly Manufacturing"
    }
  ];

  const stats = [
    { icon: <Factory className="w-8 h-8" />, number: "50+", label: "Years Experience" },
    { icon: <Users className="w-8 h-8" />, number: "500+", label: "Happy Clients" },
    { icon: <Target className="w-8 h-8" />, number: "1000+", label: "Projects Completed" },
    { icon: <Award className="w-8 h-8" />, number: "25+", label: "Industry Awards" }
  ];

  const features = [
    {
      title: "Premium Quality Fabrics",
      description: "We specialize in manufacturing high-quality textiles that meet international standards and customer expectations."
    },
    {
      title: "Customized Solutions",
      description: "Tailored fabric manufacturing services to meet specific client requirements and design preferences."
    },
    {
      title: "Sustainable Manufacturing",
      description: "Environmentally conscious production processes that minimize ecological impact while maintaining quality."
    },
    {
      title: "Global Reach",
      description: "Serving clients across India and international markets with reliable delivery and consistent quality."
    }
  ];

  useEffect(() => {
    // Hero section animation
    const heroTl = gsap.timeline();
    heroTl.fromTo(
      heroRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    // Content section animations
    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    contentTl.fromTo(
      ".company-title",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }
    )
    .fromTo(
      ".company-text",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" },
      "-=0.4"
    );

    // Stats animations
    const statsTl = gsap.timeline({
      scrollTrigger: {
        trigger: statsRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    statsTl.fromTo(
      ".stat-item",
      { 
        opacity: 0, 
        y: 60,
        scale: 0.8
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)"
      }
    );

    // Features animations
    const featuresTl = gsap.timeline({
      scrollTrigger: {
        trigger: featuresRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    featuresTl.fromTo(
      ".feature-item",
      { 
        opacity: 0, 
        x: -50,
        rotationY: 90
      },
      { 
        opacity: 1, 
        x: 0,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      }
    );

    // Mission Vision animations
    const missionTl = gsap.timeline({
      scrollTrigger: {
        trigger: missionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    missionTl.fromTo(
      ".mission-card",
      { 
        opacity: 0, 
        y: 80,
        scale: 0.9
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.3,
        ease: "elastic.out(1, 0.8)"
      }
    );

  }, []);

  // Slide animations
  useEffect(() => {
    const slideTl = gsap.timeline();
    
    slideTl.fromTo(
      `.slide-content-${currentSlide} h1`,
      { 
        opacity: 0, 
        y: 100,
        rotationX: 45
      },
      { 
        opacity: 1, 
        y: 0,
        rotationX: 0,
        duration: 1,
        ease: "power3.out"
      }
    )
    .fromTo(
      `.slide-content-${currentSlide} p`,
      { 
        opacity: 0, 
        y: 50,
        scale: 0.8
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)"
      },
      "-=0.5"
    )
    .fromTo(
      `.slide-content-${currentSlide} button`,
      { 
        opacity: 0, 
        scale: 0,
        rotation: 180
      },
      { 
        opacity: 1, 
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.8)"
      },
      "-=0.3"
    );

  }, [currentSlide]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    // Animate out current slide
    gsap.to(`.slide-content-${currentSlide}`, {
      opacity: 0,
      y: -50,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }
    });
  };

  const prevSlide = () => {
    // Animate out current slide
    gsap.to(`.slide-content-${currentSlide}`, {
      opacity: 0,
      y: 50,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
      }
    });
  };

  const goToSlide = (index) => {
    // Animate out current slide
    gsap.to(`.slide-content-${currentSlide}`, {
      opacity: 0,
      scale: 0.8,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setCurrentSlide(index);
      }
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Slider Section */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>
            
            <div className={`relative z-10 flex items-center justify-center h-full slide-content-${index}`}>
              <div className="text-center text-white px-4">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8">
                  {slide.subtitle}
                </p>
                <button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  Explore Our Fabrics
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        >
          <ChevronRight size={32} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Content Section */}
      <section ref={contentRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Company Story */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 company-title">
              About Naga Fabric Sales
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-600 mb-6 leading-relaxed company-text">
                With over 50 years of excellence in the textile industry, <strong>Naga Fabric Sales</strong> 
                has established itself as a trusted name in premium fabric manufacturing and distribution. 
                Our journey began with a simple vision: to provide exceptional quality textiles that combine 
                traditional craftsmanship with modern innovation.
              </p>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed company-text">
                Based in the textile hub of Erode, Tamil Nadu, we leverage our deep industry expertise 
                and state-of-the-art manufacturing facilities to deliver fabrics that exceed expectations. 
                Our commitment to quality, sustainability, and customer satisfaction has made us the 
                preferred choice for businesses and individuals across the globe.
              </p>
              <p className="text-xl text-gray-600 leading-relaxed company-text">
                Today, we continue to innovate and expand our product range while maintaining the 
                core values that have defined our success for generations.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 stat-item"
              >
                <div className="text-pink-600 flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div ref={featuresRef} className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 feature-item"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Vision Section */}
      <section ref={missionRef} className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="text-center mission-card">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To revolutionize the textile industry by providing superior quality fabrics 
                  through innovative manufacturing processes, sustainable practices, and 
                  unwavering commitment to customer satisfaction.
                </p>
              </div>
            </div>
            <div className="text-center mission-card">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Vision</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To be the global leader in textile manufacturing, setting new standards 
                  for quality, innovation, and sustainability while empowering communities 
                  and preserving traditional craftsmanship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default about;
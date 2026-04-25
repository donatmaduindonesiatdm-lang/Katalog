/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ShoppingBag, ArrowRight } from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  color: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Donat Reguler",
    description: "Ikon kelembutan kami. Donat klasik dengan sapuan madu murni Cihanjuang yang memberikan rasa manis alami dan tekstur yang meluluhkan hati.",
    price: "Rp 8.000",
    image: "https://lh3.googleusercontent.com/u/0/d/1ufV991UT-qeKXgEOwx2nP5JEOiqNplH3",
    color: "bg-[#fef3e1]"
  },
  {
    id: 2,
    name: "Premium Bomboloni",
    description: "Simfoni kemewahan cokelat. Perpaduan premium dark chocolate ganache dengan tekstur beludru untuk pengalaman rasa yang mendalam.",
    price: "Rp 10.000",
    image: "https://lh3.googleusercontent.com/u/0/d/1eCS6b0kLS0SbrKR6bBaj7RLZq8MesD8o",
    color: "bg-[#fef3e1]"
  },
  {
    id: 3,
    name: "Donat Famili",
    description: "Harmoni dari alam. Sentuhan teh hijau Jepang berkualitas tinggi dengan taburan almond renyah, menciptakan momen tenang di setiap gigitan.",
    price: "Rp 30.000",
    image: "https://lh3.googleusercontent.com/u/0/d/1LJUjtkWw6GYEq7M4le_ipbGpKzspQH_7",
    color: "bg-[#fef3e1]"
  },
  {
    id: 4,
    name: "Donat Chimochi",
    description: "Kesegaran yang elegan. Krim strawberry segar dengan glaze pink velvet yang cantik, memberikan sentuhan buah asli berkelas tinggi.",
    price: "Rp 12.000",
    image: "https://lh3.googleusercontent.com/u/0/d/1TsJ-YpGfKF3lEsAkHnhpE-lwcF2sYd78",
    color: "bg-[#fef3e1]"
  }
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % products.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const variants = {
    enter: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 50 : -50
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 100, damping: 20 },
        opacity: { duration: 0.6 }
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      opacity: 0,
      x: direction < 0 ? 50 : -50,
      transition: {
        opacity: { duration: 0.4 }
      }
    })
  };

  return (
    <div className="relative h-screen w-full bg-editorial-cream overflow-hidden touch-none">
      {/* Background Blur */}
      <div className="absolute top-[-5%] right-[-5%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-blur-gradient filter blur-[40px] md:blur-[60px] z-0 animate-pulse" />

      {/* Brand Header */}
      <nav className="absolute top-[30px] left-0 w-full px-6 md:px-[80px] z-50 flex justify-center md:justify-start">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs md:text-[14px] leading-none tracking-[4px] font-bold uppercase text-editorial-gold border-b border-editorial-gold pb-2"
        >
          Donat Madu Cihanjuang
        </motion.span>
      </nav>

      {/* Main Container */}
      <div className="relative h-full w-full flex flex-col lg:grid lg:grid-cols-[1fr_1.2fr]">
        
        {/* Image Section (Top on Mobile) */}
        <section className="relative h-[50vh] lg:h-full bg-[#f2efea] flex items-center justify-center pt-16 lg:pt-0 overflow-hidden order-1 lg:order-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ scale: 1.1, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="w-full h-full flex items-center justify-center p-6 md:p-24"
            >
              <div className="relative w-full h-full max-w-[280px] sm:max-w-sm md:max-w-4xl max-h-[80%] flex items-center justify-center">
                <img
                  src={products[currentIndex].image}
                  alt={products[currentIndex].name}
                  className="w-full h-full object-contain md:object-cover shadow-[0_30px_60px_rgba(0,0,0,0.12)] grayscale-[0.05] rounded-sm"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Mobile Swipe Text Indicator */}
          <div className="absolute bottom-4 left-0 w-full flex justify-center lg:hidden">
            <span className="text-[9px] uppercase tracking-[3px] text-editorial-gold opacity-50 font-medium">Swipe to explore</span>
          </div>
        </section>

        {/* Content Section (Bottom on Mobile) */}
        <div className="relative flex-1 lg:h-full bg-editorial-cream px-6 py-4 md:px-[80px] flex flex-col justify-start lg:justify-center z-10 order-2 lg:order-1">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="space-y-4 md:space-y-6"
            >
              <h1 className="serif text-4xl md:text-6xl lg:text-[72px] leading-[1.1] md:leading-[0.95] font-normal text-editorial-gold">
                {products[currentIndex].name.split(' ')[0]}<br />
                <span className="italic font-light">{products[currentIndex].name.split(' ').slice(1).join(' ')}</span>
              </h1>
              
              <div className="serif text-xl md:text-2xl text-editorial-gold py-1">
                <span className="text-editorial-gold mr-2 text-xs md:text-base align-top font-sans uppercase tracking-[3px] font-bold">IDR</span>
                {products[currentIndex].price.replace('Rp ', '')}
                <span className="text-editorial-gold/60 text-[12px] md:text-[14px] ml-2 font-sans font-normal italic">/ pcs</span>
              </div>
              
              <div className="pt-1 md:pt-2">
                <motion.button 
                  whileHover={{ backgroundColor: "#fef3e1", color: "#f09a0d" }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-editorial-gold py-2.5 px-8 md:px-10 uppercase text-[10px] md:text-[11px] tracking-[2px] font-bold cursor-pointer transition-all duration-300 bg-editorial-gold text-editorial-cream"
                >
                  Info Selengkapnya
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav Controls */}
          <div className="absolute bottom-[20px] md:bottom-[60px] left-0 w-full lg:w-auto px-6 lg:px-0 lg:left-[80px] flex items-center justify-between lg:justify-start lg:gap-14">
            <button 
              onClick={prevSlide}
              className="flex items-center gap-3 text-[10px] md:text-[11px] uppercase tracking-[2px] text-editorial-gold hover:opacity-100 transition-opacity p-2"
            >
              <ArrowLeftIcon size={16} /><span className="md:inline">Prev</span>
            </button>
            
            <div className="flex gap-2 lg:hidden">
              {products.map((_, i) => (
                <div 
                  key={i}
                  className={`w-1 h-1 rounded-full bg-editorial-gold transition-all duration-500 ${
                    i === currentIndex ? "scale-[2]" : "opacity-20"
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={nextSlide}
              className="flex items-center gap-3 text-[10px] md:text-[11px] uppercase tracking-[2px] text-editorial-gold hover:opacity-100 transition-opacity p-2"
            >
              <span className="md:inline">Next</span><ArrowRightIcon size={16} />
            </button>
          </div>
        </div>

        {/* Desktop Indicators */}
        <div className="hidden lg:flex absolute bottom-[60px] right-[60px] gap-3">
          {products.map((_, i) => (
            <div 
              key={i}
              className={`w-1.5 h-1.5 rounded-full bg-editorial-gold transition-all duration-500 ${
                i === currentIndex ? "scale-[2]" : "opacity-20"
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

// Custom Icons to match the aesthetic precisely
function ArrowLeftIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size * 2} height={size} viewBox="0 0 40 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M40 10 H2 M10 2 L2 10 L10 18" />
    </svg>
  );
}

function ArrowRightIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size * 2} height={size} viewBox="0 0 40 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M0 10 H38 M30 2 L38 10 L30 18" />
    </svg>
  );
}

// Add CSS for writing-vertical-lr which isn't standard in Tailwind base
// Actually it is in modern versions or can be added via style

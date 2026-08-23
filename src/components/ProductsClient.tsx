"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "./ui/Button";
import Link from "next/link";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ProductsClient({ products }: { products: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header Reveal
    gsap.fromTo(
      ".products-header",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
    );

    // "Sheet Feed" Scroll Reveal
    const cards = gsap.utils.toArray(".product-card");
    cards.forEach((card: any) => {
      gsap.fromTo(
        card,
        { x: "100%", opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-black p-2 md:p-6 lg:p-8 overflow-hidden">
      {/* Header */}
      <header className="products-header border-2 border-black p-6 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 rounded-none bg-white mb-6 max-w-[1800px] mx-auto">
        <div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-2">
            Products Catalog
          </h1>
          <p className="text-lg md:text-xl font-medium max-w-2xl">
            A comprehensive showcase of our industrial printing capabilities and bespoke structural designs.
          </p>
        </div>
        <Link href="/">
          <MagneticButton className="hover:bg-black hover:text-white shrink-0">
            Back to Home
          </MagneticButton>
        </Link>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row-dense gap-4 md:gap-6 lg:gap-8 max-w-[1800px] mx-auto pb-20">
        {products.map((product, index) => {
          // Asymmetrical masonry-like classes
          let colSpan = "col-span-1";
          let rowSpan = "row-span-1";
          
          // The first item (index 0) remains standard. Others get dynamic sizing.
          if (index !== 0) {
            if (index % 3 === 0) {
              rowSpan = "md:row-span-2";
            } else if (index % 5 === 0) {
              colSpan = "md:col-span-2";
            }
          }

          const minHeight = rowSpan.includes("row-span-2") ? "min-h-[400px] md:min-h-[600px]" : "min-h-[400px]";

          return (
            <div 
              key={product._id || index} 
              className={`product-card ${colSpan} ${rowSpan} ${minHeight} border-2 border-black p-6 md:p-8 flex flex-col justify-between h-full relative overflow-hidden group hover-cmyk`}
              style={{ '--accent-color': product.accentColor } as React.CSSProperties}
            >
              {/* Image Background */}
              <div className="absolute inset-0 z-0 bg-neutral-100 overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.title} 
                  className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 transition-all duration-500 cmyk-split" 
                />
              </div>

              {/* Top Content */}
              <div className="relative z-10 bg-white border-2 border-black p-4 self-start max-w-[90%]">
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2">
                  {product.title}
                </h3>
                <p className="text-sm md:text-base font-medium">
                  {product.shortDescription}
                </p>
              </div>

              {/* Bottom Content / CTA */}
              <div className="relative z-10 mt-auto self-end pt-8">
                <Link href={`/quote?product=${encodeURIComponent(product.title)}`}>
                  <Button className="btn-die-cut border-black text-black bg-white group-hover:border-current">
                    Inquire
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

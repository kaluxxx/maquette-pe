"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full relative"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.id}>
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent" />

              {/* Content - avec padding pour laisser place aux flèches */}
              <div className="absolute inset-0 flex items-center">
                <div className="container">
                  <div className="max-w-xl md:ml-12 lg:ml-16">
                    <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-4">
                      {slide.subtitle}
                    </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-slate-300 text-sm md:text-base mb-6 line-clamp-3">
                      {slide.description}
                    </p>
                    <Button asChild size="lg" className="gap-2">
                      <Link href={slide.ctaLink}>
                        {slide.ctaText}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Navigation arrows - positionnées en bas à droite */}
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 hidden md:flex gap-2">
        <CarouselPrevious className="relative left-0 translate-x-0 translate-y-0 h-10 w-10 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white" />
        <CarouselNext className="relative right-0 translate-x-0 translate-y-0 h-10 w-10 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white" />
      </div>
    </Carousel>
  );
}

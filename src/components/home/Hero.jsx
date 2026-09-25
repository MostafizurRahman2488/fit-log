
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["700"],
});

const Hero = () => {
  return (
    <section className="bg-[#0d0f11]">
      <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-10 md:py-12 lg:px-8 lg:py-14 xl:px-10">

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">

          {/* LEFT CONTENT */}
          <div className="min-w-0 w-full text-center lg:text-left">

            {/* Eyebrow */}
            <h6 className="mb-4 text-xs font-bold tracking-[0.18em] text-[#b8ff00] sm:mb-5 sm:text-sm">
              WORKOUT LIBRARY
            </h6>

            {/* Heading */}
            <h1
              className={`${oswald.className} text-3xl font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl`}
            >
              TRAIN WITH INTENT. LOG EVERY SET.
            </h1>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-[#85898f] sm:mt-6 sm:text-base sm:leading-7 lg:mx-0">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            {/* CTA Button */}
            <div className="mt-7 sm:mt-8">
              <Link
                href="#library"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#b8ff00] px-5 py-3 text-xs font-bold tracking-wide text-black transition duration-200 hover:bg-[#a8ed00] sm:px-6"
              >
                <span>BROWSE WORKOUTS</span>

                <ArrowRight
                  size={16}
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative min-w-0 w-full overflow-hidden">
            <Image
              src="/banner.png"
              alt="FitLog workout banner"
              width={700}
              height={500}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="block h-auto w-full object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;


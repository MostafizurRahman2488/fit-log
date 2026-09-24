
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="min-h-[calc(100vh-68px)] bg-[#0d0f11]">
      <div className="container mx-auto px-4 py-10 sm:px-6 sm:py-14 md:py-16 lg:px-8 lg:py-20 xl:px-10">

        <div className="flex flex-col items-center gap-10 sm:gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-12">

          {/* LEFT CONTENT */}
          <div className="w-full text-center lg:w-[52%] lg:text-left">

            {/* Eyebrow */}
            <h6 className="mb-4 text-xs font-bold tracking-[0.18em] text-[#b8ff00] sm:mb-5 sm:text-sm">
              WORKOUT LIBRARY
            </h6>

            {/* Heading */}
            <h1 className="text-xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              <span className="lg:whitespace-nowrap">
                TRAIN WITH INTENT. LOG
              </span>
              <br />
              EVERY SET.
            </h1>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-[#85898f] sm:mt-6 sm:text-base sm:leading-7 lg:mx-0">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            {/* Button */}
            <div className="mt-7 sm:mt-8">
              <Link
                href="/workouts"
                className="inline-flex items-center justify-center rounded-md bg-[#b8ff00] px-5 py-3 text-xs font-bold tracking-wide text-black transition duration-200 hover:bg-[#a8ed00] sm:px-6"
              >
                BROWSE WORKOUTS
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full  lg:w-[48%] ">
            <Image
              src="/banner.png"
              alt="FitLog workout banner"
              width={600}
              height={400}
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 48vw"
              className="h-auto w-full object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;


import Image from "next/image";
import React from "react";

const Footer = () => {
    return (
        <footer className="bg-[#0d0f11] border-t border-white/10">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 sm:px-6 md:flex-row lg:px-8">

                {/* Left - Brand */}
                <div className="flex items-center gap-3">
                    <Image
                        src="/logo.png"
                        alt="FitLog logo"
                        width={32}
                        height={32}
                        className="h-8 w-8 object-contain"
                    />

                    <span className="text-xl font-bold tracking-wider text-white">
                        FITLOG
                    </span>
                </div>

                {/* Right - Copyright */}
                <p className="text-center text-sm text-gray-400 md:text-right">
                    © 2026 FitLog — Workout Library. Train hard, log honest.
                </p>
            </div>
        </footer>
    );
};

export default Footer;


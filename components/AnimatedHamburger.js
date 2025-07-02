"use client";

import "@/styles/hamburger-icon.css";

export default function AnimatedHamburger({ open }) {
    return (
        <div id="hamburger" className={`mt-4 hamburger-icon ${open ? "open" : ""}`}>
            <div className="line line1 bg-white"></div>
            <div className="line line2 bg-white"></div>
        </div>
    );
}

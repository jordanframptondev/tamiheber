"use client";

import "@/styles/hamburger-icon.css";

export default function AnimatedHamburger({ open, isDark = false }) {
    const lineColor = isDark ? 'bg-gray-900' : 'bg-white';

    return (
        <div id="hamburger" className={`mt-4 hamburger-icon ${open ? "open" : ""}`}>
            <div className={`line line1 ${lineColor}`}></div>
            <div className={`line line2 ${lineColor}`}></div>
        </div>
    );
}

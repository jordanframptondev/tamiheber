"use client";

import "@/styles/hamburger-icon.css";

export default function AnimatedHamburger({ open, isDark = false }) {
    const lineColor = isDark ? 'bg-gray-900' : 'bg-white';

    return (
        <div id="hamburger" className={`hamburger-icon ${open ? "open mt-4" : "mt-8"}`}>
            <div className={`line line1 ${lineColor}`}></div>
            <div className={`line line2 ${lineColor}`}></div>
        </div>
    );
}

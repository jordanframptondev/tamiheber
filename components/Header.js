"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AnimatedHamburger from "./AnimatedHamburger";

const menuItems = [
    {label: "Home", path: "/"},
    {label: "About", path: "/about"},
    {label: "Portfolio", path: "/portfolio"},
    {label: "Contact", path: "/contact"},
];

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const mobileMenuRef = useRef(null);
    const hamburgerRef = useRef(null);

    // Make header styling consistent across all pages
    const textColor = 'text-black';
    const hoverColor = 'hover:text-black/80';
    const activeColor = 'text-black/80';
    const underlineColor = 'bg-black';
    const headerBg = 'bg-white/90';
    const borderColor = 'border-gray-200/50';

    const handleClickOutside = (event) => {
        if (hamburgerRef.current && !hamburgerRef.current.contains(event.target) &&
            mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
            setMobileMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <>
            {/* Desktop Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-50 ${headerBg} backdrop-blur-md border-b ${borderColor}`}>
                <div className="max-w-6xl mx-auto px-8 lg:px-12">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo/Title */}
                        <Link href="/" className={`${textColor} text-xl font-montserrat font-extralight tracking-widest uppercase`}>
                            Tami Heber
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-12">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`${textColor} font-montserrat font-extralight text-sm tracking-wide uppercase relative group transition-all duration-500 ${hoverColor} ${
                                        pathname === item.path ? activeColor : ''
                                    }`}
                                >
                                    {item.label}
                                    <span
                                        className={`absolute -bottom-2 left-0 w-0 h-px ${underlineColor} transition-all duration-500 ease-out group-hover:w-full ${
                                            pathname === item.path ? 'w-full' : ''
                                        }`}></span>
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <div
                            ref={hamburgerRef}
                            onClick={toggleMobileMenu}
                            className="md:hidden cursor-pointer p-2"
                        >
                            <AnimatedHamburger open={mobileMenuOpen} isDark={true}/>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                ref={mobileMenuRef}
                className={`fixed top-0 left-0 w-full h-full bg-black/90 backdrop-blur-xl z-40 transition-all duration-700 ease-out md:hidden ${
                    mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
            >
                <div className="flex flex-col items-center justify-center h-full space-y-12">
                    {menuItems.map((item, index) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`text-white hover:text-white/80 font-montserrat font-extralight text-lg tracking-widest uppercase relative group transition-all duration-500 ${
                                pathname === item.path ? 'text-white/80' : ''
                            }`}
                            style={{
                                animationDelay: mobileMenuOpen ? `${index * 100}ms` : '0ms'
                            }}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {item.label}
                            <span
                                className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-px bg-white transition-all duration-500 group-hover:w-full ${
                                    pathname === item.path ? 'w-full' : ''
                                }`}></span>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

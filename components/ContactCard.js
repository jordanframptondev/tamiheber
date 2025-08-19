"use client";

import { useState } from "react";

export default function ContactCard({ type, value, icon, formatValue }) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const href = type === 'email' ? `mailto:${value}` : `tel:${value}`;
    const displayValue = formatValue ? formatValue(value) : value;

    return (
        <div className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-50 transform -skew-y-1 transition-transform duration-500 opacity-0"></div>
            <div className="relative px-3 py-6 sm:px-6 border border-gray-950 bg-white backdrop-blur-sm  transition-all duration-300">
                <div className="flex items-center">
                    <div className="w-9 h-9 sm:w-12 sm:h-12 bg-gray-900 rounded-full flex items-center justify-center transition-transform duration-300">
                        {icon}
                    </div>
                    <div className="flex-1 ml-3 sm:ml-4 min-w-0">
                        <p className="text-xs font-montserrat font-light text-gray-500 uppercase tracking-wider mb-1">
                            {type === 'email' ? 'Email' : 'Phone'}
                        </p>
                        <div
                            className={`text-sm lg:text-base font-montserrat font-light text-gray-700 transition-colors duration-300 tracking-wider cursor-default ${
                                type === 'email' ? 'uppercase break-words' : ''
                            }`}
                        >
                            {displayValue}
                        </div>
                    </div>
                    <div className="relative ml-3 sm:ml-4 flex-shrink-0">
                        <button
                            onClick={() => copyToClipboard(value)}
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:bg-gray-100 rounded-full"
                            title={`Copy ${type}`}
                        >
                            {copied ? (
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

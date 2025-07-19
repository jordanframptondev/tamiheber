import { getContactData } from "@/lib/cms-service";
import Image from "next/image";

export const metadata = {
    title: "Tami Heber - Contact",
    description: "Contact Tami Heber, independent contractor and builder specializing in custom home construction, renovations, and architectural design. Get in touch to discuss your next project.",
    keywords: "Contact, Tami Heber, independent contractor, general contractor, builder, custom homes, home construction, renovation, remodeling, architecture, interior design, residential construction, home builder, design build, project management, construction services",
    viewport: "width=device-width, initial-scale=1",
};

export default async function Contact() {
    const {email, phone, imageUrl} = await getContactData();

    // Format phone number as (xxx) xxx-xxxx
    const formatPhoneNumber = (phoneNumber) => {
        if (!phoneNumber) return '';
        // Remove all non-digit characters
        const cleaned = phoneNumber.replace(/\D/g, '');
        // Format as (xxx) xxx-xxxx
        if (cleaned.length === 10) {
            return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
        }
        // Return original if not 10 digits
        return phoneNumber;
    };

    const formattedPhone = formatPhoneNumber(phone);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Background Image */}
            <div className="fixed top-0 left-0 w-full h-full -z-10">
                <Image
                    src={imageUrl}
                    alt="Background Image"
                    fill
                    priority={true}
                    className="object-cover opacity-20"
                />
            </div>

            {/* Header spacing */}
            <div className="h-16 lg:h-24 flex-shrink-0"></div>

            {/* Content area */}
            <div className="lg:h-[calc(100vh-6rem)] flex mt-12 lg:mt-20">
                <div className="w-full max-w-7xl lg:max-h-[600px] mx-auto px-6 lg:px-8 flex flex-col lg:flex-row">

                    {/* Contact Content - Left Side */}
                    <div className="flex-1 lg:pr-12 xl:pr-16 order-2 lg:order-1 lg:flex lg:flex-col">
                        <div
                            className="lg:flex-1 lg:overflow-y-auto lg:scrollbar-thin lg:scrollbar-track-gray-100 lg:scrollbar-thumb-gray-300">
                            <div className="space-y-8">
                                <div className="space-y-6">
                                    <h1 className="text-3xl font-montserrat font-extralight tracking-wide text-gray-900">
                                        Contact
                                    </h1>
                                    <div className="w-1/3 h-px bg-gray-900"></div>
                                </div>

                                <div className="space-y-12">
                                    {/* Contact Cards */}
                                    <div className="space-y-6">
                                        {/* Email Card */}
                                        <div className="group relative overflow-hidden">
                                            <div
                                                className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-50 transform -skew-y-1 group-hover:skew-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
                                            <div
                                                className="relative p-6 border border-gray-200 rounded-lg bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                                <div className="flex items-center space-x-4">
                                                    <div
                                                        className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                        <svg className="w-6 h-6 text-white" fill="none"
                                                             stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth={2}
                                                                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                                        </svg>
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-xs font-montserrat font-light text-gray-500 uppercase tracking-wider mb-1">Email</p>
                                                        <a
                                                            href={`mailto:${email}`}
                                                            className="text-sm lg:text-xl font-montserrat font-light text-gray-700 hover:text-gray-900 transition-colors duration-300 uppercase tracking-wider break-all"
                                                        >
                                                            {email}
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Phone Card */}
                                        <div className="group relative overflow-hidden">
                                            <div
                                                className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-50 transform skew-y-1 group-hover:skew-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
                                            <div
                                                className="relative p-6 border border-gray-200 rounded-lg bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                                <div className="flex items-center space-x-4">
                                                    <div
                                                        className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                        <svg className="w-6 h-6 text-white" fill="none"
                                                             stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth={2}
                                                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                                        </svg>
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-xs font-montserrat font-light text-gray-500 uppercase tracking-wider mb-1">Phone</p>
                                                        <a
                                                            href={`tel:${phone}`}
                                                            className="text-sm lg:text-xl font-montserrat font-light text-gray-700 hover:text-gray-900 transition-colors duration-300 tracking-wider"
                                                        >
                                                            {formattedPhone}
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image - Right Side */}
                    <div className="hidden lg:block lg:w-1/2 lg:pl-12 xl:pl-16 order-1 lg:order-2">
                        <div className="relative w-full h-full">
                            {/* Main Image Container */}
                            <div className="relative w-full h-full group">
                                <div
                                    className="absolute inset-0 bg-gradient-to-tr from-gray-900/20 to-transparent rounded-2xl z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                                <Image
                                    src={imageUrl}
                                    alt="Contact Image"
                                    fill
                                    priority={true}
                                    className="object-cover rounded"
                                    sizes="50vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

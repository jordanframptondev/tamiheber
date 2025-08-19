import { getContactData } from "@/lib/cms-service";
import Image from "next/image";
import ContactCard from "@/components/ContactCard";

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

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header spacing */}
            <div className="h-16 lg:h-24 flex-shrink-0"></div>

            {/* Content area */}
            <div className="h-[calc(100dvh-4rem)] lg:h-[calc(100dvh-6rem)] flex mt-8">
                <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">

                    {/* Title Section */}
                    <div className="mb-6 lg:mb-8">
                        <div className="space-y-3">
                            <h1 className="text-3xl font-montserrat font-extralight tracking-wide text-gray-900">
                                Contact
                            </h1>
                            <div className="w-36 h-px bg-gray-900"></div>
                        </div>
                    </div>

                    {/* Content Section - Contact Cards and Image Side by Side */}
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

                        {/* Contact Content - Left Side */}
                        <div className="flex-1 order-2 lg:order-1">
                            <div className="space-y-6">
                                {/* Copy Text */}
                                <div className="relative bg-transparent">
                                    <div className="space-y-4">
                                        <p className="text-lg lg:text-xl font-montserrat font-light text-gray-800 leading-relaxed tracking-wide italic">
                                            Looking for more information or want to discuss your project?
                                        </p>
                                        <p className="text-base lg:text-lg font-montserrat font-extralight text-gray-600 leading-relaxed tracking-wide">
                                            Send me a message—I&apos;m happy to answer any questions and will get back
                                            to you as soon as I can.
                                        </p>
                                    </div>
                                </div>

                                {/* Email Card */}
                                {email &&
                                    <ContactCard
                                        type="email"
                                        value={email}
                                        icon={
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor"
                                                 viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                            </svg>
                                        }
                                    />
                                }

                                {/* Phone Card */}
                                {phone &&
                                    <ContactCard
                                        type="phone"
                                        value={phone}
                                        formatValue={formatPhoneNumber}
                                        icon={
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor"
                                                 viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                            </svg>
                                        }
                                    />
                                }
                            </div>
                        </div>

                        {/* Image - Right Side */}
                        <div className="hidden lg:block lg:w-1/2 order-1 lg:order-2">
                            <div className="relative w-full h-[400px] overflow-hidden">
                                <Image
                                    src={imageUrl}
                                    alt="Contact Image"
                                    fill
                                    className="object-cover"
                                    sizes="50vw"
                                    priority={true}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

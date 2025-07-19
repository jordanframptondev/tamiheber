import {getAboutData} from "@/lib/cms-service";
import {toHTML} from "@portabletext/to-html";
import Image from "next/image";

export const metadata = {
    title: 'Tami Heber - About',
    description: 'Learn about Tami Heber, an experienced independent contractor and builder specializing in custom home construction, architectural design, and interior renovations.',
    keywords: 'About, Tami Heber, biography, independent contractor, general contractor, builder, architect, architectural design, interior design, custom homes, home construction, renovation, remodeling, residential construction, design build, project management, craftsmanship, building contractor',
    viewport: 'width=device-width, initial-scale=1',
};

export default async function About() {
    const {text, imageUrl} = await getAboutData();
    const textHtml = toHTML(text).replace(/<br\s*\/?>/gi, " ");

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header spacing */}
            <div className="h-16 lg:h-24 flex-shrink-0"></div>

            {/* Content area */}
            <div className="flex mt-8">
                <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">

                    {/* Title Section */}
                    <div className="mb-6 lg:mb-8">
                        <div className="space-y-4">
                            <h1 className="text-3xl font-montserrat font-extralight tracking-wide text-gray-900">
                                About
                            </h1>
                            <div className="w-36 h-px bg-gray-900"></div>
                        </div>
                    </div>

                    {/* Content Section - Paragraph and Image Side by Side */}
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 pb-12 lg:pb-18">

                        {/* Text Content - Left Side */}
                        <div className="flex-1 order-2 lg:order-1">
                            <div className="prose prose-lg max-w-none">
                                <div
                                    className="text-gray-700 font-montserrat font-light text-base leading-relaxed lg:leading-loose [&>p]:mb-4 [&>p:last-child]:mb-0 [&>br]:hidden"
                                    dangerouslySetInnerHTML={{__html: textHtml}}
                                />
                            </div>
                        </div>

                        {/* Image - Right Side */}
                        <div className="hidden lg:block lg:w-1/2 order-1 lg:order-2">
                            <div className="relative w-full max-h-[700px] overflow-hidden">
                                <Image
                                    src={imageUrl}
                                    alt="Tami Heber"
                                    width={1000}
                                    height={700}
                                    className="object-cover w-full h-[600px]"
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

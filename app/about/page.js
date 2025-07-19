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
    const textHtml = toHTML(text).replace(/<br\s*\/?>/gi, "");

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header spacing */}
            <div className="h-16 lg:h-24 flex-shrink-0"></div>

            {/* Content area */}
            <div className="flex-1 flex">
                <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row">

                    {/* Text Content - Left Side */}
                    <div className="flex-1 lg:pr-12 xl:pr-16 py-8 order-2 lg:order-1">
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-montserrat font-extralight tracking-wide text-gray-900">
                                    About
                                </h1>
                                <div className="w-16 h-px bg-gray-900"></div>
                            </div>

                            <div className="prose prose-lg max-w-none">
                                <div
                                    className="text-gray-700 font-montserrat font-light text-lg lg:text-xl leading-relaxed lg:leading-loose [&>p]:mb-4 [&>p:last-child]:mb-0 [&>br]:hidden"
                                    dangerouslySetInnerHTML={{__html: textHtml}}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Image - Right Side */}
                    <div className="hidden lg:block lg:w-1/2 lg:pl-12 xl:pl-16 py-8 order-1 lg:order-2">
                        <div className="relative w-full h-full min-h-[600px]">
                            <Image
                                src={imageUrl}
                                alt="Tami Heber"
                                fill
                                priority={true}
                                className="object-cover rounded-2xl shadow-2xl"
                                sizes="50vw"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

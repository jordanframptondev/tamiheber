import {getFocusData} from "@/utils/cms-service";
import {toHTML} from "@portabletext/to-html";
import "../../styles/focus.css";
import Image from "next/image";

export const metadata = {
    title: 'Clearstone Builders - Focus',
    description: 'Core principles of Clearstone Builders',
    keywords: 'Focus, Principles, vision, website, clearstone builders, clearstone, builders, homes',
    viewport: 'width=device-width, initial-scale=1',
};

export default async function Contact() {
    const {text, imageUrl} = await getFocusData();
    const textHtml = toHTML(text);
    return (
        <>
            <div className="fixed top-0 left-0 w-screen h-screen">
                <Image
                    src={imageUrl}
                    alt="Background Image"
                    width={1920}
                    height={1080}
                    priority={true}
                    className="fade-in-background absolute inset-0 h-screen w-screen object-cover"
                />
            </div>

            <div
                className="textbox max-w-[1260px] w-full lg:min-w-[1000px]">
                <div
                    className="mb-[50px] md:mb-[150px] z-10 bg-[#262a1cbd] fade-in-div bg-opacity-80 px-9 py-10
                     rounded-sm text-left text-white font-light">
                    <div
                        className="text-[18px] lg:text-[22px] custom-paragraph-spacing opacity-70 leading-[28px]"
                        dangerouslySetInnerHTML={{__html: textHtml}}
                    />
                </div>
            </div>
        </>
    );
}

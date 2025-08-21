import { FullScreenVideo } from "@/components/FullScreenVideo";
import { getHomeHero } from "@/lib/cms-service";

export const metadata = {
    title: 'Tami Heber',
    description: 'Tami Heber - Custom Home Contractor',
    keywords: 'Tami Heber, independent contractor, general contractor, custom home builder, home construction, residential construction, renovation, remodeling, architectural design, interior design, design build, project management, craftsmanship, building contractor',
    viewport: 'width=device-width, initial-scale=1',
};

export default async function Home() {
    const {videoUrl, posterUrl} = await getHomeHero();
    return (
        <div className="relative">
            <FullScreenVideo posterImage={posterUrl || "/thumbnail.jpg"} videoSrc={videoUrl || undefined}/>
            <div className="flex md:hidden pointer-events-none absolute inset-0 items-center justify-center z-30">
                <a
                    href="/portfolio"
                    className="pointer-events-auto inline-block border border-white/80 bg-black/50 text-white font-montserrat font-light tracking-[0.35em] uppercase text-xs md:text-sm px-8 py-4 hover:bg-black/60 hover:border-white focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-black transition-colors duration-300"
                >
                    View Portfolio
                </a>
            </div>
        </div>
    );
}

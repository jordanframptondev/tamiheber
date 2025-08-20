import { FullScreenVideo } from "@/components/FullScreenVideo";
import { getHomeHero } from "@/lib/cms-service";

export const metadata = {
    title: 'Tami Heber',
    description: 'Tami Heber - Custom Home Contractor',
    keywords: 'Tami Heber, independent contractor, general contractor, custom home builder, home construction, residential construction, renovation, remodeling, architectural design, interior design, design build, project management, craftsmanship, building contractor',
    viewport: 'width=device-width, initial-scale=1',
};

export default async function Home() {
    const { videoUrl, posterUrl } = await getHomeHero();
    return <FullScreenVideo posterImage={posterUrl || "/thumbnail.jpg"} videoSrc={videoUrl || undefined} />;
}

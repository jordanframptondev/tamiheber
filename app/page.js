import { FullScreenVideo } from "@/components/FullScreenVideo";

export const metadata = {
    title: 'Tami Heber',
    description: 'Tami Heber - Custom Home Contractor',
    keywords: 'Tami Heber, independent contractor, general contractor, custom home builder, home construction, residential construction, renovation, remodeling, architectural design, interior design, design build, project management, craftsmanship, building contractor',
    viewport: 'width=device-width, initial-scale=1',
};

export default async function Home() {
    return <FullScreenVideo posterImage="/thumbnail.jpg"/>;
}

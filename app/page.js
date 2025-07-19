import { getHomeImages } from "@/lib/cms-service";
import { FadingPhotoGallery } from "@/components/FadingPhotoGallery";
import { FullScreenVideo } from "@/components/FullScreenVideo";

export const metadata = {
    title: 'Clearstone Builders - Home',
    description: 'Home page displaying beautiful home images',
    keywords: 'home, website, clearstone builders, clearstone, builders, homes',
    viewport: 'width=device-width, initial-scale=1',
};

export default async function Home() {
    // TODO: get video from CMS
    return <FullScreenVideo posterImage="/video-thumbnail.png"/>
}

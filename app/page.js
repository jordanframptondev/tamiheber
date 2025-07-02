import {getHomeImages} from "@/utils/cms-service";
import {FadingPhotoGallery} from "@/components/FadingPhotoGallery";

export const metadata = {
    title: 'Clearstone Builders - Home',
    description: 'Home page displaying beautiful home images',
    keywords: 'home, website, clearstone builders, clearstone, builders, homes',
    viewport: 'width=device-width, initial-scale=1',
};

export default async function Home() {
  const cmsImages = await getHomeImages();
  return <FadingPhotoGallery imageURLs={cmsImages} />;
}

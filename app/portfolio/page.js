import {PhotoGallery} from '@/components/PhotoGallery';
import {getDetailedPortfolioImages} from '@/utils/cms-service';

export const metadata = {
    title: 'Clearstone Builders - Portfolio',
    description: 'Image gallery of Clearstone Builders homes',
    keywords: 'Images, Gallery, website, clearstone builders, clearstone, builders, homes',
    viewport: 'width=device-width, initial-scale=1',
};

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

// This style object will help fade in the text after the images have loaded
const fadeInStyle = {
    animation: 'fadeIn 1s ease-in-out 3s forwards',
    opacity: 0,
};

export default async function PortfolioPage() {
    const photos = await getDetailedPortfolioImages();
    return (
        <>
            <style>{fadeInKeyframes}</style>
            <PhotoGallery photos={photos}/>
            <p className="text-center font-extralight text-[24px] md:text-[30px] xl:text-[36px] px-2 pt-3 pb-6"
               style={fadeInStyle}>
                Many photographs on website by Joshua Caldwell Photographic and Lindsay
                Salazar Photography.
            </p>
        </>
    );
}

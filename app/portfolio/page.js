import {PhotoGallery} from '@/components/PhotoGallery';
import {getDetailedPortfolioImages} from '@/lib/cms-service';

export const metadata = {
    title: 'Tami Heber - Portfolio',
    description: 'Explore Tami Heber\'s portfolio of custom homes.',
    keywords: 'Portfolio, Gallery, Tami Heber, custom homes, home construction, architectural design, interior design, renovation projects, building portfolio, construction gallery, design projects, residential construction, custom builder, home builder, remodeling, craftsmanship examples',
    viewport: 'width=device-width, initial-scale=1',
};

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export default async function PortfolioPage() {
    const photos = await getDetailedPortfolioImages();
    return (
        <>
            <style>{fadeInKeyframes}</style>
            <PhotoGallery photos={photos}/>
        </>
    );
}

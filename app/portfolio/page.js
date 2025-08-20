import {PhotoGallery} from '@/components/PhotoGallery';
import {VideoGallery} from '@/components/VideoGallery';
import {getPortfolioProjects} from '@/lib/cms-service';

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

function slugify(title = '') {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export default async function PortfolioPage() {
    const projects = await getPortfolioProjects();

    if (!projects || projects.length === 0) {
        return (
            <div className="min-h-dvh bg-gray-50">
                <div className="h-20 lg:h-28 flex-shrink-0" />
                <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-24">
                    <p className="text-gray-700">No portfolio projects found.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <style>{fadeInKeyframes}</style>
            <div className="min-h-dvh bg-gray-50">
                {/* Header spacing (kept higher as per previous adjustment) */}
                <div className="h-20 lg:h-28 flex-shrink-0"></div>
                <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 pb-24">
                    {/* All project sections with uniform vertical rhythm */}
                    <div className="space-y-40">
                        {projects.map((project, index) => {
                            const id = slugify(project.title);
                            const HeadingTag = index === 0 ? 'h1' : 'h2';
                            return (
                                <section key={id} id={id} className="scroll-mt-40">
                                    <header className="space-y-4">
                                        <HeadingTag className="text-3xl font-montserrat font-extralight tracking-wide text-gray-900">{project.title}</HeadingTag>
                                        <div className="w-36 h-px bg-gray-900" />
                                    </header>
                                    <div className="mt-10 space-y-12">
                                        {project.photos?.length > 0 && (
                                            <div>
                                                <PhotoGallery photos={project.photos} />
                                            </div>
                                        )}
                                        {project.videos?.length > 0 && (
                                            <div className="space-y-4">
                                                <h3 className="text-xl font-medium">Video</h3>
                                                <VideoGallery videos={project.videos} />
                                            </div>
                                        )}
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

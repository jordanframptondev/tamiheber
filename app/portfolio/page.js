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

    return (
        <>
            <style>{fadeInKeyframes}</style>
            <div className="min-h-dvh bg-white">
                {/* Header spacing */}
                <div className="h-16" />

                {/* In-page navigation */}
                {/*{projects?.length > 1 && (*/}
                {/*  <nav aria-label="Project navigation" className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-black/10">*/}
                {/*    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex flex-wrap gap-3">*/}
                {/*      {projects.map(p => {*/}
                {/*        const id = slugify(p.title);*/}
                {/*        return (*/}
                {/*          <a*/}
                {/*            key={id}*/}
                {/*            href={`#${id}`}*/}
                {/*            className="text-xs md:text-sm font-medium px-3 py-1.5 rounded-full bg-black/5 hover:bg-black/10 transition-colors"*/}
                {/*          >*/}
                {/*            {p.title}*/}
                {/*          </a>*/}
                {/*        );*/}
                {/*      })}*/}
                {/*    </div>*/}
                {/*  </nav>*/}
                {/*)}*/}

                {/* Projects */}
                <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-24 py-12">
                    {(!projects || projects.length === 0) && (
                        <p>No portfolio projects found.</p>
                    )}
                    {projects?.map(project => {
                        const id = slugify(project.title);
                        return (
                            <section key={id} id={id} className="scroll-mt-28">
                                <header className="flex items-center justify-between gap-4">
                                    <h2 className="text-2xl">{project.title}</h2>
                                    {/*<a href="#" className="text-sm text-black/60 hover:text-black" aria-label="Back to top">Top</a>*/}
                                </header>

                                {/* Photos */}
                                {project.photos?.length > 0 && (
                                  <div className="mb-8">
                                    <PhotoGallery photos={project.photos} />
                                  </div>
                                )}

                                {/* Videos */}
                                {project.videos?.length > 0 && (
                                  <div className="space-y-4">
                                    <h3 className="text-xl font-medium">Video</h3>
                                    <VideoGallery videos={project.videos} />
                                  </div>
                                )}
                            </section>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

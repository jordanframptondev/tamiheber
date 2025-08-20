// sanity.js
import {createClient} from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

export const sanityClient = createClient({
    projectId: "kvjcvgqs",
    dataset: "production",
    useCdn: false, // set to `false` to bypass the edge cache
    apiVersion: "2025-08-18", // use current date (YYYY-MM-DD) to target the latest API version
    // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
});

export function urlFor(source) {
    const builder = imageUrlBuilder(sanityClient);
    return builder.image(source);
}

export async function getHomeImages() {
    // Home schema currently has no image fields; return empty list.
    return [];
}

// Deprecated: legacy single-level portfolio images structure
export async function getDetailedPortfolioImages() {
    console.warn("getDetailedPortfolioImages is deprecated. Use getPortfolioProjects instead.");
    const data = await sanityClient.fetch('*[_type == "portfolio"].images[].asset->{url, originalFilename, metadata{lqip, dimensions{width,aspectRatio, height}}}');
    return data?.map((image) => ({
        src: image?.url,
        alt: "portfolio image",
        aspect_ratio: image?.metadata?.dimensions?.aspectRatio,
        width: image?.metadata?.dimensions?.width,
        height: image?.metadata?.dimensions?.height,
        lqip: image?.metadata?.lqip,
        name: image?.originalFilename
    }));
}

// New: fetch structured portfolio projects (title, photos, videos)
export async function getPortfolioProjects() {
    const query = '*[_type == "portfolio"][0]{projects[]{title, photos[]{asset->{url, originalFilename, metadata{lqip, dimensions{width, height, aspectRatio}}}}, videos[]{title, videoFile{asset->{url, originalFilename}}, thumbnail{asset->{url, metadata{lqip, dimensions{width, height, aspectRatio}}}}}}}'
    const data = await sanityClient.fetch(query);
    const projects = data?.projects || [];
    return projects.map(project => ({
        title: project.title,
        photos: (project.photos || []).map((p, idx) => ({
            id: `${project.title}-photo-${idx}`,
            src: p?.asset?.url,
            alt: project.title ? `${project.title} photo ${idx + 1}` : `Project photo ${idx + 1}`,
            aspect_ratio: p?.asset?.metadata?.dimensions?.aspectRatio,
            width: p?.asset?.metadata?.dimensions?.width,
            height: p?.asset?.metadata?.dimensions?.height,
            lqip: p?.asset?.metadata?.lqip,
            name: p?.asset?.originalFilename
        })),
        videos: (project.videos || []).map((v, vidx) => ({
            id: `${project.title}-video-${vidx}`,
            title: v?.title || `${project.title} video ${vidx + 1}`,
            src: v?.videoFile?.asset?.url,
            originalFilename: v?.videoFile?.asset?.originalFilename,
            thumbnail: v?.thumbnail?.asset?.url,
            thumbnailLqip: v?.thumbnail?.asset?.metadata?.lqip,
            width: v?.thumbnail?.asset?.metadata?.dimensions?.width,
            height: v?.thumbnail?.asset?.metadata?.dimensions?.height,
        }))
    }));
}

export async function getContactData() {
    let data = await sanityClient.fetch('*[_type == "contact"]');
    data = data[0];
    return {
        email: data.email,
        phone: data.phoneNumber,
        address: data.address,
        imageUrl: urlFor(data.image).url(),
    };
}

export async function getAboutData() {
    let data = await sanityClient.fetch('*[_type == "about"]');
    data = data[0];
    return {
        text: data.text,
        imageUrl: urlFor(data.image).url(),
    };
}

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function getPosts() {
    const posts = await sanityClient.fetch('*[_type == "post"]');
    return posts;
}

export async function createPost(post) {
    const result = sanityClient.create(post);
    return result;
}

export async function updateDocumentTitle(_id, title) {
    const result = sanityClient.patch(_id).set({ title });
    return result;
}

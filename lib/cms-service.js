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
    const data = await sanityClient.fetch('*[_type == "home"]{images}');
    const images = data[0]?.images?.map((image) => urlFor(image).url());
    return images;
}

export async function getPortfolioImages() {
    const data = await sanityClient.fetch('*[_type == "portfolio"]{images}');
    const images = data[0]?.images?.map((image) => urlFor(image).url());
    return images;
}

export async function getDetailedPortfolioImages() {
    const data = await sanityClient.fetch('*[_type == "portfolio"].images[].asset->{url, originalFilename, metadata{lqip, dimensions{width,aspectRatio, height}}}');
    return data?.map((image) => ({
      src: image?.url,
      alt: "Clearstone Builders portfolio image",
      aspect_ratio: image?.metadata?.dimensions?.aspectRatio,
      width: image?.metadata?.dimensions?.width,
      height: image?.metadata?.dimensions?.height,
      lqip: image?.metadata?.lqip,
      name: image?.originalFilename
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

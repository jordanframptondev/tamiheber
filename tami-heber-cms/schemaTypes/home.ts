import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  fields: [
    defineField({
      name: 'videoFile',
      title: 'Home Video',
      type: 'file',
      description: 'Single hero/background video for the home page',
      options: { accept: 'video/*', storeOriginalFilename: true }
    }),
    defineField({
      name: 'posterImage',
      title: 'Poster Image',
      type: 'image',
      description: 'Displayed while the video loads / as fallback',
      options: { hotspot: true }
    })
  ],
  preview: {
    select: { videoFile: 'videoFile', posterImage: 'posterImage' },
    prepare() { return { title: 'Home' } }
  }
})

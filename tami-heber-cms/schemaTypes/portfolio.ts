import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  fields: [
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'project',
            title: 'Project',
            type: 'object',
            fields: [
              defineField({
                name: 'title',
                title: 'Title',
                type: 'string',
                validation: rule => rule.required()
              }),
              defineField({
                name: 'photos',
                title: 'Photos',
                type: 'array',
                of: [
                  defineArrayMember({
                    title: 'Photo',
                    type: 'image',
                    options: {hotspot: true}
                  })
                ]
              }),
              defineField({
                name: 'videos',
                title: 'Videos',
                description: 'Optional videos for this project. Provide a thumbnail for performance.',
                type: 'array',
                of: [
                  defineArrayMember({
                    name: 'videoItem',
                    title: 'Video',
                    type: 'object',
                    fields: [
                      defineField({
                        name: 'title',
                        title: 'Title',
                        type: 'string'
                      }),
                      defineField({
                        name: 'videoFile',
                        title: 'Video File',
                        type: 'file',
                        options: {storeOriginalFilename: true},
                        validation: rule => rule.required()
                      }),
                      defineField({
                        name: 'thumbnail',
                        title: 'Thumbnail',
                        type: 'image',
                        description: 'Displayed before the video plays',
                        options: {hotspot: true}
                      }),
                    ]
                  })
                ]
              })
            ]
        })
      ]
    })
  ],
})

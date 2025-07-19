import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        defineArrayMember({
          title: 'Image',
          type: 'image',
          options: {hotspot: true}
        })
      ]
    })
  ],
})

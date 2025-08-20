import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    defineField({
      name: 'message',
      title: 'Message',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Intro / instructions shown on contact page'
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],

  preview: {
    select: {
      email: 'email',
      phoneNumber: 'phoneNumber',
    },
    prepare(selection) {
      return { title: 'Contact' }
    },
  },
})

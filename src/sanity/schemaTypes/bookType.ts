import { defineField, defineType } from 'sanity'
import { BookIcon } from '@sanity/icons'

export const bookType = defineType({
  name: 'book',
  title: 'Book Recommendation',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().error('Book title is required'),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Book cover image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Important for accessibility',
        }),
      ],
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'Goodreads, Amazon, or official publisher page',
      validation: (rule) =>
        rule.uri({ scheme: ['http', 'https'] }).error('Must be a valid web URL'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'link',
      media: 'coverImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Untitled Book',
        subtitle: subtitle || 'No link provided',
        media,
      }
    },
  },
})

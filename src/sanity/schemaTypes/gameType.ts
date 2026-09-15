import { defineField, defineType } from 'sanity'
import { JoystickIcon } from '@sanity/icons'

export const gameType = defineType({
  name: 'game',
  title: 'Game Recommendation',
  type: 'document',
  icon: JoystickIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().error('Game title is required'),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Cover art or promotional screenshot',
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
      name: 'rating',
      title: 'Rating (0 - 10)',
      type: 'number',
      description: 'Score out of 10 (e.g. 9 or 8.5)',
      validation: (rule) =>
        rule
          .min(0)
          .max(10)
          .precision(1)
          .error('Rating must be a number between 0 and 10'),
    }),
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'text',
      rows: 3,
      description: 'Optional personal thoughts, notes, or mini-review',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'Store page, Steam URL, or official game website',
      validation: (rule) =>
        rule.uri({ scheme: ['http', 'https'] }).error('Must be a valid web URL'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      rating: 'rating',
      media: 'coverImage',
    },
    prepare({ title, rating, media }) {
      const ratingText = rating !== undefined && rating !== null ? `⭐ ${rating}/10` : 'No rating'
      return {
        title: title || 'Untitled Game',
        subtitle: ratingText,
        media,
      }
    },
  },
})

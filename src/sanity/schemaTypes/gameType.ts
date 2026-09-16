import { defineArrayMember, defineField, defineType } from 'sanity'
import { JoystickIcon } from '@sanity/icons'

export interface GameRequirementItem {
  key: string
  value: string
}

export interface GameRequirement {
  title?: string
  requirements?: Record<string, string> | GameRequirementItem[]
  notes?: string[]
}

export interface PCRequirements {
  min?: GameRequirement
  rec?: GameRequirement
}

export type GameCategory =
  | 'GOAT'
  | 'Hall of Fame'
  | 'Pretty Good'
  | 'Why Did I Play This'

export interface Game {
  _id?: string
  name: string
  slug: {
    _type: 'slug'
    current: string
  } | string
  desc?: string
  customeCmt?: string
  category?: GameCategory
  imge_link: {
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
  } | string
  steam_link?: string
  website?: string
  other_links?: string[]
  pc_req?: PCRequirements
  developer?: string
  publisher?: string
  genres?: string[]
}

const createGameRequirementFields = () => [
  defineField({
    name: 'title',
    title: 'Title',
    type: 'string',
  }),
  defineField({
    name: 'requirements',
    title: 'Requirements',
    type: 'array',
    description: 'Key-value pairs for specifications (e.g. OS, Processor, Memory, Graphics, Storage)',
    of: [
      defineArrayMember({
        type: 'object',
        name: 'requirementItem',
        title: 'Requirement Item',
        fields: [
          defineField({
            name: 'key',
            title: 'Key / Component',
            type: 'string',
          }),
          defineField({
            name: 'value',
            title: 'Value / Specification',
            type: 'string',
          }),
        ],
        preview: {
          select: {
            title: 'key',
            subtitle: 'value',
          },
        },
      }),
    ],
  }),
  defineField({
    name: 'notes',
    title: 'Notes',
    type: 'array',
    of: [
      defineArrayMember({
        type: 'string',
      }),
    ],
  }),
]

export const gameType = defineType({
  name: 'game',
  title: 'Games',
  type: 'document',
  icon: JoystickIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required().error('Game name is required'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .trim()
            .replace(/[\s-]+/g, '_')
            .replace(/^_+|_+$/g, ''),
      },
      validation: (rule) => rule.required().error('Slug is required'),
    }),
    defineField({
      name: 'desc',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'customeCmt',
      title: 'Custom Comment',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'GOAT', value: 'GOAT' },
          { title: 'Hall of Fame', value: 'Hall of Fame' },
          { title: 'Pretty Good', value: 'Pretty Good' },
          { title: 'Why Did I Play This', value: 'Why Did I Play This' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'imge_link',
      title: 'Cover Image',
      type: 'image',
      description: 'Cover art or promotional screenshot',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required().error('Cover image is required'),
    }),
    defineField({
      name: 'steam_link',
      title: 'Steam Link',
      type: 'url',
      validation: (rule) =>
        rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
      validation: (rule) =>
        rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'other_links',
      title: 'Other Links',
      type: 'array',
      description: 'Additional links (e.g. Epic Games, GOG, official wiki, Discord)',
      of: [
        defineArrayMember({
          type: 'url',
          validation: (rule) =>
            rule.uri({ scheme: ['http', 'https'] }).error('Must be a valid web URL'),
        }),
      ],
    }),
    defineField({
      name: 'pc_req',
      title: 'PC Requirements',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        defineField({
          name: 'min',
          title: 'Minimum Requirements',
          type: 'object',
          options: {
            collapsible: true,
            collapsed: false,
          },
          fields: createGameRequirementFields(),
        }),
        defineField({
          name: 'rec',
          title: 'Recommended Requirements',
          type: 'object',
          options: {
            collapsible: true,
            collapsed: false,
          },
          fields: createGameRequirementFields(),
        }),
      ],
    }),
    defineField({
      name: 'developer',
      title: 'Developer',
      type: 'string',
    }),
    defineField({
      name: 'publisher',
      title: 'Publisher',
      type: 'string',
    }),
    defineField({
      name: 'genres',
      title: 'Genres',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      slug: 'slug.current',
      media: 'imge_link',
    },
    prepare({ title, subtitle, slug, media }) {
      return {
        title: title || 'Untitled Game',
        subtitle: subtitle || (slug ? `/${slug}` : 'No category'),
        media,
      }
    },
  },
})


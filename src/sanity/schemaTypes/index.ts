import { type SchemaTypeDefinition } from 'sanity'
import { postType } from './postType'
import { projectType } from './projectType'
import { resourceType } from './resourceType'
import { gameType } from './gameType'
import { bookType } from './bookType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, projectType, resourceType, gameType, bookType],
}

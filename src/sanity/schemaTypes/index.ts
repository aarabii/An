import { type SchemaTypeDefinition } from "sanity";
import { postType } from "./postType";
import { projectType } from "./projectType";
import { bookmarkType } from "./bookmarkType";
import { gameType } from "./gameType";
import { bookType } from "./bookType";
import { secretType } from "./secretType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, projectType, bookmarkType, gameType, bookType, secretType],
};

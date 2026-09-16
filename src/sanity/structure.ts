import type { StructureResolver } from "sanity/structure";
import {
  DocumentTextIcon,
  RocketIcon,
  LinkIcon,
  JoystickIcon,
  BookIcon,
  StarIcon,
} from "@sanity/icons";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("project").title("Projects").icon(RocketIcon),
      S.documentTypeListItem("post").title("Blogs").icon(DocumentTextIcon),
      S.documentTypeListItem("bookmark").title("Bookmark").icon(LinkIcon),
      S.divider(),
      S.listItem()
        .title("Recommendations")
        .icon(StarIcon)
        .child(
          S.list()
            .title("Recommendations")
            .items([
              S.documentTypeListItem("game").title("Games").icon(JoystickIcon),
              S.documentTypeListItem("book").title("Books").icon(BookIcon),
            ]),
        ),
      // Automatically surface any other future document types at the root level
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["project", "post", "bookmark", "game", "book"].includes(
            listItem.getId() || "",
          ),
      ),
    ]);

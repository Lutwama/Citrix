import type { StructureResolver } from "sanity/structure";

// Site settings is a singleton pinned to the top of the desk.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Citrix Solutions")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => item.getId() !== "siteSettings"),
    ]);

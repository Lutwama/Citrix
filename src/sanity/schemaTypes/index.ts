import { author, category, seo, teamMember, testimonial } from "./misc";
import { post } from "./post";
import { project } from "./project";
import { service } from "./service";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [
  siteSettings,
  service,
  project,
  post,
  category,
  author,
  testimonial,
  teamMember,
  seo,
];

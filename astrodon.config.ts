import {
  dirname,
  fromFileUrl,
  join,
} from "https://deno.land/std@0.122.0/path/mod.ts";
import type { AppConfig } from "https://raw.githubusercontent.com/astrodon/astrodon/feature/deno_tauri/modules/astrodon/mod.ts";

const __dirname = dirname(fromFileUrl(import.meta.url));

export default <AppConfig> {
  entry: join(__dirname, "mod.ts"),
  dist: __dirname,
  info: {
    name: "DenoRunner",
    id: "deno.runner",
    version: "0.1.0",
    author: "Marc Espín",
    shortDescription: "Description!",
    longDescription: "Description!",
    homepage: "https://github.com/marc/deno_runner",
    copyright: "2022",
    icon: [],
    resources: [],
  },
};

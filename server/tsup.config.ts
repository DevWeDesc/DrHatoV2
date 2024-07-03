import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src"],
  outDir: "dist",
  format: "esm",
  ignoreWatch: ["*.xlsx", "*.pdf", "*.md", "*.jpeg"],
  esbuildOptions(options) {
    options.loader = {
      ".pdf": "file",
      ".xlsx": "file",
      ".md": "file",
      ".jpeg": "file",
    };
  },
});
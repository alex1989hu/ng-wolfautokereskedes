import { TargetOptions } from "@angular-builders/custom-webpack";
import { minify } from "html-minifier";

export default (targetOptions: TargetOptions, indexHtml: string) =>
  minify(indexHtml, {
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    removeComments: true,
    removeOptionalTags: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
  });

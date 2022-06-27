// @ts-check

const path = require("path");
const esbuild = require("esbuild");

const args = process.argv;

/** @type {esbuild.BuildOptions} */
const buildOptions = {
  bundle: true,
  entryPoints: [path.resolve(__dirname, "./src/main.ts")],
  outfile: path.resolve(__dirname, "./out/main.js"),
  sourcemap: true,
};

if (args.includes("build")) {
  esbuild.build({
    ...buildOptions,
    watch: args.includes("watch"),
  });
}

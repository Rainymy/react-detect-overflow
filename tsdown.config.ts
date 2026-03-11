import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.tsx"],
  format: ["cjs", "esm"],
  treeshake: true,
  publint: true,
  dts: {
    emitJs: true,
  }, // Generate declaration file (.d.ts),
  sourcemap: false,
  minify: {
    compress: true,
    mangle: true,
    codegen: false,
  },
  clean: true,
});

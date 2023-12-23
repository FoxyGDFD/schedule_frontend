import {
  tailwindSimplifyPlugin,
  tailwindSimplifyPreset,
} from "simplify-dev/utils";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*", "./node_modules/simplify-dev/**/*"],
  theme: {
    extend: {},
  },
  plugins: [tailwindSimplifyPlugin],
  presets: [tailwindSimplifyPreset],
};

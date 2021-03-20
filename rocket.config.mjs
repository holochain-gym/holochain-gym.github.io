import { rocketLaunch } from "@rocket/launch";
import { adjustPluginOptions } from "plugins-manager";

/** @type {Partial<import("@rocket/cli").RocketCliOptions>} */
export default {
  presets: [rocketLaunch()],
  setupBuildPlugins: [
    adjustPluginOptions("workbox", {
      globPatterns: [
        // original line: "**/*.{html,js,css,webmanifest}",
        "**/*.{css,webmanifest}",
      ],
    }),
  ],
};

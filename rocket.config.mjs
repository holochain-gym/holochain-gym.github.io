import { rocketLaunch } from "@rocket/launch";
import commonjs from "@rollup/plugin-commonjs";
import { addPlugin } from 'plugins-manager';

/** @type {Partial<import("@rocket/cli").RocketCliOptions>} */
export default {
  presets: [rocketLaunch()],
  setupDevAndBuildPlugins: [
    addPlugin({
      name: "commonjs",
      plugin: commonjs,
      location: "top",
    }),
  ],
};

import { rocketLaunch } from "@rocket/launch";

/** @type {Partial<import("@rocket/cli").RocketCliOptions>} */
export default {
  presets: [rocketLaunch()],
};

import type { Options } from "$fresh/plugins/twind.ts";
import presetTypography from "@twind/preset-typography";

export default {
  selfURL: import.meta.url,
  presets: [presetTypography()],
} as Options;

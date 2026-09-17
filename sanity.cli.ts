/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/
import { defineCliConfig } from "sanity/cli";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET;

export default defineCliConfig({
  api: { projectId: projectId, dataset: dataset },
  deployment: {
    appId: "iclrcx845k0w0spyxbhm17br",
  },
  typegen: {
    enabled: true,
    path: "./src/**/*.{ts,tsx,js,jsx}",
    schema: "schema.json",
    generates: "./sanity.types.ts",
    overloadClientMethods: true,
  },
});

// Replace your-framework with the framework you are using (e.g., react-vite, vue3-vite)
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  addons: ["@storybook/addon-coverage"],
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  async viteFinal(config, options) {
    // Add your configuration here
    return config;
  },
};

export default config;

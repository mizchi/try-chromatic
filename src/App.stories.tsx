// src/components/Input.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import App from "./App";

const meta: Meta<typeof App> = {
  title: "Default App",
  component: App,
};

export default meta;

type Story = StoryObj<typeof App>;

export const DefaultApp: Story = {
  render: () => <App />,
};

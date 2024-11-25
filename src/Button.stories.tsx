import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

export default {
  title: Button.name,
  component: Button,
} satisfies Meta<typeof Button>;

export const ButtonXXX: StoryObj<typeof Button> = {
  render: () => <Button label="xxx" />,
};

export const ButtonYYY: StoryObj<typeof Button> = {
  render: () => <Button label="yyy" />,
};

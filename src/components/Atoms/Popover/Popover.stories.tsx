import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Button as Btn } from "../Button/Button";
import { Popover } from "./Popover";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Popover>;

const Trigger = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Btn>>(
  (props, ref) => <Btn ref={ref} {...props} />,
);

Trigger.displayName = "PopoverTrigger";

export const Default: Story = {
  args: {
    trigger: <Trigger>Abrir</Trigger>,
    title: "Title",
    counter: "1 de 5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    primaryLabel: "Texto",
    secondaryLabel: "Texto",
    size: "md",
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: "lg",
  },
};

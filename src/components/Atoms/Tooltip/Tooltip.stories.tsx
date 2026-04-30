import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Tooltip, TooltipProvider } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Tooltip utilizado para exibir informações contextuais ao hover. Suporta título opcional e seta posicionável nos quatro lados.",
      },
    },
  },
  argTypes: {
    arrowPosition: {
      control: "select",
      options: ["default", "right-arrow", "left-arrow", "top-arrow"],
      description: "Define o lado onde a seta (ponteiro) aparece",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    title: {
      control: "text",
      description: "Título opcional exibido em destaque (14px / Medium)",
    },
    description: {
      control: "text",
      description: "Texto principal do tooltip (12px / Regular)",
    },
    children: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

const TriggerBox = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => (
    <div
      ref={ref}
      className="ds-bg-neutral-100 ds-border ds-border-neutral-300 ds-px-[16px] ds-py-[8px] ds-rounded ds-cursor-pointer ds-select-none"
      {...props}
    >
      <p className="ds-text-[14px] ds-text-neutral-700">Tooltip</p>
    </div>
  ),
);

export const Default: Story = {
  args: { title: "Title", description: "Text", arrowPosition: "default" },
  render: (args) => <Tooltip {...args}><TriggerBox /></Tooltip>,
};

export const NoTitle: Story = {
  args: { description: "Text", arrowPosition: "default" },
  render: (args) => <Tooltip {...args}><TriggerBox /></Tooltip>,
};

export const RightArrow: Story = {
  args: { title: "Title", description: "Text", arrowPosition: "right-arrow" },
  render: (args) => <Tooltip {...args}><TriggerBox /></Tooltip>,
};

export const LeftArrow: Story = {
  args: { title: "Title", description: "Text", arrowPosition: "left-arrow" },
  render: (args) => <Tooltip {...args}><TriggerBox /></Tooltip>,
};

export const TopArrow: Story = {
  args: { title: "Title", description: "Text", arrowPosition: "top-arrow" },
  render: (args) => <Tooltip {...args}><TriggerBox /></Tooltip>,
};


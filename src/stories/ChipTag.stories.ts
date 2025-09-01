import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import ChipTag from '@/components/ui/chip-tag';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';

const meta = {
  title: 'chip-tag',
  component: ChipTag,
  parameters: {
    viewport: { ...MINIMAL_VIEWPORTS, ...INITIAL_VIEWPORTS },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['md', 'lg'],
    },
    color: {
      control: 'radio',
      options: ['blue', 'pink', 'green', 'brown'],
    },
    label: {
      control: 'text',
    },
  },
} satisfies Meta<typeof ChipTag>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const BrownMD: Story = {
  args: {
    size: 'md',
    color: 'brown',
    label: '프로젝트',
  },
};
export const GreenMD: Story = {
  args: {
    size: 'md',
    color: 'green',
    label: '일반',
  },
};
export const PinkLG: Story = {
  args: {
    size: 'lg',
    color: 'pink',
    label: '백엔드',
  },
};
export const blueLG: Story = {
  args: {
    size: 'lg',
    color: 'blue',
    label: '상',
  },
};

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import ChipProfile from '@/components/ui/chip-profile';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';

const meta = {
  title: 'chip-profile',
  component: ChipProfile,
  parameters: {
    viewport: { ...MINIMAL_VIEWPORTS, ...INITIAL_VIEWPORTS },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'radio',
      options: ['green', 'blue', 'orange', 'yellow', 'brown'],
    },
    label: {
      control: 'text',
    },
  },
} satisfies Meta<typeof ChipProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GreenSM: Story = {
  args: {
    size: 'sm',
    color: 'green',
    label: 'K',
  },
};
export const blueMD: Story = {
  args: {
    size: 'md',
    color: 'blue',
    label: 'L',
  },
};
export const orangeLG: Story = {
  args: {
    size: 'lg',
    color: 'orange',
    label: 'P',
  },
};

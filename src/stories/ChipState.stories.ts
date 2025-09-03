import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ChipState from '@/components/ui/chip/chip-state';

const meta = {
  title: 'chip-state',
  component: ChipState,
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
    label: {
      control: 'text',
    },
  },
} satisfies Meta<typeof ChipState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Md: Story = {
  args: {
    size: 'md',
    label: 'On Progress',
  },
};
export const Lg: Story = {
  args: {
    size: 'lg',
    label: 'On Progress',
  },
};

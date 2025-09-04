import { fn } from 'storybook/internal/test';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ButtonPagination from '@/components/ui/button/button-pagination';

const meta = {
  title: 'button-pagination',
  component: ButtonPagination,
  parameters: {
    viewport: { ...MINIMAL_VIEWPORTS, ...INITIAL_VIEWPORTS },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isNextDisabled: {
      control: 'boolean',
    },
    isPrevDisabled: {
      control: 'boolean',
    },
    additionalClass: {},
  },
  args: { onPrevClick: fn(), onNextClick: fn() },
} satisfies Meta<typeof ButtonPagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = {
  args: {
    isPrevDisabled: true,
    isNextDisabled: true,
  },
};

import { fn } from 'storybook/test';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DashboardHeader from '@/components/ui/header/dashboard-header';

const meta = {
  title: 'dashboard-header',
  component: DashboardHeader,
  parameters: {
    viewport: { ...MINIMAL_VIEWPORTS, ...INITIAL_VIEWPORTS },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof DashboardHeader>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {},
};

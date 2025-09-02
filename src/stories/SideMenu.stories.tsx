import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SideMenu from '@/components/ui/side-menu';

const meta = {
  title: 'side-menu',
  component: SideMenu,
  decorators: [
    (Story) => {
      return (
        <div style={{ height: '750px' }}>
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    viewport: { ...MINIMAL_VIEWPORTS, ...INITIAL_VIEWPORTS },
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SideMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

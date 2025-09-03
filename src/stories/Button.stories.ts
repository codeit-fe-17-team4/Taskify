import { fn } from 'storybook/test';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Button from '@/components/ui/button/button';

const meta = {
  title: 'button',
  component: Button,
  parameters: {
    viewport: { ...MINIMAL_VIEWPORTS, ...INITIAL_VIEWPORTS },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'invitation', 'modal'],
    },
    backgroundColor: {
      control: { type: 'radio' },
      options: ['violet', 'white'],
    },
    labelColor: {
      control: { type: 'radio' },
      options: ['gray'],
    },
    label: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: 'primary',
    backgroundColor: 'violet',
    label: '로그인',
  },
};
export const Invitation: Story = {
  args: {
    variant: 'invitation',
    backgroundColor: 'violet',
    label: '수락',
  },
};
export const WhiteInvitation: Story = {
  args: {
    variant: 'invitation',
    backgroundColor: 'white',
    label: '거절',
  },
};
export const Modal: Story = {
  args: {
    variant: 'modal',
    backgroundColor: 'violet',
    label: '확인',
  },
};
export const WhiteModalWithGrayLabel: Story = {
  args: {
    variant: 'modal',
    backgroundColor: 'white',
    labelColor: 'gray',
    label: '취소',
  },
};

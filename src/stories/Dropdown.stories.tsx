import type { ComponentType } from 'react';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Dropdown from '@/components/ui/dropdown';

const meta = {
  title: 'Dropdown',
  component: Dropdown,
  subcomponents: {
    Toggle: Dropdown.Toggle as ComponentType,
    List: Dropdown.List as ComponentType,
    Item: Dropdown.Item as ComponentType,
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ height: '150px' }}>
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    viewport: { ...MINIMAL_VIEWPORTS, ...INITIAL_VIEWPORTS },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: <></> },
  parameters: {
    docs: {
      canvas: {
        sourceState: 'shown',
      },
    },
  },
  render: () => {
    function DropdownStory() {
      /**
       * 코드 예시: return 괄호 내부
       */
      return (
        <Dropdown>
          <Dropdown.Toggle>
            <div className='hover:bg-gray-4 active:bg-gray-3 border-gray-3 cursor-pointer rounded-md border-1 px-10 py-3'>
              내 정보
            </div>
          </Dropdown.Toggle>
          <Dropdown.List
            additionalClassName='top-0 right-0'
            ariaLabel='사용자 메뉴'
          >
            <Dropdown.Item onClick={() => 0}>로그아웃</Dropdown.Item>
            <Dropdown.Item onClick={() => 0}>내 정보</Dropdown.Item>
            <Dropdown.Item onClick={() => 0}>내 대시보드</Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      );
      /* 끝 */
    }

    return <DropdownStory />;
  },
};

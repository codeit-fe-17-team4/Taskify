import type { ReactNode } from 'react';
import {
  ArgTypes,
  Description,
  Primary,
  Stories,
  Title,
} from '@storybook/addon-docs/blocks';

function StorybookTemplate(): ReactNode {
  return (
    <>
      <br />
      <Title />
      <Description />
      <Primary />
      <ArgTypes />
      <Stories />
      <br />
      <br />
    </>
  );
}

export default StorybookTemplate;

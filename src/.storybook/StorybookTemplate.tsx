import {
  ArgTypes,
  Description,
  Primary,
  Stories,
  Title,
} from '@storybook/addon-docs/blocks';
import React from 'react';

const StorybookTemplate = () => {
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
};

export default StorybookTemplate;

import { Head, Html, Main, NextScript } from 'next/document';
import type { ReactNode } from 'react';

export default function Document(): ReactNode {
  return (
    <Html lang='ko'>
      <Head />
      <body className='antialiased'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
// "tailwindStylesheet": "./src/pages/styles/globals.css",

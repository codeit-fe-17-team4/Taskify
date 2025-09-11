import { Head, Html, Main, NextScript } from 'next/document';
import type { ReactNode } from 'react';

export default function Document(): ReactNode {
  return (
    <Html lang='ko'>
      <Head>
        {/* FOUC 방지를 위한 초기 테마 설정 스크립트 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light' || theme === 'dark') {
                    document.documentElement.className = theme;
                    document.documentElement.dataset.theme = theme;
                  } else {
                    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    var initialTheme = prefersDark ? 'dark' : 'light';
                    document.documentElement.className = initialTheme;
                    document.documentElement.dataset.theme = initialTheme;
                  }
                } catch (e) {
                  // localStorage 접근 실패 시 기본값 사용
                  document.documentElement.className = 'light';
                  document.documentElement.dataset.theme = 'light';
                }
              })();
            `,
          }}
        />
      </Head>
      <body className='antialiased'>
        <Main />
        <div id='modal-portal' />
        <NextScript />
      </body>
    </Html>
  );
}

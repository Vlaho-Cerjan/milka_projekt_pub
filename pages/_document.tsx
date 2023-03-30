import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';

import createEmotionCache from '../app/utility/createEmotionCache';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="application-name" content="Ambulanta Varela" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Ambulanta Varela" />
          <meta name="description" content="Privatna dermatovenerološka i kirurška ambulanta Varela u Pločama Poduzetnički inkubator Ploče (prizemlje)" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <meta name="msapplication-TileColor" content="#0f7553" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#fff" />

          <link rel="apple-touch-icon" href="/icons/fav_512.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/icons/fav_192.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/fav_192.png" />
          <link rel="apple-touch-icon" sizes="167x167" href="/icons/fav_192.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#0f7553" />
          <link rel="shortcut icon" href="/icons/fav_192.png" />
          <link
            rel="icon"
            sizes="192x192"
            href="/icons/fav_192.png"
          />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://dev.varela.hr" />
          <meta name="twitter:title" content="Ambulanta Varela" />
          <meta name="twitter:description" content="Privatna dermatovenerološka i kirurška ambulanta Varela u Pločama Poduzetnički inkubator Ploče (prizemlje)" />
          <meta name="twitter:image" content="https://dev.varela.hr/icons/fav_192.png" />
          <meta name="twitter:creator" content="@Cro_V" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Ambulanta Varela" />
          <meta property="og:description" content="Privatna dermatovenerološka i kirurška ambulanta Varela u Pločama Poduzetnički inkubator Ploče (prizemlje)" />
          <meta property="og:site_name" content="Ambulanta Varela" />
          <meta property="og:url" content="https://dev.varela.hr" />
          <meta property="og:image" content="https://dev.varela.hr/icons/fav_192.png" />


          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Noto+Serif:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;1,200;1,300;1,400;1,600;1,700&display=swap" rel="stylesheet" />

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  /* eslint-disable */
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) => (props: any) =>
        <App emotionCache={cache} {...props} />,
    });
  /* eslint-enable */

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style: { key: React.Key | null | undefined; ids: any[]; css: any; }) => (
    <style
      type='text/css'
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      ...emotionStyleTags,
    ],
  };
};
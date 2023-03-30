import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import createEmotionCache from '../app/utility/createEmotionCache';
import '../app/styles/globals.scss';
import CustomThemeProvider from '../app/store/customThemeContext';
import { LanguageProvider } from '../app/store/languageContext';
import { ModeProvider } from '../app/store/modeContext';
import Layout from '../app/components/layout/layout';
import { SnackbarProvider } from 'notistack';
import { Router } from 'next/router';
import ProgressBar from '@badrap/bar-of-progress';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const progress = new ProgressBar(
  {
    size: 4,
  }
)

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  Router.events.on("routeChangeStart", () => {
    progress.start();
  });
  Router.events.on("routeChangeComplete", () => {
    progress.finish();
  });
  Router.events.on("routeChangeError", () => {
    progress.finish();
  });
  return (
    <ModeProvider>
      <LanguageProvider>
        <SnackbarProvider maxSnack={5} anchorOrigin={{horizontal: "right", vertical: "top"}} variant="success" >
          <CacheProvider value={emotionCache}>
            <CustomThemeProvider>
              <Layout>
                <>
                  <CssBaseline />
                  <Component {...pageProps} />
                </>
              </Layout>
            </CustomThemeProvider>
          </CacheProvider>
        </SnackbarProvider>
      </LanguageProvider>
    </ModeProvider>
  );
};

export default MyApp;
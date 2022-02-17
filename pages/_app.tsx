import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import createEmotionCache from '../app/utility/createEmotionCache';
import '../app/styles/globals.scss';
import CustomThemeProvider from '../app/store/customThemeContext';
import { LanguageProvider } from '../app/store/languageContext';
import { ModeProvider } from '../app/store/modeContext';
import Layout from '../app/components/layout/layout';

import { StylesProvider, createGenerateClassName } from '@mui/styles';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();
const generateClassName = createGenerateClassName();

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <ModeProvider>
      <LanguageProvider>
        <StylesProvider generateClassName={generateClassName}>
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
        </StylesProvider>
      </LanguageProvider>
    </ModeProvider>
  );
};

export default MyApp;
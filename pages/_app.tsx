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

import { Workbox } from 'workbox-window';

if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  const wb = new Workbox('/service-worker.js');

  wb.addEventListener('activated', event => {
    if (!event.isUpdate) {
      // Service worker was newly installed, show a notification
      console.log('Service worker activated.');
    }
  });

  wb.addEventListener('waiting', event => {
    // Service worker update is available, show a prompt to the user
    if (confirm('A new version of the app is available, would you like to update now?')) {
      wb.addEventListener('controlling', () => {
        window.location.reload();
      });
      wb.messageSkipWaiting();
    }
  });

  wb.register();
}

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const progress = new ProgressBar(
  {
    size: 4,
  }
)

interface CustomPeriodicSyncRegistrationOptions extends RegistrationOptions {
  minInterval: number;
}

interface CustomServiceWorkerRegistration extends ServiceWorkerRegistration {
  periodicSync: {
    register(tag: string, options: CustomPeriodicSyncRegistrationOptions): Promise<void>;
    getTags(): Promise<string[]>;
    unregister(tag: string): Promise<void>;
  };
}

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const registration = (self as Window & typeof globalThis).registration as CustomServiceWorkerRegistration;
      if (registration && 'periodicSync' in registration) {
        try {
          registration.periodicSync.register('background-sync', {
            minInterval: 24 * 60 * 60 * 1000 // 24 hours
          }).then(() => {
            console.log('Periodic sync registered.');
          }).catch(error => {
            console.error('Error registering periodic sync:', error);
          });
        } catch (error) {
          console.error('Error registering periodic sync:', error);
        }
      }
    }
  }, []);

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
        <SnackbarProvider maxSnack={5} anchorOrigin={{ horizontal: "right", vertical: "top" }} variant="success" >
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
import '@/styles/globals.css'
import {
  MantineProvider,
  createTheme
} from '@mantine/core';
import Head from 'next/head';
import { YMInitializer } from 'react-yandex-metrika';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <title>STL Emporium</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1A1B1E" />
        <meta name="description" content="STL Emporium - сайт для покупки STL файлов и распечатанных миниатюр." />
        <meta name="og:description" content="STL Emporium - сайт для покупки STL файлов и распечатанных миниатюр." />
        <meta property="og:title" content="STL Emporium | STL файлы и миниатюры" key="meta-title-og" />
        <meta property="title" content="STL Emporium | STL файлы и миниатюры" key="meta-title" />
        <meta property="og:image" content="/meta-logo.png" key="meta-image-og" />
      </Head>
      <MantineProvider defaultColorScheme="dark">
        <YMInitializer accounts={[93679439]} />
        <Notifications />
        <Component {...pageProps} />
      </MantineProvider>
    </>
  )
}

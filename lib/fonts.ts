import { IBM_Plex_Sans } from 'next/font/google';
import localFont from 'next/font/local';

export const Mortend = localFont({
  src: [
    {
      path: '../public/fonts/Mortend-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Mortend-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-mortend',
  declarations: [{ prop: 'ascent-override', value: '90%' }],
});

export const IBMPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ibm-plex-sans',
});

export const AwesomeSerif = localFont({
  src: [
    {
      path: '../public/fonts/AwesomeSerifVAR-Light.woff2',
      style: 'normal',
    },
    {
      path: '../public/fonts/AwesomeSerifItalicVAR-Light.woff2',
      style: 'italic',
    },
  ],
  variable: '--font-awesome-serif',
});

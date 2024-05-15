// eslint-disable-next-line check-file/filename-naming-convention
import { MakeswiftApiHandler } from '@makeswift/runtime/next/server';

import { getConfig } from '~/lib/makeswift/config';
import { runtime } from '~/lib/makeswift/runtime';

const config = getConfig();

const handler = MakeswiftApiHandler(config.makeswift.siteApiKey, {
  runtime,
  getFonts() {
    return [
      {
        family: 'var(--font-mortend)',
        variants: [
          {
            weight: '300',
            style: 'normal',
            src: '/fonts/Mortend-Light.woff2',
          },
          {
            weight: '800',
            style: 'normal',
            src: '/fonts/Mortend-ExtraBold.woff2',
          },
        ],
      },
      {
        family: 'var(--font-mortend-outline)',
        variants: [
          {
            weight: '800',
            style: 'normal',
            src: '/fonts/Mortend-ExtraBoldOutline.woff2',
          },
        ],
      },
      {
        family: 'var(--font-ibm-plex-sans)',
        variants: [
          {
            weight: '400',
            style: 'normal',
            src: '/fonts/IBMPlexSans-Regular.woff2',
          },
          {
            weight: '700',
            style: 'normal',
            src: '/fonts/IBMPlexSans-Bold.woff2',
          },
        ],
      },
      {
        family: 'var(--font-akira)',
        variants: [
          {
            weight: '800',
            style: 'normal',
            src: '/fonts/AkiraExpanded-Bold.woff2',
          },
        ],
      },
      {
        family: 'var(--font-awesome-serif)',
        variants: [
          {
            weight: '400',
            style: 'normal',
            src: '/fonts/AwesomeSerifVAR-Light.woff2',
          },
          {
            weight: '600',
            style: 'normal',
            src: '/fonts/AwesomeSerifVAR-Light.woff2',
          },
          {
            weight: '400',
            style: 'italic',
            src: '/fonts/AwesomeSerifItalicVAR-Light.woff2',
          },
          {
            weight: '600',
            style: 'italic',
            src: '/fonts/AwesomeSerifItalicVAR-Light.woff2',
          },
        ],
      },
    ];
  },
});

export { handler as GET, handler as POST };

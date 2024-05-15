import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { DraftModeScript } from '@makeswift/runtime/next/server';

import './globals.css';

import { getStoreSettings } from '~/client/queries/get-store-settings';

import { Notifications } from './notifications';
import { Providers } from './providers';

import { Akira, AwesomeSerif, IBMPlexSans, Mortend, MortendOutline } from '~/lib/fonts';

export async function generateMetadata(): Promise<Metadata> {
  const storeSettings = await getStoreSettings();
  const title = storeSettings?.storeName ?? 'Catalyst Store';

  return {
    title: {
      template: `${title} - %s`,
      default: `${title}`,
    },
    description: 'Example store built with Catalyst',
    other: {
      platform: 'bigcommerce.catalyst',
      build_sha: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? '',
    },
  };
}

export const fetchCache = 'default-cache';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      className={clsx(
        IBMPlexSans.variable,
        Mortend.variable,
        MortendOutline.variable,
        Akira.variable,
        AwesomeSerif.variable,
        'font-sans',
      )}
      lang="en"
    >
      <head>
        <DraftModeScript />
      </head>
      <body className="flex h-screen flex-col">
        <Notifications />
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

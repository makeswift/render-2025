import { cookies } from 'next/headers';
import { NextRequest, NextResponse, NextFetchEvent } from 'next/server';
import { z } from 'zod';

import { getSessionCustomerId } from '~/auth';
import { getRoute } from '~/client/queries/get-route';

import { kv } from '../lib/kv';

import { type MiddlewareFactory } from './compose-middlewares';

type Node = Awaited<ReturnType<typeof getRoute>>;

interface RouteCache {
  node: Node;
  expiryTime: number;
}

const createRewriteUrl = (path: string, request: NextRequest) => {
  const url = new URL(path, request.url);

  url.search = request.nextUrl.search;

  return url;
};

const RouteCacheSchema = z.object({
  node: z.nullable(z.object({ __typename: z.string(), entityId: z.optional(z.number()) })),
  expiryTime: z.number(),
});

const getExistingRouteInfo = async (request: NextRequest, event: NextFetchEvent) => {
  try {
    const pathname = request.nextUrl.pathname;

    const [routeCache] = await kv.mget<RouteCache>(
      pathname,
    );

    if (routeCache && routeCache.expiryTime < Date.now()) {
      event.waitUntil(fetch(new URL(`/api/revalidate/route`, request.url), {
        method: 'POST',
        body: JSON.stringify({ pathname }),
        headers: {
          'x-internal-token': process.env.BIGCOMMERCE_CUSTOMER_IMPERSONATION_TOKEN ?? '',
        },
      }));
    }

    const parsedRoute = RouteCacheSchema.safeParse(routeCache);

    return {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      node: parsedRoute.success ? (parsedRoute.data.node as Node) : undefined,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    return {
      node: undefined,
    };
  }
};

const setKvRoute = async (request: NextRequest, node: Node) => {
  try {
    const expiryTime = Date.now() + 1000 * 60 * 30; // 30 minutes;

    await kv.set(request.nextUrl.pathname, { node, expiryTime });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

const getRouteInfo = async (request: NextRequest) => {
  try {
    let { node } = await getExistingRouteInfo(request);

    if (node === undefined) {
      const newNode = await getRoute(request.nextUrl.pathname);

      node = newNode;
      await setKvRoute(request, node);
    }

    return { node };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    return {
      node: undefined,
    };
  }
};

export const withCustomUrls: MiddlewareFactory = (next) => {
  return async (request, event) => {
    const { node } = await getRouteInfo(request);

    const customerId = await getSessionCustomerId();
    const cartId = cookies().get('cartId');
    let postfix = '';

    if (!request.nextUrl.search && !customerId && !cartId && request.method === 'GET') {
      postfix = '/static';
    }

    switch (node?.__typename) {
      case 'Brand': {
        const url = createRewriteUrl(`/brand/${node.entityId}${postfix}`, request);

        return NextResponse.rewrite(url);
      }

      case 'Category': {
        const url = createRewriteUrl(`/category/${node.entityId}${postfix}`, request);

        return NextResponse.rewrite(url);
      }

      case 'Product': {
        const url = createRewriteUrl(`/product/${node.entityId}${postfix}`, request);

        return NextResponse.rewrite(url);
      }

      case 'ContactPage':
      case 'NormalPage': {
        const { pathname } = new URL(request.url);
        const url = createRewriteUrl(`/bc-page${pathname}`, request);

        return NextResponse.rewrite(url);
      }

      default: {
        const { pathname } = new URL(request.url);

        if (pathname === '/' && postfix) {
          const url = createRewriteUrl(postfix, request);

          return NextResponse.rewrite(url);
        }

        return next(request, event);
      }
    }
  };
};

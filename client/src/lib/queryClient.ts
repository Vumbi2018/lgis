import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { Capacitor } from '@capacitor/core';

// NOTE: Replace with your computer's local IP address
const DEV_API_URL = "http://192.168.8.104:5000";
const getBaseUrl = () => Capacitor.isNativePlatform() ? DEV_API_URL : "";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

const getCouncilId = () => {
  const storedOrg = localStorage.getItem('currentOrganization');
  try {
    return storedOrg ? JSON.parse(storedOrg)?.councilId : '';
  } catch (e) {
    return '';
  }
};

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const councilId = getCouncilId();
  const fullUrl = url.startsWith('/') ? `${getBaseUrl()}${url}` : url;

  const headers: Record<string, string> = {
    'x-council-id': councilId,
  };

  if (data) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(fullUrl, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
    async ({ queryKey }) => {
      const councilId = getCouncilId();
      const path = queryKey.join("/") as string;
      const fullUrl = path.startsWith('/') ? `${getBaseUrl()}${path}` : path;
      const res = await fetch(fullUrl, {
        credentials: "include",
        headers: {
          'x-council-id': councilId,
        },
      });

      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        return null;
      }

      await throwIfResNotOk(res);
      return await res.json();
    };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

const defaultApiBaseUrl =
  typeof window === "undefined"
    ? "http://localhost:8000"
    : `${window.location.protocol}//${window.location.hostname}:8000`;

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? defaultApiBaseUrl;

type JsonBody = Record<string, unknown> | unknown[] | string | number | boolean | null;

type ApiRequestOptions = {
  method?: "GET" | "POST" | "PATCH";
  body?: JsonBody;
};

async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const headers = new Headers({ Accept: "application/json" });
  const requestInit: RequestInit = {
    method: options.method ?? "GET",
    headers,
  };

  if (options.body !== undefined) {
    headers.set("Content-Type", "application/json");
    requestInit.body = JSON.stringify(options.body);
  }

  const response = await fetch(`${apiBaseUrl}${path}`, requestInit);

  if (!response.ok) {
    let message = `API request failed: ${response.status}`;
    try {
      const payload = (await response.json()) as { detail?: unknown };
      if (typeof payload.detail === "string") {
        message = payload.detail;
      }
    } catch {
      // Keep the HTTP status message when the response is not JSON.
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export async function apiGet<T>(path: string): Promise<T> {
  return apiRequest<T>(path);
}

export async function apiPost<T>(path: string, body: JsonBody): Promise<T> {
  return apiRequest<T>(path, { method: "POST", body });
}

export async function apiPatch<T>(path: string, body?: JsonBody): Promise<T> {
  return apiRequest<T>(path, { method: "PATCH", body });
}
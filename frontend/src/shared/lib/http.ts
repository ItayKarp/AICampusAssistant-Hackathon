import { API_BASE_URL } from "@/config/constants";
import { getStoredToken } from "@/shared/utils/storage";

type RequestOptions = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  auth?: boolean;
};

export class HttpError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

function buildUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${API_BASE_URL}${path}`;
}

async function parseResponse(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

function getErrorMessage(data: unknown, fallback: string) {
  if (!data || typeof data !== "object") return fallback;

  const shape = data as Record<string, unknown>;
  if (typeof shape.detail === "string") return shape.detail;
  if (typeof shape.message === "string") return shape.message;
  if (typeof shape.error === "string") return shape.error;

  return fallback;
}

export async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const token = getStoredToken();
  const headers = new Headers(options.headers);

  if (options.body !== undefined) {
    headers.set("Content-Type", "application/json");
  }

  if (options.auth !== false && token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(buildUrl(path), {
    method: options.method ?? "GET",
    headers,
    credentials: "include",
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  const data = await parseResponse(response);
  console.log("REQUEST PATH:", buildUrl(path));
  console.log("REQUEST METHOD:", options.method ?? "GET");
  console.log("REQUEST BODY:", options.body);

  if (!response.ok) {
    throw new HttpError(
      getErrorMessage(data, `Request failed with status ${response.status}`),
      response.status,
      data,
    );
  }

  return data as T;
}

export async function requestWithFallback<T>(
  paths: string[],
  options: RequestOptions = {},
): Promise<T> {
  let lastError: unknown;

  for (const path of paths) {
    try {
      return await request<T>(path, options);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}
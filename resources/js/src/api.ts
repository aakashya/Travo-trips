export interface ApiErrorPayload {
  message?: string;
  errors?: Record<string, string[]>;
}

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(message: string, status: number, errors?: Record<string, string[]>) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

function getCsrfToken(): string | undefined {
  return document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content;
}

// Laravel regenerates the session's CSRF token on login, signup, and logout (correct, standard
// practice — it stops a session-fixation attack). This SPA never does a full page reload after
// those, so the <meta name="csrf-token"> tag baked into the original HTML goes stale the moment
// any of them happen — call this with the fresh token from that same response so the next
// request doesn't get rejected. See CustomerAuthContext.tsx's login/signup/logout.
export function setCsrfToken(token: string | undefined | null): void {
  if (!token) return;
  const metaTag = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]');
  if (metaTag) metaTag.content = token;
}

// Belt-and-suspenders for every other way the token could go stale (a long-idle tab outliving
// SESSION_LIFETIME, another tab logging in/out) — refetches the current token with no side
// effects of its own, so a genuinely expired session still fails the retry with a clear error.
async function refreshCsrfToken(): Promise<void> {
  try {
    const response = await fetch("/csrf-token", {
      credentials: "same-origin",
      headers: { Accept: "application/json" },
    });
    const data = await response.json().catch(() => ({}));
    setCsrfToken(data?.csrf_token);
  } catch {
    // Best-effort — if this fails, the retried request below fails too and surfaces normally.
  }
}

async function requestWithCsrfRetry(url: string, init: RequestInit): Promise<Response> {
  const send = () =>
    fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        ...(getCsrfToken() ? { "X-CSRF-TOKEN": getCsrfToken()! } : {}),
      },
    });

  let response = await send();
  if (response.status === 419) {
    await refreshCsrfToken();
    response = await send();
  }
  return response;
}

export async function postJson<TResponse>(url: string, payload: unknown): Promise<TResponse> {
  const response = await requestWithCsrfRetry(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: JSON.stringify(payload),
  });

  return handleJsonResponse<TResponse>(response);
}

export async function getJson<TResponse>(url: string): Promise<TResponse> {
  const response = await fetch(url, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  return handleJsonResponse<TResponse>(response);
}

export async function patchJson<TResponse>(url: string, payload: unknown): Promise<TResponse> {
  const response = await requestWithCsrfRetry(url, {
    method: "PATCH",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: JSON.stringify(payload),
  });

  return handleJsonResponse<TResponse>(response);
}

export async function deleteJson<TResponse>(url: string): Promise<TResponse> {
  const response = await requestWithCsrfRetry(url, {
    method: "DELETE",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  return handleJsonResponse<TResponse>(response);
}

async function handleJsonResponse<TResponse>(response: Response): Promise<TResponse> {
  const data = await response.json().catch(() => ({})) as ApiErrorPayload & TResponse;

  if (!response.ok) {
    const firstValidationError = data.errors
      ? Object.values(data.errors).flat()[0]
      : undefined;

    const message = response.status === 419
      ? "Your session refreshed — please try that again."
      : firstValidationError || data.message || "Unable to complete this request. Please try again.";

    throw new ApiError(message, response.status, data.errors);
  }

  return data;
}

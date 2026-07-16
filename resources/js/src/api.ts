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

export async function postJson<TResponse>(url: string, payload: unknown): Promise<TResponse> {
  const csrfToken = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content;
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      ...(csrfToken ? { "X-CSRF-TOKEN": csrfToken } : {}),
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({})) as ApiErrorPayload & TResponse;

  if (!response.ok) {
    const firstValidationError = data.errors
      ? Object.values(data.errors).flat()[0]
      : undefined;

    throw new ApiError(
      firstValidationError || data.message || "Unable to submit the form. Please try again.",
      response.status,
      data.errors,
    );
  }

  return data;
}

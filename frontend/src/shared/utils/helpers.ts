export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function safeJsonParse<T>(value: string | undefined | null): T | null {
  if (!value) return null;

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function extractTokenFromResponse(response: unknown): string | null {
  if (!response) return null;

  if (typeof response === "string") {
    return response;
  }

  if (typeof response !== "object") {
    return null;
  }

  const source = response as Record<string, unknown>;
  const directCandidates = [
    source.token,
    source.access_token,
    source.accessToken,
    source.jwt,
    source.id_token,
  ];

  for (const candidate of directCandidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate;
    }
  }

  const nestedCandidates = [
    source.data,
    source.session,
    source.user,
    source.result,
    source.payload,
  ];

  for (const nested of nestedCandidates) {
    if (nested && typeof nested === "object") {
      const token = extractTokenFromResponse(nested);
      if (token) return token;
    }
  }

  return null;
}

export function extractAiText(response: unknown): string {
  if (typeof response === "string") {
    return response;
  }

  if (!response || typeof response !== "object") {
    return "No AI response text was returned.";
  }

  const source = response as Record<string, unknown>;
  const candidates = [
    source.answer,
    source.response,
    source.message,
    source.text,
    source.content,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate;
    }
  }

  if (source.data && typeof source.data === "object") {
    return extractAiText(source.data);
  }

  return JSON.stringify(response, null, 2);
}

export function formatDateTime(value?: string | null): string {
  if (!value) return "—";

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  return parsed.toLocaleString();
}

export function getDisplayName(profile: Record<string, unknown> | null): string {
  if (!profile) return "User";

  const first =
    typeof profile.first_name === "string"
      ? profile.first_name
      : typeof profile.firstName === "string"
        ? profile.firstName
        : "";

  const last =
    typeof profile.last_name === "string"
      ? profile.last_name
      : typeof profile.lastName === "string"
        ? profile.lastName
        : "";

  const fullName = `${first} ${last}`.trim();
  return fullName || "User";
}
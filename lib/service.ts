export type ServiceKind = "waiter" | "bill";

export type ServiceRequestResult = { ok: true } | { ok: false; error: string };

/** Table number encoded in the QR link, e.g. `/?mesa=12`. */
export function getTableFromLocation(): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("mesa");
}

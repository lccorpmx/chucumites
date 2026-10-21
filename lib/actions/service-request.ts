"use server";

import type { ServiceKind, ServiceRequestResult } from "@/lib/service";

const SERVICE_KINDS: readonly ServiceKind[] = ["waiter", "bill"];
const TABLE_PATTERN = /^[\w-]{1,8}$/;

export async function requestService(
  kind: ServiceKind,
  table: string | null,
): Promise<ServiceRequestResult> {
  if (!SERVICE_KINDS.includes(kind)) {
    return { ok: false, error: "Solicitud no válida." };
  }

  const safeTable = table && TABLE_PATTERN.test(table) ? table : null;

  // Punto de integración: notificar al personal (POS, WebSocket, WhatsApp, etc.).
  console.info(`[servicio] ${kind} · mesa ${safeTable ?? "sin asignar"}`);

  return { ok: true };
}

"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

import { requestService } from "@/lib/actions/service-request";
import { getTableFromLocation, type ServiceKind } from "@/lib/service";

const COOLDOWN_MS = 30_000;

const COPY: Record<ServiceKind, { title: string; description: string }> = {
  waiter: {
    title: "¡Listo! Un mesero va en camino",
    description: "Te atenderemos en un momento.",
  },
  bill: {
    title: "Tu cuenta va en camino",
    description: "Ten a la mano tu método de pago.",
  },
};

export interface ServiceRequest {
  request: () => void;
  isPending: boolean;
  /** True for a while after a successful request, to avoid duplicate calls. */
  isRequested: boolean;
}

export function useServiceRequest(kind: ServiceKind): ServiceRequest {
  const [isPending, startTransition] = useTransition();
  const [isRequested, setIsRequested] = useState(false);

  useEffect(() => {
    if (!isRequested) return;
    const timeout = window.setTimeout(() => setIsRequested(false), COOLDOWN_MS);
    return () => window.clearTimeout(timeout);
  }, [isRequested]);

  const request = useCallback(() => {
    if (isPending || isRequested) return;

    startTransition(async () => {
      const table = getTableFromLocation();
      try {
        const result = await requestService(kind, table);
        if (!result.ok) {
          toast.error(result.error);
          return;
        }
        const { title, description } = COPY[kind];
        toast.success(table ? `${title} a la mesa ${table}` : title, { description });
        setIsRequested(true);
      } catch {
        toast.error("No pudimos enviar tu solicitud", {
          description: "Revisa tu conexión e inténtalo de nuevo.",
        });
      }
    });
  }, [isPending, isRequested, kind]);

  return { request, isPending, isRequested };
}

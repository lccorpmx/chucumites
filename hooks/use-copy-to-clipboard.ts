"use client";

import { useCallback, useEffect, useState } from "react";

export function useCopyToClipboard(resetAfterMs = 2000) {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  useEffect(() => {
    if (copiedValue === null) return;
    const timeout = window.setTimeout(() => setCopiedValue(null), resetAfterMs);
    return () => window.clearTimeout(timeout);
  }, [copiedValue, resetAfterMs]);

  const copy = useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedValue(value);
      return true;
    } catch {
      return false;
    }
  }, []);

  return { copiedValue, copy };
}

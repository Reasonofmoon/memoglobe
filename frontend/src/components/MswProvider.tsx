"use client";

import { useEffect } from "react";

export default function MswProvider() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    let active = true;
    (async () => {
      const { worker } = await import("../../mocks/browser");
      if (!active) return;
      await worker.start({
        onUnhandledRequest: "bypass",
      });
    })();

    return () => {
      active = false;
    };
  }, []);

  return null;
}

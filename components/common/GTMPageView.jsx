"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const GTM_ID = "GTM-M4B7GLV"; // Replace with your GTM ID

export default function GTMPageView() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "page_view",
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}

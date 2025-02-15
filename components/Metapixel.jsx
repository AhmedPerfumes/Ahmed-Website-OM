"use client";
import React, { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const FacebookPixelEvents = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init("588934933663941"); // Replace with your Facebook Pixel ID
        ReactPixel.pageView();
      });
  }, [pathname, searchParams]);

  return null;
};

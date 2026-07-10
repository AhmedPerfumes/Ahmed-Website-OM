"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useContextElement } from "@/context/Context";

export const FacebookPixelEvents = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { cartProducts, totalPrice } = useContextElement();
    const [cartData, setCartData] = useState({ items: [], total: 0 });

    useEffect(() => {
        setCartData({
            items: (cartProducts || []).map((item) => ({
                id: item.product_id?.toString(),
            })),
            total: totalPrice || 0,
        });
    }, [cartProducts, totalPrice]);

    useEffect(() => {
        const loadFacebookPixel = () => {
            if (!window.fbq) {
                (function (f, b, e, v, n, t, s) {
                    if (f.fbq) return;
                    n = f.fbq = function () {
                        n.callMethod
                            ? n.callMethod.apply(n, arguments)
                            : n.queue.push(arguments);
                    };
                    if (!f._fbq) f._fbq = n;
                    n.push = n;
                    n.loaded = !0;
                    n.version = "2.0";
                    n.queue = [];

                    f.fbq("set", "autoConfig", false, "588934933663941");
                    f.fbq("init", "588934933663941");
                    f.fbq("track", "PageView");

                    t = b.createElement(e);
                    t.async = !0;
                    t.src = v;
                    s = b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t, s);
                })(
                    window,
                    document,
                    "script",
                    "https://connect.facebook.net/en_US/fbevents.js"
                );
            }
        };

        loadFacebookPixel();

        if (typeof window.fbq === "function") {
            window.fbq("track", "PageView");
        }

        if (pathname.includes("shop-checkout")) {
            if (cartData.items.length > 0 && !sessionStorage.getItem("__initCheckoutTracked")) {
                sessionStorage.setItem("__initCheckoutTracked", "1");
                window.fbq?.("track", "InitiateCheckout", {
                    content_ids: cartData.items.map((item) => item.id),
                    content_type: "product",
                    value: cartData.total,
                    currency: "OMR",
                });
            }
        } else {
            sessionStorage.removeItem("__initCheckoutTracked");
        }
    }, [pathname, searchParams, cartData]);

    return null;
};

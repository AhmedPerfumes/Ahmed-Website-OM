"use client";
import React from "react";
import { useContextElement } from "@/context/Context";
import { useMenu } from "@/context/MenuContext";
import { useLocale } from "next-intl";

export default function FreeShippingProgress({ variant = "drawer", className = "" }) {
  const { totalPrice = 0, freeShippingFlag, cartProducts = [] } = useContextElement();
  const { currency, freeShippingThreshold: menuThreshold, shippingServiceCharges } = useMenu();
  const locale = useLocale();
  const isAr = locale === "ar";

  // Determine free shipping threshold (default 10.000)
  const threshold =
    menuThreshold != null
      ? Number(menuThreshold)
      : Array.isArray(shippingServiceCharges) && shippingServiceCharges[2]?.price != null
      ? parseFloat(shippingServiceCharges[2].price)
      : 10.0;

  const currentTotal = Number(totalPrice) || 0;
  const isQualified =
    freeShippingFlag ||
    (cartProducts.length > 0 && Number(currentTotal.toFixed(3)) >= threshold);

  const remaining = Math.max(0, threshold - currentTotal);
  const progressPercentage = isQualified
    ? 100
    : Math.min(100, Math.max(0, (currentTotal / threshold) * 100));

  const decimals =
    currency?.decimals != null ? Number(currency.decimals) : 3;
  const symbol =
    currency?.symbol || (typeof currency === "string" ? currency : "ر.ع");

  const formattedRemaining = remaining.toFixed(decimals);
  const formattedThreshold = threshold.toFixed(decimals);

  // If cart is empty, don't show the progress bar
  if (!cartProducts || cartProducts.length === 0) {
    return null;
  }

  const isDrawer = variant === "drawer";

  return (
    <div
      className={`free-shipping-progress-card ${className}`}
      style={{
        backgroundColor: isQualified ? "#F9FBF7" : "#FCFBF8",
        border: `1px solid ${isQualified ? "#86EFAC" : "#EAE3D2"}`,
        borderRadius: isDrawer ? "8px" : "12px",
        padding: isDrawer ? "12px 14px" : "16px 20px",
        direction: isAr ? "rtl" : "ltr",
        textAlign: isAr ? "right" : "left",
        transition: "all 0.4s ease-in-out",
        boxShadow: isQualified
          ? "0 2px 10px rgba(34, 197, 94, 0.08)"
          : "0 2px 8px rgba(212, 175, 55, 0.06)",
      }}
    >
      {/* Header text with icon */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "10px",
          fontSize: isDrawer ? "13px" : "14px",
          lineHeight: "1.4",
          color: "#2C2C2C",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: isDrawer ? "24px" : "28px",
            height: isDrawer ? "24px" : "28px",
            borderRadius: "50%",
            backgroundColor: isQualified ? "#DCFCE7" : "#F8F1DD",
            color: isQualified ? "#16A34A" : "#B88E3E",
            flexShrink: 0,
            fontSize: isDrawer ? "13px" : "15px",
          }}
        >
          {isQualified ? "✓" : "🚚"}
        </span>

        <div style={{ flex: 1 }}>
          {isQualified ? (
            <div>
              <strong style={{ color: "#15803D", fontWeight: "600" }}>
                {isAr ? "تهانينا! لقد حصلت على شحن مجاني!" : "Congratulations! You unlocked FREE SHIPPING!"}
              </strong>
            </div>
          ) : (
            <div>
              {isAr ? (
                <>
                  أضف منتجات بقيمة{" "}
                  <strong style={{ color: "#B88E3E", fontWeight: "700" }}>
                    {formattedRemaining} {symbol}
                  </strong>{" "}
                  إضافية للحصول على{" "}
                  <strong style={{ color: "#2C2C2C", fontWeight: "600" }}>
                    شحن مجاني!
                  </strong>
                </>
              ) : (
                <>
                  Add{" "}
                  <strong style={{ color: "#B88E3E", fontWeight: "700" }}>
                    {formattedRemaining} {symbol}
                  </strong>{" "}
                  more to get{" "}
                  <strong style={{ color: "#2C2C2C", fontWeight: "600" }}>
                    FREE SHIPPING!
                  </strong>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Progress Track */}
      <div
        style={{
          position: "relative",
          height: isDrawer ? "7px" : "8px",
          backgroundColor: "#EDE8DB",
          borderRadius: "999px",
          overflow: "hidden",
        }}
        role="progressbar"
        aria-valuenow={Math.round(progressPercentage)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          style={{
            height: "100%",
            width: `${progressPercentage}%`,
            background: isQualified
              ? "linear-gradient(90deg, #22C55E 0%, #16A34A 100%)"
              : "linear-gradient(90deg, #E5C158 0%, #D4AF37 50%, #B88E3E 100%)",
            borderRadius: "999px",
            transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </div>

      {/* Subtle milestone footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "6px",
          fontSize: "11px",
          color: "#7E7A73",
        }}
      >
        <span>
          {isAr
            ? `الحالي: ${currentTotal.toFixed(decimals)} ${symbol}`
            : `Current: ${currentTotal.toFixed(decimals)} ${symbol}`}
        </span>
        <span style={{ fontWeight: isQualified ? "600" : "500", color: isQualified ? "#15803D" : "#7E7A73" }}>
          {isAr
            ? `الهدف: ${formattedThreshold} ${symbol} (شحن مجاني)`
            : `Goal: ${formattedThreshold} ${symbol} (Free)`}
        </span>
      </div>
    </div>
  );
}

"use client";
import React from "react";
import Image from "next/image";

const norm = (s = "") => String(s).trim().toLowerCase();

export default function LabelIcon({ name, size = 56, title, icon }) {
  const key = norm(name);

  if (key.includes("hot") && key.includes("sell")) return <BestSeller size={size} title={title || "Best Seller"} icon={icon} />;
  if (key === "new" || key.includes("new arrival")) return <NewRibbon size={size} title={title || "New"} icon={icon} />;
  if (key.includes("buy 1") || key.includes("buy one") || key.includes("b1g1") || key.includes("get 1"))
    return <Bogo size={size} title={title || "Buy 1 Get 1"} icon={icon} />;

  return <TagGeneric size={size} title={title || name || "Label"} icon={icon} />;
}

/* ---- icons ---- */
function BestSeller({ size, title, icon }) {
  return (
    <Image
        loading="lazy"
        src={`${process.env.NEXT_PUBLIC_API_URL}storage/${icon}`}
        width={40}
        height={40}
        alt="Pattern"
    />
  );
}

function NewRibbon({ size, title, icon }) {
  const w = size, h = Math.round(size * 0.56);
  return (
    <Image
        loading="lazy"
        src={`${process.env.NEXT_PUBLIC_API_URL}storage/${icon}`}
        width={40}
        height={40}
        alt="Pattern"
    />
  );
}

function Bogo({ size, title, icon }) {
  const star = "48,4 56,28 84,28 60,44 68,70 48,54 28,70 36,44 12,28 40,28";
  return (
    <Image
        loading="lazy"
        src={`${process.env.NEXT_PUBLIC_API_URL}storage/${icon}`}
        width={40}
        height={40}
        alt="Pattern"
    />
  );
}

function TagGeneric({ size, title, icon }) {
  return (
    <Image
        loading="lazy"
        src={`${process.env.NEXT_PUBLIC_API_URL}storage/${icon}`}
        width={40}
        height={40}
        alt="Pattern"
    />
  );
}

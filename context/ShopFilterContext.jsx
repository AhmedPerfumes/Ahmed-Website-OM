// context/ShopFilterContext.jsx
"use client";

import { createContext, useContext, useState } from "react";

const ShopFilterContext = createContext();

export const useShopFilter = () => useContext(ShopFilterContext);

export function ShopFilterProvider({ children }) {
  const [rawProducts, setRawProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [stockAvailability, setStockAvailability] = useState("all");
  const [promotionalOnly, setPromotionalOnly] = useState(false);

  // New: label/tag selections
  const [selectedLabels, setSelectedLabels] = useState([]); // array of label_name strings
  const [selectedTags, setSelectedTags] = useState([]);     // array of tag strings

  return (
    <ShopFilterContext.Provider
      value={{
        rawProducts,
        setRawProducts,
        priceRange,
        setPriceRange,
        stockAvailability,
        setStockAvailability,
        promotionalOnly,
        setPromotionalOnly,
        selectedLabels,
        setSelectedLabels,
        selectedTags,
        setSelectedTags,
      }}
    >
      {children}
    </ShopFilterContext.Provider>
  );
}

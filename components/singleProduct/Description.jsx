import React from "react";
import { useLocale, useTranslations } from "next-intl";

export default function Description({ product, product_name }) {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === "ar";

  function cleanProductName(productName) {
    if (!productName) return "";
    const dynamicKey = productName.replace(/[^a-zA-Z0-9\s]/g, '') + ' Content';
    const wordsToRemove = ['&', ' &', '& ', ' & ', 'amp', ' amp', 'amp ', ' amp ', ';', ' ;', '; ', ' ; '];
    let cleanString = dynamicKey;
    wordsToRemove.forEach(word => {
      const regex = new RegExp(word, 'gi');
      cleanString = cleanString.replace(regex, '');
    });
    return cleanString.replace(/\s+/g, ' ').trim();
  }

  const getContent = () => {
    if (isAr) {
      if (product?.content_ar) return product.content_ar;
      try {
        return t.raw(cleanProductName(product_name));
      } catch (e) {
        return product?.content || "";
      }
    }
    if (product?.content) return product.content;
    try {
      return t.raw(cleanProductName(product_name));
    } catch (e) {
      return "";
    }
  };

  return (
    <div className="product-single__description">
      <div dangerouslySetInnerHTML={{ __html: getContent() }}></div>
    </div>
  );
}

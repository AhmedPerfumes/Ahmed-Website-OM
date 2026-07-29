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
    let translatedContent = "";
    try {
      if (product_name) {
        translatedContent = t.raw(cleanProductName(product_name));
      }
    } catch (e) {
      translatedContent = "";
    }

    if (isAr) {
      if (product?.content_ar && product.content_ar !== "null") return product.content_ar;
      if (product?.content && product.content !== "null") return product.content;
      if (translatedContent && translatedContent !== "null") return translatedContent;
      return "";
    } else {
      if (product?.content && product.content !== "null") return product.content;
      if (translatedContent && translatedContent !== "null") return translatedContent;
      return "";
    }
  };

  return (
    <div className="product-single__description">
      <div dangerouslySetInnerHTML={{ __html: getContent() }}></div>
    </div>
  );
}

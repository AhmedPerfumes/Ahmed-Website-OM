'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [categoriesSubCategories, setCategoriesSubCategories] = useState([]);
  const [vatTax, setVatTax] = useState(0.00);
  const [shippingServiceCharges, setshippingServiceCharges] = useState([]);
  const [currency, setCurrency] = useState({ symbol: "ر.ع", decimals: 3 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [homeSliders, setHomeSliders] = useState([]);
  const [homeMobileSliders, setHomeMobileSliders] = useState([]);

  useEffect(() => {
    async function getCategoriesSubCategories() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/productCategoriesTemp`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to submit the data. Please try again.");
        }

        const data = await response.json();
        if (data && data.productCategories?.length > 0) {
          setError(null);
          setCategoriesSubCategories(data.productCategories);
        } else {
          setCategoriesSubCategories(null);
          setError(data);
        }

        if (data && data.tax) {
          setError(null);
          setVatTax(data.tax);
        } else {
          setVatTax(null);
          setError(data);
        }
        if (data && data.home_sliders) {
          setError(null);
          setHomeSliders(data.home_sliders);
        } else {
          setHomeSliders(null);
          setError(data);
        }

        if (data && data.home_mobile_sliders) {
          setError(null);
          setHomeMobileSliders(data.home_mobile_sliders);
        } else {
          setHomeMobileSliders(null);
          setError(data);
        }

        if (data && data.shipping_service_charges) {
          setError(null);
          setshippingServiceCharges(data.shipping_service_charges);
        } else {
          setshippingServiceCharges(null);
          setError(data);
        }

        if (data && data.currency) {
          setError(null);
          setCurrency(data.currency);
        } else {
          setCurrency(null);
          setError(data);
        }
        // console.log(data);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
        console.error(error);
      } finally {
        setError(null);
        setIsLoading(false);
      }
    }

    getCategoriesSubCategories();
  }, []);

  const freeShippingThreshold =
    Array.isArray(shippingServiceCharges) &&
      shippingServiceCharges[2]?.price != null
      ? parseFloat(shippingServiceCharges[2].price)
      : 10.0;

  const shippingCost =
    Array.isArray(shippingServiceCharges) &&
      shippingServiceCharges[0]?.price != null
      ? parseFloat(shippingServiceCharges[0].price)
      : 2.1;

  return (
    <MenuContext.Provider
      value={{
        categoriesSubCategories,
        isLoading,
        error,
        vatTax,
        shippingServiceCharges,
        freeShippingThreshold,
        shippingCost,
        currency,
        homeSliders,
        homeMobileSliders,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}
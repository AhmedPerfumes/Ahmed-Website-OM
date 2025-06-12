import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useContextElement } from '@/context/Context';
import he from 'he';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Discount } from '@mui/icons-material';

const swiperOptions = {
  autoplay: false,
  slidesPerView: 6,
  slidesPerGroup: 4,
  effect: "none",
  // loop: true,
  modules: [Pagination, Navigation],
  pagination: {
    el: ".products-pagination",
    type: "bullets",
    clickable: true,
  },
  navigation: {
    nextEl: ".ssn11",
    prevEl: ".ssp11",
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      // spaceBetween: 14,
    },
    768: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      // spaceBetween: 24,
    },
    992: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      // spaceBetween: 30,
    },
  },
};

// Sample gift products (replace with CMS or allProducts data)
const thresholds = [
  // {
  //   min: 25,
  //   max: 50,
  //   gifts: [
  //     {
  //       product_id: 141,
  //       product_name: 'Bakhoor Bushra 10 Tabs',
  //       price: "0",
  //       image: 'newbakhoor/bakhoor-bushra-10tab.jpg',
  //       is_gift: true,
  //       discount: null
  //     },
  //     {
  //       product_id: 79,
  //       product_name: 'Bidun Esam Hair Mist',
  //       price: "0",
  //       image: 'hairmistnew/bidun-esam-hair-mist.jpg',
  //       is_gift: true,
  //       discount: null
  //     },
  //     {
  //       product_id: 161,
  //       product_name: "OUD MA'ATTAR MAJALIS (OMANI)",
  //       price: "0",
  //       image: 'newbakhoor/oud-ma-atar-majalis-botle-3-tl-1.jpg',
  //       is_gift: true,
  //       discount: null
  //     },
  //     {
  //       product_id: 169,
  //       product_name: "OUD MA'ATTAR SUBAAT",
  //       price: "0",
  //       image: 'newbakhoor/oud-subaat-1.jpg',
  //       is_gift: true,
  //       discount: null
  //     },
  //     {
  //       product_id: 162,
  //       product_name: "OUD MA'ATTAR TAYYEB",
  //       price: "0",
  //       image: 'newbakhoor/oud-tayyahb-1.jpg',
  //       is_gift: true,
  //       discount: null
  //     },
  //   ],
  // },
  {
    min: 30,
   
    gifts: [
      {
        product_id: 46,
        product_name: 'Leather',
        price: "0",
        image: 'epdnew/leather.jpg',
        is_gift: true,
        discount: null,
        coupon: []
      },
      {
        product_id: 55,
        product_name: 'Oud Classic',
        price: "0",
        image: 'epdnew/oud-classic.jpg',
        is_gift: true,
        discount: null,
        coupon: []
      },
    
      {
        product_id: 50,
        product_name: 'Musk Ahmed',
        price: "0",
        image: 'epdnew/musk-ahmed.jpg',
        is_gift: true,
        discount: null,
        coupon: []
      },
      {
        product_id: 63,
        product_name: 'Saif',
        price: "0",
        image: 'epdnew/saif.jpg',
        is_gift: true,
        discount: null,
        coupon: []
      },
   
      {
        product_id: 35,
        product_name: 'Zuraique',
        price: "0",
        image: 'epdnew/zuraique.jpg',
        is_gift: true,
        discount: null,
        coupon: []
      },
      {
        product_id: 192,
        product_name: 'Sage',
        price: "0",
        image: 'epdnew/sage-1.jpg',
        is_gift: true,
        discount: null,
        coupon: []
      },
      {
        product_id: 248,
        product_name: 'Tanuf',
        price: "0",
        image: 'epdnew/tanuf-1.jpg',
        is_gift: true,
        discount: null,
        coupon: []
      },
      {
        product_id: 66,
        product_name: 'Sheukh',
        price: "0",
        image: 'epdnew/sheukh.jpg',
        is_gift: true,
        discount: null,
        coupon: []
      },
    ],
  },
  // {
  //   min: 100,
  //   max: 200,
  //   gifts: [
  //     {
  //       product_id: 70,
  //       product_name: 'Supreme',
  //       price: "0",
  //       image: 'epdnew/supreme.jpg',
  //       is_gift: true,
  //       discount: null
  //     },
  //     {
  //       product_id: 53,
  //       product_name: 'Oud Afghano',
  //       price: "0",
  //       image: 'epdnew/oud-afghano.jpg',
  //       is_gift: true,
  //       discount: null
  //     },
  //     {
  //       product_id: 154,
  //       product_name: 'Bakhoor Asari',
  //       price: "0",
  //       image: 'bakhoor/bakhoor-asari.jpg',
  //       is_gift: true,
  //       discount: null
  //     },
  //     {
  //       product_id: 298,
  //       product_name: 'Bakhoor Rasiyat',
  //       price: "0",
  //       image: 'newbakhoor/bakhoor-rasiyaat-1.jpg',
  //       is_gift: true,
  //       discount: null
  //     },
  //   ],
  // },
  // {
  //   min: 200,
  //   max: 300,
  //   gifts: [
  //     {
  //       product_id: 186,
  //       product_name: 'Dehn Al Oud Saad',
  //       price: "0",
  //       image: 'epdnew/dehn-al-oud-saad.jpg',
  //       is_gift: true,
  //       discount: null
  //     },
  //     {
  //       product_id: 29,
  //       product_name: 'Aayah',
  //       price: "0",
  //       image: 'epdnew/aayah.jpg',
  //       is_gift: true,
  //       discount: null
  //     },
  //     {
  //       product_id: 173,
  //       product_name: 'OUD KIFLAIN',
  //       price: "0",
  //       image: 'newbakhoor/oud-kiflain-1.jpg',
  //       is_gift: true,
  //       discount: null
  //     },
  //     {
  //       product_id: 164,
  //       product_name: "OUD MA'ATTAR MALIKI 3 TOLA",
  //       price: "0",
  //       image: 'newbakhoor/oud-ma-attar-maliki-bottle-3-tl-1.jpg',
  //       is_gift: true,
  //       discount: null
  //     },
  //   ],
  // },
  // {
  //   min: 300,
  //   gifts: [
  //     {
  //       product_id: 60,
  //       product_name: 'Dehn Al Oud Qadeem',
  //       price: "0",
  //       image: 'epdnew/qadeem.jpg',
  //       is_gift: true,
  //       discount: null
  //     },
  //     {
  //       product_id: 85,
  //       product_name: 'Dehn Al Oud Maliki Qadeem',
  //       price: "0",
  //       image: 'dehn-al-oud/dehn-al-oud-maliki-qadeem-3.jpg',
  //       is_gift: true,
  //       discount: null
  //     },
  //     {
  //       product_id: 43,
  //       product_name: 'Ignite Rose',
  //       price: "0",
  //       image: 'epdnew/ignite-rose.jpg',
  //       is_gift: true,
  //       discount: null
  //     },
  //   ],
  // },
];

const FreeGiftFeature = () => {
  const { cartProducts, totalPrice, addProductToCart, setCartProducts, removeGiftFromCart } = useContextElement();
  const [selectedGift, setSelectedGift] = useState(null);

  // Filter out "Collections" products
  const nonCollectionProducts = cartProducts.filter(
    (item) => item.category_name?.toLowerCase() !== "collections" &&
    item.discount === null
  );

  // Total price of non-Collections products
  const nonCollectionTotalPrice = nonCollectionProducts.reduce(
    (acc, item) => acc + (parseFloat(item.price) * item.quantity),
    0
  );

  // Debug context and rendering
  // useEffect(() => {
  //   console.log('FreeGiftFeature mounted', { totalPrice, cartProductsLength: cartProducts.length, hasCollectionCategory });
  //   console.log('Context methods:', { addProductToCart, removeGiftFromCart });
  // }, []);

  // Active threshold based on non-Collection product price
  const activeThreshold = thresholds.find(
    (threshold) =>
      nonCollectionTotalPrice >= threshold.min &&
      (!threshold.max || nonCollectionTotalPrice <= threshold.max)
  );

  useEffect(() => {
    console.log("Mounted with:", {
      totalPrice,
      nonCollectionTotalPrice,
      cartProducts,
      nonCollectionProducts,
    });
  }, []);

  // Log active threshold
  useEffect(() => {
    console.log('Active threshold:', activeThreshold);
  }, [activeThreshold]);

  // Handle gift selection with error handling
  const handleGiftSelect = (product) => {
    try {
      console.log('Gift selected:', product.product_id, product.product_name);
      removeGiftFromCart();
      addProductToCart({ ...product, quantity: 1 });
      setSelectedGift(product.product_id);
      console.log('Cart updated, selectedGift set to:', product.product_id);
      console.log('Updated cartProducts:', cartProducts);
    } catch (error) {
      console.error('Error in handleGiftSelect:', error);
    }
  };

  // Synchronize selectedGift with cartProducts
  useEffect(() => {
    console.log('Checking selectedGift:', selectedGift, 'Cart products:', cartProducts);
    if (!activeThreshold && selectedGift) {
      console.log('No active threshold, removing gift and clearing selectedGift');
      removeGiftFromCart();
      setSelectedGift(null);
    } else if (selectedGift) {
      // Check if the selected gift is still in the cart
      const giftInCart = cartProducts.find(
        (item) => item.is_gift && item.product_id === selectedGift
      );
      if (!giftInCart) {
        console.log('Selected gift not in cart, clearing selectedGift');
        setSelectedGift(null);
      } else if (activeThreshold) {
        // Verify the gift is valid for the current threshold
        const isValidGift = activeThreshold.gifts.some(
          (gift) => gift.product_id === selectedGift
        );
        if (!isValidGift) {
          console.log('Invalid gift for threshold, removing gift and clearing selectedGift');
          removeGiftFromCart();
          setSelectedGift(null);
        }
      }
    }
  }, [activeThreshold, cartProducts, selectedGift, removeGiftFromCart]);

  // Calculate next threshold message
  const getNextThresholdMessage = () => {
    if (activeThreshold) {
      return null;
    }
    const nextThreshold = thresholds.find(
      (threshold) => nonCollectionTotalPrice < threshold.min
    );
    if (nextThreshold) {
      return <span className='t-subtitle' style={{ color:'#c00000',fontSize: '18px', lineHeight: '1.5rem',textAlign: 'center' }}>Spend OMR {(nextThreshold.min - nonCollectionTotalPrice).toFixed(3)} more to unlock a free gift!</span>;
    }
    return 'Add more items to unlock a free gift!';
  };

  // Hide Free Gift if all products are from Collections
  if (nonCollectionProducts.length === 0) return null;

  return (
    <div className="my-4 px-4">
      {activeThreshold ? (
        <div>
          <h4 className="font-bold mb-4">
            <span className='t-subtitle' style={{ color:'#c00000',fontSize: '18px', lineHeight: '1.5rem',textAlign: 'center' }}>
            You've Earned a Free Gift – Choose Yours Below!
            </span>
          </h4>
          <Swiper
            {...swiperOptions}
            className="swiper-container js-swiper-slider"
            data-settings=""
          >
            {activeThreshold.gifts.map((product, i) => {
              console.log('Rendering gift:', product.product_id, 'selectedGift:', selectedGift);
              return (
                <SwiperSlide key={i} className="swiper-slide product-card">
                  <div className="pc__img-wrapper">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}storage/${product.image}`}
                      alt={he.decode(product.product_name)}
                      width="330"
                      height="400"
                      className="pc__img"
                      loading="lazy"
                    />
                    <button
                      onClick={() => {
                        console.log('Button clicked for:', product.product_id);
                        handleGiftSelect(product);
                      }}
                      className={`pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium js-add-cart js-open-aside ${
                        selectedGift === product.product_id
                          ? 'bg-blue-500'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                      disabled={selectedGift === product.product_id}
                      aria-label={`Select ${he.decode(product.product_name)} as free gift`}
                      key={product.product_id}
                    >
                      {selectedGift === product.product_id ? 'Already Selected' : 'Select Gift'}
                    </button>
                  </div>
                  <div className="pc__info position-relative">
                    <h3 className="pc__title">{he.decode(product.product_name)}</h3>
                    <p className="pc__category">Free!</p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="products-carousel__prev ssp11 position-absolute">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 12H2M2 12L8 6M2 12L8 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="products-carousel__next ssn11 position-absolute">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 12H22M22 12L16 6M22 12L16 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="products-pagination mt-4 text-center js-products-pagination"></div>
        </div>
      ) : (
        <p className="text-lg">{getNextThresholdMessage()}</p>
      )}
    </div>
  );
};

export default FreeGiftFeature;
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useContextElement } from "@/context/Context";
import Image from "next/image";
import he from "he";
import { useLocale, useTranslations } from "next-intl";
import { useMenu } from "@/context/MenuContext";
import Hero from "@/components/homes/home-8/Hero";
import Hero2 from "@/components/homes/home-8/Hero2";
import "./HomePage.css";

export default function Shop1({ search }) {
  const { currency } = useMenu();
  const locale = useLocale();
  const { addProductToCart, isAddedToCartProducts } = useContextElement();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 2000;
  const [hasMore, setHasMore] = useState(true);
  const offset = 2500;
  const [filteredProducts, setFilteredProducts] = useState([]);
  const t = useTranslations();

  const categories = [
    { name: "Perfumes", slug: "perfumes" },
    { name: "Concentrated Parfum", slug: "concentrated-parfum" },
    { name: "Dakhoon", slug: "dakhoon" },
    { name: "Gift Sets", slug: "gift-sets" },
    { name: "Gel", slug: "gel" },
    { name: "Hair Mist", slug: "hair-mist" },
    { name: "Collections", slug: "collections" },
  ];

  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const fetchData = async (page) => {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/allProducts`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            page: page,
            limit: limit,
            search: search ? search.split("-").join(" ") : "",
          }),
        }
      );
      const newData = await response.json();
      const { data } = newData;
      if (data.length === 0) {
        setHasMore(false);
      }
      setProducts((prev) => [...prev, ...data]);
      setFilteredProducts((prev) => [...prev, ...data]);
      setLoading(false);
    };

    fetchData(page);
  }, [page, limit, search]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + offset <
          document.documentElement.offsetHeight ||
        loading ||
        !hasMore
      )
        return;
      setPage((prev) => prev + 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  function removeSpecialCharactersAndAmp(str) {
    let cleanedStr = str.replace(/&amp;/g, "");
    cleanedStr = cleanedStr.replace(/[^\w\s-]/g, "");
    cleanedStr = cleanedStr.replace(/\s+/g, " ").trim();
    return cleanedStr;
  }

  const isSubcategory = (category, subcategory) => {
    if (subcategory != null) {
      return removeSpecialCharactersAndAmp(subcategory.subcategory_name)
        .split(" ")
        .join("-")
        .toLowerCase();
    } else {
      if (removeSpecialCharactersAndAmp(category) == "gift-sets") return "gift-sets";
      if (removeSpecialCharactersAndAmp(category) == "hair-mist") return "hair-mist";
      return "extrait-de-parfum";
    }
  };

  const discPrice = (elm) => {
    const currentUTC = new Date();
    const currentGST = new Date(currentUTC.getTime() + 4 * 60 * 60 * 1000);
    const current_date_time = currentGST.toISOString().slice(0, 19).replace("T", " ");
    if (elm?.discount) {
      if (
        new Date(current_date_time) >= new Date(elm.discount.start_date) &&
        new Date(current_date_time) <= new Date(elm.discount.end_date)
      ) {
        return (
          <>
            <span className="money price price-old">
              {elm?.price}
              {currency.symbol}
            </span>{" "}
            <span className="money price price-sale">
              {(elm.price - (elm.price / 100) * elm.discount.value).toFixed(currency.decimals)}
              {currency.symbol}
            </span>
          </>
        );
      }
    } else if (elm?.sale_price) {
      return (
        <>
          <span className="money price price-old">
            {elm?.price}
            {currency.symbol}
          </span>{" "}
          <span className="money price price-sale">
            {(elm.price - (elm.price / 100) * elm.sale_price).toFixed(currency.decimals)}
            {currency.symbol}
          </span>
        </>
      );
    }
    return (
      <span className="money price">
        {elm?.price}
        {currency.symbol}
      </span>
    );
  };

  const renderProductCard = (elm, i) => (
    <div key={i} className="product-card-wrapper">
      <div className="product-card mb-3 mb-md-4 mb-xxl-5">
        <div className="pc__img-wrapper">
                      <Swiper
                    className="swiper swiper-container swiper-initialized swiper-horizontal swiper-backface-hidden background-img js-swiper-slider"
                    slidesPerView={1}
                    modules={[Navigation]}
                    navigation={{
                      prevEl: ".prev" + i,
                      nextEl: ".next" + i,
                    }}
                  >
                    {/* {elm?.images && JSON.parse(elm.images).map((image, ind) => ( */}
                      <SwiperSlide key={i} className="swiper-slide">
                        <Link href={`/${locale}/shop/${removeSpecialCharactersAndAmp(elm.category_name).split(' ').join('-').toLowerCase()}/${isSubcategory(elm.category_name.split(' ').join('-').toLowerCase(), elm.subcategory)}/${removeSpecialCharactersAndAmp(elm.product_name).split(' ').join('-').toLowerCase()}`}>
                          {elm?.images &&
                          // JSON.parse(elm.images).map((image, ind) => (
                              <>
                                {JSON.parse(elm.images)[0] && <Image
                                  loading="lazy"
                                  src={`${process.env.NEXT_PUBLIC_API_URL}storage/${JSON.parse(elm.images)[0]}`}
                                  width="330"
                                  height="400"
                                  alt="img"
                                  className="pc__img"
                                />
                                }

                                {JSON.parse(elm.images)[1] && <Image
                                  loading="lazy"
                                  src={`${process.env.NEXT_PUBLIC_API_URL}storage/${JSON.parse(elm.images)[1]}`}
                                  width="330"
                                  height="400"
                                  alt="img"
                                  className="pc__img pc__img-second"
                                />
                                }
                              </>
                          // ))
                          }
                        </Link>
                        {elm?.label_name && (
                          <div style={{ backgroundColor: elm.label_color }} className="product-label text-uppercase text-white top-0 left-0 mt-2 mx-2">
                            { elm?.label_name }
                          </div>
                        )}
                        {elm.product_qty <= 0 ? (
                          <div style={{ backgroundColor: '#dc3545' }} className="product-label text-uppercase text-white top-0 left-0 mt-2 mx-2">
                            Out Of Stock
                          </div>
                        ) : (
                          elm.discount && (
                            <div style={{ backgroundColor: '#198754' }} className="product-label text-uppercase text-white top-0 left-0 mt-2 mx-2">
                              Sale {elm.discount.value}%
                            </div>
                          )
                        )}
                      </SwiperSlide>
                    {/* ))} */}

                    <span
                      className={`cursor-pointer pc__img-prev ${"prev" + i} `}
                    >
                      <svg
                        width="7"
                        height="11"
                        viewBox="0 0 7 11"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use href="#icon_prev_sm" />
                      </svg>
                    </span>
                    <span
                      className={`cursor-pointer pc__img-next ${"next" + i} `}
                    >
                      <svg
                        width="7"
                        height="11"
                        viewBox="0 0 7 11"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use href="#icon_next_sm" />
                      </svg>
                    </span>
                  </Swiper>

                      {isAddedToCartProducts(elm?.product_id) ? (
                        elm.product_qty > 0 && (
                          <button className="pc__atc btn anim_appear-bottom position-absolute border-0 text-uppercase fw-medium">
                           {t("Already Added")} 
                          </button>
                        )
                      ) : (
                        elm.product_qty > 0 && (
                          <button
                            className="pc__atc btn anim_appear-bottom position-absolute border-0 text-uppercase fw-medium"
                            onClick={() =>
                              addProductToCart({
                                ...elm,
                                category_name: elm.category_name,
                                subcategory_name:
                                  elm.subcategory?.subcategory_name,
                              })
                            }
                          >
                            {t("Add To Cart")} 
                          </button>
                        )
                      )}
                    </div>

        <div className="pc__info position-relative">
          <p className="pc__category">{t(elm.category_name)}</p>
          <h6 className="pc__title">
            <Link
              href={`/${locale}/shop/${removeSpecialCharactersAndAmp(elm.category_name)
                .split(" ")
                .join("-")
                .toLowerCase()}/${isSubcategory(
                elm.category_name.split(" ").join("-").toLowerCase(),
                elm.subcategory
              )}/${removeSpecialCharactersAndAmp(elm.product_name)
                .split(" ")
                .join("-")
                .toLowerCase()}`}
            >
              {elm?.product_name && t(he.decode(elm?.product_name))}
            </Link>
          </h6>
          <div className="product-card__price d-flex">{discPrice(elm)}</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Banner */}
      <section className="vh-100 hero-banner d-none d-lg-block">
        <Hero />
      </section>
      <div className="d-block d-lg-none">
        <Hero2 />
      </div>
      <div className="mb-4 pb-lg-3"></div>

      <div className="container my-5">
        <div className="filter-scroll">
            <div className="filter-pills d-flex flex-nowrap">
                {/* All Filter */}
                <button
                className={`filter-pill ${activeCategory === "all" ? "active" : ""}`}
                onClick={() => setActiveCategory("all")}
                >
                {t("All")} <span className="count">{filteredProducts.length}</span>
                </button>

                {categories.map((cat) => {
                const count = products.filter(
  (p) => p.category_name?.toLowerCase() === cat.name.toLowerCase()
).length;

                return (
                    <button
                    key={cat.slug}
                    className={`filter-pill ${
                        activeCategory === cat.slug ? "active" : ""
                    }`}
                    onClick={() => setActiveCategory(cat.slug)}
                    >
                    {t(cat.name)} <span className="count">{count}</span>
                    </button>
                );
                })}
            </div>
        </div>
      </div>

      {/* All Categories grouped */}
      {activeCategory === "all" ? (
        categories.map((cat, idx) => {
          const catProducts = products
  .filter((p) => p.category_name?.toLowerCase() === cat.name.toLowerCase())
  .slice(0, 8);

          if (catProducts.length === 0) return null;

          return (
            <section key={idx} className="shop-main container my-5">
              <h2 className="text-uppercase fw-bold mb-4 text-center" style={{ backgroundColor: 'rgb(251 249 246)', padding: '1rem', color:'#b9a16b', border: '1px solid #b9a16b' }}>{t(cat.name)}</h2>
              <div className="products-grid row row-cols-2 row-cols-md-3 row-cols-lg-4">
                {catProducts.map((elm, i) => renderProductCard(elm, i))}
              </div>
              <div className="text-center mt-4 mb-5">
                <Link href={`/${locale}/product-category/${cat.slug}`} className="btn btn-dark text-uppercase fw-medium">
                  {t("View All")}
                </Link>
              </div>
            </section>
          );
        })
      ) : (
        // Single category filter
        <section className="shop-main container my-5">
          <h2 className="text-uppercase fw-bold mb-4 text-center" style={{ backgroundColor: 'rgb(251 249 246)', padding: '1rem', color:'#b9a16b', border: '1px solid #b9a16b' }}>
            {t(categories.find((c) => c.slug === activeCategory)?.name)}
          </h2>
          <div className="products-grid row row-cols-2 row-cols-md-3 row-cols-lg-4">
            {products
              .filter(
                (p) =>
                  p.category_name?.toLowerCase() ===
                  categories.find((c) => c.slug === activeCategory).name.toLowerCase()
              )
              .slice(0, 12)
              .map((elm, i) => renderProductCard(elm, i))}
          </div>
          <div className="text-center mt-4 mb-5">
            <Link
              href={`/${locale}/product-category/${activeCategory}`}
              className="btn btn-dark text-uppercase fw-medium"
            >
              View All 
            </Link>
          </div>
        </section>
      )}
    </>
  );
}

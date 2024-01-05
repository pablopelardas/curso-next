// 'use client'

import { getCookie, hasCookie, setCookie } from "cookies-next";

/**
 * cookie: cart
 * {
 *  'id': count
 * }
 */

export const getCookieCart = (): { [id: string]: number } => {
  if (hasCookie("cart")) {
    const cookieCart = JSON.parse((getCookie("cart") as string) ?? "{}");
    return cookieCart;
  }
  return {};
};

export const addProductToCart = (id: string) => {
  const cookieCart = getCookieCart();
  const count = cookieCart[id] ?? 0;
  cookieCart[id] = count + 1;
  setCookie("cart", JSON.stringify(cookieCart));
};

export const removeProductFromCart = (id: string) => {
  const cookieCart = getCookieCart();
  const count = cookieCart[id] ?? 0;
  if (count > 0) {
    cookieCart[id] = count - 1;
    if (cookieCart[id] === 0) {
      delete cookieCart[id];
    }
    setCookie("cart", JSON.stringify(cookieCart));
  }
};

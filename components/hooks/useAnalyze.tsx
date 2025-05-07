import { FullProduct, OrderDataType, SpecialProductInfo } from "@/typings";
import { sendGTMEvent } from "@next/third-parties/google";

type CartDataType = {
  product: FullProduct;
  variant: string;
  price: number;
  special?: SpecialProductInfo;
};

type CheckoutDataType = {};

const isProduction = process.env.NODE_ENV === "production";

export const useAnalyze = () => {
  const sendBannerClickEvent = (data: { link: string }) => {
    const { link } = data;
    sendGTMEvent({
      debug_mode: !isProduction,
      event: "banner_click",
      banner_link: link,
    });
  };

  const sendPurchaseEvent = (data: { orderData: OrderDataType }) => {
    const { orderData } = data;
    console.log("sending purchase event", orderData);

    try {
      sendGTMEvent({
        debug_mode: !isProduction,
        event: "purchase",
        ecommerce: {
          transaction_id: orderData.order_id,
          value: orderData.grand_total,
          // tax: 0.0,
          shipping: orderData.shipping_fee,
          currency: "AED",
          coupon: orderData.coupon_code || "",
          items: orderData.items.map((item) => {
            return {
              item_id: item.product_id,
              item_name: item.product_name,
              // affiliation: "Google Merchandise Store",
              coupon: orderData.coupon_code || "",
              discount: item.discount,
              // index: 0,
              item_brand: item.brand,
              // item_category: "Apparel",
              // item_category2: "Adult",
              // item_category3: "Shirts",
              // item_category4: "Crew",
              // item_category5: "Short sleeve",
              // item_list_id: "related_products",
              // item_list_name: "Related Products",

              item_variant: item.variant,
              // location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
              price: item.price,
              quantity: item.quantity,
            };
          }),
        },
      });

      // meta facebook
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Purchase", {
          value: orderData.grand_total,
          currency: "AED",
          contents: orderData.items.map((item) => {
            return {
              id: item.product_id,
              quantity: item.quantity,
              name: item.product_name,
              price: item.price,
              brand: item.brand,
              variant: item.variant,
            };
          }),
        });
      }
    } catch (error) {
      console.error("error sending purchase event", error);
    }
  };

  const sendAddToCartEvent = (data: CartDataType) => {
    const {
      product: { id, name },
      variant,
      price,
      special,
    } = data;

    let truePrice = special ? special.price : price;

    console.log("sending add to cart event", data);

    try {
      sendGTMEvent({
        // debug_mode: !isProduction,
        event: "add_to_cart",
        ecommerce: {
          currency: "AED",
          value: truePrice,
          items: [
            {
              item_id: id,
              item_name: name,
              price: truePrice,
              quantity: 1,
            },
          ],
        },
      });

      // // meta facebook
      if (typeof window !== "undefined" && window.fbq)
        window.fbq("track", "AddToCart", {
          value: truePrice,
          currency: "AED",
        });
    } catch (error) {
      console.error("error sending add to cart event", error);
    }
  };

  const sendCheckoutDataEvent = (data: { checkoutData: CheckoutDataType }) => {
    const { checkoutData } = data;
    console.log("sending checkout data event", checkoutData);

    try {
      sendGTMEvent({
        debug_mode: !isProduction,
        event: "purchase",
        ecommerce: {},
      });

      // meta facebook
      // if (typeof window !== "undefined" && window.fbq) {
      //   window.fbq("track", "Purchase", {
      //     value: orderData.grand_total,
      //     currency: "AED",
      //     contents: orderData.items.map((item) => {
      //       return {
      //         id: item.product_id,
      //         quantity: item.quantity,
      //         name: item.product_name,
      //         price: item.price,
      //         brand: item.brand,
      //         variant: item.variant,
      //       };
      //     }),
      //   });
      // }
    } catch (error) {
      console.error("error sending checkout data event", error);
    }
  };

  return {
    sendBannerClickEvent,
    sendPurchaseEvent,
    sendAddToCartEvent,
    sendCheckoutDataEvent,
  };
};

import gql from "graphql-tag";
import { SHOP_PRODUCT_FRAGMENT } from "../fragment/shop-product";

export const HOME_PAGE = gql`
  query HomePageInfo(
    $showPlatform: Boolean = false
    $relationScreens: Boolean = false
  ) {
    carousel: shopProductsOffersLast(
      itemsPage: 6,
      topPrice: 30,
      random: true
    ) {
      shopProducts {
        ...ShopProductObject
      }
    }
    pc: shopProductsPlatform(
      itemsPage: 20
      random: true
      platform: ["4"]
    ) {
      shopProducts {
        ...ShopProductObject
      }
    }

    ps4: shopProductsPlatform(
      itemsPage: 20
      random: true
      platform: ["18"]
    ) {
      shopProducts {
        ...ShopProductObject
      }
    }

    topPrice35: shopProductsOffersLast(
      itemsPage: 4,
      topPrice: 35,
      random: true
    ) {
      shopProducts {
        ...ShopProductObject
      }
    }
}
${SHOP_PRODUCT_FRAGMENT}
`

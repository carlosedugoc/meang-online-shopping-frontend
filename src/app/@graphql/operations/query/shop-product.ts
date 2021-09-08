import gql from 'graphql-tag'
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { SHOP_PRODUCT_FRAGMENT } from '../fragment/shop-product';

export const SHOP_LAST_UNIT_OFFERS = gql`
  query productosPorOfertaYStock(
  $page: Int
  $itemsPage: Int
  $active: ActiveFilterEnum
  $random: Boolean
  $topPrice: Float
  $lastUnits: Int
) {
  shopProductsOffersLast(
    page: $page
    itemsPage: $itemsPage
    active: $active
    random: $random
    topPrice: $topPrice
    lastUnits: $lastUnits
  ) {
      status
      message
      shopProducts {
        ...ShopProductObject
      }
    }
  }
  ${SHOP_PRODUCT_FRAGMENT}
`

export const SHOP_PRODUCT_BY_PLATFORM = gql`
  query shopProductsPlatform(
    $page: Int
    $itemsPage: Int
    $active: ActiveFilterEnum
    $platform: ID!
    $random: Boolean
  ) {
    shopProductsPlatform(
      page: $page
      itemsPage: $itemsPage
      active: $active
      random: $random
      platform: $platform
    ) {
      status
      message
      shopProducts {
        ...ShopProductObject
      }
    }
  }
  ${SHOP_PRODUCT_FRAGMENT}
`

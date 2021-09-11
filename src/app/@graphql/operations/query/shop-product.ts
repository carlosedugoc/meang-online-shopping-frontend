import gql from 'graphql-tag'
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { SHOP_PRODUCT_FRAGMENT } from '../fragment/shop-product';
import { RESULT_INFO_FRAGMENT } from '../fragment/result-info';

export const SHOP_LAST_UNIT_OFFERS = gql`
  query productosPorOfertaYStock(
    $page: Int
    $itemsPage: Int
    $active: ActiveFilterEnum
    $random: Boolean
    $topPrice: Float
    $lastUnits: Int
    $showInfo: Boolean = false
    $showPlatform: Boolean = false
  ) {
  shopProductsOffersLast(
    page: $page
    itemsPage: $itemsPage
    active: $active
    random: $random
    topPrice: $topPrice
    lastUnits: $lastUnits
  ) {
      info @include(if:$showInfo) {
        ...ResultInfoObject
      }
      status
      message
      shopProducts {
        ...ShopProductObject
      }
    }
  }
  ${SHOP_PRODUCT_FRAGMENT}
  ${RESULT_INFO_FRAGMENT}
`

export const SHOP_PRODUCT_BY_PLATFORM = gql`
  query shopProductsPlatform(
    $page: Int
    $itemsPage: Int
    $active: ActiveFilterEnum
    $platform: [ID!]!
    $random: Boolean
    $showInfo: Boolean = false
    $showPlatform: Boolean = false
  ) {
    shopProductsPlatform(
      page: $page
      itemsPage: $itemsPage
      active: $active
      random: $random
      platform: $platform
    ) {
      info @include(if:$showInfo) {
        ...ResultInfoObject
      }
      status
      message
      shopProducts {
        ...ShopProductObject
      }
    }
  }
  ${SHOP_PRODUCT_FRAGMENT}
  ${RESULT_INFO_FRAGMENT}
`

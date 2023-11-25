import {environment} from '../../../environments/environment';


export const PDF_MAKE_LOGO = '/assets/images/logo/Logo-land.png';
export type SEO_PAGE_TYPES = 'home_page' | 'about_us_page' | 'contact_us_page' | 'product_list_page' | 'login_page' | 'blog_page' |  'category_page' ;

export const DATABASE_KEY = Object.freeze({
  loginToken: 'LAUNDRY_MARKET_TOKEN_' + environment.VERSION,
  loggInSession: 'LAUNDRY_MARKET_SESSION_' + environment.VERSION,
  encryptAdminLogin: 'LAUNDRY_MARKET_USER_0_' + environment.VERSION,
  encryptUserLogin: 'LAUNDRY_MARKET_USER_1_' + environment.VERSION,
  productFormData: 'LAUNDRY_MARKET_PRODUCT_FORM_' + environment.VERSION,
  recommendedProduct: 'LAUNDRY_MARKET_RECOMMENDED_PRODUCT_' + environment.VERSION,
  userCoupon: 'LAUNDRY_MARKET_USER_COUPON_' + environment.VERSION,
  userCookieTerm: 'LAUNDRY_MARKET_COOKIE_TERM' + environment.VERSION,
  selectedShippingAddress: 'LAUNDRY_MARKET_SELECTED_ADDRESS' + environment.VERSION,
  otpCheck: 'LAUNDRY_MARKET_USER_OTPCHECK_' + environment.VERSION,
  popup: 'LAUNDRY_MARKET_POPUP_' + environment.VERSION,
  cartsProduct: 'LAUNDRY_MARKET_USER_CART_' + environment.VERSION,
  userCart: 'LAUNDRY_MARKET_USER_CART_' + environment.VERSION,
  userWishList: 'LAUNDRY_MARKET_USER_CART_' + environment.VERSION,
  userPrescription: 'LAUNDRY_MARKET_USER_CART_' + environment.VERSION,
  productLayout: 'LAUNDRY_MARKET_PRODUCT_LAYOUT' + environment.VERSION,

});

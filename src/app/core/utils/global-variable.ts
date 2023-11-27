import {environment} from '../../../environments/environment';


export const PDF_MAKE_LOGO = '/assets/images/logo/Logo-land.png';
export type SEO_PAGE_TYPES = 'home_page' | 'about_us_page' | 'contact_us_page' | 'product_list_page' | 'login_page' | 'blog_page' |  'category_page' ;

export const DATABASE_KEY = Object.freeze({
  loginToken: 'QUERIESCARE_TOKEN_' + environment.VERSION,
  loggInSession: 'QUERIESCARE_SESSION_' + environment.VERSION,
  encryptAdminLogin: 'QUERIESCARE_USER_0_' + environment.VERSION,
  encryptUserLogin: 'QUERIESCARE_USER_1_' + environment.VERSION,
  productFormData: 'QUERIESCARE_PRODUCT_FORM_' + environment.VERSION,
  recommendedProduct: 'QUERIESCARE_RECOMMENDED_PRODUCT_' + environment.VERSION,
  userCoupon: 'QUERIESCARE_USER_COUPON_' + environment.VERSION,
  userCookieTerm: 'QUERIESCARE_COOKIE_TERM' + environment.VERSION,
  selectedShippingAddress: 'QUERIESCARE_SELECTED_ADDRESS' + environment.VERSION,
  otpCheck: 'QUERIESCARE_USER_OTPCHECK_' + environment.VERSION,
  popup: 'QUERIESCARE_POPUP_' + environment.VERSION,
  cartsProduct: 'QUERIESCARE_USER_CART_' + environment.VERSION,
  userCart: 'QUERIESCARE_USER_CART_' + environment.VERSION,
  userWishList: 'QUERIESCARE_USER_CART_' + environment.VERSION,
  userPrescription: 'QUERIESCARE_USER_CART_' + environment.VERSION,
  productLayout: 'QUERIESCARE_PRODUCT_LAYOUT' + environment.VERSION,
  regSessionData: 'QUERIESCARE_PRODUCT_LAYOUT' + environment.VERSION,

});

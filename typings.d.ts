type Counts = {
  cart_item_count: number;
  wishlist_item_count: number;
  order_count: number;
};

type User = {
  id: number;
  guest: boolean;
  type: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  avatar_original: string;
  dob: string;
  email_verified: boolean;

  points: number;

  counts: Counts;
};

type OurCountry = {
  id: number;
  code: string;
  name: string;
  status: number;
};

type SetAddressType = {
  line?: string;
  area?: string;
  city?: string;
  state?: string;
  sublocality?: string;
  formatted_address?: string;
  country?: string;
};

type ProductColor = { name: string; code: string; icon: string; path: string };

export type Review = {
  user_id: number;
  user_name: string;
  avatar: string;
  rating: number;
  comment: string;
  time: string;
};

type Loc = { lat: number; lng: number };

type AddressForm = {
  title: string;
  address: string;
  area: string;
  phone: string;
  note: string;
};

type Address = {
  address: string;
  country_id: number;
  country_name: string;
  id: number;
  lang: number;
  lat: number;
  location_available: boolean;
  phone: string;
  set_default: number; // 0 or 1
  user_id: number;
  verified: boolean;
};

// type AttributeValue = { id: number; value: string };

type ProductFilter = {
  id: number;
  name: string;
  ar_name: string;
  values: string[];
};

type Category = {
  id: number;
  slug: string;
  name: string;
  ar_name: string;
  banner: string;
  ar_banner: string;
  cover: string;
  ar_cover: string;
  icon: string;
  subcats: Category[];
  filter: ProductFilter[];
  products_brands: Brand[];
  meta: {
    title: string;
    description: string;
  };
};

type Product = {
  id: number;
  slug: string;
  name: string;
  ar_name: string;

  brand_name: string;
  ar_brand_name: string;

  thumbnail_image: string;
  has_discount: boolean;
  offer: string;
  discount: string;
  stroked_price: string;
  main_price: string;
  rating: number;
  sales: number;
  colors: string[]; // colors

  choice_options: {
    id: string;
    name: string;
    ar_name: string;
    values: string[];
  }[];

  all_variants_stocks: string;

  new: boolean;
};

export type AssocProduct = {
  result: boolean;
  in_cart: boolean;
  product: Product;
};

export type ProductVariant = { stock: number; price: number; varaint: string };

export type ChoiceOption = {
  id: string;
  name: string;
  ar_name: string;
  values: string[];
};

export type PackageOptionChoice = {
  title: string;
  color: string;
  file: string;
};

export type PackageOption = {
  option_name: string;
  option_choices: PackageOptionChoice[];
};

export type FullProduct = {
  id: number;
  slug: string;

  can_review: boolean;

  first_variant: ProductVariant;

  name: string;
  ar_name: string;

  main_photos: string[];
  color_variants_photos: { color: string; path: string }[]; // not used at the moment

  thumbnail_image: string;
  tags: string[];

  price_high_low: string;
  stroked_price: string;
  main_price: string;

  choice_options: ChoiceOption[];
  package_options: PackageOption[];

  colors: ProductColor[]; // color
  has_discount: boolean;
  discount: string;
  offer: string;
  calculable_price: number;
  rating: number;
  rating_count: number;
  earn_point: number;

  associated_product: AssocProduct;

  description: string;
  ar_description: string;

  video_link: string;

  big_category: string;
  is_lense: boolean;

  brand: { id: number; name: string; ar_name: string };

  all_variants_stocks: string;
  new: boolean;
};

export type SpecialProductInfo = {
  price: number;
  stock: number;
};

export type SpecialProduct = {
  special: SpecialProductInfo;
  product: Product;
};

export type Choice = {
  id?: number;
  quantity: number;
  color?: string;
  attributes: { id: number; value: string }[];
  available: boolean;
  variant?: string;
  price?: number;
};

export type BreadCrumbItem = { name: string; link: string };

export type Brand = {
  id: number;
  name: string;
  ar_name: string;
  icon: string;
  src: string;
};

export type CartItem = {
  id: number;
  user_id: number;
  product_id: number;
  product_slug: string;
  product_name: string;
  product_ar_name: string;
  product_thumbnail_image: string;
  variation: string;
  price: number;
  unit_price: number;

  has_discount: boolean;
  discount: string;
  stroked_price: number;

  tax: number;
  shipping_cost: number;
  quantity: number;
  free_count: number;
  lower_limit: number;
  upper_limit: number;
  offer: string; // possible values: buy1get1, buy2get1, buy3get1 or null
  special: string; // for the special offer section we added
  description: string; // des
};

export type CartResponse = {
  summary: CartSummary;
  gifts: GiftsRes;
  also_get_products: Product[];
  sub_total: number;
  taxes: number;
  cart_items: CartItem[];
};

export type Gift = {
  gift_id: number;
  product_id: number;
  product_slug: string;
  product_name: string;
  product_ar_name: string;
  product_thumbnail: string;
};

type GiftsRes = {
  status: boolean;
  message: string;
  gifts: Gift[];
};

export type CartSummary = {
  can_order: boolean;
  message: string;
  // sub_total: number;
  // tax: number;
  shipping_cost: number;
  discount: number;
  points_discount: number;
  grand_total: number;
  coupon_code: string;
  coupon_applied: boolean;
  points_used: boolean;
  cod_available?: boolean;

  address_pass?: boolean;
  special_pass?: boolean;
};

export type PageMeta = {
  current_page: number;
  last_page: number;
  total: number;
};

export type Revs = {
  total: number;
  rate: number;
  data: Review[];
};

export type CurrencyData = {
  id: number;
  name: string;
  code: string;
  symbol: string;
  exchange_rate: number;
  is_default: boolean;
};

export type SpecialDeal = {
  min_cart_value: string;
  max_quantity: string;
  enabled: string;
  end_date: number;
  banner: string;
  ar_banner: string;

  inner_banner: string;
  ar_inner_banner: string;
};

export type Settings = { type: string; value: string }[];

export type WishlistItem = { id: number; product: { data: Product[] } };

export type Banner = { image: string; ar_image: string; link?: string };

export type SizedBanner = { regular: Banner; small: Banner };

export type AllBannersType = {
  level_1: { result: boolean; data: Banner[] };
  todays_deal: { result: boolean; data: SizedBanner };
  affiliate: { result: boolean; data: SizedBanner };
};

export type FlashDeal = {
  id: number;
  slug: string;
  link: string;
  title: string;
  ar_title: string;
  date: number;
  banner: string;
  ar_banner: string;
  discount: string;
  discount_type: string;
};

type OrderGift = {
  gift_id: number;
  product_id: number;
  product_slug: string;
  product_name: string;
  product_ar_name: string;
  product_thumbnail: string;
};

type Order = {
  id: number;
  code: string;
  payment_type: string;
  payment_status: string;
  delivery_status: string;
  grand_total: number;
  date: string;
  items: { gift: OrderGift; data: OrderItem[] };
  track: OrderTrackState;
};

type OrderItem = {
  id: number;
  product_slug: string;
  product_name: string;
  product_thumbnail: string;
  product_ar_name: string;
  variation: string;
  price: number;
  tax: number;
  shipping_cost: number;
  quantity: number;
};

type OrderTrackStory = {
  date: number;
  details?: string;
  status: string;
  statusCode: string;
};

type OrderTrackState = {
  result: boolean;
  message: string;
  tracking_url: string;

  story: OrderTrackStory[];
};

export type ArticleDataResponse = {
  article: BlogArticle;
  recents: BlogArticle[];
};

export type OurMarker = { loc: Loc; name: string };

export type RomaBranch = {
  title: string;
  ar_title: string;
  address: string;
  open_now: string;
  loc: Loc;
  closesAt: string;
  phone: string;
  workings: string[];
  photo: string;
};

export type BlogCategory = {
  id: number;
  name: string;
  ar_name: string;
};

export type BlogArticleMeta = {
  title: string;
  description: string;
  keywords: string;
};

export type BlogBanner = {
  image: string;
  ar_image: string;
};

export type BlogArticle = {
  id: number;
  slug: string;
  banner: string;
  title: string;
  category: { name: string; ar_name: string };
  short_description: string;
  description: string;
  ar_banner: string;
  ar_title: string;
  ar_short_description: string;
  ar_description: string;
  meta: BlogArticleMeta;
  ar_meta: BlogArticleMeta;

  date: string;
};

export type BlogResponse = {
  success: boolean;
  data: {
    blog_banner: BlogBanner;
    categories: BlogCategory[];
    articles: {
      current_page: number;
      data: BlogArticle[];
      last_page: number;
      total: number;
    };
  };
};

export type MetaResponse = {
  title: string;
  description: string;
  keywords: string;

  ar_title: string;
  ar_description: string;
  ar_keywords: string;
};

export type Color = {
  code: string;
  name: string;
  ar_name: string;
  icon: string;
  cover_image: string;
  banner: string;
};

export type ProductsResponseData = {
  success: boolean;
  data: Product[];
  meta: PageMeta;
};

export type OrderDataItem = {
  product_id: number;
  product_name: string;
  variant: string | null;
  price: number;
  discount: number;
  quantity: number;
  brand: string;
};

export type OrderDataType = {
  order_id: number;
  grand_total: number;
  coupon_code: string;
  shipping_fee: number;
  items: OrderDataItem[];
};

import type { ImageSource } from 'expo-image';

/** Local logos keyed by `settlements.brand_key`. Brands without one fall back to the placeholder thumbnail. */
const BRAND_LOGOS: Record<string, ImageSource> = {
  apple: require('@/assets/images/brands/apple.png'),
  fortnite: require('@/assets/images/brands/fortnite.png'),
  google: require('@/assets/images/brands/google.png'),
  instagram: require('@/assets/images/brands/instagram.png'),
  pepsi: require('@/assets/images/brands/pepsi.png'),
  spotify: require('@/assets/images/brands/spotify.png'),
};

const PLACEHOLDER: ImageSource = require('@/assets/images/settlements/placeholder-thumb.png');

export function brandLogo(brandKey: string | null | undefined): ImageSource {
  return (brandKey && BRAND_LOGOS[brandKey]) || PLACEHOLDER;
}

export function settlementThumbnail(): ImageSource {
  return PLACEHOLDER;
}

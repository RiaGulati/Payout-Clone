import { Image, type ImageSource } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { Ui } from '@/constants/colors';

type Bubble = {
  name: string;
  source: ImageSource | number;
  /** Bubble offset inside the 332×226 cluster (Figma frame x − 58, y − 120). */
  left: number;
  top: number;
  diameter: number;
  /** Logo image size/offset inside the bubble (clipped to the circle). */
  size: number;
  imageLeft: number;
  imageTop: number;
};

const BUBBLES: Bubble[] = [
  { name: 'Apple', source: require('@/assets/images/brands/apple.png'), left: 0, top: 35, diameter: 93, size: 59, imageLeft: 17, imageTop: 17 },
  { name: 'Spotify', source: require('@/assets/images/brands/spotify.png'), left: 133, top: 0, diameter: 93, size: 126, imageLeft: -16, imageTop: -16 },
  { name: 'Pepsi', source: require('@/assets/images/brands/pepsi.png'), left: 258, top: 47, diameter: 74, size: 95, imageLeft: -11, imageTop: 0 },
  { name: 'Instagram', source: require('@/assets/images/brands/instagram.png'), left: 61, top: 129, diameter: 93, size: 101, imageLeft: -4, imageTop: -4 },
  { name: 'Fortnite', source: require('@/assets/images/brands/fortnite.png'), left: 184, top: 133, diameter: 93, size: 101, imageLeft: -4, imageTop: -4 },
];

/** Scattered brand-logo bubbles at the top of the paywall (Onboarding - 15 / 16). */
export function PaywallLogoCluster() {
  return (
    <View style={styles.cluster}>
      {BUBBLES.map((b) => (
        <View
          key={b.name}
          style={[
            styles.bubble,
            { left: b.left, top: b.top, width: b.diameter, height: b.diameter, borderRadius: b.diameter / 2 },
          ]}>
          <Image
            source={b.source}
            accessibilityLabel={b.name}
            contentFit="cover"
            style={{ position: 'absolute', left: b.imageLeft, top: b.imageTop, width: b.size, height: b.size }}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  cluster: {
    width: 332,
    height: 226,
    // Figma cluster spans x 58–390 in the 440pt frame: 4pt right of center.
    marginLeft: 8,
  },
  bubble: {
    position: 'absolute',
    backgroundColor: Ui.white,
    overflow: 'hidden',
  },
});

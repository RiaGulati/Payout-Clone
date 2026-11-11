import { Image, type ImageSource } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { Ui } from '@/constants/colors';

/** Diameter of each white logo bubble. */
const BUBBLE = 93;

type Bubble = {
  name: string;
  source: ImageSource | number;
  /** Bubble offset inside the 334×243 cluster (Figma frame x − 42, y − 152). */
  left: number;
  top: number;
  /** Logo image size/offset inside the bubble (clipped to the circle). */
  size: number;
  imageLeft: number;
  imageTop: number;
};

const BUBBLES: Bubble[] = [
  { name: 'Apple', source: require('@/assets/images/brands/apple.png'), left: 0, top: 47, size: 59, imageLeft: 17, imageTop: 17 },
  { name: 'Spotify', source: require('@/assets/images/brands/spotify.png'), left: 127, top: 0, size: 126, imageLeft: -16, imageTop: -16 },
  { name: 'Pepsi', source: require('@/assets/images/brands/pepsi.png'), left: 241, top: 38, size: 126, imageLeft: -16, imageTop: 0 },
  { name: 'Instagram', source: require('@/assets/images/brands/instagram.png'), left: 73, top: 150, size: 101, imageLeft: -4, imageTop: -4 },
  { name: 'Fortnite', source: require('@/assets/images/brands/fortnite.png'), left: 190, top: 146, size: 101, imageLeft: -4, imageTop: -4 },
];

/** Scattered brand-logo bubbles from "Onboarding - 4" (15:218). */
export function WeeklyLogoCluster() {
  return (
    <View style={styles.cluster}>
      {BUBBLES.map((b) => (
        <View key={b.name} style={[styles.bubble, { left: b.left, top: b.top }]}>
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
    width: 334,
    height: 243,
    // Figma cluster spans x 42–376 in the 440pt frame: 11pt left of center.
    marginRight: 22,
  },
  bubble: {
    position: 'absolute',
    width: BUBBLE,
    height: BUBBLE,
    borderRadius: BUBBLE / 2,
    backgroundColor: Ui.white,
    overflow: 'hidden',
  },
});

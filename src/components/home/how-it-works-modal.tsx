import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { Ui } from '@/constants/colors';
import { Typography } from '@/constants/typography';

type HowItWorksModalProps = {
  visible: boolean;
  onClose: () => void;
};

/** "Home - 3" (176:470, card 176:621): frosted "How Class Action Lawsuits Work" info card with a "Got it!" button. */
export function HowItWorksModal({ visible, onClose }: HowItWorksModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel="Dismiss" />
      <View style={styles.center} pointerEvents="box-none">
        <View style={styles.card} accessibilityViewIsModal>
          <Text style={styles.title} accessibilityRole="header">
            How Class Action Lawsuits Work
          </Text>
          <View style={styles.body}>
            <Text style={styles.paragraph}>
              Class action lawsuits allow groups of people who have been harmed by a company to sue
              together. When companies settle these lawsuits, they often pay money to affected
              customers.
            </Text>
            <Text style={styles.paragraph}>
              {'This apps helps you discover and claim your share of these settlements.\n'}
              Simply tap on any settlement to learn more and submit your claim if you’re eligible.
            </Text>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={onClose}
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
            <Text style={styles.buttonLabel}>Got it!</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Ui.scrim,
  },
  center: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  // 327×410 card; padding is measured from the outer edge minus the 1pt border.
  card: {
    width: 327,
    maxWidth: '100%',
    paddingTop: 29,
    paddingBottom: 21,
    paddingHorizontal: 26,
    borderRadius: 39,
    borderWidth: 1,
    borderColor: Ui.white,
    backgroundColor: Ui.alertSurface,
    overflow: 'hidden',
  },
  title: {
    ...Typography.alertTitle,
    color: Ui.textPrimary,
    textAlign: 'center',
  },
  body: {
    marginTop: 10,
    gap: 18,
  },
  paragraph: {
    ...Typography.iosBodyLarge,
    lineHeight: 20,
    color: Ui.textPrimary,
  },
  button: {
    marginTop: 14,
    height: 53,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Ui.alertButton,
  },
  buttonLabel: {
    ...Typography.alertButton,
    color: Ui.textPrimary,
  },
  pressed: {
    opacity: 0.7,
  },
});

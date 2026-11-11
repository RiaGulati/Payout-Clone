import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { Ui } from '@/constants/colors';
import { Typography } from '@/constants/typography';

type PayoutInfoModalProps = {
  visible: boolean;
  onClose: () => void;
};

/** "How Estimated Payouts Work" frosted popup (Figma "Wallet - popup for more info"). */
export function PayoutInfoModal({ visible, onClose }: PayoutInfoModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent onRequestClose={onClose}>
      <View style={styles.scrim}>
        <View style={styles.card} accessibilityViewIsModal>
          <Text style={styles.title} accessibilityRole="header">
            How Estimated Payouts Work
          </Text>
          <View style={styles.body}>
            <Text style={styles.paragraph}>
              The estimated payout is calculated by summing the estimated amounts from all your claimed
              settlements. These amounts are based on the settlement terms and your eligbility.
            </Text>
            <Text style={styles.paragraph}>
              All actual payouts are handled directly by the settlement administrators, not through this app.
              Payment timing and final amounts may vary based on the settlement process.
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
  scrim: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: Ui.scrim,
  },
  card: {
    width: 327,
    maxWidth: '100%',
    paddingTop: 31,
    paddingBottom: 31,
    paddingHorizontal: 27,
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
    marginTop: 9,
    gap: 18,
  },
  paragraph: {
    ...Typography.iosBodyLarge,
    lineHeight: 20,
    color: Ui.textPrimary,
  },
  button: {
    marginTop: 32,
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

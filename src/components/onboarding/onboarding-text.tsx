import { StyleSheet, Text, type TextProps } from 'react-native';

import { Ui } from '@/constants/colors';
import { Typography } from '@/constants/typography';

/** White SF Pro Black Italic headline used on the blue onboarding steps. */
export function OnboardingTitle({ style, ...rest }: TextProps) {
  return <Text style={[styles.title, style]} {...rest} />;
}

/** White SF Pro Bold supporting copy used on the blue onboarding steps. */
export function OnboardingBody({ style, ...rest }: TextProps) {
  return <Text style={[styles.body, style]} {...rest} />;
}

const styles = StyleSheet.create({
  title: {
    ...Typography.onboardingTitle,
    color: Ui.white,
    textAlign: 'center',
    maxWidth: 300,
  },
  body: {
    ...Typography.onboardingBody,
    color: Ui.white,
    textAlign: 'center',
    maxWidth: 282,
  },
});

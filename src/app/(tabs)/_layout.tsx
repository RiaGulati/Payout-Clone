import { Tabs } from 'expo-router';

import { AppTabBar } from '@/components/app/app-tab-bar';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <AppTabBar {...props} />}>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="wallet" />
      <Tabs.Screen name="forms" />
    </Tabs>
  );
}

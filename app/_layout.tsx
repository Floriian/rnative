import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <Tabs>
    <Tabs.Screen
      name="index"
      options={{
        title: "AI Chat",
        headerShown: false,
      }}
    />
    <Tabs.Screen
      name="settings"
      options={{
        title: "Settings",
        headerShown: false,
      }}
    />
  </Tabs>;
}

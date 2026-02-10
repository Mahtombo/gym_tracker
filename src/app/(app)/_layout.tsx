import { Session } from "@supabase/supabase-js";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native";

function Layout() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      // setIsLoaded(true);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  // if (!isLoaded) {
  //   return (
  //     <SafeAreaView className="flex-1 justify-center items-center">
  //       <ActivityIndicator size="large" color="white" />
  //     </SafeAreaView>
  //   );
  // }

  return (
    <Stack>
      <Stack.Protected guard={session !== null}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="exercise-detail"
          options={{
            headerShown: false,
            presentation: "modal",
            gestureEnabled: true,
            animationTypeForReplace: "push",
          }}
        />
      </Stack.Protected>

      <Stack.Protected guard={session === null}>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

export default Layout;

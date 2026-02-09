import {
  GoogleSignin,
  GoogleSigninButton,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { supabase } from "../../../lib/supabase";
import { TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function GoogleSignIn() {
  GoogleSignin.configure({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID ?? undefined,
  });

  const onPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        const idToken = response.data.idToken;
        if (idToken) {
          const { data, error } = await supabase.auth.signInWithIdToken({
            provider: "google",
            token: idToken,
          });
        } else {
          console.error("Google Sign-In did not return an idToken.");
        }
      }
    } catch (error: any) {
      if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.error("Operation is in progress already");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.error("Play services not available or outdated");
      } else {
        console.error(error);
        // some other error happened
        console.error(error.message);
      }
    }
  };

  return (
    // <GoogleSigninButton
    //   size={GoogleSigninButton.Size.Wide}
    //   color={GoogleSigninButton.Color.Dark}
    //   onPress={async () => {
    //     try {
    //       await GoogleSignin.hasPlayServices();
    //       console.log("here2");
    //       const response = await GoogleSignin.signIn();
    //       if (isSuccessResponse(response)) {
    //         console.log("here");
    //         const idToken = response.data.idToken;
    //         if (idToken) {
    //           const { data, error } = await supabase.auth.signInWithIdToken({
    //             provider: "google",
    //             token: idToken,
    //           });
    //         } else {
    //           console.error("Google Sign-In did not return an idToken.");
    //         }
    //       }
    //     } catch (error: any) {
    //       if (error.code === statusCodes.IN_PROGRESS) {
    //         // operation (e.g. sign in) is in progress already
    //         console.error("Operation is in progress already");
    //       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //         // play services not available or outdated
    //         console.error("Play services not available or outdated");
    //       } else {
    //         console.error(error);
    //         // some other error happened
    //         console.error(error.message);
    //       }
    //     }
    //   }}
    // />

    <TouchableOpacity
      onPress={onPress}
      className="bg-white border-2 border-gray-200 rounded-xl py-4 shadow-sm"
      activeOpacity={0.8}
    >
      <View className="flex-row items-center justify-center">
        <Ionicons name="logo-google" size={20} color="#EA4335" />
        <Text className="text-gray-900 font-semibold text-lg ml-3">
          Continue with Google
        </Text>
      </View>
    </TouchableOpacity>
  );
}

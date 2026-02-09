import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../../lib/supabase";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Button } from "@rneui/themed/dist/Button";
import { Input } from "@rneui/themed/dist/Input";
import { Text } from "react-native";
import GoogleSignIn from "../components/GoogleSignIn";
import { Link } from "expo-router";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);

    if (!email || !password) {
      Alert.alert("Please fill in all fields");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Header Section */}
        <View className="flex-1 px-6">
          <View className="flex-1 justify-center">
            {/* Logo */}
            <View className="items-center mb-10">
              <View className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl items-center justify-center mb-4 shadow-lg">
                <Ionicons name="fitness" size={40} color="white" />
              </View>
              <Text className="text-2xl font-bold text-gray-900 mb-2">
                GymTracker
              </Text>
              <Text className="text-lg text-gray-500 text-center">
                Track your fitness journey{"\n"}and reach your goals
              </Text>
            </View>

            {/* Sign In Section */}
            <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
              <Text className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Welcome Back
              </Text>

              {/* Email Input */}
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Email
                </Text>
                <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4 border border-gray-200">
                  <Ionicons name="mail-outline" size={20} color="#6B7280" />
                  <TextInput
                    autoCapitalize={"none"}
                    value={email}
                    placeholder="Enter your email"
                    placeholderTextColor="#9CA3AF"
                    onChangeText={(text) => setEmail(text)}
                    className="flex-1 ml-3 text-gray-900"
                    editable={!loading}
                  />
                </View>
              </View>

              <View className="mb-6">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Password
                </Text>
                <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4 border border-gray-200">
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#6B7280"
                  />
                  <TextInput
                    value={password}
                    placeholder="Enter your password"
                    placeholderTextColor="#9CA3AF"
                    autoCapitalize={"none"}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    className="flex-1 ml-3 text-gray-900"
                    editable={!loading}
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={signInWithEmail}
              disabled={loading}
              className={`rounded-xl py-4 shadow-sm mb-4 ${loading ? "bg-gray-400" : "bg-blue-600"}`}
              activeOpacity={0.8}
            >
              <View className="flex-row items-center justify-center">
                {loading ? (
                  <Ionicons name="refresh" size={20} color="white" />
                ) : (
                  <Ionicons name="log-in-outline" size={20} color="white" />
                )}
                <Text className="text-white font-semibold text-lg ml-2">
                  {loading ? "Signing in..." : "Sign in"}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center my-4">
              <View className="flex-1 h-px bg-gray-200" />
              <Text className="px-4 text-gray-500 text-sm">Or</Text>
              <View className="flex-1 h-px bg-gray-200" />
            </View>

            <GoogleSignIn />
            {/* google form section */}

            {/* Sign up section */}
            <View className="flex-row items-center justify-center mt-6">
              <Text className="text-gray-600">Don't have an account? </Text>
              <Link href="/sign-up" asChild>
                <TouchableOpacity>
                  <Text className="text-blue-600 text-sm font-semibold">
                    Sign up
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>

            {/* Footer section */}
            <View className="pb-6">
              <Text className="text-center text-gray-500 text-sm">
                Start your fitness journey today!
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

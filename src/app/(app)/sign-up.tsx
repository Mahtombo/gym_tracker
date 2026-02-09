import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { supabase } from "../../../lib/supabase";
import { Alert } from "react-native";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signUpWithEmail() {
    setLoading(true);
    if (!email || !password) {
      Alert.alert("Please fill in all fields");
      setLoading(false);
      return;
    }

    const {
      error,
      data: { session },
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    console.log("Error:", error);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");

    setLoading(false);
  }

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Header */}
        <View className="flex-1 px-6">
          <View className="flex-1 justify-center">
            <View className="items-center mb-8">
              <View className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl items-center justify-center mb-4 shadow-lg">
                <Ionicons name="fitness" size={40} color="white" />
              </View>
              <Text className="text-3xl font-bold text-gray-900 mb-2">
                Join GymTracker
              </Text>
              <Text className="text-lg text-gray-600 text-center">
                Start your fitness journey {"\n"}and achieve your goals
              </Text>
            </View>
            {/* Sign Up Section */}
            <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
              <Text className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Create Your Account
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
                    editable={!loading}
                    className="flex-1 ml-3 text-gray-900"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View className="mb-6">
                <Text className="text-sm font-medium text-gray-800 mb-2">
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
                    placeholder="Create a password"
                    placeholderTextColor="#9CA3AF"
                    autoCapitalize={"none"}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    editable={!loading}
                    className="flex-1 ml-3 text-gray-900"
                  />
                </View>
                <Text className="text-xs text-gray-500 mt-2">
                  Must be atleast 8 characters
                </Text>
              </View>

              {/* Sign Up Button */}
              <TouchableOpacity
                onPress={signUpWithEmail}
                disabled={loading}
                className={`rounded-xl py-4 shadow-sm mb-4 ${loading ? "bg-gray-400" : "bg-blue-600"}`}
                activeOpacity={0.8}
              >
                <View className="flex-row items-center justify-center">
                  {loading ? (
                    <Ionicons name="refresh" size={20} color="white" />
                  ) : (
                    <Ionicons
                      name="person-add-outline"
                      size={20}
                      color="white"
                    />
                  )}
                  <Text className="text-white font-semibold text-lg ml-2">
                    {loading ? "Creating Account..." : "Create Account"}
                  </Text>
                </View>
              </TouchableOpacity>
              <Text className="text-sm text-gray-500 text-center mb-4">
                By signing up, you agree to our
                <Link href="https://www.google.com" className="text-blue-600">
                  <Text className="text-blue-600"> Terms of Service </Text>
                </Link>
                and
                <Link href="https://www.google.com" className="text-blue-600">
                  <Text className="text-blue-600"> Privacy Policy</Text>
                </Link>
              </Text>
            </View>

            {/* Sign In Section */}
            <View className="flex-row justify-center items-center">
              <Text> Already have an account? </Text>
              <Link href="/sign-in" asChild>
                <TouchableOpacity activeOpacity={0.8}>
                  <Text className="text-blue-600"> Sign In </Text>
                </TouchableOpacity>
              </Link>
            </View>
            {/* Footer Section  */}
            <View className="pb-6">
              <Text className="text-center text-gray-500 text-sm">
                Ready to transform your fitness?
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

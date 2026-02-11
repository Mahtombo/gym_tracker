import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Database } from "../../../lib/supabase-types";
import { supabase } from "../../../lib/supabase";

export default function ExerciseDetail() {
  const router = useRouter();
  const [exercise, setExercise] = useState<
    Database["public"]["Tables"]["exercises"]["Row"] | null
  >(null);

  const [loading, setLoading] = useState(true);
  const [aiGuidance, setAiGuidance] = useState<string>("");
  const [aiLoading, setAiLoading] = useState(false);

  const { id } = useLocalSearchParams<{ id: string }>();

  const openVideo = async () => {
    const url = exercise?.video_url;
    if (!url) return;

    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) return;
      await Linking.openURL(url);
    } catch (error) {
      console.error("Error opening video URL:", error);
    }
  };

  useEffect(() => {
    const fetchExercise = async () => {
      if (!id) return;
      try {
        const exerciseData = await supabase
          .from("exercises")
          .select("*")
          .eq("id", id)
          .single();

        if (exerciseData.data) {
          setExercise(exerciseData.data);
        }
      } catch (error) {
        console.error("Error fetching exercise:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExercise();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#000fff" />
          <Text className="text-gray-500"> Loading exercise...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      {/* Header with close button */}
      <View className="absolute top-8 left-0 right-0 z-10 px-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 bg-black/20 rounded-full items-center justify-center backdrop-blur-sm"
        >
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Hero Image */}
        <View className="h-80 bg-white relative">
          {exercise?.image ? (
            <Image
              source={{ uri: exercise.image }}
              className="w-full h-full"
              resizeMode="contain"
            />
          ) : (
            <View className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 items-center justify-center">
              <Ionicons name="fitness" size={80} color="white" />
            </View>
          )}

          {/* Gradient overlay*/}
          <View className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent " />
        </View>

        {/* Content  */}
        <View className="px-6 py-6">
          {/* Title and difficulty */}
          <View className="flex-row items-start justify-between mb-4">
            <View className="flex-1 mr-4">
              <Text className="text-3xl font-bold text-gray-800">
                {exercise?.name || "Exercise Name"}
              </Text>
            </View>
          </View>

          {/* Description */}
          <View className="mb-6">
            <Text className="text-xl font-semibold text-gray-800 mb-3">
              Description
            </Text>
            <Text className="text-gray-600 leading-6 text-base">
              {exercise?.description ||
                "No description available for this exercise"}
            </Text>
          </View>

          {/* Video Section */}
          {exercise?.video_url && (
            <View className="mb-6">
              <Text className="text-xl font-semibold text-gray-800 mb-3">
                Video Tutorial
              </Text>
              <TouchableOpacity
                className="bg-red-500 rounded-xl p-4 flex-row items-center"
                onPress={openVideo}
                // accessibilityRole="button"
                // accessibilityLabel="Open video tutorial"
                // activeOpacity={0.85}
              >
                <View className="w-12 h-12 bg-white rounded-full items-center justify-center mr-4">
                  <Ionicons name="play" size={20} color="#ef4444" />
                </View>
                <View>
                  <Text className="text-white font-semibold text-lg">
                    Watch Tutorial
                  </Text>
                  <Text className="text-red-100 text-sm">
                    Learn proper form
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

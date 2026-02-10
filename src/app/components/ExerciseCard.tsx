import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Database } from "../../../lib/supabase-types";

interface ExerciseCardProps {
  item: Database["public"]["Tables"]["exercises"]["Row"];
  onPress?: () => void;
  showChevron?: boolean;
}

export default function ExerciseCard({
  item,
  onPress,
  showChevron = false,
}: ExerciseCardProps) {
  return (
    <TouchableOpacity
      className="bg-white rounded-2xl mb-4 shadow-sm border border-gray-100"
      onPress={onPress}
    >
      <View className="flex-row p-6">
        <View className="w-20 h-20 bg-white rounded-xl mr-4 overflow-hidden">
          {item.image ? (
            <Image
              source={{ uri: item.image }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <View className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 items-center justify-center">
              <Ionicons name="fitness" size={24} color="gray" />
            </View>
          )}
        </View>

        <View className="flex-1 justify-between">
          <View>
            <Text className="text-lg font-bold text-gray-900 mb-1">
              {item.name}
            </Text>
            <Text className="text-sm text-gray-600 mb-2 numberOfLines={2}">
              {item.description || "No description available"}
            </Text>
          </View>

          {showChevron && (
            <TouchableOpacity className="p-2">
              <Ionicons name="chevron-forward" size={20} color="#6b7280" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function ExerciseDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  return (
    <SafeAreaView>
      <Text>Exercise Detail : {id}</Text>
    </SafeAreaView>
  );
}

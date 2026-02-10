import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import ExerciseCard from "../../components/ExerciseCard";
import { supabase } from "../../../../lib/supabase";
import { Database } from "../../../../lib/supabase-types";

export default function Exercises() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [exercises, setExercises] = useState<
    Database["public"]["Tables"]["exercises"]["Row"][]
  >([]);
  const [filteredExercises, setFilteredExercises] = useState<
    Database["public"]["Tables"]["exercises"]["Row"][]
  >([]);

  const fetchExercises = async () => {
    try {
      const { data, error } = await supabase.from("exercises").select("*");
      if (error) {
        console.error("Error fetching exercises:", error.message);
        return;
      }

      const items = data as Database["public"]["Tables"]["exercises"]["Row"][];
      setExercises(items);
      setFilteredExercises(items);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  useEffect(() => {
    const filtered = exercises.filter(
      (exercise: Database["public"]["Tables"]["exercises"]["Row"]) =>
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredExercises(filtered);
  }, [searchQuery, exercises]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchExercises();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 bg-white border-b border-gray-200 py-6">
        <Text className="text-2xl font-bold text-gray-900">
          Exercise Library
        </Text>
        <Text className="text-gray-600 mt-1">
          Discover and master new exercises
        </Text>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 mt-4">
          <Ionicons name="search" size={20} color="#6b7280" />
          <TextInput
            className="flex-1 ml-3 text-gray-800"
            placeholder="Search exercises..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#6b7280" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Exercise List */}
      <FlatList
        data={filteredExercises}
        keyExtractor={(
          item: Database["public"]["Tables"]["exercises"]["Row"],
        ) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <ExerciseCard
            item={item}
            onPress={() => router.push(`/exercise-detail?id=${item.id}`)}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#3b82f6"]} // Android
            tintColor="#3b82f6" // iOS
            title="Pull to refresh exercises" // IOS
            titleColor="#6b7280" // IOS
          />
        }
        ListEmptyComponent={
          <View className="bg-white rounded-2xl p-8 items-center">
            <Ionicons name="fitness-outline" size={64} color="#9ca3af" />
            <Text className="text-gray-900 text-xl font-semibold mt-4">
              {searchQuery ? "No exercises found" : "Loading exercises..."}
            </Text>
            <Text className="text-gray-600 text-center mt-2">
              {searchQuery
                ? "Try searching for something else"
                : "Your exercises will appear here"}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

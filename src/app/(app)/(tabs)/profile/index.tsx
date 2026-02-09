import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Button } from "react-native";
import { supabase } from "../../../../../lib/supabase";

export default function Page() {
  return (
    <SafeAreaView className="flex flex-1">
      <Text>Profile</Text>
      <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
    </SafeAreaView>
  );
}

import { View } from "react-native";
import { Stack } from "expo-router";

import { Setting } from "~/feature/household/setting";

const Page = () => {
  return (
    <View>
      <Stack.Screen options={{ headerShown: false }} />
      <View className={"w-full"}>
        <Setting />
      </View>
    </View>
  );
};

export default Page;

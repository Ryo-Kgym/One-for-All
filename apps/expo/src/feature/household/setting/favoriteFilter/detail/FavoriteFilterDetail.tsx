import { FlatList, Pressable, Text, View } from "react-native";
import { useGetFavoriteFilterQuery } from "@v3/graphql/household";

export const FavoriteFilterDetail = ({ filterId }: { filterId: string }) => {
  const [{ data }] = useGetFavoriteFilterQuery({ variables: { filterId } });
  const args =
    data?.filter?.args.map((a) => ({
      id: a.id,
      type: a.type,
      value: a.value,
    })) ?? [];

  return (
    <View>
      <FlatList
        data={args}
        keyExtractor={({ id }) => id as string}
        renderItem={({ item }) => (
          <Pressable
            style={{
              borderStyle: "solid",
              borderBottomWidth: 0.5,
              borderColor: "gray",
              paddingTop: 10,
              paddingBottom: 8,
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            <View>
              <Text className={"text-xl text-gray-500"}>{item.type}</Text>
              <Text className={"text-right"}>{item.value}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

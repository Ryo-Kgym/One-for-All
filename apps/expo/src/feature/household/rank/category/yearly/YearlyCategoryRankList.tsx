import { useState } from "react";
import { Button, FlatList, Modal, Text, View } from "react-native";

import type { IocomeType } from "~/types/iocome-type";
import { getYear } from "~/func/date/get-year";
import { sortBy } from "~/hooks/household/total/sort-by";
import { useGetCategoryTotal } from "~/hooks/household/total/useGetCategoryTotal";
import { EditableIocomeType, FilterButton } from "~/ui";

export const YearlyCategoryRankList = ({ year }: { year: Date }) => {
  const [visible, setVisible] = useState(false);
  const [iocomeType, setIocomeType] = useState<IocomeType>("INCOME");

  const { firstDayOfYear, lastDateNotGreaterThanToday } = getYear(year);
  const { categoryTotal, loading } = useGetCategoryTotal({
    fromDate: firstDayOfYear,
    toDate: lastDateNotGreaterThanToday,
    iocomeType: [iocomeType],
    sort: sortBy.amount.desc,
  });

  if (loading) return <Text>loading...</Text>;

  return (
    <>
      <FilterButton pressHandler={() => setVisible(!visible)} />
      <Modal animationType={"fade"} visible={visible} transparent>
        <View className={"flex-1 justify-center bg-black/30"}>
          <View className={"m-5 rounded-xl bg-neutral-100 px-3 pb-2 pt-1"}>
            <View className={"flex-row items-center justify-between"}>
              <Text className={"text-center text-xl"}>条件</Text>
              <Button onPress={() => setVisible(!visible)} title={"×"} />
            </View>
            <View>
              <EditableIocomeType value={iocomeType} setValue={setIocomeType} />
            </View>
          </View>
        </View>
      </Modal>
      <FlatList
        data={categoryTotal}
        keyExtractor={(item) => item.categoryId}
        renderItem={({ item, index }) => (
          <View
            key={item.categoryId}
            className={"flex-row items-center border-b border-b-gray-300 py-2"}
          >
            <Text className={"w-1/12 pr-2 text-right text-sm text-gray-600"}>
              {index + 1}
            </Text>
            <View className={"flex-1 flex-row justify-between"}>
              <Text className={"text-xl text-gray-600"}>
                {item.categoryName}
              </Text>
              <Text className={"pr-2 text-right text-xl"}>
                {item.amount.toLocaleString()}
              </Text>
            </View>
          </View>
        )}
      />
    </>
  );
};

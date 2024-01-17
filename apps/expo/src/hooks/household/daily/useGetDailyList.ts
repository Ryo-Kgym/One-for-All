import { useGetDailyDetailByDateQuery } from "@/turbo/graphql/household";

import type { Daily } from "~/hooks/household/daily/daily";
import type { IocomeType } from "~/types/iocome-type";
import { useSaveGroupId } from "~/hooks/group/useSaveGroupId";

export const useGetDailyList = ({
  fromDate,
  toDate,
}: {
  fromDate: Date;
  toDate: Date;
}) => {
  const { groupId } = useSaveGroupId();

  const [{ data: detailData }] = useGetDailyDetailByDateQuery({
    variables: {
      groupId,
      fromDate: fromDate.toISOString().slice(0, 10),
      toDate: toDate.toISOString().slice(0, 10),
    },
  });

  const dailyDetailList: Daily[] =
    detailData?.dailyDetailByDateList.map((detail) => ({
      id: detail.id,
      accountName: detail.accountByAccountId.accountName,
      amount: detail.amount as number,
      categoryName: detail.categoryByCategoryId.categoryName,
      genreName: detail.categoryByCategoryId.genreByGenreId.genreName,
      iocomeType: detail.categoryByCategoryId.genreByGenreId
        .iocomeType as IocomeType,
      memo: detail.memo ?? null,
    })) ?? [];

  const incomeTotal = dailyDetailList.reduce(
    (acc, cur) => (cur.iocomeType === "INCOME" ? acc + cur.amount : acc),
    0,
  );

  const outcomeTotal = dailyDetailList.reduce(
    (acc, cur) => (cur.iocomeType === "OUTCOME" ? acc + cur.amount : acc),
    0,
  );

  return { dailyDetailList, incomeTotal, outcomeTotal };
};
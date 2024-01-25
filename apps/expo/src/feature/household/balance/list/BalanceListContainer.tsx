import { useRouter } from "expo-router";
import { useGetAccountBalanceListQuery } from "@v3/graphql/household";

import { paths } from "~/app/paths";
import { useSaveGroupId } from "~/hooks/group/useSaveGroupId";
import { BalanceListPresenter } from "./BalanceListPresenter";

export const BalanceListContainer = () => {
  const { groupId } = useSaveGroupId();
  const { push } = useRouter();

  const [{ data }] = useGetAccountBalanceListQuery({
    variables: {
      groupId,
      fromDate: "2019-01-01",
      toDate: "2099-12-31",
    },
  });
  const accounts =
    data?.account.map((account) => ({
      id: account.id,
      name: account.accountName,
      balance:
        (account.allDetailViewsAggregate?.aggregate?.sum
          ?.signedAmount as number) ?? 0,
      redirectHandler: () =>
        push(paths.household.detailListByAccount(account.id) as "/"),
    })) ?? [];
  return <BalanceListPresenter accounts={accounts} />;
};

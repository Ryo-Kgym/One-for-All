/*
 * Copyright (c) 2023 Ryo-Kgym.
 */

import type { TableProps } from "@components/atoms/Table";
import { Table } from "@components/atoms/Table/index";

type UsedPointHistoryPresenterProps = {
  tableProps: TableProps[];
};

const header = ["日付", "項目", "件数", "つかったポイント"];

export const UsedPointHistoryPresenter = ({
  tableProps,
}: UsedPointHistoryPresenterProps) => (
  <Table header={header} tablePropsList={tableProps} size={"md"} />
);

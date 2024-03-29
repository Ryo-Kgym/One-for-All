/*
 * Copyright (c) 2024 Ryo-Kgym.
 */

import type { ColumnProps, TableProps } from "@components/atoms/Table";
import { Table } from "@components/atoms/Table/index";

export const MonthlyCategoryPresenter = ({
  tablePropsList,
  footer,
  monthNames,
}: {
  tablePropsList: TableProps[];
  footer: ColumnProps[][];
  monthNames: string[];
}) => (
  <div>
    <Table
      header={["カテゴリ"].concat(monthNames).concat("合計")}
      tablePropsList={tablePropsList}
      footer={footer}
      size={"xs"}
      height={"70vh"}
      toBottom
      defaultBottom={false}
    />
  </div>
);

/*
 * Copyright (c) 2023 Ryo-Kgym.
 */
"use client";

import type { TableProps } from "@components/atoms/Table";
import { useState } from "react";
import { createMonthNames } from "@function/date/create-month-names";
import { useGetMonthlyDeposit } from "@hooks/household/deposit/useGetMonthlyDeposit";

import { DepositPresenter } from "./DepositPresenter";

export const DepositContainer = () => {
  const thisYear = new Date().getFullYear();

  const [fromMonth, setFromMonth] = useState<Date | null>(
    new Date(thisYear, 0, 1),
  );
  const [toMonth, setToMonth] = useState<Date | null>(
    new Date(thisYear, 11, 31),
  );

  const { monthlyDeposits, loading } = useGetMonthlyDeposit({
    fromDate: fromMonth!,
    toDate: toMonth!,
  });

  let tablePropsList: TableProps[] = [];

  if (loading) return <div>loading...</div>;

  const header: string[] = [
    "カテゴリ",
    ...createMonthNames(fromMonth!, toMonth!),
  ];

  tablePropsList = monthlyDeposits.map((md) => ({
    keyPrefix: md.categoryId,
    columns: [
      { value: md.categoryName, align: "left" },
      ...md.monthlyCategory.map((mc) => ({
        value: mc.amount.toLocaleString(),
        align: "right",
      })),
    ],
  })) as TableProps[];

  return (
    <DepositPresenter
      fromMonth={fromMonth}
      changeFromMonth={setFromMonth}
      toMonth={toMonth}
      changeToMonth={setToMonth}
      header={header}
      tablePropsList={tablePropsList}
    />
  );
};

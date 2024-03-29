/*
 * Copyright (c) 2024 Ryo-Kgym.
 */

import type { Navi } from "@app/_layout/navi";
import { NavbarSection } from "@app/_layout/NavbarSection";
import { RegisterDailyButton } from "@components/molecules";

export const HouseholdLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className={"bg-white text-black"}>
    <NavbarSection header={"家計簿アプリ"} naviArray={householdNavis}>
      {children}
      <div className={"z-100 absolute bottom-16 right-5"}>
        <RegisterDailyButton />
      </div>
    </NavbarSection>
  </div>
);

const householdNavis: Navi[] = [
  {
    label: "戻る",
    url: "/top",
  },
  {
    label: "アカウント",
    url: "/household/account",
  },
  {
    label: "カレンダー",
    url: "/household/daily",
  },
  {
    label: "ジャンル",
    url: "/household/genre",
  },
  {
    label: "カテゴリ",
    url: "/household/category",
  },
  {
    label: "サマリ",
    url: "/household/summary",
  },
  {
    label: "預金",
    url: "/household/deposit",
  },
  {
    label: "クレカ履歴",
    url: "/household/creditCard",
  },
  {
    label: "ファイル取込",
    url: "/household/fileImport",
  },
  {
    label: "設定",
    url: "/household/setting",
  },
];

/*
 * Copyright (c) 2023 Ryo-Kgym.
 */

import type { DailyTotal } from "@domain/model/household/DailyTotal";
import { Day } from "@app/household/daily/@calendar/_material/day";
import { DateSelectButton } from "@components/ui";
import { MonthPicker } from "@components/ui/date";

type CalendarPresenterProps = {
  baseDate: Date | null;
  setBaseDate: (_: Date | null) => void;
  dailyTotalList: DailyTotal[];
  refetch: () => void;
};
export const CalendarPresenter = ({
  baseDate,
  setBaseDate,
  dailyTotalList,
  refetch,
}: CalendarPresenterProps) => (
  <div className={"w-full"}>
    <div className={"flex w-full"}>
      <div className={"flex items-center"}>
        <DateSelectButton />
      </div>
      <div className={"flex-1"}>
        <MonthPicker value={baseDate} setValue={setBaseDate} />
      </div>
      <div className={"flex items-center"}>
        <DateSelectButton type={"month"} />
      </div>
    </div>

    <div className={"grid w-full grid-cols-7 border-l-2 border-gray-400"}>
      <Week />
      {dailyTotalList.map((e, index) => (
        <Day
          key={`day${index}`}
          baseDate={baseDate!}
          date={e.date}
          income={e.incomeTotal}
          outcome={e.outcomeTotal}
          refetch={refetch}
        />
      ))}
    </div>
  </div>
);

const Week = () => {
  const baseStyle = "p-2 border-r-2 border-b-2 border-t-2 border-gray-400";

  return (
    <>
      <div className={baseStyle + " text-red-600"}>日</div>
      <div className={baseStyle}>月</div>
      <div className={baseStyle}>火</div>
      <div className={baseStyle}>水</div>
      <div className={baseStyle}>木</div>
      <div className={baseStyle}>金</div>
      <div className={baseStyle + " text-blue-600"}>土</div>
    </>
  );
};

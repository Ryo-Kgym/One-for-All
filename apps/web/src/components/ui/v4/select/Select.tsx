import type { SelectProps } from "@components/ui/v4/select/index";
import { useState } from "react";
import { FieldFrame } from "@components/ui/v4/FieldFrame";

export const Select = <T extends string | number>({
  label,
  value,
  setValue,
  data,
}: SelectProps<T>) => {
  const [openOption, setOpenOption] = useState(false);

  return (
    <div>
      <div className={"text-sm"}>{label}</div>
      <FieldFrame>
        <input
          className={"w-full cursor-pointer p-2 focus:outline-none"}
          value={value}
          readOnly
          onClick={() => setOpenOption(true)}
        />
        <div className={""}>
          <div className={"absolute z-10 pl-5"}>
            {data
              .filter((_) => openOption)
              .map((item) => (
                <div key={item.value}>
                  <button
                    className={
                      "w-full rounded-md border-2 border-gray-300 bg-inherit p-1 text-left hover:bg-gray-200"
                    }
                    onClick={() => {
                      setValue(item.value);
                      setOpenOption(false);
                    }}
                  >
                    {item.label}
                  </button>
                </div>
              ))}
          </div>
        </div>
      </FieldFrame>
    </div>
  );
};
import type { FieldValueProps } from "@components/ui/v4/property";
import { FieldContainer } from "@components/ui/v4/FieldContainer";

export const TextInput = ({
  label,
  value,
  setValue,
  required = false,
  placeholder,
  disabled,
}: FieldValueProps<string>) => {
  const requiredStyle = required && !value ? "bg-red-100" : "bg-inherit";

  return (
    <FieldContainer label={label}>
      <input
        className={`w-full cursor-pointer p-2 focus:outline-none ${requiredStyle} disabled:cursor-not-allowed disabled:bg-gray-200`}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
      />
    </FieldContainer>
  );
};

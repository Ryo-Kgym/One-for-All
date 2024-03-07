import type { FieldKind } from "@oneforall/domain/field/type";

export type AppFieldValue = NonNullable<
  Record<
    number,
    {
      fieldName: string;
      fieldKind: FieldKind;
    }
  >
>;
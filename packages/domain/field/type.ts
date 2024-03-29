type BaseProperties = {
  name: string;
  valueType: string;
  initialValue: string;
  disabled?: boolean;
};

export type FieldProperties = {
  text: {
    name: "Text";
  } & BaseProperties;
  selectBox: {
    name: "SelectBox";
    data: { label: string; value: string }[];
  } & BaseProperties;
  multipleText: {
    name: "MultipleText";
  } & BaseProperties;
};

export type FieldKind = keyof FieldProperties;

export const fieldKindArray: Record<
  FieldKind,
  {
    fieldKind: FieldKind;
    description: string;
  }
> = {
  text: {
    fieldKind: "text",
    description: "テキスト",
  },
  selectBox: {
    fieldKind: "selectBox",
    description: "選択肢",
  },
  multipleText: {
    fieldKind: "multipleText",
    description: "複数テキスト",
  },
};

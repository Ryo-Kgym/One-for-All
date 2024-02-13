import type { ArgsMapType, BoxesType } from "./type";
import { featureSetting } from "./feature-setting";

export const generateBox = (boxes: BoxesType): React.ReactNode[] => {
  return boxes.map(({ feature, argsMap }, index) => {
    const { component: Component, argsTypes } = featureSetting[feature];
    const props = {};

    if (argsTypes.includes("year")) {
      appendProps({
        argsMap,
        props,
        key: "year",
        parseToProps: ({ value }) => {
          const year = new Date();
          year.setFullYear(year.getFullYear() + (value as number));
          return year;
        },
      });
    }

    if (argsTypes.includes("month")) {
      appendProps({
        argsMap,
        props,
        key: "month",
        parseToProps: ({ value }) => {
          const month = new Date();
          month.setMonth(month.getMonth() + (value as number));
          return month;
        },
      });
    }
    if (argsTypes.includes("genreType")) {
      appendProps({
        argsMap,
        props,
        key: "genreType",
        parseToProps: ({ value }) => value,
      });
    }

    return <Component key={index} {...props} />;
  });
};

const appendProps = ({
  props,
  argsMap,
  key,
  parseToProps,
}: {
  props: unknown;
  argsMap: ArgsMapType[];
  key: string;
  parseToProps: (argsMapType: ArgsMapType) => unknown;
}) => {
  const argsMapType = argsMap.filter((arg) => arg.type === key)?.[0];
  if (!argsMapType) throw new Error(`${key} type is required`);

  return Object.defineProperty(props, key, {
    value: parseToProps(argsMapType),
    enumerable: true,
  });
};

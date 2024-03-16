import type { Records } from "@feature/app/schema/record-schema";
import { recordSchema } from "@feature/app/schema";
import { recordsSchema } from "@feature/app/schema/record-schema";

import type { GetAppQuery } from "../../../../../../packages/graphql/public/type";

export const convertToRecords = (
  recordData: NonNullable<GetAppQuery["app"]>["records"],
): Records => {
  const recordsData = recordData.reduce(
    (acc, r) =>
      ({
        ...acc,
        [r.index]: {
          recordId: r.id,
          columns: recordSchema.parse(JSON.parse(r.columns ?? "{}")),
          isEditing: false,
        },
      }) as Records,
    {},
  );
  return recordsSchema.parse(recordsData);
};
import type { Record, Records } from "@feature/app/schema/record-schema";
import type { RecordListMode } from "@feature/record/list/RecordListClient";
import { generateId } from "@feature/app/function/generate-id";
import { useInsertRecordMutation } from "@v3/graphql/public";

export const SaveNewRecordButton = ({
  appId,
  records,
  setRecords,
  newRecord,
  setNewRecord,
  mode,
  setMode,
  recordTemplate,
}: {
  appId: string;
  records: Records;
  setRecords: (records: Records) => void;
  newRecord: Record;
  setNewRecord: (newRecord: Record) => void;
  mode: RecordListMode;
  setMode: (mode: RecordListMode) => void;
  recordTemplate: Record;
}) => {
  const [, mut] = useInsertRecordMutation();

  const saveRecordHandler = async () => {
    if (!mode) return;

    const newRecordIndex = Math.max(
      ...Object.keys(records).map((n) => parseInt(n)),
    );
    const recordId: string = generateId();

    try {
      const { error } = await mut({
        id: recordId,
        appId,
        index: newRecordIndex,
        columns: JSON.stringify({
          ...Object.entries(newRecord).reduce(
            (acc, [fieldId, { fieldKind, value }]) => ({
              ...acc,
              [fieldId]: {
                fieldKind,
                value,
              },
            }),
            {},
          ),
        }),
      });
      if (error) throw error;

      setRecords({
        ...records,
        [newRecordIndex]: {
          recordId,
          columns: {
            ...Object.entries(newRecord).reduce(
              (acc, [fieldId, { fieldKind, value }]) => ({
                ...acc,
                [fieldId]: {
                  fieldKind,
                  value,
                  editing: false,
                },
              }),
              {},
            ),
          },
        },
      });
      setNewRecord(recordTemplate);
      setMode("show");
      alert("レコードを追加しました");
    } catch (e) {
      console.error(e);
      alert("レコード追加に失敗しました");
    }
  };

  return <button onClick={saveRecordHandler}>追加</button>;
};

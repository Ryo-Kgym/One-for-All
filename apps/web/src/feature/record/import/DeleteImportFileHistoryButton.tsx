import type { ImportFileHistory } from "@feature/app/schema";
import Trash from "@components/ui/v4/icon/Trash";
import {
  useDeleteImportFileHistoryMutation,
  useDeleteRecordMutation,
} from "@v3/graphql/public";

export const DeleteImportFileHistoryButton = ({
  historyId,
  histories,
  setHistories,
}: {
  historyId: string;
  histories: ImportFileHistory[];
  setHistories: (histories: ImportFileHistory[]) => void;
}) => {
  const [, mut] = useDeleteImportFileHistoryMutation();
  const [, recordMut] = useDeleteRecordMutation();

  const deleteHandler = async () => {
    try {
      const { data, error } = await mut({ historyId });
      if (error) {
        throw error;
      }
      data?.deleteImportFileRecord?.returning.forEach(({ recordId }) =>
        recordMut({ recordId }),
      );

      alert("削除しました");
      setHistories(histories.filter((h) => h.id !== historyId));
    } catch (e) {
      console.error(e);
      alert("削除に失敗しました");
    }
  };

  return (
    <div className={"flex items-center justify-center"}>
      <button className={"h-8 w-8 bg-inherit"} onClick={deleteHandler}>
        <Trash />
      </button>
    </div>
  );
};
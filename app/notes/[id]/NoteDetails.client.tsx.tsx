import css from "@/app/notes/[id]/NoteDetails.module.css";
import { Note } from "../../../types/note";

type Props = {
  item?: Note | null;
  isLoading?: boolean;
  error?: Error | null;
};

const NoteDetailsClient = ({ item, isLoading, error }: Props) => {
  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !item) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{item.title}</h2>
          <button className={css.editBtn}>Edit note</button>
        </div>
        <p className={css.content}>{item.content}</p>
        <p className={css.date}>Created: {item.createdAt ?? item.updatedAt}</p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;

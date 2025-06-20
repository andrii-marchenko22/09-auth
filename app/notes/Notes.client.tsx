import css from "@/app/notes/NoteDetails.module.css";
import { Note } from "../../types/note";

interface noteProps {
  item: Note;
}

const NoteDetailsClient = ({ item }: noteProps) => {
  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{item.title}</h2>
          <button className={css.editBtn}>Edit note</button>
        </div>
        <p className={css.content}>{item.content}</p>
        <p className={css.date}>
          Created: {item.createdAt ? item.createdAt : item.updatedAt}
        </p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;

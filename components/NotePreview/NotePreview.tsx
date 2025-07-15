"use client";

import { useQuery } from "@tanstack/react-query";
import css from "./NotePreview.module.css";
import { fetchNoteById } from "@/lib/api/clientApi";

interface NoteDetailsClientProps {
  noteId: string;
  onClose: () => void;
}

const NoteDetailsClient = ({ noteId, onClose }: NoteDetailsClientProps) => {
  const {
    data: item,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !item) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{item.title}</h2>
          <button className={css.backBtn} onClick={onClose}>
            Go back
          </button>
        </div>
        <p className={css.content}>{item.content}</p>
        <p className={css.date}>Created: {item.createdAt ?? item.updatedAt}</p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;

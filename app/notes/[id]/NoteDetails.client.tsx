"use client";

import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { hydrate } from "@tanstack/query-core";
import css from "@/app/notes/[id]/NoteDetails.module.css";
import { fetchNoteById } from "@/lib/api";

interface NoteDetailsClientProps {
  noteId: number;
  dehydratedState: unknown;
}

const NoteDetailsClient = ({
  noteId,
  dehydratedState,
}: NoteDetailsClientProps) => {
  const [queryClient] = useState(() => {
    const queryClientInstance = new QueryClient();
    hydrate(queryClientInstance, dehydratedState);
    return queryClientInstance;
  });

  return (
    <QueryClientProvider client={queryClient}>
      <NoteDetailsContent noteId={noteId} />
    </QueryClientProvider>
  );
};

const NoteDetailsContent = ({ noteId }: { noteId: number }) => {
  const {
    data: item,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

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

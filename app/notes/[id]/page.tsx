import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { QueryClient, dehydrate } from "@tanstack/react-query";

interface Props {
  params: Promise<{ id: string }>;
}

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const noteId = Number(id);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <NoteDetailsClient noteId={noteId} dehydratedState={dehydratedState} />
  );
};

export default NoteDetails;

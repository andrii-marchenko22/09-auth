import { fetchNoteById } from "@/lib/api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import PreviewClient from "./NotePreviewClient";

interface Props {
  params: Promise<{ id: string }>;
}

const NoteDetailsModal = async ({ params }: Props) => {
  const { id } = await params;
  const noteId = Number(id);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PreviewClient noteId={noteId} />
    </HydrationBoundary>
  );
};

export default NoteDetailsModal;

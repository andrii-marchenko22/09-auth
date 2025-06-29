import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "@/app/@modal/(.)notes/[id]/NotePreviewClient";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={noteId} />
    </HydrationBoundary>
  );
};

export default NoteDetails;

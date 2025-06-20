import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "@/app/notes/Notes.client";
import { QueryClient } from "@tanstack/react-query";

interface Props {
  params: Promise<{ id: string }>;
}

const NoteDetails = async ({ params }: Props) => {
  const res = await params;

  const useQueryClient = new QueryClient();

  useQueryClient.prefetchQuery({
    queryKey: ["note", res.id],
    queryFn: () => fetchNoteById(res.id),
  });

  const note = await fetchNoteById(res.id);

  return <NoteDetailsClient item={note} />;
};

export default NoteDetails;

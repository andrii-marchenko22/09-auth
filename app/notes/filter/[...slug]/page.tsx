import { getNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface Props {
  params: Promise<{ slug: string[] }>;
}

const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  const category = slug[0]?.toLowerCase() === "all" ? undefined : slug[0];
  const initialData = await getNotes(category);

  return (
    <div>
      <NotesClient initialData={initialData} activeTag={category ?? "all"} />
    </div>
  );
};

export default NotesByCategory;

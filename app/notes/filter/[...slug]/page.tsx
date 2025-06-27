import { getNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  const category = slug[0] === "all" ? undefined : slug[0];
  const initialData = await getNotes(category);

  return (
    <div>
      <NotesClient initialData={initialData} />
    </div>
  );
};

export default NotesByCategory;

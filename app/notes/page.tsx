import NotesClient from "./Notes.client";
import { getInitialNotes } from "@/lib/api";

const NotesPage = async () => {
  const initialData = await getInitialNotes();
  return <NotesClient initialData={initialData} />;
};

export default NotesPage;

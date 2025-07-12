import type {
  Note,
  NewNote,
  NotesResponse,
  RegisterRequest,
} from "@/types/note";
import { nextServer } from "./api";
import { User } from "../../types/note";

type FetchNotesResponse = NotesResponse & { totalCount: number };

export const fetchNotes = async (
  searchText: string,
  page = 1,
  perPage = 12,
  tag?: string
): Promise<FetchNotesResponse> => {
  const response = await nextServer.get<NotesResponse>("/notes", {
    params: {
      ...(searchText !== "" && { search: searchText }),
      page,
      perPage,
      ...(tag && tag !== "all" && { tag }),
    },
  });

  const totalCount = Number(response.headers["x-total-count"]);

  return { ...response.data, totalCount };
};

export const createNote = async (noteData: NewNote): Promise<Note> => {
  const { data } = await nextServer.post<Note>("/notes", noteData);
  return data;
};

export const deleteNote = async (notesId: number): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`/notes/${notesId}`);
  return data;
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
};

export const getInitialNotes = () => fetchNotes("", 1, 12, "");

export const getNotes = async (tagId?: string): Promise<NotesResponse> => {
  const { data } = await nextServer.get<NotesResponse>("/notes", {
    params: {
      ...(tagId && tagId !== "all" && { tag: tagId }),
    },
  });

  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const register = async (data: RegisterRequest) => {
  const response = await nextServer.post<User>("/auth/register", data);
  return response.data;
};

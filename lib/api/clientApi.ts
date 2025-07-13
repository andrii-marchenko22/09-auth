import type { Note, NewNote, NotesResponse } from "@/types/note";
import { nextServer } from "./api";
import { User } from "@/types/user";
import { UserRequest, CheckSessionRequest } from "@/types/user";

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

export const register = async (data: UserRequest): Promise<User> => {
  const response = await nextServer.post<User>("/auth/register", data);
  return response.data;
};

export const login = async (data: UserRequest): Promise<User> => {
  const response = await nextServer.post<User>("/auth/login", data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const checkSession = async () => {
  const { data } = await nextServer.get<CheckSessionRequest>("/auth/session");
  return data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/auth/me");
  return data;
};

export const updateUser = async (data: { username: string }): Promise<User> => {
  const response = await nextServer.patch<User>("/users/me", data);
  return response.data;
};

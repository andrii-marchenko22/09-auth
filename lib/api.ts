import axios from "axios";
import type { Note, NewNote, NotesResponse } from "../types/note";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const BASE_URL = "https://notehub-public.goit.study/api/notes";

type fetchNotesResponse = NotesResponse & { totalCount: number };

export const fetchNotes = async (
  searchText: string,
  page = 1,
  perPage = 12,
  tag?: string
): Promise<fetchNotesResponse> => {
  const response = await axios.get<NotesResponse>(BASE_URL, {
    params: {
      ...(searchText !== "" && { search: searchText }),
      page,
      perPage,
      ...(tag && tag !== "all" && { tag }),
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const totalCount = Number(response.headers["x-total-count"]);

  return { ...response.data, totalCount };
};

export const createNote = async (noteData: NewNote): Promise<Note> => {
  const { data } = await axios.post<Note>(BASE_URL, noteData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const deleteNote = async (notesId: number): Promise<Note> => {
  const { data } = await axios.delete<Note>(`${BASE_URL}/${notesId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const { data } = await axios.get<Note>(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getInitialNotes = () => fetchNotes("", 1, 12, "");

export const getNotes = async (tagId?: string): Promise<NotesResponse> => {
  const { data } = await axios.get<NotesResponse>(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...(tagId && tagId !== "all" && { tag: tagId }),
    },
  });

  return data;
};

export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: string;
}

export interface NewNote {
  title: string;
  content: string;
  tag: string;
}

export interface NotesResponse {
  notes: Note[];
  page: number;
  totalPages: number;
  tag: string;
}

export interface User {
  username: string;
  email: string;
  avatar: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

"use client";

import { fetchNotes } from "@/lib/api";
import { NoteList } from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import css from "@/app/notes/page.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SearchBox } from "@/components/SearchBox/SearchBox";
import { NoteModal } from "@/components/NoteModal/NoteModal";
import { useDebounce } from "use-debounce";
import { Toaster } from "react-hot-toast";
import { ErrorMessage } from "@/components/ErrorMesage/ErrorMesage";
import { Loader } from "@/components/Loader/Loader";

const Notes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", debouncedSearchQuery, currentPage],
    queryFn: () => fetchNotes(debouncedSearchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const handleSearchQuery = (newQuery: string) => {
    setSearchQuery(newQuery);
    setCurrentPage(1);
  };

  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? [];

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={searchQuery} onSearch={handleSearchQuery} />
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={(page: number) => setCurrentPage(page)}
            />
          )}
          <button className={css.button} onClick={openModal}>
            Create note +
          </button>
        </header>
        {isModalOpen && <NoteModal onClose={closeModal} />}
        {error && <ErrorMessage message="Could not fetch the list of notes." />}
        {isLoading && <Loader />}
        {!isLoading && !error && notes.length > 0 && <NoteList notes={notes} />}
        {!isLoading && !error && notes.length === 0 && (
          <p>No notes found for your search.</p>
        )}
      </div>
    </>
  );
};

export default Notes;

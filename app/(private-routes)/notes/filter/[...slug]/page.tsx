import { getNotes } from "@/lib/api/clientApi.ts";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = slug[0];

  return {
    title: `Category: ${category}`,
    description: `View all notes filtered by category: ${category}.`,
    openGraph: {
      title: `Notes filtered by: ${category}`,
      description: `Browse all notes in the "${category}" category.`,
      url: `https://08-zustand-beryl.vercel.app/notes/filter/${slug.join("/")}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://placehold.co/1200x630",
          width: 1200,
          height: 630,
          alt: `${category}`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `Notes filtered by: ${category}`,
      description: `Browse all notes in the "${category}" category.`,
      images: ["https://ac.goit.global/fullstack/react/og-meta.jpg"],
    },
  };
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

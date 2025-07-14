import css from "./NotFound.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found — NoteHub",
  description:
    "Sorry, the page you are looking for does not exist. Explore other features and notes at NoteHub.",
  openGraph: {
    title: "Page Not Found — NoteHub",
    description:
      "This page could not be found. Browse NoteHub to manage and organize your notes effortlessly.",
    url: "https://09-auth-ruddy-nine.vercel.app/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Page Not Found - NoteHub",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Page Not Found — NoteHub",
    description:
      "Sorry, the page you are trying to access doesn't exist. Visit NoteHub to keep track of your notes.",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
  themeColor: "#4A90E2",
};

const NotFound = () => {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
};

export default NotFound;

import { Metadata } from "next";
import SignUpPage from "./SignUpPage";

export const metadata: Metadata = {
  title: "NoteHub: Sign up",
  description:
    "Create a free account and start organizing your notes with NoteHub.",
  openGraph: {
    title: "NoteHub: Sign up",
    description:
      "Create a free account and start organizing your notes with NoteHub.",
    url: "https://08-zustand-beryl.vercel.app/sign-up",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Sign up",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoteHub: Sign up",
    description: "Create your NoteHub account and start managing your notes.",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

const SingUp = () => {
  return <SignUpPage />;
};

export default SingUp;

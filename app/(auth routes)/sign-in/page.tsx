import { Metadata } from "next";
import SignInPage from "./SignInPage";

export const metadata: Metadata = {
  title: "NoteHub: Sign in",
  description: "Sign in to your NoteHub account and manage your notes easily.",
  openGraph: {
    title: "NoteHub: Sign in",
    description:
      "Sign in to your NoteHub account and manage your notes easily.",
    url: "https://08-zustand-beryl.vercel.app/sign-in",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Sign in",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoteHub: Sign in",
    description:
      "Sign in to your NoteHub account and manage your notes easily.",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

const SingIn = () => {
  return <SignInPage />;
};

export default SingIn;

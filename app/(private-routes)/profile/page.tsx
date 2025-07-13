import type { Metadata } from "next";
import { getUserFromServer } from "@/lib/api/serverApi";
import ProfilePage from "./profileUser";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getUserFromServer();

  return {
    title: `NoteHub — Profile: ${user.username}`,
    description: "Your personal profile page in NoteHub.",
    openGraph: {
      title: `Profile — ${user.username}`,
      description:
        "Check your username, email, and avatar in your NoteHub profile.",
      url: "https://08-zustand-beryl.vercel.app/profile",
      images: [
        {
          url:
            user.avatar ||
            "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "User Avatar",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Profile — ${user.username}`,
      description: "Manage your personal profile details in NoteHub.",
      images: [
        user.avatar ||
          "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      ],
    },
  };
}

const Profile = () => {
  return <ProfilePage />;
};

export default Profile;

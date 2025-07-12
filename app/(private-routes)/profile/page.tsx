import type { Metadata } from "next";
import { useAuthStore } from "@/lib/store/authStore";
import Image from "next/image";
import css from "./ProfilePage.module.css";
import { getUserFromServer } from "@/lib/api/serverApi";

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
    themeColor: "#4A90E2",
  };
}

const Profile = () => {
  const { user } = useAuthStore();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <a href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </a>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={
              user?.avatar ||
              "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"
            }
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username || "your_username"}</p>
          <p>Email: {user?.email || "your_email@example.com"}</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;

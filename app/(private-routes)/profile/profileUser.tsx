"use client";

import { useAuthStore } from "@/lib/store/authStore";
import Image from "next/image";
import css from "./ProfilePage.module.css";

const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);
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
            priority
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

export default ProfilePage;

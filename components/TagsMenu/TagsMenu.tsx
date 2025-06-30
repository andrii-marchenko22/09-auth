"use client";

import tags from "@/lib/tags";
import css from "./TagsMenu.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(isOpen ? false : true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className={css.menuContainer}>
      <button
        className={css.menuButton}
        onClick={toggleMenu}
        aria-controls="tags-menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Notes ▾
      </button>

      {isOpen && (
        <ul id="tags-menu" className={css.menuList} role="menu">
          <li className={css.menuItem} role="menuitem">
            <Link
              href={`/notes/filter/All`}
              className={css.menuLink}
              onClick={toggleMenu}
            >
              All
            </Link>
          </li>
          {tags.map((tag) => (
            <li className={css.menuItem} key={`${tag}`} role="menuitem">
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={toggleMenu}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

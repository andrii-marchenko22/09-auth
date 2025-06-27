"use client";

import css from "./TagsMenu.module.css";
import Link from "next/link";
import { useId, useState } from "react";

interface TagsMenuProps {
  tags: string[];
}

export const TagsMenu = ({ tags }: TagsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const openMenu = () => setIsOpen(isOpen ? false : true);
  const id = useId();

  return (
    <div className={css.menuContainer}>
      <button
        className={css.menuButton}
        onClick={openMenu}
        aria-controls="tags-menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Notes ▾
      </button>

      {isOpen && (
        <ul id="tags-menu" className={css.menuList} role="menu">
          {["All", ...tags].map((tag, index) => (
            <li
              className={css.menuItem}
              key={`${id}-tag-${index}`}
              role="menuitem"
            >
              <Link
                href={`/notes/filter/${tag.toLowerCase()}`}
                className={css.menuLink}
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

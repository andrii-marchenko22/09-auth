"use client";

import tags from "@/lib/tags";
import css from "./TagsMenu.module.css";
import Link from "next/link";
import { useState } from "react";

export const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openMenu = () => setIsOpen(isOpen ? false : true);

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
          <li className={css.menuItem} role="menuitem">
            <Link href={`/notes/filter/All`} className={css.menuLink}>
              All
            </Link>
          </li>
          {tags.map((tag) => (
            <li className={css.menuItem} key={`${tag}`} role="menuitem">
              <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

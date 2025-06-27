import Link from "next/link";
import css from "./SidebarNotes.module.css";
import { getTags } from "@/lib/api";

const SidebarNotes = async () => {
  const tags = await getTags();
  return (
    <ul id="tags-menu" className={css.menuList} role="menu">
      {tags.map((tag, index) => (
        <li className={css.menuItem} key={`${index}-tag`} role="menuitem">
          <Link
            href={`/notes/filter/${tag.toLowerCase()}`}
            className={css.menuLink}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;

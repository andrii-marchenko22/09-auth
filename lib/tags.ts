const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;

export type Tag = (typeof tags)[number];

export default tags;

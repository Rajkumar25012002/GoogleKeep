export interface Note {
  id: string;
  title: string;
  content: string;
  backgroundColor?: string;
  backgroundImage?: string;
  editedOn?: Date;
  labels?: string[];
  remainder?: Remainder;
  isArchived?: boolean;
  isEdited?: boolean;
  isDeleted?: boolean;
  isPinned?: boolean;
}
export interface Remainder {
  date?: Date;
  time?: string;
  repeat?: string;
}

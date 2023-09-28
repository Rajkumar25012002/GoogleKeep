export interface Note {
  id: string;
  title: string;
  content: string;
  backgroundColor?: string;
  backgroundImage?: string;
  editedOn: Date;
  labels?: string[];
  remainder?: Date[];
  isArchived?: boolean;
  isEdited?: boolean;
  isDeleted?: boolean;
  isPinned?: boolean;
}

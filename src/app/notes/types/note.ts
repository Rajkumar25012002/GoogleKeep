export interface Note{
    id: string,
    title: string,
    content: string,
    backgroundColor?: string,
    backgroundImage?: string,
    editedOn: Date,
    isPinned?: boolean,
    labels?: string[],
    isArchived?: boolean,
    isEdited?: boolean,
}
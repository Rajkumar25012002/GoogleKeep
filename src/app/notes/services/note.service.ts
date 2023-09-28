import { Injectable } from '@angular/core';
import { Note, Remainder } from '../types/note';
import { Observable, BehaviorSubject, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private noteSubject$ = new BehaviorSubject<Note[]>([]);
  notes$ = this.noteSubject$.asObservable();
  private uniqueLabels: Set<string> = new Set<string>();
  private labelsListSubject: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  public labelsList$: Observable<string[]> =
    this.labelsListSubject.asObservable();

  constructor() {}
  addNote(note: Note): void {
    this.noteSubject$.next([...this.noteSubject$.value, note]);
    this.updateLabels(note.labels || []);
  }
  addCopy(note: Note): void {
    const newNote = { ...note };
    newNote.id = Math.random().toString(10);
    this.noteSubject$.next([...this.noteSubject$.value, newNote]);
  }
  getNotes(): Observable<Note[]> {
    return this.notes$.pipe(
      map((notes: Note[]) =>
        notes.filter((note: Note) => !note.isDeleted && !note.isArchived)
      )
    );
  }
  getAllDeletedNotes(): Observable<Note[]> {
    return this.notes$.pipe(
      map((notes: Note[]) => notes.filter((note: Note) => note.isDeleted))
    );
  }
  getAllArchievedNotes(): Observable<Note[]> {
    return this.notes$.pipe(
      map((notes: Note[]) =>
        notes.filter((note: Note) => note.isArchived && !note.isDeleted)
      )
    );
  }
  getAllRemainderNotes(): Observable<Note[]> {
    return this.notes$.pipe(
      map((notes: Note[]) =>
        notes.filter((note: Note) => !note.isArchived && !note.isDeleted && note.remainder?.date)
      )
    );
  }
  getNoteById(id: string | null): Observable<Note | undefined> {
    return this.notes$.pipe(
      map((notes: Note[]) => notes.find((note: Note) => note.id === id))
    );
  }
  private updateLabelsList() {
    const uniqueLabelsArray = Array.from(this.uniqueLabels);
    this.labelsListSubject.next(uniqueLabelsArray);
  }
  public updateLabels(noteLabels: string[]) {
    for (const label of noteLabels) {
      this.uniqueLabels.add(label);
    }
    this.updateLabelsList();
  }
  editLabel(label: string, newLabel: string): void {
    this.labelsListSubject.next(
      this.labelsListSubject.getValue().map((labelName) => {
        if (labelName === label) {
          return newLabel;
        }
        return labelName;
      })
    );
  }
  deleteRemainder(noteId: string): void {
    this.noteSubject$.next(
      this.noteSubject$.getValue().map((note) =>
        note.id === noteId
          ? {
              ...note,
              remainder: {},
            }
          : note
      )
    );
  }
  setRemainderForNote(noteId: string, remainder: Remainder): void {
    this.noteSubject$.next(
      this.noteSubject$.getValue().map((note) =>
        note.id === noteId
          ? {
              ...note,
              remainder,
            }
          : note
      )
    );
  }
  updateLabelForNote(noteId: string, newLabels: string[]): void {
    this.noteSubject$.next(
      this.noteSubject$.getValue().map((note) => {
        if (note.id === noteId) {
          return {
            ...note,
            labels: newLabels,
          };
        }
        return note;
      })
    );
    this.updateLabels(newLabels);
  }
  deleteLabel(label: string): void {
    this.labelsListSubject.next(
      this.labelsListSubject.getValue().filter((labelName) => {
        return labelName !== label;
      })
    );
    this.noteSubject$.next(
      this.noteSubject$.getValue().map((note) => {
        return {
          ...note,
          labels: note?.labels
            ? note.labels.filter((labelName) => {
                return labelName !== label;
              })
            : [],
          content: note.content.replace(new RegExp(`#${label}\\b`, 'g'), label),
        };
      })
    );
  }
  getAllLabels(): Observable<string[]> {
    return this.labelsList$;
  }
  getTitles(): Observable<string[]> {
    return this.notes$.pipe(
      map((notes: Note[]) => notes.map((note: Note) => note.title))
    );
  }
  editNote(note: Note): void {
    const updatedNote = this.noteSubject$.getValue().map((value) => {
      if (value.id === note.id) {
        return note;
      }
      return value;
    });
    this.noteSubject$.next(updatedNote);
  }
  editBackground(id: string, color: string, image: string): void {
    const updatedNote = this.noteSubject$.getValue().map((value) => {
      if (value.id === id) {
        value.backgroundColor = color;
        value.backgroundImage = image;
      }
      return value;
    });
    this.noteSubject$.next(updatedNote);
  }
  deleteNote(id: string): void {
    this.noteSubject$.next(
      this.noteSubject$.getValue().filter((note) => note.id !== id)
    );
  }
  restoreNote(id: string): void {
    const updateNote = this.noteSubject$.getValue().map((value) => {
      if (value.id === id) {
        value.isDeleted = false;
      }
      return value;
    });
    this.noteSubject$.next(updateNote);
  }
  pinNote(id: string): void {
    const updateNote = this.noteSubject$.getValue().map((value) => {
      if (value.id === id) {
        value.isPinned = !value.isPinned;
      }
      return value;
    });
    this.noteSubject$.next(updateNote);
  }
  archieveNote(id: string): void {
    const updateNote = this.noteSubject$.getValue().map((value) => {
      if (value.id === id) {
        value.isArchived = !value.isArchived;
      }
      return value;
    });
    this.noteSubject$.next(updateNote);
  }
  moveNoteToBin(id: string): void {
    const updateNote = this.noteSubject$.getValue().map((value) => {
      if (value.id === id) {
        value.isDeleted = true;
      }
      return value;
    });
    this.noteSubject$.next(updateNote);
  }
  emptyBin(): void {
    this.noteSubject$.next(
      this.noteSubject$.getValue().filter((note) => !note.isDeleted)
    );
  }
}

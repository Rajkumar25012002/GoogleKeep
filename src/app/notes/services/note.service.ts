import { Injectable } from '@angular/core';
import { Note } from '../types/note';
import { Observable, BehaviorSubject, map, concatMap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private noteSubject$ = new BehaviorSubject<Note[]>([]);
  notes$ = this.noteSubject$.asObservable();
  constructor() {}
  addNote(note: Note): void {
    this.noteSubject$.next([...this.noteSubject$.value, note]);
  }
  addCopy(note: Note): void {
    const newNote = { ...note };
    newNote.id = Math.random().toString(10);
    this.noteSubject$.next([...this.noteSubject$.value, newNote]);
  }
  getNotes(): Observable<Note[]> {
    return this.notes$;
  }
  getNoteById(id: string): Observable<Note | undefined> {
    return this.notes$.pipe(
      map((notes: Note[]) => notes.find((note: Note) => note.id === id))
    );
  }
  getAllLabels(): Observable<string[]> {
    return this.notes$.pipe(
      map((notes: Note[]) => {
        return notes.reduce((labels: string[], note: Note) => {
          return labels.concat(note.labels || []);
        }, []);
      })
    );
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
  pinNote(id: string): void {
    const updateNote = this.noteSubject$.getValue().map((value) => {
      if (value.id === id) {
        value.isPinned = !value.isPinned;
      }
      return value;
    });
    this.noteSubject$.next(updateNote);
  }
}

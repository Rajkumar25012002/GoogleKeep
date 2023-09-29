import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../types/note';

@Pipe({
  name: 'filterNotesContent',
})
export class FilterNotesContentPipe implements PipeTransform {
  transform(notes: Note[], searchQuery: string): Note[] {
    if (!searchQuery) {
      return notes;
    }

    const query = searchQuery.toLowerCase();
    return notes.filter((note) =>
      note.content.toLowerCase().includes(query.toLowerCase())
    );
  }
}

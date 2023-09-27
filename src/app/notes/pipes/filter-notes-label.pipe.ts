import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../types/note';

@Pipe({
  name: 'filterNotesLabel',
})
export class FilterNotesLabelPipe implements PipeTransform {
  transform(notes: Note[], label: string): Note[] {
    if (!label || label.trim() === '') {
      return notes;
    }
    return notes.filter(note => {
      return note.labels && note.labels.includes(label.toLowerCase());
    });
  }
}

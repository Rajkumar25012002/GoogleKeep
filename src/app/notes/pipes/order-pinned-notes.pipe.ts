import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../types/note';

@Pipe({
  name: 'orderPinnedNotes',
})
export class OrderPinnedNotesPipe implements PipeTransform {
  transform(notes: Note[]): Note[] {
    return notes.sort((a, b) => {
      if (a.isPinned && !b.isPinned) {
        return -1;
      } else if (!a.isPinned && b.isPinned) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}

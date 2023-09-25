import { Note } from 'src/app/notes/types/note';
import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
  providers: [DatePipe],
})
export class NoteDetailsComponent {
  @Input('note') note!: Note;

  
}

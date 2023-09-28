import { Component } from '@angular/core';
import { Note } from 'src/app/notes/types/note';

@Component({
  selector: 'app-note-remainder',
  templateUrl: './note-remainder.component.html',
  styleUrls: ['./note-remainder.component.scss']
})
export class NoteRemainderComponent {
  notes:Note[]=[]
  isGridDisplay:boolean=true;
  containerHeight:number=60*16;
}

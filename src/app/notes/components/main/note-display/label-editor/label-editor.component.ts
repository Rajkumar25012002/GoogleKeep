import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NoteService } from 'src/app/notes/services/note.service';
import { Note } from 'src/app/notes/types/note';

@Component({
  selector: 'app-label-editor',
  templateUrl: './label-editor.component.html',
  styleUrls: ['./label-editor.component.scss'],
})
export class LabelEditorComponent implements OnInit {
  @Input('noteId') noteId!: string;
  @Output('editLabel') editLabel = new EventEmitter();
  constructor(private noteService: NoteService) {}
  note: Note | undefined = {} as Note;
  allLabels: string[] = [];
  searchLabel: string = '';
  ngOnInit(): void {
    this.noteService.getNoteById(this.noteId).subscribe((note) => {
      this.note = note || {id:'',content:'',title:'',labels: []}  as Note;
    });
    this.noteService.getAllLabels().subscribe((labels) => {
      this.allLabels = labels;
    });
  }
  filterLabels(): string[] {
    if (!this.searchLabel) {
      return this.allLabels;
    }
    return this.allLabels.filter((label) =>
      label.toLowerCase().includes(this.searchLabel.toLowerCase())
    );
  }
  changeLabels(event: Event, label: string): void {
    const value = (event.target as HTMLInputElement).checked;
    if (value) {
      this.note?.labels?.push(label);
    } else {
      this.note?.labels?.splice(this.note?.labels?.indexOf(label), 1);
    }
    if(this.noteId===''){
      this.editLabel.emit(this.note?.labels)
    }
    setTimeout(() => {
      this.noteService.updateLabelForNote(this.noteId, this.note?.labels || []);
    }, 2000);
  }
}

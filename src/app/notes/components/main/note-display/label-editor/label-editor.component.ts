import { Component, Input, OnInit } from '@angular/core';
import { NoteService } from 'src/app/notes/services/note.service';
import { Note } from 'src/app/notes/types/note';

@Component({
  selector: 'app-label-editor',
  templateUrl: './label-editor.component.html',
  styleUrls: ['./label-editor.component.scss'],
})
export class LabelEditorComponent implements OnInit {
  @Input('noteId') noteId!: string;
  constructor(private noteService: NoteService) {}
  note: Note | undefined;
  allLabels: string[] = [];
  searchLabel: string = '';
  ngOnInit(): void {
    this.noteService.getNoteById(this.noteId).subscribe((note) => {
      this.note = note;
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
}

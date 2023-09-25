import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-note-options',
  templateUrl: './note-options.component.html',
  styleUrls: ['./note-options.component.scss'],
})
export class NoteOptionsComponent {
  @Output() changeLabelClicked = new EventEmitter<void>();
  @Output() deleteNoteClicked = new EventEmitter<void>();
  @Output() makeCopyClicked = new EventEmitter<void>();
  changeLabel() {
    this.changeLabelClicked.emit();
  }

  deleteNote() {
    this.deleteNoteClicked.emit();
  }

  makeCopy() {
    this.makeCopyClicked.emit();
  }
}

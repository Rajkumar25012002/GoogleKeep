import { Component, Output, EventEmitter, Input } from '@angular/core';
import { SharedService } from 'src/app/notes/services/shared.service';

@Component({
  selector: 'app-note-options',
  templateUrl: './note-options.component.html',
  styleUrls: ['./note-options.component.scss'],
})
export class NoteOptionsComponent {
  @Output() changeLabelClicked = new EventEmitter<void>();
  @Output() deleteNoteClicked = new EventEmitter<void>();
  @Output() makeCopyClicked = new EventEmitter<void>();
  isDarkMode: boolean = true;
  constructor(private sharedService: SharedService) {}
  ngOnInit() {
    this.sharedService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }
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

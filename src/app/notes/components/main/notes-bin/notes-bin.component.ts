import { Component } from '@angular/core';
import { NoteService } from 'src/app/notes/services/note.service';
import { SharedService } from 'src/app/notes/services/shared.service';
import { Note } from 'src/app/notes/types/note';

@Component({
  selector: 'app-notes-bin',
  templateUrl: './notes-bin.component.html',
  styleUrls: ['./notes-bin.component.scss'],
})
export class NotesBinComponent {
  notes: Note[] = [];
  isGridDisplay: boolean = true;
  constructor(
    private noteService: NoteService,
    private sharedService: SharedService
  ) {}
  ngOnInit(): void {
    this.noteService.getAllDeletedNotes().subscribe((notes) => {
      this.notes = notes;
    });
    this.sharedService.isGridDisplay$.subscribe((isGridDisplay) => {
      this.isGridDisplay = isGridDisplay;
    });
  }
  iconData = [
    {
      iconClasses: 'fa-solid fa-trash',
      clickAction: (id: string) => {
        this.deleteNote(id);
      },
      iconName: 'Delete forever',
      showName: false,
    },
    {
      iconClasses: 'fa-solid fa-trash-can-arrow-up',
      clickAction: (id: string) => {
        this.retrieveNotes(id);
      },
      iconName: 'Restore',
      showName: false,
    },
  ];
  showIconName(iconName: string): void {
    this.iconData.map((icon) => {
      icon.showName = icon.iconName === iconName;
    });
  }

  hideIconName(): void {
    this.iconData.forEach((icon) => {
      icon.showName = false;
    });
  }
  retrieveNotes(id: string): void {
    this.noteService.restoreNote(id);
  }
  deleteNote(id: string): void {
    this.noteService.deleteNote(id);
  }
  emptyBin(): void {
    this.noteService.emptyBin();
  }
}

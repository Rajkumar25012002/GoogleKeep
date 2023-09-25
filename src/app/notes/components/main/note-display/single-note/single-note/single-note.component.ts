import { Component, Input } from '@angular/core';
import { Note } from 'src/app/notes/types/note';
import { DatePipe } from '@angular/common';
import { NoteService } from 'src/app/notes/services/note.service';

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.scss'],
  providers: [DatePipe],
})
export class SingleNoteComponent {
  @Input('note') note!: Note;
  @Input('isGridDisplay') isGridDisplay!: boolean;
  constructor(private noteService: NoteService) {}
  show: boolean = false;
  isOptionsMenuVisible: boolean = false;
  isLabelEditorVisible: boolean = false;
  selectedColor: string = 'transparent';
  selectedImage: string = '';
  iconData = [
    {
      iconClasses: 'fa-solid fa-bell',
      clickAction: () => {},
      iconName: 'Remaind me',
      showName: false,
    },
    {
      iconClasses: 'fa-solid fa-user-plus',
      clickAction: () => {},
      iconName: 'Colloborator',
      showName: false,
    },
    {
      iconClasses: 'fa-solid fa-palette',
      clickAction: () => {
        this.showColorPicker();
      },
      iconName: 'Background options',
      showName: false,
    },
    {
      iconClasses: 'fa-regular fa-image',
      clickAction: () => {},
      iconName: 'Add image',
      showName: false,
    },
    {
      iconClasses: 'fa-solid fa-file-export',
      clickAction: () => {},
      iconName: 'Archieve',
      showName: false,
    },
    {
      iconClasses: 'fa-solid fa-ellipsis-vertical',
      clickAction: () => {
        this.toggleOptionsMenu();
      },
      iconName: 'More',
      showName: false,
    },
  ];
  showColorPicker(): void {
    if (this.show == true) {
      this.noteService.editBackground(
        this.note.id,
        this.selectedColor,
        this.selectedImage
      );
    }
    this.show = !this.show;
  }
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
  pinNote() {
    this.noteService.pinNote(this.note.id);
  }
  toggleOptionsMenu() {
    this.isOptionsMenuVisible = !this.isOptionsMenuVisible;
    this.isLabelEditorVisible = false;
  }

  changeLabel(): void {
    this.isOptionsMenuVisible = false;
    this.isLabelEditorVisible = !this.isLabelEditorVisible;
  }

  deleteNote(): void {
    this.isOptionsMenuVisible = false;
    this.noteService.deleteNote(this.note.id);
  }

  makeCopy(): void {
    this.isOptionsMenuVisible = false;
    this.noteService.addCopy(this.note);
  }
}
import { Component, Input } from '@angular/core';
import { ColorEntry, Note, Remainder } from 'src/app/notes/types/note';
import { DatePipe } from '@angular/common';
import { NoteService } from 'src/app/notes/services/note.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/notes/services/shared.service';

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.scss'],
  providers: [DatePipe],
})
export class SingleNoteComponent {
  @Input('note') note!: Note;
  @Input('isGridDisplay') isGridDisplay!: boolean;
  isDarkMode: boolean = true;
  constructor(
    private noteService: NoteService,
    private router: Router,
    private sharedService: SharedService
  ) {}
  ngOnInit(): void {
    this.iconData.map((icon) => {
      if (icon.iconName === 'Archieve') {
        icon.iconName = this.note.isArchived ? 'UnArchieve' : 'Archieve';
      }
    });
    this.sharedService.searchQuery$.subscribe((query) => {
      this.searchQuery = query;
    });
    this.sharedService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }
  show: boolean = false;
  showRemainder: boolean = false;
  editRemainder: boolean = false;
  isOptionsMenuVisible: boolean = false;
  isLabelEditorVisible: boolean = false;
  selectedColor: ColorEntry = {} as ColorEntry;
  selectedImage: string = '';
  searchQuery: string = '';
  iconData = [
    {
      iconClasses: 'fa-solid fa-bell',
      clickAction: () => {
        this.showRemainderSetter();
      },
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
      clickAction: () => {
        this.archieveNote();
      },
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
  showRemainderSetter(): void {
    this.showRemainder = !this.showRemainder;
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
  archieveNote(): void {
    this.noteService.archieveNote(this.note.id);
  }
  toggleOptionsMenu() {
    this.isOptionsMenuVisible = !this.isOptionsMenuVisible;
    this.isLabelEditorVisible = false;
  }

  changeLabel(): void {
    this.isOptionsMenuVisible = false;
    this.isLabelEditorVisible = !this.isLabelEditorVisible;
  }
  deleteRemainder(): void {
    this.noteService.deleteRemainder(this.note.id);
  }
  displayRemainder(): void {
    this.editRemainder = true;
  }
  remainderSet(remainder: Remainder): void {
    this.noteService.setRemainderForNote(this.note.id, remainder);
  }
  hideRemainder(): void {
    this.editRemainder = false;
  }
  deleteNote(): void {
    this.isOptionsMenuVisible = false;
    this.noteService.moveNoteToBin(this.note.id);
  }

  makeCopy(): void {
    this.isOptionsMenuVisible = false;
    this.noteService.addCopy(this.note);
  }
  openNoteDetails(): void {
    this.router.navigate([`/note/${this.note.id}`]);
  }
}

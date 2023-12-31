import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NoteService } from 'src/app/notes/services/note.service';
import { SharedService } from 'src/app/notes/services/shared.service';
import { ColorEntry, Note, Remainder } from 'src/app/notes/types/note';

@Component({
  selector: 'app-take-notes',
  templateUrl: './take-notes.component.html',
  styleUrls: ['./take-notes.component.scss'],
})
export class TakeNotesComponent {
  @ViewChild('noteContent', { static: false }) noteContent!: ElementRef;
  createIconData: any[] = [
    {
      iconClasses: 'fa-regular fa-square-check',
      clickAction: () => {},
      iconName: 'New list',
      showName: false,
    },
    {
      iconClasses: 'fa-solid fa-pencil',
      clickAction: () => {},
      iconName: 'New note with drawing',
      showName: false,
    },
    {
      iconClasses: 'fa-regular fa-image',
      clickAction: () => {},
      iconName: 'New note with image',
      showName: false,
    },
  ];
  noteIconData: any[] = [
    {
      iconClasses: 'fa-solid fa-bell',
      clickAction: () => {
        this.showRemainderSetter();
      },
      iconName: 'Remind me',
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
        this.showOptionsMenu();
      },
      iconName: 'More',
      showName: false,
    },
    {
      iconClasses: 'fa-solid fa-rotate-left',
      clickAction: () => {},
      iconName: 'Undo',
      showName: false,
    },
    {
      iconClasses: 'fa-solid fa-rotate-right',
      clickAction: () => {},
      iconName: 'Redo',
      showName: false,
    },
  ];
  labels: string[] = [];
  isGridDisplay: boolean = true;
  isPinned: boolean = false;
  show: boolean = false;
  showRemainder: boolean = false;
  expand: boolean = false;
  selectedColor: ColorEntry = {} as ColorEntry;
  selectedImage: string = '';
  notes: Note[] = [];
  isLabelEditorVisible: boolean = false;
  isOptionsMenuVisible: boolean = false;
  createdLabels: string[] = [];
  remainder: Remainder = {};
  isDarkMode: boolean = true;
  newNotes: Note = {
    id: Math.random().toString(10),
    title: '',
    content: '',
    editedOn: new Date(),
    labels: [],
    isPinned: false,
    isArchived: false,
    isEdited: false,
    isDeleted: false,
  };
  constructor(
    private noteService: NoteService,
    private sharedService: SharedService
  ) {
    this.noteService.notes$.subscribe((notes) => {});
  }
  ngOnInit(): void {
    this.noteService.getNotes().subscribe((notes) => {
      this.notes = notes;
    });
    this.sharedService.isGridDisplay$.subscribe((isGridDisplay) => {
      this.isGridDisplay = isGridDisplay;
    });
    this.sharedService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

  changeText(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.newNotes.content = value;
  }
  changeTitle(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.newNotes.title = value;
  }
  updateLabels(newLabels: string[]): void {
    this.labels = newLabels;
  }
  addNote(): void {
    this.newNotes.backgroundColor = this.selectedColor;
    this.newNotes.backgroundImage = this.selectedImage;
    this.newNotes.isPinned = this.isPinned;
    this.newNotes.labels = this.labels;
    this.newNotes.labels.push(...this.createdLabels);
    this.newNotes.remainder = this.remainder;
    this.noteService.addNote(this.newNotes);
    this.newNotes = {
      id: Math.random().toString(10),
      title: '',
      content: '',
      backgroundColor: {} as ColorEntry,
      backgroundImage: '',
      editedOn: new Date(),
      labels: [],
      isPinned: false,
      isArchived: false,
      isEdited: false,
      isDeleted: false,
    };
    (this.selectedColor = {} as ColorEntry), (this.selectedImage = '');
  }
  pinNote(): void {
    this.isPinned = !this.isPinned;
  }
  remainderSet(remainder: Remainder): void {
    this.remainder = remainder;
  }
  archieveNote(): void {
    this.newNotes.isArchived = !this.newNotes.isArchived;
  }
  showColorPicker(): void {
    this.show = !this.show;
  }
  showRemainderSetter(): void {
    this.showRemainder = !this.showRemainder;
  }
  editLabel(labels: string[]): void {
    this.createdLabels = labels;
  }
  showOptionsMenu(): void {
    this.isOptionsMenuVisible = !this.isOptionsMenuVisible;
    this.isLabelEditorVisible = false;
  }
  addLabel(): void {
    this.isOptionsMenuVisible = false;
    this.isLabelEditorVisible = !this.isLabelEditorVisible;
  }
  expandNoteEditor(): void {
    this.expand = !this.expand;
    (this.selectedColor = {} as ColorEntry), (this.selectedImage = '');
    if (this.expand) {
      setTimeout(() => {
        this.noteContent.nativeElement.focus();
      }, 0);
    }
  }
  showIconName(iconName: string): void {
    this.noteIconData.map((icon) => {
      icon.showName = icon.iconName === iconName;
    });
    this.createIconData.map((icon) => {
      icon.showName = icon.iconName === iconName;
    });
  }

  hideIconName(): void {
    this.noteIconData.forEach((icon) => {
      icon.showName = false;
    });
    this.createIconData.forEach((icon) => {
      icon.showName = false;
    });
  }
}

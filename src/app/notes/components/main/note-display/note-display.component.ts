import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Note } from 'src/app/notes/types/note';
import { NoteService } from 'src/app/notes/services/note.service';
@Component({
  selector: 'app-note-display',
  templateUrl: './note-display.component.html',
  styleUrls: ['./note-display.component.scss'],
})
export class NoteDisplayComponent implements OnInit, AfterViewInit {
  @ViewChild('contents', { static: false }) contents!: ElementRef;
  @ViewChild('noteContent', { static: false }) noteContent!: ElementRef;
  @Input('isGridDisplay') isGridDisplay!: boolean;
  containerHeight: number = 60 * 16;
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
      clickAction: () => {
        this.showColorPicker();
      },
      iconName: 'New note with image',
      showName: false,
    },
  ];
  noteIconData: any[] = [
    {
      iconClasses: 'fa-solid fa-bell',
      clickAction: () => {},
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
      clickAction: () => {},
      iconName: 'Archieve',
      showName: false,
    },
    {
      iconClasses: 'fa-solid fa-ellipsis-vertical',
      clickAction: () => {},
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
  isPinned: boolean = false;
  show: boolean = false;
  expand: boolean = false;
  selectedColor: string = 'transparent';
  selectedImage: string = '';
  notes: Note[] = [];
  newNotes: Note = {
    id: Math.random().toString(10),
    title: '',
    content: '',
    editedOn: new Date(),
  };
  constructor(private noteService: NoteService) {
    this.noteService.notes$.subscribe((notes) => {});
  }
  ngOnInit(): void {
    console.log('display2', this.isGridDisplay);
    this.noteService.getNotes().subscribe((notes) => {
      this.notes = notes;
    });
  }
  ngAfterViewInit() {
    this.adjustContainerHeight();
  }

  adjustContainerHeight() {
    const containerElement = this.contents.nativeElement;
    if (containerElement.scrollHeight > containerElement.clientHeight) {
      this.containerHeight += 30 * 16;
    }
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
    this.noteService.addNote(this.newNotes);
    this.newNotes = {
      id: Math.random().toString(10),
      title: '',
      content: '',
      backgroundColor: '',
      backgroundImage: '',
      isPinned: false,
      editedOn: new Date(),
    };
    (this.selectedColor = ''), (this.selectedImage = '');
  }
  pinNote(): void {
    this.isPinned = !this.isPinned;
  }
  editNote(): void {
    this.noteService.editNote(this.newNotes);
  }
  showColorPicker(): void {
    this.show = !this.show;
  }
  expandNoteEditor(): void {
    this.expand = !this.expand;
    (this.selectedColor = ''), (this.selectedImage = '');
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

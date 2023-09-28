import { Note } from 'src/app/notes/types/note';
import { DatePipe } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  Renderer2,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from 'src/app/notes/services/note.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
  providers: [DatePipe],
})
export class NoteDetailsComponent implements OnInit, AfterViewInit {
  note: Note = {} as Note;
  containerHeight: number = 60 * 16;
  @ViewChild('textcontent') textcontent!: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private router: Router,
    private renderer: Renderer2
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params: { [x: string]: any }) => {
      const noteId = params['noteId'];
      this.noteService.getNoteById(noteId).subscribe((note) => {
        this.note = note || ({} as Note);
      });
    });
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.adjustTextareaHeight(this.textcontent.nativeElement);
    }, 0);
  }
  show: boolean = false;
  showRemainder: boolean = false;
  isOptionsMenuVisible: boolean = false;
  isLabelEditorVisible: boolean = false;
  selectedColor: string = 'transparent';
  selectedImage: string = '';
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
  updateLabels(newLabels: string[]): void {
    // this.note.labels = newLabels;
    this.noteService.updateLabelForNote(this.note.id, newLabels);
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
  deleteNote(): void {
    this.isOptionsMenuVisible = false;
    this.noteService.moveNoteToBin(this.note.id);
    this.router.navigate(['']);
  }
  toggleOptionsMenu() {
    this.isOptionsMenuVisible = !this.isOptionsMenuVisible;
    this.isLabelEditorVisible = false;
  }

  changeLabel(): void {
    this.isOptionsMenuVisible = false;
    this.isLabelEditorVisible = !this.isLabelEditorVisible;
  }

  makeCopy(): void {
    this.isOptionsMenuVisible = false;
    this.noteService.addCopy(this.note);
  }
  close() {
    this.router.navigate(['']);
  }
  adjustTextareaHeight(textarea: HTMLTextAreaElement): void {
    this.renderer.setStyle(textarea, 'height', 'auto');
    const scrollHeight = textarea.scrollHeight;
    const initialHeight = textarea.scrollHeight - textarea.clientHeight;
    this.renderer.setStyle(
      textarea,
      'height',
      `${Math.max(scrollHeight, initialHeight)}px`
    );
  }
}

import { Component, ElementRef, ViewChild } from '@angular/core';
import { NoteService } from 'src/app/notes/services/note.service';
import { SharedService } from 'src/app/notes/services/shared.service';
import { Note } from 'src/app/notes/types/note';

@Component({
  selector: 'app-notes-archieved',
  templateUrl: './notes-archieved.component.html',
  styleUrls: ['./notes-archieved.component.scss'],
})
export class NotesArchievedComponent {
  @ViewChild('contents', { static: false }) contents!: ElementRef;
  containerHeight: number = 60 * 16;
  notes: Note[] = [];
  isGridDisplay: boolean = true;
  constructor(
    private noteService: NoteService,
    private sharedService: SharedService
  ) {}
  ngOnInit(): void {
    this.noteService.getAllArchievedNotes().subscribe((notes) => {
      this.notes = notes;
    });
    this.sharedService.isGridDisplay$.subscribe((isGridDisplay) => {
      this.isGridDisplay = isGridDisplay;
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
}

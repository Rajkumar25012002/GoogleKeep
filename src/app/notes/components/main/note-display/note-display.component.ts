import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Note } from 'src/app/notes/types/note';
import { NoteService } from 'src/app/notes/services/note.service';
import { SharedService } from 'src/app/notes/services/shared.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-note-display',
  templateUrl: './note-display.component.html',
  styleUrls: ['./note-display.component.scss'],
})
export class NoteDisplayComponent implements OnInit, AfterViewInit {
  @ViewChild('contents', { static: false }) contents!: ElementRef;
  label: string = '';
  containerHeight: number = 60 * 16;
  isGridDisplay: boolean = true;
  notes: Note[] = [];
  searchQuery: string = '';
  isDarkMode: boolean = true;
  constructor(
    private noteService: NoteService,
    private sharedService: SharedService,
    private route: ActivatedRoute
  ) {
    this.noteService.notes$.subscribe((notes) => {});
  }
  ngOnInit(): void {
    this.noteService.getNotes().subscribe((notes) => {
      this.notes = notes;
    })
    this.sharedService.isGridDisplay$.subscribe((isGridDisplay) => {
      this.isGridDisplay = isGridDisplay;
    });
    this.route.params.subscribe((params: { [x: string]: any }) => {
      this.label = params['labelId'] || '';
    });
    this.sharedService.searchQuery$.subscribe((searchQuery) => {
      this.searchQuery = searchQuery;
    })
    this.sharedService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    })
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

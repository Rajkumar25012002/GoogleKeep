import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from 'src/app/notes/services/note.service';
import { SharedService } from 'src/app/notes/services/shared.service';
import { Note } from 'src/app/notes/types/note';

@Component({
  selector: 'app-note-search-result',
  templateUrl: './note-search-result.component.html',
  styleUrls: ['./note-search-result.component.scss'],
})
export class NoteSearchResultComponent {
  @ViewChild('contents', { static: false }) contents!: ElementRef;
  containerHeight: number = 60 * 16;
  notes: Note[] = [];
  isGridDisplay: boolean = true;
  searchQuery: string = '';
  constructor(
    private noteService: NoteService,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: { [x: string]: any }) => {
      const searchType = params['searchType'];
      const searchText = params['searchText'];
      this.noteService
        .searchNotesBy(searchType, searchText)
        .subscribe((notes) => {
          this.notes = notes;
        });
      this.sharedService.setActiveRoute(this.route);
    });
    this.sharedService.isGridDisplay$.subscribe((isGridDisplay) => {
      this.isGridDisplay = isGridDisplay;
    });
    this.sharedService.searchQuery$.subscribe((searchQuery) => {
      this.searchQuery = searchQuery;
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

import { Component, ElementRef, QueryList, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from 'src/app/notes/services/note.service';
import { SharedService } from 'src/app/notes/services/shared.service';

@Component({
  selector: 'app-notes-search',
  templateUrl: './notes-search.component.html',
  styleUrls: ['./notes-search.component.scss'],
})
export class NotesSearchComponent {
  searchData: any[] = [
    {
      type: 'Types',
      searchLabel: 'types',
      displayall: false,
      values: [
        {
          icon: 'fa-solid fa-bell',
          iconName: 'Remainders',
          searchtext: 'remainders',
        },
        {
          icon: 'fa-solid fa-file-export',
          iconName: 'Archieves',
          searchtext: 'archieves',
        },
        {
          icon: 'fa-solid fa-link',
          iconName: 'URL',
          searchtext: 'url',
        },
      ],
      isOverflow: false,
    },
    {
      type: 'Labels',
      searchLabel: 'labels',
      displayall: false,
      isOverflow: false,
      values: [],
    },
    {
      type: 'Colors',
      searchLabel: 'colors',
      displayall: false,
      isOverflow: false,
      values: [],
    },
  ];
  shouldDisplayall: boolean = false;
  constructor(
    private noteService: NoteService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {}
  searchQuery: string = '';
  isSearchRoute: boolean = false;
  isDarkMode: boolean = true;
  ngOnInit() {
    this.noteService.getAllLabels().subscribe((labels) => {
      this.searchData.map((data) => {
        if (data.searchLabel === 'labels') {
          labels.forEach((label) => {
            data.values.push({
              icon: 'fa-solid fa-tag',
              iconName: label.charAt(0).toUpperCase() + label.slice(1),
              searchtext: label,
            });
          });
        }
      });
    });
    this.noteService.getAllBackgroundColor().subscribe((colors) => {
      this.searchData.map((data) => {
        if (data.searchLabel === 'colors') {
          colors.forEach((color) => {
            data.values.push({
              icon: '',
              iconName: color,
              searchtext: color,
            });
          });
        }
      });
    });
    this.searchData.map((data) => {
      if (data.values.length > 4) {
        data.isOverflow = true;
      }
    });
    this.sharedService.setActiveRoute(this.route);
    this.sharedService.searchQuery$.subscribe((searchQuery) => {
      this.searchQuery = searchQuery;
    });
    this.sharedService.activeRoute$.subscribe((activeRoute) => {
      this.isSearchRoute = activeRoute?.params?.['searchType']?.length > 0;
    });
    this.sharedService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

  searchNoteBy(searchType: string, searchText: string): void {
    this.router.navigate(['/searchNote', searchType, searchText]);
  }
  toggleMore(type: string): void {
    this.searchData.map((data) => {
      if (data.type === type) {
        if (data.displayall) {
          data.displayall = false;
        } else {
          data.displayall = true;
        }
      }
    });
  }
}

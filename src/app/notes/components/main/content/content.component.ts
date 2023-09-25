import { Component, Input, OnInit, Output } from '@angular/core';
import { NoteService } from 'src/app/notes/services/note.service';
import { SharedService } from 'src/app/notes/services/shared.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  constructor(
    private noteService: NoteService,
    private sharedService: SharedService
  ) {}
  titles: string[] = [];
  ngOnInit(): void {
    this.noteService.getTitles().subscribe((titles: string[]) => {
      this.titles = titles;
    });
  }
  showAllLabels(): void {
    setTimeout(() => {
      this.sharedService.showAllLabels();
    }, 250);
  }

  hideAllLabels(): void {
    this.sharedService.hideAllLabels();
  }
  showLabels(): boolean {
    return this.sharedService.showLabels;
  }
}

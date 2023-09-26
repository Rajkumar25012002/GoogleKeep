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
  labelIconData: any[] = [];
generalIconData: any[] = [];

ngOnInit(): void {
  this.generateGeneralIconData();
  this.noteService.getTitles().subscribe((titles: string[]) => {
    this.updateLabelIconData(titles);
  });
}

updateLabelIconData(titles: string[]): void {
  this.labelIconData = [];
  titles.forEach((title) => {
    this.labelIconData.push({
      iconClasses: 'fa-solid fa-tag',
      clickAction: () => {},
      iconName: title,
      showName: true,
      routerLink: `labels/${title}`,
    });
  });
  this.generateGeneralIconData();
}

generateGeneralIconData(): void {
  this.generalIconData = [
    {
      iconClasses: 'fa-regular fa-lightbulb',
      clickAction: () => {},
      iconName: 'Notes',
      routerLink: '/',
    },
    {
      iconClasses: 'fa-solid fa-bell',
      clickAction: () => {},
      iconName: 'Remainders',
      routerLink: '/remainders',
    },
    ...this.labelIconData,
    {
      iconClasses: 'fa-solid fa-pencil',
      clickAction: () => {},
      iconName: 'Edit labels',
      routerLink: '/edit/labels',
    },
    {
      iconClasses: 'fa-solid fa-file-export',
      clickAction: () => {},
      iconName: 'Archieve',
      routerLink: '/archieve',
    },
    {
      iconClasses: 'fa-solid fa-trash',
      clickAction: () => {},
      iconName: 'Bin',
      routerLink: '/bin',
    },
  ];
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

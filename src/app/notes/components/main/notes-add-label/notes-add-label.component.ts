import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/notes/services/note.service';

@Component({
  selector: 'app-notes-add-label',
  templateUrl: './notes-add-label.component.html',
  styleUrls: ['./notes-add-label.component.scss'],
})
export class NotesAddLabelComponent {
  labels: any[] = [];
  labelsList: string[] = [];
  selectedLabel: string = '';
  isCreatable: boolean = false;
  createdLabelName: string = '';
  constructor(private noteService: NoteService, private router: Router) {}
  ngOnInit() {
    this.noteService.getAllLabels().subscribe((labels) => {
      this.labelsList = labels;
      this.labels = [];
      labels.forEach((label) => {
        this.labels.push({
          label: label,
          showTrash: false,
          isEditable: false,
        });
      });
    });
  }
  deleteLabel(label: string): void {
    this.noteService.deleteLabel(label);
  }
  changeLabel(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.selectedLabel = value;
  }
  toggleCreateLabel(): void {
    this.isCreatable = !this.isCreatable;
    this.createdLabelName = '';
  }
  toggleEditable(label: string): void {
    this.labels.map((item) => {
      if (item.label === label) {
        item.isEditable = !item.isEditable;
        if (item.isEditable) {
          this.selectedLabel = label;
        } else {
          this.noteService.editLabel(label, this.selectedLabel);
          this.selectedLabel = '';
        }
      }
    });
  }
  showTrashIcon(label: string): void {
    this.labels.map((item) => {
      if (item.label === label) {
        item.showTrash = true;
      }
    });
  }
  hideTrashIcon(label: string): void {
    this.labels.map((item) => {
      if (item.label === label) {
        item.showTrash = false;
      }
    });
  }
  addLabel(): void {
    this.noteService.updateLabels([this.createdLabelName]);
    this.isCreatable = false;
    this.createdLabelName='';
  }
  done(): void {
    this.router.navigate(['']);
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesAddLabelComponent } from './notes-add-label.component';

describe('NotesAddLabelComponent', () => {
  let component: NotesAddLabelComponent;
  let fixture: ComponentFixture<NotesAddLabelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotesAddLabelComponent]
    });
    fixture = TestBed.createComponent(NotesAddLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesArchievedComponent } from './notes-archieved.component';

describe('NotesArchievedComponent', () => {
  let component: NotesArchievedComponent;
  let fixture: ComponentFixture<NotesArchievedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotesArchievedComponent]
    });
    fixture = TestBed.createComponent(NotesArchievedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

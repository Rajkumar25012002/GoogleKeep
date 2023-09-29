import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesSearchComponent } from './notes-search.component';

describe('NotesSearchComponent', () => {
  let component: NotesSearchComponent;
  let fixture: ComponentFixture<NotesSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotesSearchComponent]
    });
    fixture = TestBed.createComponent(NotesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

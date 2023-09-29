import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteSearchResultComponent } from './note-search-result.component';

describe('NoteSearchResultComponent', () => {
  let component: NoteSearchResultComponent;
  let fixture: ComponentFixture<NoteSearchResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteSearchResultComponent]
    });
    fixture = TestBed.createComponent(NoteSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

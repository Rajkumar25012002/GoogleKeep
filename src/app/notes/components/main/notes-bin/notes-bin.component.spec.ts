import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesBinComponent } from './notes-bin.component';

describe('NotesBinComponent', () => {
  let component: NotesBinComponent;
  let fixture: ComponentFixture<NotesBinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotesBinComponent]
    });
    fixture = TestBed.createComponent(NotesBinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

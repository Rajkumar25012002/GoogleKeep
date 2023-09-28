import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteRemainderComponent } from './note-remainder.component';

describe('NoteRemainderComponent', () => {
  let component: NoteRemainderComponent;
  let fixture: ComponentFixture<NoteRemainderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteRemainderComponent]
    });
    fixture = TestBed.createComponent(NoteRemainderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

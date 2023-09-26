import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeNotesComponent } from './take-notes.component';

describe('TakeNotesComponent', () => {
  let component: TakeNotesComponent;
  let fixture: ComponentFixture<TakeNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TakeNotesComponent]
    });
    fixture = TestBed.createComponent(TakeNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

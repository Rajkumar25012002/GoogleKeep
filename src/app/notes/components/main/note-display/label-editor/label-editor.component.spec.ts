import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelEditorComponent } from './label-editor.component';

describe('LabelEditorComponent', () => {
  let component: LabelEditorComponent;
  let fixture: ComponentFixture<LabelEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabelEditorComponent]
    });
    fixture = TestBed.createComponent(LabelEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

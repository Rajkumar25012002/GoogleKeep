import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemainderSetterComponent } from './remainder-setter.component';

describe('RemainderSetterComponent', () => {
  let component: RemainderSetterComponent;
  let fixture: ComponentFixture<RemainderSetterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemainderSetterComponent]
    });
    fixture = TestBed.createComponent(RemainderSetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

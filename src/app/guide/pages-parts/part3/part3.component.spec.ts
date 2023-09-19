import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Part3Component } from './part3.component';

describe('Part3Component', () => {
  let component: Part3Component;
  let fixture: ComponentFixture<Part3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Part3Component]
    });
    fixture = TestBed.createComponent(Part3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

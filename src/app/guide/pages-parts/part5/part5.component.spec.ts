import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Part5Component } from './part5.component';

describe('Part5Component', () => {
  let component: Part5Component;
  let fixture: ComponentFixture<Part5Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Part5Component]
    });
    fixture = TestBed.createComponent(Part5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartConceptComponent } from './part-concept.component';

describe('PartConceptComponent', () => {
  let component: PartConceptComponent;
  let fixture: ComponentFixture<PartConceptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PartConceptComponent]
    });
    fixture = TestBed.createComponent(PartConceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

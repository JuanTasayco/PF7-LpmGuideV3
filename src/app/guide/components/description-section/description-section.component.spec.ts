import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionSectionComponent } from './description-section.component';

describe('DescriptionSectionComponent', () => {
  let component: DescriptionSectionComponent;
  let fixture: ComponentFixture<DescriptionSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DescriptionSectionComponent]
    });
    fixture = TestBed.createComponent(DescriptionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

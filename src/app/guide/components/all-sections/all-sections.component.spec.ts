import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSectionsComponent } from './all-sections.component';

describe('AllSectionsComponent', () => {
  let component: AllSectionsComponent;
  let fixture: ComponentFixture<AllSectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AllSectionsComponent]
    });
    fixture = TestBed.createComponent(AllSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

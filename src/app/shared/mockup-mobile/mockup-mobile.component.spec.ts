import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockupMobileComponent } from './mockup-mobile.component';

describe('MockupMobileComponent', () => {
  let component: MockupMobileComponent;
  let fixture: ComponentFixture<MockupMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockupMobileComponent]
    });
    fixture = TestBed.createComponent(MockupMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

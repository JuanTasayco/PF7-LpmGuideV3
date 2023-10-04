import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsUserComponent } from './sections-user.component';

describe('SectionsUserComponent', () => {
  let component: SectionsUserComponent;
  let fixture: ComponentFixture<SectionsUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SectionsUserComponent],
    });
    fixture = TestBed.createComponent(SectionsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

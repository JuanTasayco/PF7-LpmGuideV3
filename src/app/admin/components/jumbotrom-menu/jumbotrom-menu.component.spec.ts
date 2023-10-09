import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JumbotromMenuComponent } from './jumbotrom-menu.component';

describe('JumbotromMenuComponent', () => {
  let component: JumbotromMenuComponent;
  let fixture: ComponentFixture<JumbotromMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JumbotromMenuComponent]
    });
    fixture = TestBed.createComponent(JumbotromMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

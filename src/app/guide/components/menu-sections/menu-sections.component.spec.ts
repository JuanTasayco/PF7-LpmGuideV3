import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSectionsComponent } from './menu-sections.component';

describe('SectionsComponent', () => {
  let component: MenuSectionsComponent;
  let fixture: ComponentFixture<MenuSectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MenuSectionsComponent],
    });
    fixture = TestBed.createComponent(MenuSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

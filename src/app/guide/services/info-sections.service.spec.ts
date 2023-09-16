import { TestBed } from '@angular/core/testing';

import { InfoSectionsService } from './info-sections.service';

describe('InfoSectionsService', () => {
  let service: InfoSectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoSectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

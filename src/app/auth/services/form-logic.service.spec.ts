import { TestBed } from '@angular/core/testing';

import { FormLogicService } from './form-logic.service';

describe('FormLogicService', () => {
  let service: FormLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormLogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

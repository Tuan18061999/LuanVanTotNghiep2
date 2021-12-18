import { TestBed } from '@angular/core/testing';

import { RequestServicesUpdateService } from './request-services-update.service';

describe('RequestServicesUpdateService', () => {
  let service: RequestServicesUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestServicesUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

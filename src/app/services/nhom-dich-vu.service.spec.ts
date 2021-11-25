import { TestBed } from '@angular/core/testing';

import { NhomDichVuService } from './nhom-dich-vu.service';

describe('NhomDichVuService', () => {
  let service: NhomDichVuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NhomDichVuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

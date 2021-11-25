import { TestBed } from '@angular/core/testing';

import { NhanBietDichVuService } from './nhan-biet-dich-vu.service';

describe('NhanBietDichVuService', () => {
  let service: NhanBietDichVuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NhanBietDichVuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

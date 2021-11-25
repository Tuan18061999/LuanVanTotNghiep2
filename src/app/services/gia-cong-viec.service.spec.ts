import { TestBed } from '@angular/core/testing';

import { GiaCongViecService } from './gia-cong-viec.service';

describe('GiaCongViecService', () => {
  let service: GiaCongViecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiaCongViecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { GiaCongThoService } from './gia-cong-tho.service';

describe('GiaCongThoService', () => {
  let service: GiaCongThoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiaCongThoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

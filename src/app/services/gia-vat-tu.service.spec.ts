import { TestBed } from '@angular/core/testing';

import { GiaVatTuService } from './gia-vat-tu.service';

describe('GiaVatTuService', () => {
  let service: GiaVatTuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiaVatTuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

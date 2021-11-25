import { TestBed } from '@angular/core/testing';

import { NoiDungTinService } from './noi-dung-tin.service';

describe('NoiDungTinService', () => {
  let service: NoiDungTinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoiDungTinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

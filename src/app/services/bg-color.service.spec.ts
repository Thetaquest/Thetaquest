import { TestBed } from '@angular/core/testing';

import { BgColorService } from './bg-color.service';

describe('BgColorService', () => {
  let service: BgColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BgColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

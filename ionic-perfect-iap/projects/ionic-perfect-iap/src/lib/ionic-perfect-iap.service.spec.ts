import { TestBed } from '@angular/core/testing';

import { IonicPerfectIapService } from './ionic-perfect-iap.service';

describe('IonicPerfectIapService', () => {
  let service: IonicPerfectIapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IonicPerfectIapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

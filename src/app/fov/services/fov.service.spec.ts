import { TestBed } from '@angular/core/testing';

import { FovService } from './fov.service';

describe('FovService', () => {
  let service: FovService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FovService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

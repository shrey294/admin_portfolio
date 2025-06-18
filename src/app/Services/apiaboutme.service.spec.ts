import { TestBed } from '@angular/core/testing';

import { ApiaboutmeService } from './apiaboutme.service';

describe('ApiaboutmeService', () => {
  let service: ApiaboutmeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiaboutmeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

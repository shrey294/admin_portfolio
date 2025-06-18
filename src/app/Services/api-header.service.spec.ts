import { TestBed } from '@angular/core/testing';

import { ApiHeaderService } from './api-header.service';

describe('ApiHeaderService', () => {
  let service: ApiHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

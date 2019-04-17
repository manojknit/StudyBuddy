import { TestBed } from '@angular/core/testing';

import { UploadquizService } from './uploadquiz.service';

describe('UploadquizService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadquizService = TestBed.get(UploadquizService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { LayoutManagerService } from './layout-manager.service';

describe('LayoutManagerService', () => {
  let service: LayoutManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

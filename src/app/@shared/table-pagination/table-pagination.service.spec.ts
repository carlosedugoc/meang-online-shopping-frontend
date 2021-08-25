import { TestBed } from '@angular/core/testing';

import { TablePaginationService } from './table-pagination.service';

describe('TablePaginationService', () => {
  let service: TablePaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablePaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

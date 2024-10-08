import { TestBed } from '@angular/core/testing';

import { EmpManagementService } from './emp-management.service';

describe('EmpManagementService', () => {
  let service: EmpManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

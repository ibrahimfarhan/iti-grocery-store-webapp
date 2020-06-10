import { TestBed } from '@angular/core/testing';

import { IsAdminAuthorizedGuard } from './is-admin-authorized.guard';

describe('IsAdminAuthorizedGuard', () => {
  let guard: IsAdminAuthorizedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsAdminAuthorizedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

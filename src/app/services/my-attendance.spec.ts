import { TestBed } from '@angular/core/testing';

import { MyAttendance } from './my-attendance';

describe('MyAttendance', () => {
  let service: MyAttendance;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyAttendance);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

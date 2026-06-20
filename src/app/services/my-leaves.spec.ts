import { TestBed } from '@angular/core/testing';

import { MyLeaves } from './my-leaves';

describe('MyLeaves', () => {
  let service: MyLeaves;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyLeaves);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

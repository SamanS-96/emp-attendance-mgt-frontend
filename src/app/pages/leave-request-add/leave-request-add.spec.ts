import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRequestAdd } from './leave-request-add';

describe('LeaveRequestAdd', () => {
  let component: LeaveRequestAdd;
  let fixture: ComponentFixture<LeaveRequestAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveRequestAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(LeaveRequestAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

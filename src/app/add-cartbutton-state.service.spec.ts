import { TestBed } from '@angular/core/testing';

import { AddCartbuttonStateService } from './add-cartbutton-state.service';

describe('AddCartbuttonStateService', () => {
  let service: AddCartbuttonStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddCartbuttonStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

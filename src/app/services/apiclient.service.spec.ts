/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiclientService } from './apiclient.service';

describe('ApiclientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiclientService]
    });
  });

  it('should ...', inject([ApiclientService], (service: ApiclientService) => {
    expect(service).toBeTruthy();
  }));
});

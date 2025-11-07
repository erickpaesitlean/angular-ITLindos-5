import { TestBed } from '@angular/core/testing';

import { GestoresService } from './gestores-service';

describe('GestoresService', () => {
  let service: GestoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

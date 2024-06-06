import { TestBed } from '@angular/core/testing';

import { OrdemCompartilhadaService } from './ordem-compartilhada.service';

describe('OrdemCompartilhadaService', () => {
  let service: OrdemCompartilhadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdemCompartilhadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

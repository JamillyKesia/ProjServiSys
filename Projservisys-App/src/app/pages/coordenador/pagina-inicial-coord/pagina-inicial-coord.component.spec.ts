import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaInicialCoordComponent } from './pagina-inicial-coord.component';

describe('PaginaInicialCoordComponent', () => {
  let component: PaginaInicialCoordComponent;
  let fixture: ComponentFixture<PaginaInicialCoordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginaInicialCoordComponent]
    });
    fixture = TestBed.createComponent(PaginaInicialCoordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

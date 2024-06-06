import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaInicialCpdComponent } from './pagina-inicial-cpd.component';

describe('PaginaInicialCpdComponent', () => {
  let component: PaginaInicialCpdComponent;
  let fixture: ComponentFixture<PaginaInicialCpdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginaInicialCpdComponent]
    });
    fixture = TestBed.createComponent(PaginaInicialCpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

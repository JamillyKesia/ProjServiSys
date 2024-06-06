import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSolicitanteComponent } from './modal-solicitante.component';

describe('ModalSolicitanteComponent', () => {
  let component: ModalSolicitanteComponent;
  let fixture: ComponentFixture<ModalSolicitanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSolicitanteComponent]
    });
    fixture = TestBed.createComponent(ModalSolicitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

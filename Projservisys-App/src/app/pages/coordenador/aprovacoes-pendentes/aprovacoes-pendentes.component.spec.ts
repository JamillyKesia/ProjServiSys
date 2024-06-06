import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprovacoesPendentesComponent } from './aprovacoes-pendentes.component';

describe('AprovacoesPendentesComponent', () => {
  let component: AprovacoesPendentesComponent;
  let fixture: ComponentFixture<AprovacoesPendentesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AprovacoesPendentesComponent]
    });
    fixture = TestBed.createComponent(AprovacoesPendentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

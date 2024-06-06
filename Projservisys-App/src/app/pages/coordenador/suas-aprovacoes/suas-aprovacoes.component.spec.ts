import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuasAprovacoesComponent } from './suas-aprovacoes.component';

describe('SuasAprovacoesComponent', () => {
  let component: SuasAprovacoesComponent;
  let fixture: ComponentFixture<SuasAprovacoesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuasAprovacoesComponent]
    });
    fixture = TestBed.createComponent(SuasAprovacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

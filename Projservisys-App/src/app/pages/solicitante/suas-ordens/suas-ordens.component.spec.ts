import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuasOrdensComponent } from './suas-ordens.component';

describe('SuasOrdensComponent', () => {
  let component: SuasOrdensComponent;
  let fixture: ComponentFixture<SuasOrdensComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuasOrdensComponent]
    });
    fixture = TestBed.createComponent(SuasOrdensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

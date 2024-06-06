import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCpdComponent } from './modal-cpd.component';

describe('ModalCpdComponent', () => {
  let component: ModalCpdComponent;
  let fixture: ComponentFixture<ModalCpdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCpdComponent]
    });
    fixture = TestBed.createComponent(ModalCpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

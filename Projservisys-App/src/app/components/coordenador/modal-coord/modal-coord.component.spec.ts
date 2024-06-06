import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCoordComponent } from './modal-coord.component';

describe('ModalCoordComponent', () => {
  let component: ModalCoordComponent;
  let fixture: ComponentFixture<ModalCoordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCoordComponent]
    });
    fixture = TestBed.createComponent(ModalCoordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

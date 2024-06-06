import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOsComponent } from './modal-os.component';

describe('ModalOsComponent', () => {
  let component: ModalOsComponent;
  let fixture: ComponentFixture<ModalOsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalOsComponent]
    });
    fixture = TestBed.createComponent(ModalOsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

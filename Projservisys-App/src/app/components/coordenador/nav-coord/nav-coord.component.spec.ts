import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCoordComponent } from './nav-coord.component';

describe('NavCoordComponent', () => {
  let component: NavCoordComponent;
  let fixture: ComponentFixture<NavCoordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavCoordComponent]
    });
    fixture = TestBed.createComponent(NavCoordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

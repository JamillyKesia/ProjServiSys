import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCpdComponent } from './nav-cpd.component';

describe('NavCpdComponent', () => {
  let component: NavCpdComponent;
  let fixture: ComponentFixture<NavCpdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavCpdComponent]
    });
    fixture = TestBed.createComponent(NavCpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

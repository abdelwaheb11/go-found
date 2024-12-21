import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCreatorComponent } from './dashboard-creator.component';

describe('DashboardCreatorComponent', () => {
  let component: DashboardCreatorComponent;
  let fixture: ComponentFixture<DashboardCreatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardCreatorComponent]
    });
    fixture = TestBed.createComponent(DashboardCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

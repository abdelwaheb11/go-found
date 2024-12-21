import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminprojectsComponent } from './adminprojects.component';

describe('AdminprojectsComponent', () => {
  let component: AdminprojectsComponent;
  let fixture: ComponentFixture<AdminprojectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminprojectsComponent]
    });
    fixture = TestBed.createComponent(AdminprojectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

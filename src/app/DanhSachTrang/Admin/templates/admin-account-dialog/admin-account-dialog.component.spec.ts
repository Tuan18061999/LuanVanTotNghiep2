import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccountDialogComponent } from './admin-account-dialog.component';

describe('AdminAccountDialogComponent', () => {
  let component: AdminAccountDialogComponent;
  let fixture: ComponentFixture<AdminAccountDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAccountDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

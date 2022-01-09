import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockPartnerDialogComponent } from './lock-partner-dialog.component';

describe('LockPartnerDialogComponent', () => {
  let component: LockPartnerDialogComponent;
  let fixture: ComponentFixture<LockPartnerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LockPartnerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LockPartnerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

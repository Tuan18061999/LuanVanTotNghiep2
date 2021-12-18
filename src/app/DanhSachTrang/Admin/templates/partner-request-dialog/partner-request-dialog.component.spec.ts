import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerRequestDialogComponent } from './partner-request-dialog.component';

describe('PartnerRequestDialogComponent', () => {
  let component: PartnerRequestDialogComponent;
  let fixture: ComponentFixture<PartnerRequestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerRequestDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

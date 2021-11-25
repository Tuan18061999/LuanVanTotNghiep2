import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhomDichVuDialogComponent } from './nhom-dich-vu-dialog.component';

describe('NhomDichVuDialogComponent', () => {
  let component: NhomDichVuDialogComponent;
  let fixture: ComponentFixture<NhomDichVuDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NhomDichVuDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NhomDichVuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

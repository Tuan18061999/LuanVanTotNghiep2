import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DichVuDialogComponent } from './dich-vu-dialog.component';

describe('DichVuDialogComponent', () => {
  let component: DichVuDialogComponent;
  let fixture: ComponentFixture<DichVuDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DichVuDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DichVuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

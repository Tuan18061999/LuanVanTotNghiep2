import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrungDuLieuDialogComponent } from './trung-du-lieu-dialog.component';

describe('TrungDuLieuDialogComponent', () => {
  let component: TrungDuLieuDialogComponent;
  let fixture: ComponentFixture<TrungDuLieuDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrungDuLieuDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrungDuLieuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

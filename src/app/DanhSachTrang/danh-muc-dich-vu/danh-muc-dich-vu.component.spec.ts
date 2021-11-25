import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhMucDichVuComponent } from './danh-muc-dich-vu.component';

describe('DanhMucDichVuComponent', () => {
  let component: DanhMucDichVuComponent;
  let fixture: ComponentFixture<DanhMucDichVuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhMucDichVuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucDichVuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhomDichVuComponent } from './nhom-dich-vu.component';

describe('NhomDichVuComponent', () => {
  let component: NhomDichVuComponent;
  let fixture: ComponentFixture<NhomDichVuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NhomDichVuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NhomDichVuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

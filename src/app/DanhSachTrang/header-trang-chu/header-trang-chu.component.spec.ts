import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTrangChuComponent } from './header-trang-chu.component';

describe('HeaderTrangChuComponent', () => {
  let component: HeaderTrangChuComponent;
  let fixture: ComponentFixture<HeaderTrangChuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderTrangChuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderTrangChuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

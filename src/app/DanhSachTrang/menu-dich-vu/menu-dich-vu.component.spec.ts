import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDichVuComponent } from './menu-dich-vu.component';

describe('MenuDichVuComponent', () => {
  let component: MenuDichVuComponent;
  let fixture: ComponentFixture<MenuDichVuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuDichVuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDichVuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

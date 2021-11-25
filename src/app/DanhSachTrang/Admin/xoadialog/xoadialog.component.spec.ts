import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XoadialogComponent } from './xoadialog.component';

describe('XoadialogComponent', () => {
  let component: XoadialogComponent;
  let fixture: ComponentFixture<XoadialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XoadialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XoadialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

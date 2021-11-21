import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAngularMaterialHijriAdapterComponent } from './ngx-angular-material-hijri-adapter.component';

describe('NgxAngularMaterialHijriAdapterComponent', () => {
  let component: NgxAngularMaterialHijriAdapterComponent;
  let fixture: ComponentFixture<NgxAngularMaterialHijriAdapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxAngularMaterialHijriAdapterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxAngularMaterialHijriAdapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

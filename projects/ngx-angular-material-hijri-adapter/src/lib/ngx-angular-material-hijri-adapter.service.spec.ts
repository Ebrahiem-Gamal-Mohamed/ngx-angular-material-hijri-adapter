import { TestBed } from '@angular/core/testing';

import { NgxAngularMaterialHijriAdapterService } from './ngx-angular-material-hijri-adapter.service';

describe('NgxAngularMaterialHijriAdapterService', () => {
  let service: NgxAngularMaterialHijriAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxAngularMaterialHijriAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

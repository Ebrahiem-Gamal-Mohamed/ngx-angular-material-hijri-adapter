import { NgModule } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MOMENT_HIJRI_DATE_FORMATS } from './adapter/entities/moment-hijri-date-formats';
import { MomentHijriDateModule } from './adapter/moment-hijri-date-module';

@NgModule({
  imports: [MomentHijriDateModule],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MOMENT_HIJRI_DATE_FORMATS },
  ],
})
export class NgxAngularMaterialHijriAdapterModule {}

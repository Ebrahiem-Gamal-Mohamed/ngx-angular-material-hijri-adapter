import { NgModule } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxAngularMaterialHijriAdapterService } from './ngx-angular-material-hijri-adapter.service';

@NgModule({
  providers: [
    {
      provide: DateAdapter,
      useClass: NgxAngularMaterialHijriAdapterService,
      deps: [MAT_DATE_LOCALE],
    },
  ],
})
export class MomentHijriDateModule {}

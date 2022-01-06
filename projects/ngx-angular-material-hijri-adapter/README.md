# NgxAngularMaterialHijriAdapter

This library is an Angular material date adapter for Hijri Calendar Dates and Dates/Time, 
it's depending on moment-hijri (v2.1.2) plugin and @angular/material (v13.0.2).

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.0.


## Installation

To use the library you must run `npm install ngx-angular-material-hijri-adapter`.

> Note: Please remember to install the `@angular/material` and `moment-hijri` libraries if not exist in your package.json.

### @angular/material 
```
You can run: ng add @angular/material

or simply run: npm install @angular/material

or visit: [Angular Material official website](https://material.angular.io/)
```
### moment-hijri
```
You can run: npm install moment-hijri

or visit: [Moment Hijri Library](https://github.com/xsoh/moment-hijri)
```

## After installation

```
import { NgxAngularMaterialHijriAdapterModule } from 'ngx-angular-material-hijri-adapter';

@NgModule({
  imports: [
    NgxAngularMaterialHijriAdapterModule
  ],
})
export class AppModule {}
```

> Note:  import `NgxAngularMaterialHijriAdapterModule` module into your root Module -App or Core module- and must be before `MatMomentDateModule` if it existed.

## Localization & Formatting
If you want to apply the hijri adapter and change the formatting or localization for your component or module? 
```
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { NgxAngularMaterialHijriAdapterService, DateLocaleKeys, MOMENT_HIJRI_DATE_FORMATS } from 'ngx-angular-material-hijri-adapter';

providers: [
    {
      provide: DateAdapter,
      useClass: NgxAngularMaterialHijriAdapterService,
    },
    // Change the format by using `MOMENT_HIJRI_DATE_FORMATS` for Dates and `MOMENT_HIJRI_DATE_TIME_FORMATS` for date/time.
    { provide: MAT_DATE_FORMATS, useValue: MOMENT_HIJRI_DATE_FORMATS },
    // Change the localization to arabic by using `AR_SA` not `AR` only and `EN_US` not `EN` only.
    { provide: MAT_DATE_LOCALE, useValue: DateLocaleKeys.AR_SA },
],
```

You can also inject the `NgxAngularMaterialHijriAdapterService` in the component constructor as following.
```
constructor(
    private dateAdapter: DateAdapter<any>,
    private hijriDateAdapter: NgxAngularMaterialHijriAdapterService,
  ) {}

ngOnInit() {
  this.dateAdapter?.setLocale(lang);
  this.hijriDateAdapter?.setLocale(lang === DateLocaleKeys.AR ? DateLocaleKeys.AR_SA : DateLocaleKeys.EN_US);
}
```

## Running unit tests

Run `ng test ngx-angular-material-hijri-adapter` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

You can ask for help by emailing me at: e.g.mhmd2020@gmail.com

`Thanks for using my library and I wish you the best.`

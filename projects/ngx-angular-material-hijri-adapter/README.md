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

## Running unit tests

Run `ng test ngx-angular-material-hijri-adapter` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

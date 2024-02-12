import { Inject, Injectable, Optional } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

import { DateLocaleKeys } from './entities/moment-hijri-date-locale-keys.enum';
import { ILocalData } from './entities/moment-hijri-local-data.interface';
import * as _moment from 'moment-hijri';
// Since moment-hijri library doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
// @ts-ignore:no-duplicate-imports
import { default as _rollupMoment, Moment, MomentInput, MomentFormatSpecification } from 'moment-hijri';

const momentHijri = _rollupMoment || _moment;

/** Creates an array and fills it with values. */
function range<T>(length: number, valueFunction: (index: number) => T): T[] {
  const valuesArray = Array(length);
  for (let i = 0; i < length; i++) {
    valuesArray[i] = valueFunction(i);
  }
  return valuesArray;
}

@Injectable()
export class NgxAngularMaterialHijriAdapterService extends DateAdapter<Moment> {
  private _localeData!: ILocalData;

  constructor(@Optional() @Inject(MAT_DATE_LOCALE) matDateLocale: string) {
    super();
    this._updateMomentLocales();
    this.setLocale(matDateLocale || '');
  }

  override setLocale(locale: string) {
    super.setLocale(locale);
    const momentLocaleData = momentHijri?.localeData(locale);

    this._localeData = {
      firstDayOfWeek:
        locale === DateLocaleKeys.AR_SA
          ? momentLocaleData?.firstDayOfWeek()
          : 6, // make Saturday is the first hijri day in 'ar' locale...
      longMonths: momentLocaleData?.months().slice(0),
      shortMonths: momentLocaleData?.monthsShort().slice(0),
      dates: range(30, (i) => this.createDate(1443, 2, i + 1).format('iD')), // set to 30 days month within any hijri year to get 30 formatted days.
      longDaysOfWeek: momentLocaleData?.weekdays().slice(0),
      shortDaysOfWeek: momentLocaleData?.weekdaysShort().slice(0),
      narrowDaysOfWeek: momentLocaleData?.weekdaysMin().slice(0),
    };
  }
  getYear(date: Moment): number {
    return this.clone(date)?.iYear();
  }
  getMonth(date: Moment): number {
    return this.clone(date)?.iMonth();
  }
  getDate(date: Moment): number {
    return this.clone(date)?.iDate();
  }
  getDayOfWeek(date: Moment): number {
    return this.clone(date)?.day();
  }
  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    return style === 'long'
      ? this._localeData?.longMonths
      : this._localeData?.shortMonths;
  }
  getDateNames(): string[] {
    return this._localeData?.dates;
  }
  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    switch (style) {
      case 'long':
        return this._localeData?.longDaysOfWeek;
      case 'short':
        return this._localeData?.shortDaysOfWeek;
      case 'narrow':
        return this._localeData?.narrowDaysOfWeek;
    }
  }
  getYearName(date: Moment): string {
    return this.clone(date)?.format('iYYYY');
  }
  getFirstDayOfWeek(): number {
    return this._localeData?.firstDayOfWeek;
  }
  getNumDaysInMonth(date: Moment): number {
    return momentHijri?.iDaysInMonth(this.getYear(date), this.getMonth(date)); // get the current month days number of current hijri (year and month).
  }
  clone(date: Moment): Moment {
    return date?.clone().locale(this.locale);
  }
  createDate(year: number, month: number, date: number): Moment {
    if (month < 0 || month > 11) {
      throw Error(
        `Invalid month index "${month}". Month index has to be between 0 and 11.`
      );
    }
    if (date < 1) {
      throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
    }
    const result = this._createMoment()
      ?.iYear(year)
      .iMonth(month)
      .iDate(date)
      .hours(0)
      .minutes(0)
      .seconds(0)
      .milliseconds(0)
      .locale(this.locale);

    if (this.getMonth(result) !== month) {
      throw Error(`Invalid date ${date} for month with index ${month}.`);
    }
    if (!result.isValid()) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }
    return result;
  }
  today(): Moment {
    return this._createMoment()?.locale(this.locale);
  }
  parse(value: any, parseFormat: string | string[]): Moment | null {
    if (value && typeof value === 'string') {
      return this._createMoment(value, parseFormat, this.locale);
    }
    return value ? this._createMoment(value)?.locale(this.locale) : null;
  }
  format(date: Moment, displayFormat: string): string {
    date = this.clone(date);
    if (!this.isValid(date)) {
      throw Error('MomentHijriDateAdapter: Cannot format invalid date.');
    }
    return date?.format(displayFormat);
  }
  addCalendarYears(date: Moment, years: number): Moment {
    return this.clone(date)?.add(years, 'iYear');
  }
  addCalendarMonths(date: Moment, months: number): Moment {
    return this.clone(date)?.add(months, 'iMonth');
  }
  addCalendarDays(date: Moment, days: number): Moment {
    return this.clone(date)?.add(days, 'days');
  }
  toIso8601(date: Moment): string {
    return this.clone(date)?.toISOString(true);
  }
  override deserialize(value: any): Moment | null {
    let date: any;
    if (value instanceof Date) {
      date = this._createMoment(value)?.locale(this.locale);
    } else if (this.isDateInstance(value)) {
      return this.clone(value);
    }
    if (typeof value === 'string') {
      if (!value) {
        return null;
      }
      date = this._createMoment(value)?.locale(this.locale);
    }
    if (date && this.isValid(date)) {
      return this._createMoment(date)?.locale(this.locale);
    }
    return super.deserialize(value);
  }
  isDateInstance(obj: any): boolean {
    return momentHijri?.isMoment(obj);
  }
  isValid(date: Moment): boolean {
    return this.clone(date)?.isValid();
  }
  invalid(): Moment {
    return momentHijri?.invalid();
  }

  private _createMoment(
    date?: MomentInput,
    format?: MomentFormatSpecification,
    locale?: string
  ): Moment {
    return momentHijri(date, format, locale);
  }
  private _updateMomentLocales() {
    const iMonthNamesEn = {
      iMonths:
        `Muharram_Safar_Rabi’ al-Awwal_Rabi’ al-Thani_Jumada al-Ula_Jumada al-Alkhirah_Rajab_Sha’ban_Ramadhan_Shawwal_Thul-Qi’dah_Thul-Hijjah`.split(
          '_'
        ),
      iMonthsShort:
        `Muh_Saf_Rab-I_Rab-II_Jum-I_Jum-II_Raj_Sha_Ram_Shw_Dhu-Q_Dhu-H`.split(
          '_'
        ),
      months:
        `Muharram_Safar_Rabi’ al-Awwal_Rabi’ al-Thani_Jumada al-Ula_Jumada al-Alkhirah_Rajab_Sha’ban_Ramadhan_Shawwal_Thul-Qi’dah_Thul-Hijjah`.split(
          '_'
        ),
      monthsShort:
        `Muh_Saf_Rab-I_Rab-II_Jum-I_Jum-II_Raj_Sha_Ram_Shw_Dhu-Q_Dhu-H`.split(
          '_'
        ),
    };

    const iMonthNamesAr = {
      iMonths:
        'محرم_صفر_ربيع الأول_ربيع الثاني_جمادى الأولى_جمادى الآخرة_رجب_شعبان_رمضان_شوال_ذو القعدة_ذو الحجة'.split(
          '_'
        ),
      iMonthsShort:
        'محرم_صفر_ربيع ١_ربيع ٢_جمادى ١_جمادى ٢_رجب_شعبان_رمضان_شوال_ذو القعدة_ذو الحجة'.split(
          '_'
        ),
      months:
        'محرم_صفر_ربيع الأول_ربيع الثاني_جمادى الأولى_جمادى الآخرة_رجب_شعبان_رمضان_شوال_ذو القعدة_ذو الحجة'.split(
          '_'
        ),
      monthsShort:
        'محرم_صفر_ربيع ١_ربيع ٢_جمادى ١_جمادى ٢_رجب_شعبان_رمضان_شوال_ذو القعدة_ذو الحجة'.split(
          '_'
        ),
    };

    // Default to the momentjs 2.12+ API
    if (typeof momentHijri?.updateLocale === 'function') {
      // Note: We used 'ar-sa' here to override the initial moment hijri locale...
      momentHijri?.updateLocale(DateLocaleKeys.AR_SA, {
        ...iMonthNamesAr,
      });
      // Note: Don't use 'en' to prevent override the initial Date Adapter...
      momentHijri?.updateLocale(DateLocaleKeys.EN_US, {
        ...iMonthNamesEn,
      });
    } else {
      const oldLocale = momentHijri?.locale();
      momentHijri?.defineLocale(DateLocaleKeys.AR_SA, iMonthNamesEn);
      momentHijri?.locale(oldLocale);
    }
  }
}

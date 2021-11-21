import { MatDateFormats } from '@angular/material/core';

export const MOMENT_HIJRI_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'iDD iMMMM, iYYYY',
    monthYearLabel: 'iMMMM iYYYY',
    dateA11yLabel: 'iDD iMMMM, iYYYY',
    monthYearA11yLabel: 'iMMMM iYYYY',
    monthLabel: 'iMMM',
  },
};

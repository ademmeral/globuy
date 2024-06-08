/**
  * @ADEMMERAL_XDATE
  * https://github.com/ademmeral/XModules/blob/main/XDate.js
*/

class XDateError extends Error{
  constructor(message = ''){
    super()
    this.name = 'XDateError';
    this.message = message;
  }
}
export class XDate {   // https://github.com/ademmeral/XScript/XModules/XDate.js
  #dict = {
    'Y2': { year: '2-digit' },
    'Y': { year: 'numeric' },
    'M': { month: 'numeric' },
    'M2': { month: '2-digit' },
    'Ml': { month: 'long' },
    'Ms': { month: 'short' },
    'Mna': { month: 'narrow' },
    'D': { day: "numeric", },
    'D2': { day: "2-digit", },
    'wdl': { weekday: 'long' },
    'wds': { weekday: 'short' },
    'wdna': { weekday: 'narrow' },
    'h12': { hour: '2-digit', hour12: true },
    'h12n': { hour: 'numeric', hour12: true },
    'h': { hour: 'numeric', hour12: false },
    'h2': { hour: '2-digit', hour12: false },
    'm': { minute: 'numeric' },
    'm2': { minute: '2-digit' },
    's': { second: 'numeric' },
    's2': { second: '2-digit' },
    'erl': { era: 'long' },
    'erna': { era: 'narrow' },
    'ers': { era: 'short' },
    'dpna': { dayPeriod: 'narrow' },
    'dps': { dayPeriod: 'short' },
    'dpl': { dayPeriod: 'long' },
    'tznl': { timeZoneName: 'long' },
    'tznna': { timeZoneName: 'narrow' },
    'tzns': { timeZoneName: 'short' },
    'tznsg': { timeZoneName: 'shortGeneric' },
    'tznlg': { timeZoneName: 'longGeneric' },
    'tznsOff': { timeZoneName: 'shortOffset' },
    'tznlOff': { timeZoneName: 'longOffset' },
  };
  static language = 'en-UK';
  static rtf = new Intl.RelativeTimeFormat(XDate.language, { numeric: 'auto' });

  constructor(config) {
    this.options = {}
    const rKeys = /[a-zA-Z]+\d*/gi;
    const configKeys = [...config.match(rKeys)];

    for (const k of configKeys) {
      if (k in this.#dict)
        Object.assign(this.options, this.#dict[k]);
    }

    this.IntlDate = new Intl.DateTimeFormat(XDate.language, this.options);
  };

  static set setLanguage(lang) {
    try { this.language = lang; }
    catch (err){ throw new XDateError(err.message) };
  };

  static moment(config) {
    return new XDate(config);
  };

  format(date) {
    try { return this.IntlDate.format(new Date(date)); }
    catch (err) { throw new XDateError(err.message) }
  };

  static subtract(num, str) {
    try{
      const rtf = XDate.rtf;
      return rtf.format(Math.abs(num) * -1, str);
    } catch (err) { throw new XDateError(err.message) }
  };
  static add(num, str) {
    try {
      const rtf = XDate.rtf;
      return rtf.format(Math.abs(num), str);
    } catch (err) { throw new XDateError(err.message) };
  };
  static fromNow(date) {
    try {
      const now = Date.now();
      const modifiedDate = new Date(date).getTime();
      const diffInSeconds = Math.floor((now - modifiedDate) / 1000);
      const rtf = XDate.rtf;
      if (diffInSeconds < 60) {
        return rtf.format(-diffInSeconds, 'second');
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return rtf.format(-minutes, 'minute');
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return rtf.format(-hours, 'hour');
      } else if (diffInSeconds < 2592000) {
        const days = Math.floor(diffInSeconds / 86400);
        return rtf.format(-days, 'day');
      } else if (diffInSeconds < 31536000) {
        const months = Math.floor(diffInSeconds / 2592000);
        return rtf.format(-months, 'month');
      } else {
        const years = Math.floor(diffInSeconds / 31536000);
        return rtf.format(-years, 'year');
      };

    } catch (err) { throw new XDateError(err.message) };
  };
};

/***** EXAMPLE USAGE *****/
/*
XDate.setLanguage = 'tr-TR'; // usually window.navigator.language[0]
const getDate = XDate.moment('Y M2 D wdl h12 m2 s dpl').format(Date.now() - 20000000) // random date
const humanReadable = XDate.fromNow(Date.now() - 1000000) // random date

console.log(getDate)
console.log(humanReadable)
console.log(XDate.subtract(1, 'week'))
console.log(XDate.subtract(2, 'days'))
console.log(XDate.add(5, 'years'))
console.log(XDate.add(5, 'month'))
*/
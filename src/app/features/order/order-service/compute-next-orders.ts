import { ScheduleRule } from '../../../models/schedule-rule';

class ComputeNextOrders {
  private static readonly ALL_DAYS = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ] as const;

  private static readonly WEEKDAYS = this.ALL_DAYS.slice(1, 6);
  private static readonly WEEKENDS = [this.ALL_DAYS[0], this.ALL_DAYS[6]];

  private static readonly formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Colombo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  private static getOperatingTimezoneDate(date: Date): Date {
    return new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Colombo' }));
  }

  private static getDayName(date: Date): string {
    return this.ALL_DAYS[date.getDay()];
  }

  private static isWeekday(date: Date): boolean {
    return this.WEEKDAYS.includes(this.getDayName(date) as any);
  }

  private static isWeekend(date: Date): boolean {
    return this.WEEKENDS.includes(this.getDayName(date) as any);
  }

  private static isDay(date: Date, day: string): boolean {
    return this.getDayName(date) === day;
  }

  private static isMonthStart(date: Date): boolean {
    return date.getDate() === 1;
  }

  private static isMonthEnd(date: Date): boolean {
    return (
      date.getDate() ===
      new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    );
  }

  private static isNumeric(date: Date, value: number): boolean {
    return date.getDate() === value;
  }

  private static isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  private static processEveryRule(date: Date, rule: ScheduleRule): boolean {
    if (rule.type === 'day') {
      switch (rule.value) {
        case 'weekday':
          return this.isWeekday(date);
        case 'weekend':
          return this.isWeekend(date);
        case 'monthStart':
          return this.isMonthStart(date);
        case 'monthEnd':
          return this.isMonthEnd(date);
        default:
          return (
            this.ALL_DAYS.includes(rule.value as any) &&
            this.isDay(date, rule.value as string)
          );
      }
    }
    return (
      rule.type === 'numeric' && this.isNumeric(date, rule.value as number)
    );
  }

  public static computeUpcomingOrderDates(
    startDate: Date,
    maxDaysToCompute: number = 60,
    rules: ScheduleRule[] = []
  ): Date[] {
    if (!startDate) return [];

    const nextOrderDates = new Set<Date>();
    let currentDate = this.getOperatingTimezoneDate(startDate);

    for (let day = 0; day < maxDaysToCompute; day++) {
      const tempDate = new Date(currentDate);

      for (const rule of rules) {
        switch (rule.condition) {
          case 'every':
            if (this.processEveryRule(tempDate, rule)) {
              nextOrderDates.add(tempDate);
            }
            break;

          case 'exclude':
            if (rule.type === 'date') {
              if (this.isSameDate(tempDate, new Date(rule.value as Date))) {
                nextOrderDates.delete(tempDate);
              }
            } else if (this.processEveryRule(tempDate, rule)) {
              nextOrderDates.delete(tempDate);
            }
            break;

          case 'set':
            if (
              rule.type === 'date' &&
              this.isSameDate(tempDate, new Date(rule.value as Date))
            ) {
              nextOrderDates.add(tempDate);
            }
            break;
        }
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    const result = Array.from(nextOrderDates);

    // For debugging
    console.log(
      result.map(
        (date) => `${this.formatter.format(date)} is ${this.getDayName(date)}`
      )
    );

    return result;
  }
}

export default ComputeNextOrders;

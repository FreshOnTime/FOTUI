export interface RecurringOrderLogic {
  frequency: 'every' | 'except' | 'starting' | 'ending';
  occurrence:
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday'
    | 'sunday'
    | 'weekend'
    | 'weekday'
    | 'poya'
    | number
    | Date
    | Date[];
}

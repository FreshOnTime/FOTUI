export interface ScheduleRule {
  condition: 'every' | 'exclude' | 'set';
  value: any;
  type: 'day' | 'date' | 'numeric';
}
